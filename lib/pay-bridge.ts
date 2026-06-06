import { createHmac, timingSafeEqual } from 'crypto';
import { type PayTierId, tierIdForProductName } from './pay-bridge-config';

export {
  TIER_BY_PRODUCT_NAME,
  BRIDGED_WHOP_URLS,
  type PayTierId,
  tierIdForProductName,
  isValidPayTier,
  bridgedWhopUrlForTier,
  whopUrlForTier,
} from './pay-bridge-config';

export function signPayToken(tier: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(`pay:${tier}`)
    .digest('base64url')
    .slice(0, 24);
}

export function verifyPayToken(tier: string, token: string, secret: string): boolean {
  if (!tier || !token || !secret) return false;
  const expected = signPayToken(tier, secret);
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function buildBridgedPayUrl(tier: PayTierId, siteUrl: string, secret: string): string {
  const base = siteUrl.replace(/\/$/, '');
  const token = signPayToken(tier, secret);
  return `${base}/api/pay?tier=${tier}&token=${encodeURIComponent(token)}`;
}

/** Host that serves /api/pay — paste bridged links on external sites / campaigns. */
export function getBridgeBaseUrl(): string {
  const fromEnv =
    process.env.BRIDGE_BASE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    'https://designflare.de';
  return fromEnv.replace(/\/$/, '');
}

export function buildAllBridgedPayUrls(secret: string, baseUrl?: string): Record<PayTierId, string> {
  const base = (baseUrl || getBridgeBaseUrl()).replace(/\/$/, '');
  const tiers: PayTierId[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return Object.fromEntries(tiers.map((t) => [t, buildBridgedPayUrl(t, base, secret)])) as Record<
    PayTierId,
    string
  >;
}

export function buildBridgedPayUrlForProduct(
  tierName: string,
  siteUrl: string,
  secret: string
): string | null {
  const tier = tierIdForProductName(tierName);
  if (!tier) return null;
  return buildBridgedPayUrl(tier, siteUrl, secret);
}
