import { NextResponse } from 'next/server';
import { readAccessStatus } from '@/lib/access-control';
import {
  listVirtualPacks,
  VIRTUAL_CHAIN_ID,
  VIRTUAL_ENABLED,
  VIRTUAL_TOKEN_ADDRESS,
  VIRTUAL_TOKEN_DECIMALS,
  VIRTUAL_TREASURY_ADDRESS,
} from '@/lib/virtual-token';

/**
 * GET /api/quota
 *
 * Read-only snapshot of the caller's free-trial state, paid balance, and
 * available credit packs. Used by the demo banner and Buy Credits dialog.
 *
 * Identity: pass `X-Wallet-Address: 0x...` to include the connected
 * wallet's free-trial budget and paid credit balance. Without it the
 * response describes a "wallet required" state.
 */
export async function GET(request: Request) {
  try {
    const status = await readAccessStatus(request);
    const creditSeconds = status.creditSeconds;
    const virtualPacks = VIRTUAL_ENABLED
      ? listVirtualPacks().map((p) => ({
          id: p.id,
          amount: p.amount,
          amountWei: p.amountWei.toString(),
          minutes: p.minutes,
          label: p.label,
        }))
      : [];

    return NextResponse.json({
      walletAddress: status.walletAddress,
      walletRequired: !status.walletAddress,
      freeTrial: {
        usedSeconds: status.freeTrial.usedSeconds,
        remainingSeconds: status.freeTrial.remainingSeconds,
        totalSeconds: status.freeTrial.totalSeconds,
        sessionsCount: status.freeTrial.sessionsCount,
      },
      paid: {
        creditSeconds,
        creditMinutes: Math.floor(creditSeconds / 60),
      },
      ip: {
        used: status.ipUsed,
        limit: status.ipLimit,
      },
      virtual: VIRTUAL_ENABLED
        ? {
            enabled: true,
            chainId: VIRTUAL_CHAIN_ID,
            tokenAddress: VIRTUAL_TOKEN_ADDRESS,
            treasuryAddress: VIRTUAL_TREASURY_ADDRESS,
            decimals: VIRTUAL_TOKEN_DECIMALS,
            packs: virtualPacks,
          }
        : { enabled: false },
      resetAtIso: status.resetAtIso,
    });
  } catch (err) {
    console.error('[quota] failed:', err);
    return NextResponse.json(
      { error: 'Quota service unavailable' },
      { status: 503 }
    );
  }
}
