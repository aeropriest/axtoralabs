/**
 * OpenAI Realtime API cost helpers.
 *
 * Prices (gpt-4o-realtime-preview, accurate as of mid-2025):
 *   - Audio input:  $40 per 1M tokens (~$0.06/min)
 *   - Audio output: $80 per 1M tokens (~$0.24/min)
 *   - Combined:     ~$0.30 per minute of two-way audio
 *
 * We charge users a flat retail rate per minute (default $0.50/min) so
 * there's headroom for the per-token variance on the input side.
 *
 * For internal accounting we count SECONDS (so a 37-second session costs
 * ~37 / 60 * $0.50 ≈ $0.31 at retail).
 */

export const OPENAI_REALTIME_INPUT_USD_PER_MIN = 0.06;
export const OPENAI_REALTIME_OUTPUT_USD_PER_MIN = 0.24;
export const OPENAI_REALTIME_BLENDED_USD_PER_MIN =
  OPENAI_REALTIME_INPUT_USD_PER_MIN + OPENAI_REALTIME_OUTPUT_USD_PER_MIN;

// Retail rate the user pays. Tunable via env so we can A/B test or run promos.
export const RETAIL_USD_PER_MIN = Number(
  process.env.RETAIL_USD_PER_MIN ?? 0.5
);

export function secondsToCostUsd(seconds: number): number {
  return (seconds / 60) * RETAIL_USD_PER_MIN;
}

/**
 * Convert a duration in seconds to a human display string.
 *   secondsToHumanDuration(91) === "1m 31s"
 */
export function secondsToHumanDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0s';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}
