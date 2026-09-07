import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildCustomerOrderConfirmationEmail } from '@/lib/tier-payment-links';

export const runtime = 'nodejs';

function requiredEnv(name: string): string {
  const raw = process.env[name];
  const value = typeof raw === 'string' ? raw.trim() : raw;
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { fullName, email, country, tierName, price, pageUrl, message } = body;

    if (typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ ok: false, error: 'Full name is required.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'A valid business email is required.' },
        { status: 400 }
      );
    }

    const safeMessage = typeof message === 'string' ? message.trim() : '';
    const isContactForm = safeMessage.length >= 3;

    if (!isContactForm && (typeof country !== 'string' || country.trim().length < 2)) {
      return NextResponse.json({ ok: false, error: 'Country is required.' }, { status: 400 });
    }

    const safeTierName =
      typeof tierName === 'string' && tierName.trim() ? tierName.trim() : 'DesignFlare Service Request';
    const safePrice = typeof price === 'string' ? price.trim() : '';
    const safeCountry =
      typeof country === 'string' && country.trim() ? country.trim() : 'Not provided';

    let adminEmail: string;
    let smtpHost: string;
    let smtpPort: number;
    let smtpUser: string;
    let smtpPass: string;
    let smtpSecure: boolean;

    try {
      adminEmail = requiredEnv('ADMIN_EMAIL');
      smtpHost = requiredEnv('SMTP_HOST');
      smtpPort = Number(requiredEnv('SMTP_PORT'));
      smtpUser = requiredEnv('SMTP_USER');
      smtpPass = requiredEnv('SMTP_PASS');
      smtpSecure = String(process.env.SMTP_SECURE ?? '').toLowerCase() === 'true';
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Email service is not configured on this server yet.' },
        { status: 500 }
      );
    }

    const orderFrom = process.env.ORDER_FROM?.trim() || 'order@support-tv.com';
    const fromName = process.env.FROM_NAME?.trim() || 'DesignFlare Orders';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number.isFinite(smtpPort) ? smtpPort : 587,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subject = isContactForm
      ? `CONTACT: ${safeTierName} — ${fullName.trim()}`
      : `NEW SALES LEAD: DesignFlare Service Request - ${safeTierName}`;

    const lines = isContactForm
      ? [
          'You have a new contact form message.',
          '',
          `Name: ${fullName.trim()}`,
          `Email: ${email.trim()}`,
          `Topic: ${safeTierName}`,
          '',
          'Message:',
          safeMessage,
        ]
      : [
          'You have a new design inquiry.',
          '',
          `Client Name: ${fullName.trim()}`,
          `Client Email: ${email.trim()}`,
          `Location: ${safeCountry}`,
          `Requested Tier: ${safeTierName}${safePrice ? ` (${safePrice})` : ''}`,
          '',
          'Next Action: Reply to the customer with bank transfer details and payment instructions.',
          'An automatic order confirmation was sent to the customer (bank details follow from you personally).',
        ];

    if (typeof pageUrl === 'string' && pageUrl.trim()) {
      lines.push('', `Page: ${pageUrl.trim()}`);
    }

    const text = lines.join('\n');

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #0f172a; line-height: 1.5;">
        <div style="max-width: 680px; margin: 0 auto; padding: 24px;">
          <div style="border: 1px solid rgba(148,163,184,.35); border-radius: 16px; overflow: hidden;">
            <div style="padding: 18px 20px; background: linear-gradient(135deg,#4f46e5,#6366f1); color: white;">
              <div style="font-weight: 800; letter-spacing: .02em;">DesignFlare</div>
              <div style="opacity: .9; font-size: 13px;">Internal lead notification</div>
            </div>
            <div style="padding: 20px; background: #ffffff;">
              <p style="margin: 0 0 14px 0; font-weight: 700;">${isContactForm ? 'You have a new contact form message.' : 'You have a new design inquiry.'}</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #475569; width: 160px;">${isContactForm ? 'Name' : 'Client Name'}</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(
                  fullName.trim()
                )}</td></tr>
                <tr><td style="padding: 8px 0; color: #475569;">${isContactForm ? 'Email' : 'Client Email'}</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(
                  email.trim()
                )}</td></tr>
                ${
                  isContactForm
                    ? `<tr><td style="padding: 8px 0; color: #475569;">Topic</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(safeTierName)}</td></tr>`
                    : `<tr><td style="padding: 8px 0; color: #475569;">Location</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(
                        safeCountry
                      )}</td></tr>
                <tr><td style="padding: 8px 0; color: #475569;">Requested Tier</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(
                  safeTierName
                )}${safePrice ? ` <span style="color:#64748b; font-weight: 500;">(${escapeHtml(safePrice)})</span>` : ''}</td></tr>`
                }
              </table>
              ${
                isContactForm
                  ? `<div style="margin-top: 16px; padding: 14px 16px; background: #f8fafc; border: 1px solid rgba(148,163,184,.35); border-radius: 14px;">
                <div style="font-weight: 800; margin-bottom: 8px; color: #334155;">Message</div>
                <div style="color: #475569; white-space: pre-wrap;">${escapeHtml(safeMessage)}</div>
              </div>
              <div style="margin-top: 16px; padding: 14px 16px; background: rgba(99,102,241,.08); border: 1px solid rgba(99,102,241,.18); border-radius: 14px;">
                <div style="font-weight: 800; margin-bottom: 4px;">Next Action</div>
                <div style="color: #334155;">Reply directly to the sender from your inbox.</div>
              </div>`
                  : `<div style="margin-top: 16px; padding: 14px 16px; background: rgba(99,102,241,.08); border: 1px solid rgba(99,102,241,.18); border-radius: 14px;">
                <div style="font-weight: 800; margin-bottom: 4px;">Next Action</div>
                <div style="color: #334155;">Reply to the customer with your <strong>bank transfer details</strong>. An automatic order confirmation was already sent to their email.</div>
              </div>`
              }
              ${
                typeof pageUrl === 'string' && pageUrl.trim()
                  ? `<p style="margin: 16px 0 0 0; font-size: 12px; color: #64748b;">Page: ${escapeHtml(
                      pageUrl.trim()
                    )}</p>`
                  : ''
              }
            </div>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #94a3b8;">This email is intended for internal management only.</p>
        </div>
      </div>
    `.trim();

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${orderFrom}>`,
        to: adminEmail,
        subject,
        text,
        html,
        replyTo: email.trim(),
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[notify-admin] SMTP send failed:', msg);
      return NextResponse.json(
        {
          ok: false,
          error:
            'Unable to send email (check Gmail App Password and server logs). See terminal for details.',
        },
        { status: 502 }
      );
    }

    if (!isContactForm) {
      const confirmation = buildCustomerOrderConfirmationEmail({
        fullName: fullName.trim(),
        tierName: safeTierName,
        price: safePrice,
      });

      try {
        await transporter.sendMail({
          from: `"${fromName}" <${orderFrom}>`,
          to: email.trim(),
          subject: confirmation.subject,
          text: confirmation.text,
          html: confirmation.html,
          replyTo: adminEmail,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[notify-admin] Customer confirmation send failed:', msg);
        return NextResponse.json(
          {
            ok: false,
            error:
              'Your request was received but we could not send your confirmation email. Please contact contact@designflare.de.',
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error. Please try again.' }, { status: 500 });
  }
}
