"use client";

import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@/contexts/wallet-context";

/**
 * Read the caller's voice-demo quota from /api/quota.
 *
 * Free trial is keyed to the connected wallet address (in seconds, not
 * sessions); paid balance is also per-wallet. Re-fetches when the wallet
 * connects/disconnects.
 */

export interface VirtualPackInfo {
  id: string;
  /** Whole-token amount for display (e.g. 10 for "10 VIRTUAL"). */
  amount: number;
  /** Amount in wei units (decimals=18) as a decimal string for BigInt-safety. */
  amountWei: string;
  /** Credit minutes granted on successful payment. */
  minutes: number;
  /** Display label (e.g. "Starter — 10 minutes"). */
  label: string;
}

export interface VirtualConfig {
  enabled: boolean;
  chainId?: number;
  tokenAddress?: `0x${string}`;
  treasuryAddress?: `0x${string}`;
  decimals?: number;
  packs?: VirtualPackInfo[];
}

export interface QuotaSnapshot {
  walletAddress: string | null;
  walletRequired: boolean;
  freeTrial: {
    usedSeconds: number;
    remainingSeconds: number;
    totalSeconds: number;
    sessionsCount: number;
  };
  paid: { creditSeconds: number; creditMinutes: number };
  ip: { used: number; limit: number };
  virtual: VirtualConfig;
  resetAtIso: string;
}

export function useQuota() {
  const { address } = useWallet();
  const [data, setData] = useState<QuotaSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = {};
      if (address) headers["X-Wallet-Address"] = address;
      const res = await fetch("/api/quota", { headers, cache: "no-store" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`/api/quota ${res.status}: ${text || res.statusText}`);
      }
      const body = (await res.json()) as QuotaSnapshot;
      setData(body);
    } catch (err) {
      console.warn("[use-quota] failed:", err);
      setError(err instanceof Error ? err.message : "Quota fetch failed");
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
