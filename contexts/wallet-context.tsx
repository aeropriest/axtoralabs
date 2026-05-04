"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  connectWallet,
  ensureChain,
  hasInjectedWallet,
  setPreferredProvider,
  getPreferredProvider,
} from "@/lib/virtual-token-client";
import {
  startEip6963Discovery,
  subscribeProviders,
  autoSelectProvider,
  getLegacyWindowProvider,
  type Eip6963ProviderDetail,
} from "@/lib/eip6963";

/**
 * Wallet identity context.
 *
 * The connected wallet address is the user identity for the demo:
 *   - free-tier quota is per-IP (server-side)
 *   - paid credit balance is per-address (server-side)
 *   - all server requests carry `X-Wallet-Address: 0x...` in lowercase
 *
 * Provider selection goes through EIP-6963 — see `lib/eip6963.ts`. This
 * avoids the `Cannot redefine property: ethereum` errors that pop up
 * when several wallet extensions are installed.
 */

interface WalletContextValue {
  /** Lowercase 0x… address, or null if not connected. */
  address: `0x${string}` | null;
  /** True while a connect attempt is in flight. */
  isConnecting: boolean;
  /** Last connect error, if any. */
  error: string | null;
  /** True if at least one wallet provider is detected. */
  hasWallet: boolean;
  /** All EIP-6963-announced providers (plus legacy window.ethereum fallback). */
  providers: Eip6963ProviderDetail[];
  /** The currently selected provider (chosen by the picker or auto-selected). */
  selectedProvider: Eip6963ProviderDetail | null;
  /** Pick a specific provider — exposed for the wallet-picker dialog. */
  selectProvider: (p: Eip6963ProviderDetail) => void;
  /** Prompt the wallet to connect. Returns the address on success. */
  connect: () => Promise<`0x${string}` | null>;
  /** Clear the local address (does NOT actually disconnect the wallet itself). */
  disconnect: () => void;
}

const STORAGE_KEY = "axtora.walletAddress";
const PROVIDER_KEY = "axtora.walletProvider";

const WalletContext = createContext<WalletContextValue | null>(null);

const TARGET_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_VIRTUAL_CHAIN_ID ?? 8453
);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasWallet, setHasWallet] = useState(false);
  const [providers, setProviders] = useState<Eip6963ProviderDetail[]>([]);
  const [selectedProvider, setSelectedProvider] =
    useState<Eip6963ProviderDetail | null>(null);
  const listenerAttachedRef = useRef(false);

  /* -------- 1) Start EIP-6963 discovery on mount ----------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    startEip6963Discovery();

    const unsubscribe = subscribeProviders((list) => {
      // Always show legacy window.ethereum as a fallback entry if no
      // EIP-6963 wallet announces itself but the user has e.g. an old
      // MetaMask without 6963 support.
      const merged: Eip6963ProviderDetail[] = [...list];
      if (merged.length === 0) {
        const legacy = getLegacyWindowProvider();
        if (legacy) merged.push(legacy);
      }
      setProviders(merged);
      setHasWallet(merged.length > 0 || hasInjectedWallet());
    });

    return () => unsubscribe();
  }, []);

  /* -------- 2) Restore previously selected provider + address ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (providers.length === 0) return;

    // Restore preferred provider by uuid first.
    let chosen: Eip6963ProviderDetail | null = null;
    try {
      const rememberedUuid = window.localStorage.getItem(PROVIDER_KEY);
      if (rememberedUuid) {
        chosen = providers.find((p) => p.info.uuid === rememberedUuid) ?? null;
      }
    } catch {
      // ignore storage errors
    }
    if (!chosen) {
      chosen = autoSelectProvider();
    }
    if (chosen && chosen !== selectedProvider) {
      setSelectedProvider(chosen);
      setPreferredProvider(chosen);
    }

    // Verify the remembered address still maps to this provider.
    try {
      const remembered = window.localStorage.getItem(STORAGE_KEY);
      if (remembered && /^0x[a-f0-9]{40}$/.test(remembered) && chosen) {
        chosen.provider
          .request({ method: "eth_accounts" })
          .then((accounts) => {
            const list = accounts as string[];
            if (list && list[0]?.toLowerCase() === remembered) {
              console.log("[wallet] restored prior address:", remembered);
              setAddress(remembered as `0x${string}`);
            } else {
              window.localStorage.removeItem(STORAGE_KEY);
            }
          })
          .catch((err) => {
            console.warn("[wallet] eth_accounts probe failed:", err);
          });
      }
    } catch (err) {
      console.warn("[wallet] restore failed:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providers]);

  /* -------- 3) Listen for accountsChanged on the SELECTED provider ----- */
  useEffect(() => {
    if (!selectedProvider) return;
    // Detach previous handlers if we're swapping providers.
    listenerAttachedRef.current = true;
    const prov = selectedProvider.provider;

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[] | undefined;
      const next = accounts && accounts[0]
        ? (accounts[0].toLowerCase() as `0x${string}`)
        : null;
      console.log("[wallet] accountsChanged ->", next);
      setAddress(next);
      try {
        if (next) {
          window.localStorage.setItem(STORAGE_KEY, next);
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // ignore
      }
    };

    const handleChainChanged = (...args: unknown[]) => {
      console.log("[wallet] chainChanged ->", args[0]);
    };

    prov.on?.("accountsChanged", handleAccountsChanged);
    prov.on?.("chainChanged", handleChainChanged);

    return () => {
      prov.removeListener?.("accountsChanged", handleAccountsChanged);
      prov.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [selectedProvider]);

  /* -------- 4) selectProvider: explicit user choice -------------------- */
  const selectProvider = useCallback(
    (p: Eip6963ProviderDetail) => {
      console.log("[wallet] provider selected:", p.info.name);
      setSelectedProvider(p);
      setPreferredProvider(p);
      try {
        window.localStorage.setItem(PROVIDER_KEY, p.info.uuid);
      } catch {
        // ignore
      }
    },
    []
  );

  /* -------- 5) connect() ----------------------------------------------- */
  const connect = useCallback(async (): Promise<`0x${string}` | null> => {
    setError(null);
    setIsConnecting(true);
    try {
      console.log(
        "[wallet] connect requested; targetChainId =",
        TARGET_CHAIN_ID,
        "provider =",
        getPreferredProvider()?.info.name ?? "(auto)"
      );
      if (!hasInjectedWallet()) {
        throw new Error(
          "No crypto wallet detected. Install MetaMask, Coinbase Wallet, or Rabby and reload."
        );
      }
      // Try to switch to Base before requesting the address; failure is
      // non-fatal — the user can switch themselves and we'll retry on tx.
      try {
        await ensureChain(TARGET_CHAIN_ID);
      } catch (chainErr) {
        console.warn("[wallet] ensureChain failed (continuing):", chainErr);
      }
      const addr = await connectWallet();
      const lower = addr.toLowerCase() as `0x${string}`;
      console.log("[wallet] connected:", lower);
      setAddress(lower);
      try {
        window.localStorage.setItem(STORAGE_KEY, lower);
      } catch {
        // ignore
      }
      return lower;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Wallet connect failed";
      console.error("[wallet] connect failed:", err);
      setError(message);
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    console.log("[wallet] disconnect (local clear)");
    setAddress(null);
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<WalletContextValue>(
    () => ({
      address,
      isConnecting,
      error,
      hasWallet,
      providers,
      selectedProvider,
      selectProvider,
      connect,
      disconnect,
    }),
    [
      address,
      isConnecting,
      error,
      hasWallet,
      providers,
      selectedProvider,
      selectProvider,
      connect,
      disconnect,
    ]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used inside <WalletProvider>");
  }
  return ctx;
}
