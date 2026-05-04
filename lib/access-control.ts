import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from './firebase-admin';
import { getCreditBalance } from './credits';
import {
  FREE_TRIAL_SECONDS,
  getFreeTrial,
  type FreeTrialState,
} from './free-trial';

/**
 * Centralised access decision for starting a Realtime voice session.
 *
 * Wallet-required two-tier flow:
 *
 *   1. FREE TRIAL  - per-wallet budget of FREE_TRIAL_SECONDS (default 120s)
 *                    of cumulative audio. Spent by the actual session length
 *                    reported via /api/usage.
 *   2. PAID        - any positive credit-second balance keyed by wallet.
 *
 * If no wallet header is present, we refuse with `wallet_required` so the
 * client can prompt the user to connect.
 *
 * A soft per-IP daily session ceiling (DAILY_LIMIT, default 50) is kept
 * as a DOS defence — it stops a single IP from creating thousands of
 * fresh wallets to farm free trials.
 */

/**
 * Per-IP daily session ceiling. Set RATE_LIMIT_DAILY=0 (or any non-positive
 * value) to disable the cap entirely — useful in dev where you'd otherwise
 * burn through it while testing the flow.
 */
const DAILY_LIMIT = Number(
  process.env.RATE_LIMIT_DAILY ?? process.env.RATE_LIMIT_ANON_DAILY ?? 50
);
const IP_LIMIT_ENABLED = Number.isFinite(DAILY_LIMIT) && DAILY_LIMIT > 0;

export type AccessTier = 'free' | 'paid';

export interface AccessDecision {
  allowed: boolean;
  tier: AccessTier | null;
  reason?:
    | 'wallet_required'
    | 'free_exhausted'
    | 'ip_daily_exhausted'
    | 'rate_limiter_unavailable';
  /** Lowercase 0x… address if a wallet header was sent, else null. */
  walletAddress: string | null;
  /** IP-bucket session counters (used for the soft ceiling). */
  ipUsed: number;
  ipLimit: number;
  /** Free-trial state (or zeros if no wallet). */
  freeTrial: FreeTrialState;
  /** Paid credit-second balance (or 0 if no wallet). */
  creditSeconds: number;
  resetAtIso: string;
}

const ZERO_TRIAL: FreeTrialState = {
  usedSeconds: 0,
  remainingSeconds: FREE_TRIAL_SECONDS,
  totalSeconds: FREE_TRIAL_SECONDS,
  sessionsCount: 0,
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowUtcIso(): string {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return d.toISOString();
}

function clientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (
    headers.get('x-real-ip') ??
    headers.get('cf-connecting-ip') ??
    'unknown'
  );
}

const ADDRESS_RE = /^0x[a-f0-9]{40}$/;

export function readWalletAddress(headers: Headers): string | null {
  const raw = headers.get('x-wallet-address');
  if (!raw) return null;
  const lower = raw.trim().toLowerCase();
  if (!ADDRESS_RE.test(lower)) {
    console.warn('[access-control] ignoring malformed X-Wallet-Address:', raw);
    return null;
  }
  return lower;
}

/**
 * Decide whether a Realtime session can start. Atomically increments
 * the per-IP daily counter (for DOS defence). DOES NOT decrement the
 * free-trial budget — that happens when the session ENDS, via /api/usage,
 * with the actual elapsed seconds.
 */
export async function decideAndConsumeAccess(
  request: Request
): Promise<AccessDecision> {
  const walletAddress = readWalletAddress(request.headers);
  const ip = clientIp(request.headers);

  // 1) Wallet is required for ANY tier now.
  if (!walletAddress) {
    return {
      allowed: false,
      tier: null,
      reason: 'wallet_required',
      walletAddress: null,
      ipUsed: 0,
      ipLimit: DAILY_LIMIT,
      freeTrial: ZERO_TRIAL,
      creditSeconds: 0,
      resetAtIso: tomorrowUtcIso(),
    };
  }

  // 2) Soft IP-daily ceiling (DOS defence). Skipped when disabled.
  let ipUsed = 0;
  let ipAllowed = true;
  if (IP_LIMIT_ENABLED) {
    const dayDoc = adminDb()
      .collection('rateLimits')
      .doc(`ip:${ip}`)
      .collection('days')
      .doc(todayKey());
    try {
      const tx = await adminDb().runTransaction(async (txc) => {
        const snap = await txc.get(dayDoc);
        const used = (snap.exists ? (snap.data()?.count as number) : 0) ?? 0;
        if (used >= DAILY_LIMIT) {
          return { allowed: false, used };
        }
        txc.set(
          dayDoc,
          {
            count: FieldValue.increment(1),
            updatedAt: FieldValue.serverTimestamp(),
            bucketType: 'ip',
          },
          { merge: true }
        );
        return { allowed: true, used: used + 1 };
      });
      ipUsed = tx.used;
      ipAllowed = tx.allowed;
    } catch (err) {
      console.error('[access-control] IP rate-limit txn failed:', err);
      return {
        allowed: false,
        tier: null,
        reason: 'rate_limiter_unavailable',
        walletAddress,
        ipUsed: 0,
        ipLimit: DAILY_LIMIT,
        freeTrial: ZERO_TRIAL,
        creditSeconds: 0,
        resetAtIso: tomorrowUtcIso(),
      };
    }
  }

  if (!ipAllowed) {
    // Don't disclose paid balance over the IP cap — surface the cap reason.
    const ft = await safeGetFreeTrial(walletAddress);
    return {
      allowed: false,
      tier: null,
      reason: 'ip_daily_exhausted',
      walletAddress,
      ipUsed,
      ipLimit: DAILY_LIMIT,
      freeTrial: ft,
      creditSeconds: 0,
      resetAtIso: tomorrowUtcIso(),
    };
  }

  // 3) Pick a tier based on what the wallet has.
  const [freeTrial, creditBalance] = await Promise.all([
    safeGetFreeTrial(walletAddress),
    safeGetCreditBalance(walletAddress),
  ]);

  if (freeTrial.remainingSeconds > 0) {
    return {
      allowed: true,
      tier: 'free',
      walletAddress,
      ipUsed,
      ipLimit: DAILY_LIMIT,
      freeTrial,
      creditSeconds: creditBalance.creditSeconds,
      resetAtIso: tomorrowUtcIso(),
    };
  }

  if (creditBalance.creditSeconds > 0) {
    return {
      allowed: true,
      tier: 'paid',
      walletAddress,
      ipUsed,
      ipLimit: DAILY_LIMIT,
      freeTrial,
      creditSeconds: creditBalance.creditSeconds,
      resetAtIso: tomorrowUtcIso(),
    };
  }

  return {
    allowed: false,
    tier: null,
    reason: 'free_exhausted',
    walletAddress,
    ipUsed,
    ipLimit: DAILY_LIMIT,
    freeTrial,
    creditSeconds: 0,
    resetAtIso: tomorrowUtcIso(),
  };
}

/**
 * Read-only snapshot of the caller's quota state. Used by /api/quota.
 */
export async function readAccessStatus(request: Request): Promise<{
  walletAddress: string | null;
  ipUsed: number;
  ipLimit: number;
  freeTrial: FreeTrialState;
  creditSeconds: number;
  resetAtIso: string;
}> {
  const walletAddress = readWalletAddress(request.headers);
  const ip = clientIp(request.headers);

  let ipUsed = 0;
  try {
    const snap = await adminDb()
      .collection('rateLimits')
      .doc(`ip:${ip}`)
      .collection('days')
      .doc(todayKey())
      .get();
    ipUsed = Number(snap.data()?.count ?? 0);
  } catch {
    // ignore — surface 0
  }

  const [freeTrial, creditBalance] = await Promise.all([
    walletAddress ? safeGetFreeTrial(walletAddress) : Promise.resolve(ZERO_TRIAL),
    walletAddress ? safeGetCreditBalance(walletAddress) : Promise.resolve({ creditSeconds: 0 }),
  ]);

  return {
    walletAddress,
    ipUsed,
    ipLimit: DAILY_LIMIT,
    freeTrial,
    creditSeconds: creditBalance.creditSeconds,
    resetAtIso: tomorrowUtcIso(),
  };
}

/* ------------------------------------------------------------------ */
/* Wrappers that swallow Firestore errors (non-fatal for the caller)   */
/* ------------------------------------------------------------------ */

async function safeGetFreeTrial(address: string): Promise<FreeTrialState> {
  try {
    return await getFreeTrial(address);
  } catch (err) {
    console.warn('[access-control] getFreeTrial failed:', err);
    return ZERO_TRIAL;
  }
}

async function safeGetCreditBalance(
  address: string
): Promise<{ creditSeconds: number }> {
  try {
    const balance = await getCreditBalance(address);
    return { creditSeconds: balance.creditSeconds };
  } catch (err) {
    console.warn('[access-control] getCreditBalance failed:', err);
    return { creditSeconds: 0 };
  }
}
