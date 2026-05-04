import { NextResponse } from 'next/server';
import {
  getVirtualPack,
  verifyVirtualTransfer,
  VIRTUAL_ENABLED,
} from '@/lib/virtual-token';
import { creditFromVirtualTx } from '@/lib/credits';
import { readWalletAddress } from '@/lib/access-control';
import type { Hex } from 'viem';

/**
 * POST /api/topup/virtual/verify
 *
 * Body: { packId: string; txHash: `0x${string}` }
 * Headers:
 *   X-Wallet-Address: 0x...   // required, the wallet to credit
 *
 * Verifies that `txHash` on Base is an ERC-20 Transfer of $VIRTUAL into
 * the configured treasury for at least the pack's price, then credits
 * the connected wallet's credit-second balance.
 *
 * Globally idempotent on `txHash` — a single tx can fund only one wallet.
 */
export async function POST(request: Request) {
  try {
    if (!VIRTUAL_ENABLED) {
      return NextResponse.json(
        { error: '$VIRTUAL payments are not enabled on this deployment' },
        { status: 503 }
      );
    }

    const walletAddress = readWalletAddress(request.headers);
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'X-Wallet-Address header is required' },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    const packId = String(body?.packId ?? '').toLowerCase();
    const txHashRaw = String(body?.txHash ?? '');

    if (!/^0x[a-fA-F0-9]{64}$/.test(txHashRaw)) {
      return NextResponse.json(
        { error: 'Invalid transaction hash' },
        { status: 400 }
      );
    }
    const txHash = txHashRaw.toLowerCase() as Hex;

    const virtualPack = getVirtualPack(packId);
    if (!virtualPack) {
      return NextResponse.json(
        {
          error: `Unknown or unconfigured pack: ${packId}`,
          hint: 'Make sure VIRTUAL_PACK_<ID>="<tokens>:<minutes>:<label>" is set in env.',
        },
        { status: 400 }
      );
    }

    // ---- on-chain verification ------------------------------------------
    let verified;
    try {
      verified = await verifyVirtualTransfer(txHash, virtualPack.amountWei);
    } catch (err) {
      console.warn('[topup/virtual] verification failed:', err);
      return NextResponse.json(
        {
          error: 'verification_failed',
          message:
            err instanceof Error
              ? err.message
              : 'On-chain verification failed',
        },
        { status: 400 }
      );
    }

    // ---- credit ----------------------------------------------------------
    const result = await creditFromVirtualTx({
      address: walletAddress,
      minutes: virtualPack.minutes,
      txHash,
      packId,
      fromAddress: verified.fromAddress,
      valueWei: verified.valueWei.toString(),
    });

    if (!result.applied) {
      const status = result.reason === 'tx_claimed_by_other_address' ? 409 : 200;
      return NextResponse.json(
        {
          ok: result.reason === 'already_credited',
          reason: result.reason,
          message:
            result.reason === 'already_credited'
              ? 'This transaction was already credited to your wallet.'
              : 'This transaction was already claimed by another wallet.',
          balance: result.balance,
        },
        { status }
      );
    }

    return NextResponse.json({
      ok: true,
      applied: true,
      packId,
      minutesCredited: virtualPack.minutes,
      txHash,
      blockNumber: verified.blockNumber.toString(),
      balance: result.balance,
    });
  } catch (err) {
    console.error('[topup/virtual] failed:', err);
    const message =
      err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
