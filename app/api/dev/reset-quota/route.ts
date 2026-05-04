import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { readWalletAddress } from '@/lib/access-control';

/**
 * POST /api/dev/reset-quota
 *
 * Dev-only — wipes the IP daily counter for the caller AND the connected
 * wallet's free-trial usage so you can rerun the flow without restarting
 * Firestore.
 *
 * Returns 404 in production builds so the route is effectively gone there.
 *
 * Headers:
 *   X-Wallet-Address: 0x...   (optional, but recommended — clears trial too)
 *
 * What it clears:
 *   - /rateLimits/ip:{ip}/days/{today}                        (IP daily counter)
 *   - /wallets/{addr}/billing/freeTrial                        (trial usage doc)
 *   - /wallets/{addr}/billing/freeTrialUsage/events/*          (per-session ledger)
 *
 * What it does NOT touch:
 *   - /wallets/{addr}/billing/balance                          (paid credits)
 *   - /wallets/{addr}/billing/payments/...                     (payment audit log)
 *   - /paymentsGlobal/...                                       (global guard)
 */
export const runtime = 'nodejs';

function clientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (
    headers.get('x-real-ip') ??
    headers.get('cf-connecting-ip') ??
    'unknown'
  );
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    // Make the route invisible in prod. Do NOT trust env-only checks for
    // anything that touches money — this is "ergonomics for the developer",
    // not a security boundary.
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  try {
    const ip = clientIp(request.headers);
    const wallet = readWalletAddress(request.headers);

    const cleared: string[] = [];

    // 1) IP daily counter — today only.
    try {
      const ipDoc = adminDb()
        .collection('rateLimits')
        .doc(`ip:${ip}`)
        .collection('days')
        .doc(todayKey());
      await ipDoc.delete();
      cleared.push(`rateLimits/ip:${ip}/days/${todayKey()}`);
    } catch (err) {
      console.warn('[dev/reset-quota] IP doc delete failed:', err);
    }

    // 2) Wallet free-trial usage (if a wallet is supplied).
    if (wallet) {
      try {
        const trialRef = adminDb()
          .collection('wallets')
          .doc(wallet)
          .collection('billing')
          .doc('freeTrial');
        await trialRef.delete();
        cleared.push(`wallets/${wallet}/billing/freeTrial`);
      } catch (err) {
        console.warn('[dev/reset-quota] freeTrial delete failed:', err);
      }

      // Per-session ledger — drain the subcollection in batches.
      try {
        const eventsCol = adminDb()
          .collection('wallets')
          .doc(wallet)
          .collection('billing')
          .doc('freeTrialUsage')
          .collection('events');
        let total = 0;
        // small loop — cap at 500 docs * 4 batches to keep this fast
        for (let i = 0; i < 4; i++) {
          const snap = await eventsCol.limit(500).get();
          if (snap.empty) break;
          const batch = adminDb().batch();
          snap.docs.forEach((d) => batch.delete(d.ref));
          await batch.commit();
          total += snap.size;
          if (snap.size < 500) break;
        }
        if (total > 0) {
          cleared.push(
            `wallets/${wallet}/billing/freeTrialUsage/events (${total} docs)`
          );
        }
      } catch (err) {
        console.warn('[dev/reset-quota] freeTrialUsage drain failed:', err);
      }
    }

    return NextResponse.json({
      ok: true,
      ip,
      wallet,
      cleared,
      note: 'Paid credits and payment audit log were intentionally left intact.',
    });
  } catch (err) {
    console.error('[dev/reset-quota] failed:', err);
    return NextResponse.json(
      { error: 'reset_failed', message: String(err) },
      { status: 500 }
    );
  }
}
