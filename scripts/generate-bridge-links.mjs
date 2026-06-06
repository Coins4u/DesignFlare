#!/usr/bin/env node
/**
 * Print permanent bridged /api/pay links for all 8 tiers.
 * Paste these on external websites — traffic hits your bridge host, not Whop directly.
 *
 * Usage:
 *   node scripts/generate-bridge-links.mjs
 *   BRIDGE_BASE_URL=https://designflare.de node scripts/generate-bridge-links.mjs
 */
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TIER_BY_PRODUCT_NAME, BRIDGED_WHOP_URLS } from '../lib/pay-bridge-config.mjs';
import { buildAllBridgedPayUrls, getBridgeBaseUrl } from '../lib/pay-bridge.mjs';

const root = path.dirname(fileURLToPath(new URL('..', import.meta.url)));
dotenv.config({ path: path.join(root, '.env'), override: false });

const secret = process.env.PAY_BRIDGE_SECRET?.trim();
if (!secret) {
  console.error('Missing PAY_BRIDGE_SECRET in .env');
  process.exit(1);
}

const base = getBridgeBaseUrl();
const links = buildAllBridgedPayUrls(secret, base);

const productByTier = Object.fromEntries(
  Object.entries(TIER_BY_PRODUCT_NAME).map(([name, tier]) => [tier, name])
);

console.log(`Bridge host: ${base}`);
console.log(`Bridged Whop destinations: lib/pay-bridge-config.ts → BRIDGED_WHOP_URLS`);
console.log(`Direct Whop links (DesignFlare): lib/tier-payment-links.ts → TIER_PAYMENT_LINKS\n`);

for (const tier of ['1', '2', '3', '4', '5', '6', '7', '8']) {
  const name = productByTier[tier] || `Tier ${tier}`;
  const whop = BRIDGED_WHOP_URLS[tier];
  console.log(`--- Tier ${tier}: ${name} ---`);
  console.log(`Bridged (use on external site): ${links[tier]}`);
  console.log(`Whop destination (hidden):      ${whop}\n`);
}

console.log('HTML example for your other website:');
console.log(`<a href="${links['1']}" rel="noreferrer">Buy Essential Pack</a>`);
