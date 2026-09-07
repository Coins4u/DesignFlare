import { NextRequest, NextResponse } from 'next/server';
import { validateLead } from '../../lib/validators';
import { rateLimit } from '../../lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  if (!rateLimit(`startup-pitch:${ip}`, 8, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const payload = validateLead(await request.json());

    // Integrate: HubSpot, Resend, Slack, Payoneer webhook
    await Promise.resolve({
      route: 'startup-pitch',
      framework: 'Startup Pitch',
      receivedAt: new Date().toISOString(),
      lead: payload,
    });

    return NextResponse.json({ ok: true, message: 'Lead captured', id: `lead_${Date.now()}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid payload';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'healthy', service: 'Startup Pitch', version: '1.0.0' });
}
