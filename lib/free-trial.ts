import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from './firebase-admin';

/**
 * Per-wallet free-trial seconds.
 *
 * Each wallet gets `FREE_TRIAL_SECONDS` (default 120) of cumulative audio
 * before the paywall kicks in. Tracked separately from paid credits so a
 * user who tops up doesn't lose their trial budget, and so we have a
 * clean "trial remaining" vs "credit remaining" distinction in the UI.
 *
 * Stored at /wallets/{address}/billing/freeTrial:
 *   {
 *     usedSeconds: number,
 *     sessionsCount: number,
 *     firstUsedAt: Timestamp,
 *     updatedAt: Timestamp
 *   }
 */

export const FREE_TRIAL_SECONDS = Number(
  process.env.FREE_TRIAL_SECONDS ?? 120
);

export interface FreeTrialState {
  /** Seconds already consumed (clamped to FREE_TRIAL_SECONDS for display). */
  usedSeconds: number;
  /** Seconds the wallet still has on its trial. Always >= 0. */
  remainingSeconds: number;
  /** Configured trial size for this deployment. */
  totalSeconds: number;
  /** Number of sessions the wallet has already opened on the free tier. */
  sessionsCount: number;
}

function normalize(address: string): string {
  return address.trim().toLowerCase();
}

function trialDoc(address: string) {
  return adminDb()
    .collection('wallets')
    .doc(normalize(address))
    .collection('billing')
    .doc('freeTrial');
}

export async function getFreeTrial(address: string): Promise<FreeTrialState> {
  const snap = await trialDoc(address).get();
  if (!snap.exists) {
    return {
      usedSeconds: 0,
      remainingSeconds: FREE_TRIAL_SECONDS,
      totalSeconds: FREE_TRIAL_SECONDS,
      sessionsCount: 0,
    };
  }
  const data = snap.data() ?? {};
  const usedSeconds = Math.max(0, Number(data.usedSeconds ?? 0));
  return {
    usedSeconds: Math.min(usedSeconds, FREE_TRIAL_SECONDS),
    remainingSeconds: Math.max(0, FREE_TRIAL_SECONDS - usedSeconds),
    totalSeconds: FREE_TRIAL_SECONDS,
    sessionsCount: Math.max(0, Number(data.sessionsCount ?? 0)),
  };
}

/**
 * Atomically deduct free-trial seconds. Idempotent on `sessionId` so
 * webhook retries / double-fires don't double-charge the trial budget.
 *
 * Returns the new state. If `seconds` exceeds the remaining trial we
 * clamp to whatever's left — the access-control layer is responsible
 * for blocking new sessions when the trial is exhausted.
 */
export async function consumeFreeTrialSeconds(
  address: string,
  seconds: number,
  sessionId: string
): Promise<{ deducted: number; state: FreeTrialState }> {
  const addr = normalize(address);
  if (seconds <= 0) {
    const state = await getFreeTrial(addr);
    return { deducted: 0, state };
  }

  const ref = trialDoc(addr);
  const usageDoc = adminDb()
    .collection('wallets')
    .doc(addr)
    .collection('billing')
    .doc('freeTrialUsage')
    .collection('events')
    .doc(sessionId);

  const result = await adminDb().runTransaction(async (tx) => {
    const usageSnap = await tx.get(usageDoc);
    if (usageSnap.exists) {
      const cur = await tx.get(ref);
      const data = cur.data() ?? {};
      const used = Math.max(0, Number(data.usedSeconds ?? 0));
      return {
        deducted: 0,
        usedSeconds: used,
        sessionsCount: Math.max(0, Number(data.sessionsCount ?? 0)),
      };
    }
    const cur = await tx.get(ref);
    const data = cur.data() ?? {};
    const usedNow = Math.max(0, Number(data.usedSeconds ?? 0));
    const remaining = Math.max(0, FREE_TRIAL_SECONDS - usedNow);
    const deducted = Math.min(remaining, seconds);

    tx.set(
      ref,
      {
        usedSeconds: FieldValue.increment(deducted),
        sessionsCount: FieldValue.increment(1),
        firstUsedAt: data.firstUsedAt ?? FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    tx.set(usageDoc, {
      kind: 'free_trial_usage',
      sessionId,
      requestedSeconds: seconds,
      deductedSeconds: deducted,
      createdAt: FieldValue.serverTimestamp(),
    });

    return {
      deducted,
      usedSeconds: usedNow + deducted,
      sessionsCount: Math.max(0, Number(data.sessionsCount ?? 0)) + 1,
    };
  });

  const used = Math.min(result.usedSeconds, FREE_TRIAL_SECONDS);
  return {
    deducted: result.deducted,
    state: {
      usedSeconds: used,
      remainingSeconds: Math.max(0, FREE_TRIAL_SECONDS - used),
      totalSeconds: FREE_TRIAL_SECONDS,
      sessionsCount: result.sessionsCount,
    },
  };
}
