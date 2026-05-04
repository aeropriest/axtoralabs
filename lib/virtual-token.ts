import {
  createPublicClient,
  http,
  decodeEventLog,
  parseAbi,
  parseUnits,
  type Address,
  type Hex,
} from 'viem';
import { base } from 'viem/chains';

/**
 * $VIRTUAL token (Virtuals Protocol) payments on Base.
 *
 * This is the sole top-up rail. Each pack credits the user's per-user
 * `creditSeconds` balance via lib/credits.ts.
 *
 * Pack pricing/metadata is configured via env. Each pack is encoded as:
 *
 *   VIRTUAL_PACK_<ID>="<wholeTokens>:<minutes>:<label>"
 *
 * e.g. VIRTUAL_PACK_STARTER="10:10:Starter - 10 minutes"
 *   - 10 VIRTUAL for 10 credit minutes, label shown in the dialog.
 *
 * For backwards compatibility a bare `VIRTUAL_PACK_<ID>=<tokens>` is also
 * accepted but will be ignored unless minutes are also set (we can't
 * derive minutes from tokens).
 */

export const VIRTUAL_TOKEN_DECIMALS = 18;

/**
 * Public defaults pulled from env. The token contract on Base is publicly
 * known; the treasury address you must set yourself.
 */
export const VIRTUAL_TOKEN_ADDRESS = (
  process.env.NEXT_PUBLIC_VIRTUAL_TOKEN_ADDRESS ??
  '0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b'
).toLowerCase() as Address;

export const VIRTUAL_TREASURY_ADDRESS = (
  process.env.NEXT_PUBLIC_VIRTUAL_TREASURY_ADDRESS ?? ''
).toLowerCase() as Address | '';

export const VIRTUAL_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_VIRTUAL_CHAIN_ID ?? base.id
);

export const VIRTUAL_ENABLED =
  (process.env.NEXT_PUBLIC_VIRTUAL_ENABLED ?? 'false').toLowerCase() === 'true' &&
  VIRTUAL_TREASURY_ADDRESS.length > 0;

const ERC20_TRANSFER_ABI = parseAbi([
  'event Transfer(address indexed from, address indexed to, uint256 value)',
]);

function getPublicClient() {
  // Construct on each call to sidestep a viem 2.x type-narrowing quirk
  // around Base's custom `deposit` transaction type when caching the
  // typed client. The client is cheap to construct and the underlying
  // HTTP transport reuses connections.
  const rpcUrl = process.env.BASE_RPC_URL ?? 'https://mainnet.base.org';
  return createPublicClient({
    chain: base,
    transport: http(rpcUrl),
  });
}

export interface VirtualPack {
  id: string;
  /** Whole-token amount (e.g. 10 for "10 VIRTUAL"). */
  amount: number;
  /** Same value as a bigint in wei units (decimals=18). */
  amountWei: bigint;
  /** Credit minutes granted on successful payment. */
  minutes: number;
  /** Human-readable label shown in the Buy Credits dialog. */
  label: string;
}

export function listVirtualPacks(): VirtualPack[] {
  const out: VirtualPack[] = [];
  for (const [k, v] of Object.entries(process.env)) {
    if (!k.startsWith('VIRTUAL_PACK_') || !v) continue;
    const id = k.replace('VIRTUAL_PACK_', '').toLowerCase();
    const [tokensStr, minutesStr, ...rest] = String(v).split(':');
    const amount = Number(tokensStr);
    const minutes = Number(minutesStr);
    if (!Number.isFinite(amount) || amount <= 0) {
      console.warn(`[virtual] ignoring malformed pack ${k}=${v}`);
      continue;
    }
    if (!Number.isFinite(minutes) || minutes <= 0) {
      console.warn(
        `[virtual] pack ${k} missing minutes — expected "<tokens>:<minutes>:<label>"`
      );
      continue;
    }
    const label = rest.join(':') || `${minutes} minutes`;
    let amountWei: bigint;
    try {
      amountWei = parseUnits(tokensStr, VIRTUAL_TOKEN_DECIMALS);
    } catch {
      console.warn(`[virtual] ignoring unparsable pack ${k}=${v}`);
      continue;
    }
    out.push({ id, amount, amountWei, minutes, label });
  }
  return out.sort((a, b) => a.amount - b.amount);
}

export function getVirtualPack(id: string): VirtualPack | null {
  return listVirtualPacks().find((p) => p.id === id) ?? null;
}

export interface VerifyResult {
  fromAddress: Address;
  toAddress: Address;
  valueWei: bigint;
  blockNumber: bigint;
}

/**
 * Verify that `txHash` on Base contains an ERC-20 Transfer of >= expectedWei
 * of $VIRTUAL into the treasury address. Throws on any mismatch.
 *
 * NOTE: This does NOT check who initiated the transaction or who the
 * sender is — anyone can pay on behalf of anyone. Idempotency is
 * enforced upstream via /paymentsGlobal/virtual:{txHash}.
 */
export async function verifyVirtualTransfer(
  txHash: Hex,
  expectedWei: bigint
): Promise<VerifyResult> {
  if (!VIRTUAL_TREASURY_ADDRESS) {
    throw new Error('VIRTUAL treasury address is not configured on the server');
  }

  const client = getPublicClient();

  // Wait for at least 1 confirmation. waitForTransactionReceipt also throws
  // if the tx reverted.
  const receipt = await client.waitForTransactionReceipt({
    hash: txHash,
    confirmations: 1,
    // Don't hang forever — Base blocks every ~2s, so 60s is plenty.
    timeout: 60_000,
  });

  if (receipt.status !== 'success') {
    throw new Error(`Transaction reverted on-chain: ${txHash}`);
  }

  // Find a Transfer log emitted by the VIRTUAL contract whose `to` is the
  // treasury. There can be multiple Transfer logs in a tx (e.g. routing
  // contracts), so scan all of them.
  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== VIRTUAL_TOKEN_ADDRESS) continue;
    try {
      const decoded = decodeEventLog({
        abi: ERC20_TRANSFER_ABI,
        data: log.data,
        topics: log.topics,
      });
      if (decoded.eventName !== 'Transfer') continue;
      const { from, to, value } = decoded.args;
      if (to.toLowerCase() !== VIRTUAL_TREASURY_ADDRESS) continue;
      if (value < expectedWei) {
        throw new Error(
          `Insufficient VIRTUAL transferred: got ${value.toString()}, expected at least ${expectedWei.toString()}`
        );
      }
      return {
        fromAddress: from.toLowerCase() as Address,
        toAddress: to.toLowerCase() as Address,
        valueWei: value,
        blockNumber: receipt.blockNumber,
      };
    } catch (err) {
      // If decode fails this isn't a Transfer event — skip.
      if (
        err instanceof Error &&
        err.message.startsWith('Insufficient VIRTUAL')
      ) {
        throw err;
      }
      continue;
    }
  }

  throw new Error(
    `No matching $VIRTUAL Transfer to treasury found in tx ${txHash}`
  );
}
