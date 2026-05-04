"use client";

import { useEffect } from "react";
import { Loader2, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Eip6963ProviderDetail } from "@/lib/eip6963";

/**
 * EIP-6963 wallet picker.
 *
 * The host opens this when more than one wallet is announced. We auto-pick
 * and close immediately when only one is available, so the dialog only
 * actually appears for users with multiple wallet extensions installed.
 */
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providers: Eip6963ProviderDetail[];
  isConnecting: boolean;
  /** User picked this provider — host should call selectProvider then connect. */
  onPick: (p: Eip6963ProviderDetail) => void;
}

export function WalletPickerDialog({
  open,
  onOpenChange,
  providers,
  isConnecting,
  onPick,
}: Props) {
  // Auto-pick + close when only a single provider is announced. This
  // means users with just MetaMask never see the picker at all.
  useEffect(() => {
    if (!open) return;
    if (providers.length === 1) {
      onPick(providers[0]);
      onOpenChange(false);
    }
  }, [open, providers, onPick, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Pick a wallet</DialogTitle>
          <DialogDescription>
            We detected more than one wallet extension. Pick the one
            you&rsquo;d like to use to talk to Axtora.
          </DialogDescription>
        </DialogHeader>

        {providers.length === 0 ? (
          <p className="rounded-md bg-amber-500/10 p-3 text-sm text-amber-300">
            No wallet detected. Install MetaMask, Coinbase Wallet, or Rabby
            and reload the page.
          </p>
        ) : (
          <div className="my-2 space-y-2">
            {providers.map((p) => (
              <button
                key={p.info.uuid}
                onClick={() => onPick(p)}
                disabled={isConnecting}
                className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#1f1f26]/40 p-3 text-left transition-colors hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0e0f13] ring-1 ring-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.info.icon}
                    alt={p.info.name}
                    className="h-7 w-7 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-white">
                    {p.info.name}
                  </span>
                  <span className="block truncate text-[11px] text-white/50">
                    {p.info.rdns}
                  </span>
                </span>
                {isConnecting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-[#FF6B00]" />
                ) : (
                  <Wallet className="h-4 w-4 text-white/40 group-hover:text-[#FF6B00]" />
                )}
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
