"use client";

import { Sparkles, Wallet, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuotaSnapshot } from "@/hooks/use-quota";
import { secondsToHumanDuration } from "@/lib/openai-pricing";

/**
 * Status banner above the demo controls.
 *
 *   - Wallet not connected            -> "Connect a wallet to start your free trial."
 *   - Wallet, free-trial seconds left -> "Xs of free trial remaining (no payment yet)."
 *   - Wallet, no free, paid > 0       -> "X minutes of credit remaining."
 *   - Wallet, no free, no paid        -> "Free trial used. Buy credits to keep talking."
 */

interface Props {
  quota: QuotaSnapshot | null;
  loading: boolean;
  walletConnected: boolean;
  walletAddress: string | null;
  onConnectWallet: () => void;
  onBuyCredits: () => void;
}

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function QuotaBanner({
  quota,
  loading,
  walletConnected,
  walletAddress,
  onConnectWallet,
  onBuyCredits,
}: Props) {
  if (loading || !quota) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1f1f26]/40 px-4 py-3 text-sm text-white/55">
        Checking quota…
      </div>
    );
  }

  // Trial is configured even if we don't have a wallet yet (so we can
  // tell the user how generous it is up front).
  const trialTotal = quota.freeTrial.totalSeconds;
  const trialLeft = quota.freeTrial.remainingSeconds;
  const creditSeconds = quota.paid.creditSeconds;
  const creditMinutes = quota.paid.creditMinutes;

  /* -------- Wallet not connected ------------------------------------ */
  if (!walletConnected) {
    return (
      <Banner
        tone="info"
        icon={<Wallet className="h-4 w-4" />}
        title="Connect a wallet to start"
        subtitle={`You'll get ${secondsToHumanDuration(
          trialTotal
        )} of free trial — no payment, no card.`}
        action={
          <Button
            size="sm"
            onClick={onConnectWallet}
            className="bg-[#FF6B00] text-white hover:bg-[#FF8B3D]"
          >
            <Wallet className="mr-1.5 h-3.5 w-3.5" />
            Connect wallet
          </Button>
        }
      />
    );
  }

  const walletLine = walletAddress
    ? `Wallet ${shortAddr(walletAddress)}`
    : "Wallet connected";

  /* -------- Wallet connected, free trial remains -------------------- */
  if (trialLeft > 0) {
    return (
      <Banner
        tone="info"
        icon={<Sparkles className="h-4 w-4" />}
        title={`${secondsToHumanDuration(trialLeft)} of free trial remaining`}
        subtitle={
          creditSeconds > 0
            ? `${walletLine} · ${secondsToHumanDuration(creditSeconds)} of credit on file.`
            : `${walletLine} · no payment until your free trial is used up.`
        }
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={onBuyCredits}
            className="border-[#FF6B00]/40 text-[#FF6B00] hover:bg-[#FF6B00]/10"
          >
            <CreditCard className="mr-1.5 h-3.5 w-3.5" />
            {creditSeconds > 0 ? "Top up" : "Buy credits"}
          </Button>
        }
      />
    );
  }

  /* -------- Wallet connected, paid balance remains ------------------ */
  if (creditSeconds > 0) {
    return (
      <Banner
        tone="info"
        icon={<CreditCard className="h-4 w-4" />}
        title={`${secondsToHumanDuration(creditSeconds)} of credit remaining`}
        subtitle={`${walletLine} · ≈ ${creditMinutes} minute${creditMinutes === 1 ? "" : "s"} at the current rate.`}
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={onBuyCredits}
            className="border-[#FF6B00]/40 text-[#FF6B00] hover:bg-[#FF6B00]/10"
          >
            <CreditCard className="mr-1.5 h-3.5 w-3.5" />
            Top up
          </Button>
        }
      />
    );
  }

  /* -------- Wallet connected, free trial used + no credits ---------- */
  return (
    <Banner
      tone="warn"
      icon={<CreditCard className="h-4 w-4" />}
      title="Free trial used up"
      subtitle={`${walletLine} · top up with $VIRTUAL credits to keep talking.`}
      action={
        <Button
          size="sm"
          onClick={onBuyCredits}
          className="bg-[#FF6B00] text-white hover:bg-[#FF8B3D]"
        >
          <CreditCard className="mr-1.5 h-3.5 w-3.5" />
          Buy credits
        </Button>
      }
    />
  );
}

function Banner({
  tone,
  icon,
  title,
  subtitle,
  action,
}: {
  tone: "info" | "warn";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: React.ReactNode;
}) {
  const ring =
    tone === "warn"
      ? "border-amber-500/40 bg-amber-500/5"
      : "border-[#FF6B00]/25 bg-[#FF6B00]/5";
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border ${ring} px-4 py-3 sm:flex-row sm:items-center sm:justify-between`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6B00]/15 text-[#FF6B00]">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-white/65">{subtitle}</p>
        </div>
      </div>
      <div className="self-start sm:self-auto">{action}</div>
    </div>
  );
}
