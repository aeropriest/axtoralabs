"use client";

import { useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { VirtualConfig, VirtualPackInfo } from "@/hooks/use-quota";
import { sendVirtualPayment } from "@/lib/virtual-token-client";
import { useWallet } from "@/contexts/wallet-context";
import type { Address } from "viem";

/**
 * Pack-picker dialog. Each pack is paid for with $VIRTUAL on Base via the
 * user's connected wallet (MetaMask / Coinbase Wallet / Rabby). After the
 * tx is mined the server verifies on-chain and credits the user's balance.
 */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional $VIRTUAL config from /api/quota. The dialog only renders when enabled. */
  virtual?: VirtualConfig;
  /** Called when no wallet is connected and the user clicks Buy. */
  onRequiresWallet?: () => void;
  /** Called after a successful credit so the host can refresh quota. */
  onCreditsApplied?: () => void;
}

export function BuyCreditsDialog({
  open,
  onOpenChange,
  virtual,
  onRequiresWallet,
  onCreditsApplied,
}: Props) {
  const { address: walletAddress } = useWallet();
  const [busy, setBusy] = useState<string | null>(null);

  const virtualEnabled = !!virtual?.enabled;
  const packs: VirtualPackInfo[] = virtual?.packs ?? [];

  const handleBuyWithVirtual = async (pack: VirtualPackInfo) => {
    if (!walletAddress) {
      onRequiresWallet?.();
      onOpenChange(false);
      return;
    }
    if (!virtual?.enabled || !virtual.tokenAddress || !virtual.treasuryAddress) {
      toast.error("$VIRTUAL payments are not configured");
      return;
    }

    setBusy(pack.id);
    try {
      // 1) Ask the wallet to send the ERC-20 transfer.
      console.log("[buy-credits] sending", pack.amount, "VIRTUAL ->", virtual.treasuryAddress);
      toast.message("Confirm the transfer in your wallet…");
      const { txHash } = await sendVirtualPayment({
        tokenAddress: virtual.tokenAddress as Address,
        treasury: virtual.treasuryAddress as Address,
        amountWei: BigInt(pack.amountWei),
        chainId: virtual.chainId ?? 8453,
      });
      console.log("[buy-credits] tx submitted:", txHash);
      toast.message(
        `Transaction submitted (${txHash.slice(0, 10)}…). Waiting for confirmation…`
      );

      // 2) Send the hash to the server for verification + crediting.
      const res = await fetch("/api/topup/virtual/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Wallet-Address": walletAddress,
        },
        body: JSON.stringify({ packId: pack.id, txHash }),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.message ?? body?.error ?? `HTTP ${res.status}`);
      }
      if (body.applied) {
        toast.success(`+${body.minutesCredited} minutes credited`);
      } else if (body.reason === "already_credited") {
        toast.info("This transaction was already credited");
      } else {
        toast.warning(body.message ?? "Payment processed");
      }
      onCreditsApplied?.();
      onOpenChange(false);
    } catch (err) {
      console.error("[buy-credits/virtual] failed:", err);
      const message = err instanceof Error ? err.message : "Payment failed";
      if (/user rejected|denied/i.test(message)) {
        toast.error("Wallet transaction was rejected");
      } else {
        toast.error(message);
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Buy voice credits</DialogTitle>
          <DialogDescription>
            Pay with $VIRTUAL on Base. Credits don&rsquo;t expire and apply
            to every persona. The transfer goes directly from your wallet
            to the Axtora treasury — no intermediary, no card required.
          </DialogDescription>
        </DialogHeader>

        {!virtualEnabled ? (
          <p className="rounded-md bg-amber-500/10 p-3 text-sm text-amber-300">
            Wallet payments are not enabled on this deployment. Set{" "}
            <code>NEXT_PUBLIC_VIRTUAL_ENABLED=true</code> and configure the
            treasury + packs in <code>.env</code>.
          </p>
        ) : packs.length === 0 ? (
          <p className="rounded-md bg-amber-500/10 p-3 text-sm text-amber-300">
            No credit packs configured. Set{" "}
            <code>VIRTUAL_PACK_*</code> entries in <code>.env</code>.
          </p>
        ) : (
          <div className="my-2 space-y-3">
            {packs.map((pack) => (
              <button
                key={pack.id}
                onClick={() => handleBuyWithVirtual(pack)}
                disabled={busy !== null}
                className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#1f1f26]/40 p-4 text-left transition-colors hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div>
                  <p className="text-base font-semibold text-white">
                    {pack.label}
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">
                    {pack.minutes} min · paid in $VIRTUAL on Base
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-[#FF6B00]">
                    {pack.amount} VIRTUAL
                  </span>
                  {busy === pack.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-[#FF6B00]" />
                  ) : (
                    <Wallet className="h-5 w-5 text-white/40 group-hover:text-[#FF6B00]" />
                  )}
                </div>
              </button>
            ))}
            <p className="px-1 text-[11px] leading-relaxed text-white/45">
              Sends an on-chain transfer from your connected wallet to the
              Axtora treasury. Credits are applied after 1 confirmation
              (~2s on Base).
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={busy !== null}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
