"use client";

/**
 * EIP-6963 multi-wallet discovery.
 *
 * Why we need this: when more than one wallet extension is installed
 * (e.g. MetaMask + Phantom + OneKey + Coinbase Wallet), they all race
 * to inject themselves as `window.ethereum`. The losers throw
 * `TypeError: Cannot redefine property: ethereum` because the winner
 * defined it as non-configurable. Worse, the loser's provider isn't
 * reachable through `window.ethereum` so any `eth_requestAccounts` call
 * hits whichever wallet won the race — usually not the one the user
 * wants.
 *
 * EIP-6963 fixes this. Each wallet posts a {type: 'eip6963:announceProvider'}
 * event when its content script loads. We listen, collect the providers,
 * and let the user (or our auto-pick logic) choose one. We then bind
 * directly to that provider object instead of touching window.ethereum.
 *
 * Spec: https://eips.ethereum.org/EIPS/eip-6963
 */

export interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    listener: (...args: unknown[]) => void
  ) => void;
}

export interface Eip6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string; // data URL
  rdns: string; // reverse-DNS identifier, e.g. "io.metamask"
}

export interface Eip6963ProviderDetail {
  info: Eip6963ProviderInfo;
  provider: Eip1193Provider;
}

/* ------------------------------------------------------------------ */
/* Module-level cache                                                   */
/* ------------------------------------------------------------------ */

const providers = new Map<string, Eip6963ProviderDetail>();
const subscribers = new Set<(list: Eip6963ProviderDetail[]) => void>();
let started = false;

function snapshot(): Eip6963ProviderDetail[] {
  return Array.from(providers.values());
}

function notify() {
  const list = snapshot();
  subscribers.forEach((cb) => {
    try {
      cb(list);
    } catch {
      // never let a bad subscriber break the others
    }
  });
}

/**
 * Start listening for `eip6963:announceProvider` events and request a
 * fresh round of announcements. Idempotent — safe to call from multiple
 * components.
 */
export function startEip6963Discovery(): void {
  if (typeof window === "undefined") return;
  if (started) {
    // Even if started, ask wallets to re-announce so late-mounting
    // components see the current set.
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return;
  }
  started = true;

  const handler = (rawEvent: Event) => {
    const detail = (rawEvent as CustomEvent<Eip6963ProviderDetail>).detail;
    if (!detail || !detail.info || !detail.provider) return;
    const uuid = detail.info.uuid;
    if (!uuid) return;
    const existing = providers.get(uuid);
    // Replace if same uuid is reannounced (provider object can change).
    providers.set(uuid, detail);
    if (!existing || existing.provider !== detail.provider) {
      notify();
    }
  };

  window.addEventListener("eip6963:announceProvider", handler as EventListener);
  // Trigger initial round.
  window.dispatchEvent(new Event("eip6963:requestProvider"));
}

export function listProviders(): Eip6963ProviderDetail[] {
  return snapshot();
}

export function subscribeProviders(
  cb: (list: Eip6963ProviderDetail[]) => void
): () => void {
  subscribers.add(cb);
  cb(snapshot()); // emit current state immediately
  return () => {
    subscribers.delete(cb);
  };
}

/**
 * Best-effort fallback: when no EIP-6963 announcer has fired but the
 * legacy `window.ethereum` is present, surface it as a single fake
 * "Browser wallet" entry so the rest of the app doesn't have to special-case.
 */
export function getLegacyWindowProvider(): Eip6963ProviderDetail | null {
  if (typeof window === "undefined") return null;
  const eth = (window as unknown as { ethereum?: Eip1193Provider }).ethereum;
  if (!eth || typeof eth.request !== "function") return null;
  return {
    info: {
      uuid: "legacy:window.ethereum",
      name: "Browser wallet",
      icon:
        // 1x1 transparent png, lets the picker render without a crash
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII=",
      rdns: "legacy.window.ethereum",
    },
    provider: eth,
  };
}

/**
 * Pick the most reasonable default provider when the caller hasn't
 * asked for a specific one. Order:
 *   1. Single announced provider (obvious choice)
 *   2. Provider with `rdns === "io.metamask"` (most common)
 *   3. First announced provider
 *   4. Legacy window.ethereum
 */
export function autoSelectProvider(): Eip6963ProviderDetail | null {
  const list = snapshot();
  if (list.length === 1) return list[0];
  if (list.length > 1) {
    const mm = list.find((p) => p.info.rdns === "io.metamask");
    if (mm) return mm;
    return list[0];
  }
  return getLegacyWindowProvider();
}
