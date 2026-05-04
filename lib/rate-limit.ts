import { FieldValue } from 'firebase-admin/firestore';
import { adminAuth, adminDb } from './firebase-admin';

/**
 * Per-day session quota for the OpenAI Realtime API.
 *
 * Why: Realtime sessions burn audio tokens quickly (~$0.06/min in,
 * ~$0.24/min out). We cap how many sessions a single visitor can
 * spin up per UTC day to bound spend.
 *
 * Buckets:
 *   - Authenticated, non-anonymous Firebase user => keyed by uid,
 *     limit RATE_LIMIT_AUTH_DAILY (default 20).
 *   - Anonymous (no token / Firebase-anonymous user) => keyed by
 *     hashed client IP, limit RATE_LIMIT_ANON_DAILY (default 5).
 *
 * Counters live in Firestore at /rateLimits/{bucket}/days/{YYYY-MM-DD}.
 */

// Free-tier daily session counts. Defaults match the product spec:
// 1 free anonymous session, 3 free authenticated sessions per UTC day.
// After these are exhausted the user must purchase credit minutes
// (see lib/credits.ts).
const AUTH_DAILY = Number(process.env.RATE_LIMIT_AUTH_DAILY ?? 3);
const ANON_DAILY = Number(process.env.RATE_LIMIT_ANON_DAILY ?? 1);

export interface QuotaResult {
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
  bucketType: 'auth' | 'anon';
  bucketId: string;
  resetAtIso: string;
}

function todayKey(): string {
  // YYYY-MM-DD in UTC
  return new Date().toISOString().slice(0, 10);
}

function tomorrowUtcIso(): string {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return d.toISOString();
}

/**
 * Resolve the authenticated uid from an "Authorization: Bearer <idToken>"
 * header, if present and valid. Returns null for anonymous Firebase users
 * (firebase.auth().currentUser?.isAnonymous) and for missing/invalid tokens.
 */
async function resolveAuthUid(authHeader: string | null): Promise<string | null> {
  if (!authHeader) return null;
  const m = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  try {
    const decoded = await adminAuth().verifyIdToken(m[1]);
    // Treat Firebase-anonymous users as anon for quota purposes.
    if (decoded.firebase?.sign_in_provider === 'anonymous') return null;
    return decoded.uid;
  } catch (err) {
    console.warn('[rate-limit] ID token verification failed:', err);
    return null;
  }
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

/**
 * Check the quota and atomically increment the counter if allowed.
 * Call this once per session-creation attempt.
 */
export async function checkAndConsumeSessionQuota(
  request: Request
): Promise<QuotaResult> {
  const authHeader = request.headers.get('authorization');
  const uid = await resolveAuthUid(authHeader);

  const bucketType: 'auth' | 'anon' = uid ? 'auth' : 'anon';
  const bucketId = uid ?? `ip:${clientIp(request.headers)}`;
  const limit = uid ? AUTH_DAILY : ANON_DAILY;

  const docRef = adminDb()
    .collection('rateLimits')
    .doc(bucketType === 'auth' ? `uid:${bucketId}` : bucketId)
    .collection('days')
    .doc(todayKey());

  // Atomic read-modify-write via transaction.
  const result = await adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    const used = (snap.exists ? (snap.data()?.count as number) : 0) ?? 0;
    if (used >= limit) {
      return { allowed: false, used };
    }
    tx.set(
      docRef,
      {
        count: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
        bucketType,
      },
      { merge: true }
    );
    return { allowed: true, used: used + 1 };
  });

  return {
    allowed: result.allowed,
    used: result.used,
    limit,
    remaining: Math.max(0, limit - result.used),
    bucketType,
    bucketId,
    resetAtIso: tomorrowUtcIso(),
  };
}
