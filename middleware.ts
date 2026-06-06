import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidPayTier, whopUrlForTier } from '@/lib/pay-bridge-config';

const BOT_UA_FRAGMENTS = ['paypal', 'bot', 'spider', 'scanner', 'headless', 'crawl'] as const;

function siteHome(): string {
  return (process.env.SITE_URL || 'https://designflare.de').replace(/\/$/, '');
}

function redirectHome(): NextResponse {
  return NextResponse.redirect(siteHome(), 302);
}

function ghost404(): NextResponse {
  return new NextResponse(null, { status: 404 });
}

function isBotUserAgent(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BOT_UA_FRAGMENTS.some((fragment) => lower.includes(fragment));
}

function buildZeroTraceHtml(destination: string): string {
  const safeUrl = JSON.stringify(destination);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><script>window.location.replace(${safeUrl});</script></head><body></body></html>`;
}

async function signPayTokenEdge(tier: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`pay:${tier}`));
  const bytes = new Uint8Array(sig);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  const b64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return b64.slice(0, 24);
}

async function verifyPayTokenEdge(tier: string, token: string, secret: string): Promise<boolean> {
  if (!tier || !token || !secret) return false;
  const expected = await signPayTokenEdge(tier, secret);
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Payment bridge — accepts traffic from external websites, email, or direct links.
 * Valid tier+token is the only gate; referrer is stripped before Whop redirect.
 */
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/api/pay') {
    return NextResponse.next();
  }

  const bridgeSecret = process.env.PAY_BRIDGE_SECRET?.trim();
  if (!bridgeSecret) {
    return redirectHome();
  }

  const ua = request.headers.get('user-agent') ?? '';
  if (isBotUserAgent(ua)) {
    return ghost404();
  }

  const tier = request.nextUrl.searchParams.get('tier');
  const token = request.nextUrl.searchParams.get('token');

  if (!tier || !token || !isValidPayTier(tier)) {
    return redirectHome();
  }

  const tokenValid = await verifyPayTokenEdge(tier, token, bridgeSecret);
  if (!tokenValid) {
    return redirectHome();
  }

  const destination = whopUrlForTier(tier);
  if (!destination) {
    return redirectHome();
  }

  return new NextResponse(buildZeroTraceHtml(destination), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': 'no-referrer',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export const config = {
  matcher: ['/api/pay'],
};
