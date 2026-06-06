/** Maps DesignFlare product names → bridge tier id (1–8). */
export const TIER_BY_PRODUCT_NAME = {
  'Essential Pack': '1',
  'Starter Bundle': '2',
  'Creative Kit': '3',
  'Growth Pro': '4',
  'Professional Suite': '5',
  'Business Elite': '6',
  'Complete Marketing': '7',
  'Ultimate Collection': '8',
};

/**
 * Hidden Whop URLs — only reached via /api/pay bridge.
 * Keep in sync with lib/pay-bridge-config.ts
 */
export const BRIDGED_WHOP_URLS = {
  '1': 'https://whop.com/checkout/plan_O4eX3wTV2l037',
  '2': 'https://whop.com/checkout/plan_zQiBMdH2kL2WT',
  '3': 'https://whop.com/checkout/plan_0DBS3ne0JVLhS',
  '4': 'https://whop.com/checkout/plan_aCelFgaz1Xpdb',
  '5': 'https://whop.com/checkout/plan_OCuSKCwdTIr06',
  '6': 'https://whop.com/checkout/plan_rR0WC6TfL1t9Y',
  '7': 'https://whop.com/checkout/plan_JVVYEuhP263fs',
  '8': 'https://whop.com/checkout/plan_LnJ4oMkQqfshS',
};

const VALID_TIERS = new Set(Object.keys(BRIDGED_WHOP_URLS));

export function tierIdForProductName(tierName) {
  if (!tierName?.trim()) return null;
  return TIER_BY_PRODUCT_NAME[tierName.trim()] ?? null;
}

export function isValidPayTier(tier) {
  return VALID_TIERS.has(tier);
}

export function bridgedWhopUrlForTier(tier) {
  return BRIDGED_WHOP_URLS[tier] ?? null;
}

export function whopUrlForTier(tier) {
  return bridgedWhopUrlForTier(tier);
}
