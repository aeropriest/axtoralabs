"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Wallet, LogOut } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import useWebRTCAudioSession from "@/hooks/use-webrtc";
import { tools } from "@/lib/tools";
import { BroadcastButton } from "@/components/broadcast-button";
import { StatusDisplay } from "@/components/status";
import { TokenUsageDisplay } from "@/components/token-usage";
import { useToolsFunctions } from "@/hooks/use-tools";
import { PersonaRolodex } from "@/components/persona-rolodex";
import { personas } from "@/lib/personas";
import { useQuota } from "@/hooks/use-quota";
import { QuotaBanner } from "@/components/quota-banner";
import { BuyCreditsDialog } from "@/components/buy-credits-dialog";
import { useWallet } from "@/contexts/wallet-context";
import { WalletPickerDialog } from "@/components/wallet-picker-dialog";
import { toast } from "sonner";

const DemoPage: React.FC = () => {
  const {
    address: walletAddress,
    connect,
    disconnect,
    isConnecting,
    providers,
    selectProvider,
  } = useWallet();
  const walletConnected = Boolean(walletAddress);
  const [showWalletPicker, setShowWalletPicker] = useState(false);

  const [selectedPersona, setSelectedPersona] = useState(personas[0].id);
  const activePersona = personas.find((p) => p.id === selectedPersona);
  const voice = activePersona?.voice ?? "ash";

  const handlePersonaChange = (personaId: string) => {
    if (personaId === selectedPersona) return;
    setSelectedPersona(personaId);
  };

  const [sessionError, setSessionError] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    startSession,
    stopSession,
    msgs,
  } = useWebRTCAudioSession(
    voice,
    tools,
    activePersona?.prompt,
    selectedPersona,
    walletAddress
  );

  const toolsFunctions = useToolsFunctions();

  useEffect(() => {
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: "getCurrentTime",
        backgroundFunction: "changeBackgroundColor",
        partyFunction: "partyMode",
        launchWebsite: "launchWebsite",
        copyToClipboard: "copyToClipboard",
        scrapeWebsite: "scrapeWebsite",
      };
      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions]);

  // Auto-stop the session after a duration cap so an idle/forgotten mic
  // can't burn OpenAI credits indefinitely.
  const sessionMaxDurationSec = walletConnected
    ? Number(process.env.NEXT_PUBLIC_SESSION_MAX_DURATION_AUTH ?? 600)
    : Number(process.env.NEXT_PUBLIC_SESSION_MAX_DURATION_ANON ?? 180);

  useEffect(() => {
    if (!isSessionActive) return;
    const timer = setTimeout(() => {
      console.log(`[demo] auto-stopping session after ${sessionMaxDurationSec}s`);
      stopSession();
    }, sessionMaxDurationSec * 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSessionActive, sessionMaxDurationSec]);

  // Restart the realtime session when the active persona (and therefore
  // voice) changes mid-call.
  const prevVoiceRef = useRef(voice);
  useEffect(() => {
    if (prevVoiceRef.current === voice) return;
    prevVoiceRef.current = voice;
    if (!isSessionActive) return;
    console.log("[demo] persona/voice changed mid-call -> restarting session");
    stopSession();
    const t = setTimeout(() => startSession(), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice]);

  // Surface session errors as the inline message + dialog routing.
  useEffect(() => {
    if (status && status.startsWith("Error:")) {
      const errorMessage = status.substring(7).trim();
      setSessionError(errorMessage);
      const lower = errorMessage.toLowerCase();
      if (
        lower.includes("free prompts for today") ||
        lower.includes("top up with credit") ||
        lower.includes("connect a wallet")
      ) {
        if (!walletConnected) {
          // Prompt to connect.
          handleConnect();
        } else {
          setShowBuyDialog(true);
        }
      } else if (
        lower.includes("location") ||
        lower.includes("country") ||
        lower.includes("region") ||
        lower.includes("territory") ||
        lower.includes("vpn")
      ) {
        setShowErrorDialog(true);
      }
    } else {
      setSessionError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, walletConnected]);

  // Quota integration
  const {
    data: quota,
    loading: quotaLoading,
    refresh: refreshQuota,
  } = useQuota();

  const [showBuyDialog, setShowBuyDialog] = useState(false);

  // Track session lifecycle so we can report actual elapsed seconds back
  // to /api/usage and deduct credits on the paid tier.
  const sessionIdRef = useRef<string | null>(null);
  const sessionStartedAtRef = useRef<number | null>(null);
  const sessionTierRef = useRef<"free" | "paid" | null>(null);
  const wasActiveRef = useRef(false);

  const reportUsage = useCallback(
    async (sessionId: string, durationSec: number, tier: string) => {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (walletAddress) {
          headers["X-Wallet-Address"] = walletAddress;
        }
        console.log("[demo] reporting usage:", { sessionId, durationSec, tier });
        await fetch("/api/usage", {
          method: "POST",
          headers,
          body: JSON.stringify({ sessionId, durationSec, tier }),
        });
      } catch (err) {
        console.warn("[demo] usage report failed:", err);
      }
    },
    [walletAddress]
  );

  // Report usage on session-end, then refresh quota.
  useEffect(() => {
    if (isSessionActive && !wasActiveRef.current) {
      sessionIdRef.current = uuidv4();
      sessionStartedAtRef.current = Date.now();
      if (quota) {
        if (quota.freeTrial.remainingSeconds > 0) {
          sessionTierRef.current = "free";
        } else if (quota.paid.creditSeconds > 0) {
          sessionTierRef.current = "paid";
        }
      }
      console.log(
        "[demo] session started; tier =",
        sessionTierRef.current,
        "id =",
        sessionIdRef.current
      );
      wasActiveRef.current = true;
    } else if (!isSessionActive && wasActiveRef.current) {
      const sid = sessionIdRef.current;
      const startedAt = sessionStartedAtRef.current;
      const tier = sessionTierRef.current ?? "free";
      wasActiveRef.current = false;
      sessionIdRef.current = null;
      sessionStartedAtRef.current = null;
      sessionTierRef.current = null;
      if (sid && startedAt) {
        const durationSec = Math.max(
          0,
          Math.round((Date.now() - startedAt) / 1000)
        );
        console.log("[demo] session ended; duration =", durationSec, "s");
        reportUsage(sid, durationSec, tier).finally(() => {
          refreshQuota();
        });
      } else {
        refreshQuota();
      }
    }
  }, [isSessionActive, quota, reportUsage, refreshQuota]);

  const handleConnect = useCallback(async () => {
    // If more than one EIP-6963 wallet is announced, let the user pick
    // before we call eth_requestAccounts. The picker auto-closes when
    // there's only one provider, so single-wallet users never see it.
    if (providers.length > 1) {
      setShowWalletPicker(true);
      return;
    }
    const addr = await connect();
    if (addr) {
      toast.success(`Wallet connected: ${addr.slice(0, 6)}…${addr.slice(-4)}`);
      refreshQuota();
    }
  }, [connect, providers.length, refreshQuota]);

  const handlePickProvider = useCallback(
    async (p: import("@/lib/eip6963").Eip6963ProviderDetail) => {
      selectProvider(p);
      setShowWalletPicker(false);
      const addr = await connect();
      if (addr) {
        toast.success(`Connected via ${p.info.name}: ${addr.slice(0, 6)}…${addr.slice(-4)}`);
        refreshQuota();
      }
    },
    [connect, refreshQuota, selectProvider]
  );

  // Pre-flight gate for the broadcast button.
  const guardedStartStop = useCallback(() => {
    if (isSessionActive) {
      handleStartStopClick();
      return;
    }
    if (!walletConnected) {
      console.log("[demo] start blocked: wallet not connected");
      handleConnect();
      return;
    }
    if (!quota) {
      handleStartStopClick();
      return;
    }
    const freeLeft = quota.freeTrial.remainingSeconds > 0;
    const paidLeft = quota.paid.creditSeconds > 0;
    if (freeLeft || paidLeft) {
      handleStartStopClick();
      return;
    }
    setShowBuyDialog(true);
  }, [
    isSessionActive,
    walletConnected,
    quota,
    handleStartStopClick,
    handleConnect,
  ]);

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,107,0,0.10), transparent 28%)," +
          "radial-gradient(circle at bottom right, rgba(255,107,0,0.06), transparent 24%)," +
          "linear-gradient(180deg, #16191d 0%, #1C1C22 35%, #17191f 100%)",
      }}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#FF6B00]/15 bg-[#1C1C22]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#FF6B00] transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to landing</span>
            </Link>
          </div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111318] ring-1 ring-[#FF6B00]/25">
              <Image
                src="/logo-old.png"
                alt="Axtora Labs"
                width={28}
                height={28}
                className="h-6 w-auto"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight text-white">
                Axtora Labs
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#FF6B00]">
                Voice Demo
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {walletConnected && walletAddress ? (
              <button
                type="button"
                onClick={() => {
                  disconnect();
                  toast.message("Wallet disconnected (locally)");
                }}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-3 py-1.5 text-xs font-medium text-[#FFB27A] transition-colors hover:bg-[#FF6B00]/20"
                title={walletAddress}
              >
                <Wallet className="h-3.5 w-3.5" />
                {walletAddress.slice(0, 6)}…{walletAddress.slice(-4)}
                <LogOut className="ml-1 h-3 w-3 opacity-70" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConnect}
                disabled={isConnecting}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#FF6B00] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#FF8B3D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Wallet className="h-3.5 w-3.5" />
                {isConnecting ? "Connecting…" : "Connect wallet"}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-grow flex-col px-4 py-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <QuotaBanner
            quota={quota}
            loading={quotaLoading}
            walletConnected={walletConnected}
            walletAddress={walletAddress}
            onConnectWallet={handleConnect}
            onBuyCredits={() => setShowBuyDialog(true)}
          />
          {process.env.NODE_ENV === "development" && (
            <DevResetQuotaLink
              walletAddress={walletAddress}
              onReset={() => refreshQuota()}
            />
          )}
        </div>

        <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFB27A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              Voice-to-voice · Context-aware
            </span>
            <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Pick a robot.{" "}
              <span className="text-[#FF6B00]">Press talk.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              Each Axtora robot is a context-aware persona — its voice, tone,
              and knowledge boundaries are pinned by a patented orchestration
              layer. The voice is matched to the persona automatically.
            </p>

            {activePersona && (
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-[#FF6B00]/30">
                  <Image
                    src={activePersona.image || "/personas/default.png"}
                    alt={activePersona.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {activePersona.name}
                  </p>
                  <p className="truncate text-xs text-white/55">
                    Voice:{" "}
                    <span className="capitalize text-[#FFB27A]">
                      {activePersona.voice}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="order-1 flex flex-col items-center gap-3 lg:order-2">
            {walletConnected ? (
              <>
                <BroadcastButton
                  isSessionActive={isSessionActive}
                  onClick={guardedStartStop}
                  sessionStatus={status}
                  sessionError={sessionError}
                  showErrorDialog={showErrorDialog}
                  onErrorDialogClose={() => setShowErrorDialog(false)}
                />
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                  {isSessionActive ? "Listening — speak now" : "Tap to start"}
                </p>
              </>
            ) : (
              <>
                {/* Wallet-required CTA. Big, obvious, brand-coloured.
                    Replaces the Talk button until the wallet is connected
                    so users aren't surprised by a wallet popup. */}
                <button
                  type="button"
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="group relative flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#C2410C] text-white shadow-[0_18px_60px_rgba(255,107,0,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(255,107,0,0.42)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="text-2xl">🔗</span>
                  <span className="text-base font-semibold leading-tight">
                    {isConnecting ? "Connecting…" : "Connect Wallet"}
                  </span>
                  <span className="text-xs opacity-85">to begin</span>
                </button>
                <p className="max-w-[18rem] text-center text-xs leading-relaxed text-white/55">
                  No card needed. You&rsquo;ll get a free trial
                  ({quota?.freeTrial.totalSeconds ?? 120}s of voice) the
                  moment your wallet is connected.
                </p>
              </>
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Choose a robot persona
            </h2>
            <span className="text-[11px] text-white/40">
              Switching mid-call will restart the session
            </span>
          </div>
          <PersonaRolodex
            selectedPersona={selectedPersona}
            onPersonaChange={handlePersonaChange}
          />
        </section>
      </div>

      <div className="w-full space-y-2 border-t border-[#FF6B00]/10 bg-[#1C1C22]/85 py-4 backdrop-blur supports-[backdrop-filter]:bg-[#1C1C22]/60">
        {status && <StatusDisplay status={status} />}
        <TokenUsageDisplay messages={msgs} />
      </div>

      <BuyCreditsDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        virtual={quota?.virtual}
        onRequiresWallet={handleConnect}
        onCreditsApplied={() => refreshQuota()}
      />

      <WalletPickerDialog
        open={showWalletPicker}
        onOpenChange={setShowWalletPicker}
        providers={providers}
        isConnecting={isConnecting}
        onPick={handlePickProvider}
      />
    </div>
  );
};

/**
 * Dev-only "Reset quota" link. Renders below the QuotaBanner in
 * development. Calls /api/dev/reset-quota which is a 404 in production.
 */
function DevResetQuotaLink({
  walletAddress,
  onReset,
}: {
  walletAddress: string | null;
  onReset: () => void;
}) {
  const [busy, setBusy] = React.useState(false);
  const handleReset = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const headers: Record<string, string> = {};
      if (walletAddress) headers["X-Wallet-Address"] = walletAddress;
      const res = await fetch("/api/dev/reset-quota", {
        method: "POST",
        headers,
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(body?.message ?? `Reset failed (${res.status})`);
      } else {
        toast.success("Quota reset · IP counter and free trial cleared");
        onReset();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mt-2 flex justify-end">
      <button
        type="button"
        onClick={handleReset}
        disabled={busy}
        className="text-[10px] uppercase tracking-[0.18em] text-white/35 underline-offset-2 transition-colors hover:text-[#FF6B00] hover:underline disabled:opacity-50"
        title="Wipes the per-IP daily counter and your wallet's free-trial usage so you can rerun the flow. Dev-only — this route returns 404 in production."
      >
        {busy ? "Resetting…" : "Reset quota (dev)"}
      </button>
    </div>
  );
}

export default DemoPage;
