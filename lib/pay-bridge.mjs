import { createHmac, timingSafeEqual } from 'crypto';
import { tierIdForProductName } from './pay-bridge-config.mjs';

export {
  tierIdForProductName,
  isValidPayTier,
  bridgedWhopUrlForTier,
  whopUrlForTier,
  TIER_BY_PRODUCT_NAME,
  BRIDGED_WHOP_URLS,
} from './pay-bridge-config.mjs';

export function signPayToken(tier, secret) {
  return createHmac('sha256', secret)
    .update(`pay:${tier}`)
    .digest('base64url')
    .slice(0, 24);
}

export function verifyPayToken(tier, token, secret) {
  if (!tier || !token || !secret) return false;
  const expected = signPayToken(tier, secret);
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function buildBridgedPayUrl(tier, siteUrl, secret) {
  const base = siteUrl.replace(/\/$/, '');
  const token = signPayToken(tier, secret);
  return `${base}/api/pay?tier=${tier}&token=${encodeURIComponent(token)}`;
}

export function getBridgeBaseUrl() {
  const fromEnv =
    process.env.BRIDGE_BASE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    'https://designflare.de';
  return fromEnv.replace(/\/$/, '');
}

export function buildAllBridgedPayUrls(secret, baseUrl) {
  const base = (baseUrl || getBridgeBaseUrl()).replace(/\/$/, '');
  const tiers = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return Object.fromEntries(tiers.map((t) => [t, buildBridgedPayUrl(t, base, secret)]));
}

export function buildBridgedPayUrlForProduct(tierName, siteUrl, secret) {
  const tier = tierIdForProductName(tierName);
  if (!tier) return null;
  return buildBridgedPayUrl(tier, siteUrl, secret);
}
