"use client";

import { useEffect } from "react";

/**
 * Silences runtime errors that originate inside browser extensions
 * (chrome-extension://, moz-extension://, safari-web-extension://).
 *
 * Why we need this: when several wallet extensions are installed they
 * race to inject themselves as `window.ethereum`. The losers throw
 * `TypeError: Cannot redefine property: ethereum`. The throw is in
 * extension code — none of our app code calls `Object.defineProperty(
 * window, 'ethereum', ...)` — but Next.js's dev-mode error overlay
 * catches all uncaught window errors and shows them as if they were
 * ours, which causes user confusion.
 *
 * This component installs a low-priority `error` and
 * `unhandledrejection` handler that:
 *   - inspects the error origin
 *   - if it's an extension URL, calls `event.preventDefault()` and
 *     `event.stopImmediatePropagation()` to stop Next.js from surfacing
 *   - otherwise lets the event pass through unchanged.
 *
 * It's a noop in production builds (Next.js doesn't render the overlay
 * there anyway) but keeps it on so prod monitoring also stays clean.
 */
export function ExtensionErrorSilencer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isExtensionUrl = (url: string | undefined | null): boolean => {
      if (!url) return false;
      return (
        url.startsWith("chrome-extension://") ||
        url.startsWith("moz-extension://") ||
        url.startsWith("safari-web-extension://") ||
        url.startsWith("edge-extension://")
      );
    };

    const isExtensionStack = (stack: string | undefined | null): boolean => {
      if (!stack) return false;
      return /(?:chrome|moz|safari-web|edge)-extension:\/\//.test(stack);
    };

    const onError = (event: ErrorEvent) => {
      const fromExtension =
        isExtensionUrl(event.filename) ||
        isExtensionStack((event.error as Error | undefined)?.stack ?? "");
      if (!fromExtension) return;
      // Specifically silence the ethereum-collision noise so it never
      // gets to Next.js's dev overlay or window.onerror reporters.
      console.debug(
        "[axtora] silenced extension error:",
        event.message,
        event.filename
      );
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const stack =
        reason && typeof reason === "object" && "stack" in reason
          ? String((reason as { stack?: string }).stack ?? "")
          : "";
      if (!isExtensionStack(stack)) return;
      console.debug("[axtora] silenced extension rejection:", reason);
      event.preventDefault();
    };

    // Capture phase, so we run before Next.js's overlay listener.
    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onRejection, true);

    return () => {
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onRejection, true);
    };
  }, []);

  return null;
}
