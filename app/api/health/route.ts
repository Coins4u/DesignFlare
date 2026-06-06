import { NextResponse } from 'next/server';

export async function GET() {
  const hasMail =
    Boolean(process.env.ADMIN_EMAIL?.trim()) &&
    Boolean(process.env.SMTP_HOST?.trim()) &&
    Boolean(process.env.SMTP_USER?.trim()) &&
    Boolean(process.env.SMTP_PASS?.trim());

  return NextResponse.json({ ok: true, mailConfigured: hasMail });
}
