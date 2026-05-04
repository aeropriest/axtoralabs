import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from './firebase-admin';

/**
 * Per-wallet credit-second balance — server-side only.
 *
 * Identity is the connected wallet address (lowercase 0x…), not a
 * Firebase uid. Balances are stored at
 *   /wallets/{address}/billing/balance
 *
 *   {
 *     creditSeconds: number
 *     totalPurchasedSeconds: number
 *     totalConsumedSeconds: number
 *     updatedAt: Timestamp
 *   }
 *
 * After exhausting the IP-based free daily quota (see access-control.ts)
 * a user tops up by paying $VIRTUAL on Base. Verified payments credit
 * this balance; usage deducts from it.
 */

const SECONDS_PER_MINUTE = 60;

export interface CreditBalance {
  creditSeconds: number;
  creditMinutes: number; // rounded down for display
  totalPurchasedSeconds: number;
  totalConsumedSeconds: number;
}

const ZERO_BALANCE: CreditBalance = {
  creditSeconds: 0,
  creditMinutes: 0,
  totalPurchasedSeconds: 0,
  totalConsumedSeconds: 0,
};

function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}

function balanceDoc(address: string) {
  return adminDb()
    .collection('wallets')
    .doc(normalizeAddress(address))
    .collection('billing')
    .doc('balance');
}

export async function getCreditBalance(address: string): Promise<CreditBalance> {
  const snap = await balanceDoc(address).get();
  if (!snap.exists) return ZERO_BALANCE;
  const data = snap.data() ?? {};
  const creditSeconds = Number(data.creditSeconds ?? 0);
  return {
    creditSeconds,
    creditMinutes: Math.floor(creditSeconds / SECONDS_PER_MINUTE),
    totalPurchasedSeconds: Number(data.totalPurchasedSeconds ?? 0),
    totalConsumedSeconds: Number(data.totalConsumedSeconds ?? 0),
  };
}

/**
 * Credit a user from a $VIRTUAL on-chain payment.
 *
 * Globally idempotent on the transaction hash: a single Base tx can fund
 * at most one user's balance, regardless of which uid claims it (which
 * matters because tx hashes are public and someone could try to replay
 * another wallet's tx into their own account).
 *
 * The global guard lives at /paymentsGlobal/virtual:{txHashLowercase}
 * and the per-user audit row at /users/{uid}/billing/payments/events/
 * virtual:{txHashLowercase}.
 */
export async function creditFromVirtualTx(args: {
  /** Wallet address to credit (lowercase 0x…). */
  address: string;
  minutes: number;
  txHash: string;
  packId: string;
  fromAddress: string;
  valueWei: string;
}): Promise<{ applied: boolean; balance: CreditBalance; reason?: string }> {
  const address = normalizeAddress(args.address);
  const txKey = `virtual:${args.txHash.toLowerCase()}`;
  const seconds = Math.round(args.minutes * SECONDS_PER_MINUTE);

  const globalGuard = adminDb().collection('paymentsGlobal').doc(txKey);
  const userEvent = adminDb()
    .collection('wallets')
    .doc(address)
    .collection('billing')
    .doc('payments')
    .collection('events')
    .doc(txKey);
  const ref = balanceDoc(address);

  const result = await adminDb().runTransaction(async (tx) => {
    const guardSnap = await tx.get(globalGuard);
    if (guardSnap.exists) {
      const claimedBy = guardSnap.data()?.address;
      const balSnap = await tx.get(ref);
      const data = balSnap.data() ?? {};
      return {
        applied: false,
        reason:
          claimedBy === address
            ? 'already_credited'
            : 'tx_claimed_by_other_address',
        creditSeconds: Number(data.creditSeconds ?? 0),
        totalPurchasedSeconds: Number(data.totalPurchasedSeconds ?? 0),
        totalConsumedSeconds: Number(data.totalConsumedSeconds ?? 0),
      };
    }

    tx.set(globalGuard, {
      address,
      txHash: args.txHash.toLowerCase(),
      packId: args.packId,
      rail: 'virtual',
      fromAddress: args.fromAddress.toLowerCase(),
      valueWei: args.valueWei,
      createdAt: FieldValue.serverTimestamp(),
    });

    tx.set(
      ref,
      {
        creditSeconds: FieldValue.increment(seconds),
        totalPurchasedSeconds: FieldValue.increment(seconds),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    tx.set(userEvent, {
      kind: 'credit',
      rail: 'virtual',
      minutes: args.minutes,
      seconds,
      packId: args.packId,
      txHash: args.txHash.toLowerCase(),
      fromAddress: args.fromAddress.toLowerCase(),
      valueWei: args.valueWei,
      createdAt: FieldValue.serverTimestamp(),
    });

    const balSnap = await tx.get(ref);
    const data = balSnap.data() ?? {};
    return {
      applied: true,
      reason: undefined as string | undefined,
      creditSeconds: Number(data.creditSeconds ?? 0) + seconds,
      totalPurchasedSeconds: Number(data.totalPurchasedSeconds ?? 0) + seconds,
      totalConsumedSeconds: Number(data.totalConsumedSeconds ?? 0),
    };
  });

  return {
    applied: result.applied,
    reason: result.reason,
    balance: {
      creditSeconds: result.creditSeconds,
      creditMinutes: Math.floor(result.creditSeconds / SECONDS_PER_MINUTE),
      totalPurchasedSeconds: result.totalPurchasedSeconds,
      totalConsumedSeconds: result.totalConsumedSeconds,
    },
  };
}

/**
 * Atomically deduct seconds from a user's balance. Returns the new balance.
 * If the user has fewer seconds than requested, deducts what's available
 * (this lets us reconcile after a session that overran the cap).
 */
export async function consumeCreditSeconds(
  address: string,
  seconds: number,
  sessionId: string
): Promise<{ deducted: number; balance: CreditBalance }> {
  const addr = normalizeAddress(address);
  if (seconds <= 0) {
    const balance = await getCreditBalance(addr);
    return { deducted: 0, balance };
  }
  const ref = balanceDoc(addr);
  const usageDoc = adminDb()
    .collection('wallets')
    .doc(addr)
    .collection('billing')
    .doc('usage')
    .collection('events')
    .doc(sessionId);

  const result = await adminDb().runTransaction(async (tx) => {
    // Idempotent on sessionId.
    const usageSnap = await tx.get(usageDoc);
    if (usageSnap.exists) {
      const balSnap = await tx.get(ref);
      const data = balSnap.data() ?? {};
      return {
        deducted: 0,
        creditSeconds: Number(data.creditSeconds ?? 0),
        totalPurchasedSeconds: Number(data.totalPurchasedSeconds ?? 0),
        totalConsumedSeconds: Number(data.totalConsumedSeconds ?? 0),
      };
    }
    const balSnap = await tx.get(ref);
    const current = Number(balSnap.data()?.creditSeconds ?? 0);
    const deducted = Math.min(current, seconds);
    tx.set(
      ref,
      {
        creditSeconds: FieldValue.increment(-deducted),
        totalConsumedSeconds: FieldValue.increment(seconds),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    tx.set(usageDoc, {
      kind: 'usage',
      sessionId,
      requestedSeconds: seconds,
      deductedSeconds: deducted,
      createdAt: FieldValue.serverTimestamp(),
    });
    return {
      deducted,
      creditSeconds: current - deducted,
      totalPurchasedSeconds: Number(balSnap.data()?.totalPurchasedSeconds ?? 0),
      totalConsumedSeconds: Number(balSnap.data()?.totalConsumedSeconds ?? 0) + seconds,
    };
  });

  return {
    deducted: result.deducted,
    balance: {
      creditSeconds: result.creditSeconds,
      creditMinutes: Math.floor(result.creditSeconds / SECONDS_PER_MINUTE),
      totalPurchasedSeconds: result.totalPurchasedSeconds,
      totalConsumedSeconds: result.totalConsumedSeconds,
    },
  };
}
