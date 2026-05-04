"use client";

import {
  createWalletClient,
  custom,
  encodeFunctionData,
  parseAbi,
  type Address,
  type Hex,
} from "viem";
import { base } from "viem/chains";
import {
  type Eip1193Provider,
  type Eip6963ProviderDetail,
  autoSelectProvider,
  getLegacyWindowProvider,
  listProviders,
  startEip6963Discovery,
} from "@/lib/eip6963";

/**
 * Client-side helpers for paying with $VIRTUAL.
 *
 * Provider selection now goes through EIP-6963 (`@/lib/eip6963`) instead
 * of touching window.ethereum directly. This avoids the
 * `Cannot redefine property: ethereum` collisions that happen when more
 * than one wallet extension is installed, and it lets the user pick which
 * wallet to use when several are announced.
 */

const ERC20_ABI = parseAbi([
  "function transfer(address to, uint256 amount) returns (bool)",
]);

let preferredProvider: Eip6963ProviderDetail | null = null;

/** Set the user-picked provider. Called by the wallet picker dialog. */
export function setPreferredProvider(p: Eip6963ProviderDetail | null): void {
  preferredProvider = p;
}

export function getPreferredProvider(): Eip6963ProviderDetail | null {
  return preferredProvider;
}

/** True if either an EIP-6963 announcer or window.ethereum is available. */
export function hasInjectedWallet(): boolean {
  if (typeof window === "undefined") return false;
  if (listProviders().length > 0) return true;
  return Boolean(getLegacyWindowProvider());
}

function pickProvider(): Eip1193Provider {
  // Make sure we're listening before checking — first call also fires
  // `eip6963:requestProvider` which triggers wallet announcements.
  startEip6963Discovery();
  const chosen = preferredProvider ?? autoSelectProvider();
  if (!chosen) {
    throw new Error(
      "No crypto wallet detected. Install MetaMask, Coinbase Wallet, or Rabby and reload."
    );
  }
  return chosen.provider;
}

async function getProvider(): Promise<Eip1193Provider> {
  return pickProvider();
}

/** Prompt the user to connect and return the first selected address. */
export async function connectWallet(): Promise<Address> {
  const provider = await getProvider();
  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];
  if (!accounts || accounts.length === 0) {
    throw new Error("Wallet returned no accounts");
  }
  return accounts[0].toLowerCase() as Address;
}

/**
 * Ensure the wallet is on the expected chain. Tries to switch; if the
 * chain isn't added we add Base mainnet automatically.
 */
export async function ensureChain(chainId: number): Promise<void> {
  const provider = await getProvider();
  const targetHex = `0x${chainId.toString(16)}`;
  const current = (await provider.request({ method: "eth_chainId" })) as string;
  if (current.toLowerCase() === targetHex.toLowerCase()) return;

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: targetHex }],
    });
  } catch (err) {
    // 4902 = chain not added to the wallet yet.
    const code = (err as { code?: number })?.code;
    if (code === 4902 && chainId === base.id) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: targetHex,
            chainName: "Base",
            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://mainnet.base.org"],
            blockExplorerUrls: ["https://basescan.org"],
          },
        ],
      });
    } else {
      throw err;
    }
  }
}

/**
 * Send an ERC-20 transfer of `amountWei` of `tokenAddress` to `treasury`.
 * Returns the submitted tx hash.
 */
export async function sendVirtualPayment(args: {
  tokenAddress: Address;
  treasury: Address;
  amountWei: bigint;
  chainId: number;
}): Promise<{ txHash: Hex; from: Address }> {
  const provider = await getProvider();
  await ensureChain(args.chainId);

  const from = await connectWallet();

  const wallet = createWalletClient({
    account: from,
    chain: base,
    transport: custom(provider as unknown as Parameters<typeof custom>[0]),
  });

  const data = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: "transfer",
    args: [args.treasury, args.amountWei],
  });

  const txHash = (await wallet.sendTransaction({
    to: args.tokenAddress,
    data,
    account: from,
    chain: base,
  })) as Hex;

  return { txHash, from };
}
