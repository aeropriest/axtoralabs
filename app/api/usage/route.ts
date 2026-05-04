import { NextResponse } from 'next/server';
import { consumeCreditSeconds } from '@/lib/credits';
import { consumeFreeTrialSeconds } from '@/lib/free-trial';
import { readWalletAddress } from '@/lib/access-control';

/**
 * POST /api/usage
 *
 * Client calls this when a Realtime session ends. We deduct the actual
 * elapsed seconds from the right bucket:
 *   - tier 'free' -> /wallets/{addr}/billing/freeTrial.usedSeconds
 *   - tier 'paid' -> /wallets/{addr}/billing/balance.creditSeconds
 *
 * Both deductions are idempotent on `sessionId`.
 *
 * Body:
 *   {
 *     sessionId: string;
 *     durationSec: number;
 *     tier: 'free' | 'paid';
 *   }
 * Headers:
 *   X-Wallet-Address: 0x...   // REQUIRED — wallet is the user identity now
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Missing JSON body' },
        { status: 400 }
      );
    }
    const { sessionId, durationSec, tier } = body as {
      sessionId?: string;
      durationSec?: number;
      tier?: string;
    };
    if (
      typeof sessionId !== 'string' ||
      typeof durationSec !== 'number' ||
      !sessionId
    ) {
      return NextResponse.json(
        { error: 'sessionId and durationSec are required' },
        { status: 400 }
      );
    }
    if (durationSec < 0 || !Number.isFinite(durationSec)) {
      return NextResponse.json(
        { error: 'durationSec must be a non-negative finite number' },
        { status: 400 }
      );
    }

    const walletAddress = readWalletAddress(request.headers);
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'X-Wallet-Address header is required' },
        { status: 400 }
      );
    }

    const seconds = Math.ceil(durationSec);

    if (tier === 'paid') {
      const result = await consumeCreditSeconds(
        walletAddress,
        seconds,
        sessionId
      );
      return NextResponse.json({
        ok: true,
        tier: 'paid',
        deductedSeconds: result.deducted,
        balance: result.balance,
      });
    }

    // Default to free-trial deduction (covers tier === 'free' and
    // unrecognised tiers — e.g. clients on older builds).
    const result = await consumeFreeTrialSeconds(
      walletAddress,
      seconds,
      sessionId
    );
    return NextResponse.json({
      ok: true,
      tier: 'free',
      deductedSeconds: result.deducted,
      freeTrial: result.state,
    });
  } catch (err) {
    console.error('[usage] failed:', err);
    return NextResponse.json(
      { error: 'Usage logging failed' },
      { status: 500 }
    );
  }
}
