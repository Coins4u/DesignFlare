import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildCustomerInvoiceEmail, getPaymentLinkForTier } from './lib/tier-payment-links.mjs';
import {
  isValidPayTier,
  verifyPayToken,
  whopUrlForTier,
} from './lib/pay-bridge.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always load `.env` from the project folder (same folder as server.js), not the shell cwd
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(express.json({ limit: '100kb' }));

/** Quick check that SMTP env is present (no secrets returned). */
app.get('/api/health', (req, res) => {
  const hasMail =
    Boolean(process.env.ADMIN_EMAIL?.trim()) &&
    Boolean(process.env.SMTP_HOST?.trim()) &&
    Boolean(process.env.SMTP_USER?.trim()) &&
    Boolean(process.env.SMTP_PASS?.trim());
  res.json({ ok: true, mailConfigured: hasMail });
});

function requiredEnv(name) {
  const raw = process.env[name];
  const value = typeof raw === 'string' ? raw.trim() : raw;
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post('/api/notify-admin', async (req, res) => {
  try {
    const { fullName, email, country, tierName, price, pageUrl, message } = req.body ?? {};

    if (typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ ok: false, error: 'Full name is required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'A valid business email is required.' });
    }

    const safeMessage = typeof message === 'string' ? message.trim() : '';
    const isContactForm = safeMessage.length >= 3;

    if (!isContactForm && (typeof country !== 'string' || country.trim().length < 2)) {
      return res.status(400).json({ ok: false, error: 'Country is required.' });
    }

    const safeTierName =
      typeof tierName === 'string' && tierName.trim() ? tierName.trim() : 'DesignFlare Service Request';
    const safePrice = typeof price === 'string' ? price.trim() : '';
    const safeCountry =
      typeof country === 'string' && country.trim() ? country.trim() : 'Not provided';

    let adminEmail;
    let smtpHost;
    let smtpPort;
    let smtpUser;
    let smtpPass;
    let smtpSecure;

    try {
      adminEmail = requiredEnv('ADMIN_EMAIL');
      smtpHost = requiredEnv('SMTP_HOST');
      smtpPort = Number(requiredEnv('SMTP_PORT'));
      smtpUser = requiredEnv('SMTP_USER');
      smtpPass = requiredEnv('SMTP_PASS');
      smtpSecure = String(process.env.SMTP_SECURE ?? '').toLowerCase() === 'true';
    } catch (err) {
      return res.status(500).json({
        ok: false,
        error: 'Email service is not configured on this server yet.'
      });
    }

    const orderFrom = process.env.ORDER_FROM || 'order@support-tv.com';
    const fromName = process.env.FROM_NAME || 'DesignFlare Orders';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number.isFinite(smtpPort) ? smtpPort : 587,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
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
          'Next Action: Whop invoice with payment link sent automatically to the customer.',
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
                <div style="color: #334155;">Whop invoice with payment link sent automatically to the customer.</div>
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
        replyTo: email.trim()
      });
    } catch (err) {
      console.error('[notify-admin] SMTP send failed:', err?.message || err);
      return res.status(502).json({
        ok: false,
        error:
          'Unable to send email (check Gmail App Password and that the site is opened via http://localhost:3000, not as a file). See terminal for details.'
      });
    }

    if (!isContactForm) {
      const paymentLink = getPaymentLinkForTier(safeTierName);

      if (paymentLink) {
        const invoice = buildCustomerInvoiceEmail({
          fullName: fullName.trim(),
          tierName: safeTierName,
          price: safePrice,
          paymentLink,
        });

        try {
          await transporter.sendMail({
            from: `"${fromName}" <${orderFrom}>`,
            to: email.trim(),
            subject: invoice.subject,
            text: invoice.text,
            html: invoice.html,
            replyTo: adminEmail,
          });
        } catch (err) {
          console.error('[notify-admin] Customer invoice send failed:', err?.message || err);
          return res.status(502).json({
            ok: false,
            error:
              'Your request was received but we could not send your invoice email. Please contact contact@designflare.de.',
          });
        }
      }
    }

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
  }
});

const BOT_UA_FRAGMENTS = ['paypal', 'bot', 'spider', 'scanner', 'headless', 'crawl'];

function siteHome() {
  return (process.env.SITE_URL || 'https://designflare.de').replace(/\/$/, '');
}

function isBotUserAgent(ua) {
  const lower = (ua || '').toLowerCase();
  return BOT_UA_FRAGMENTS.some((f) => lower.includes(f));
}

function buildZeroTraceHtml(destination) {
  const safeUrl = JSON.stringify(destination);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><script>window.location.replace(${safeUrl});</script></head><body></body></html>`;
}

/** Payment bridge — external sites, email, or direct links with valid tier+token. */
app.get('/api/pay', (req, res) => {
  const bridgeSecret = process.env.PAY_BRIDGE_SECRET?.trim();
  if (!bridgeSecret) {
    return res.redirect(302, siteHome());
  }

  const ua = req.headers['user-agent'] ?? '';
  if (isBotUserAgent(ua)) {
    return res.status(404).end();
  }

  const tier = typeof req.query.tier === 'string' ? req.query.tier : '';
  const token = typeof req.query.token === 'string' ? req.query.token : '';

  if (!tier || !token || !isValidPayTier(tier) || !verifyPayToken(tier, token, bridgeSecret)) {
    return res.redirect(302, siteHome());
  }

  const destination = whopUrlForTier(tier);
  if (!destination) {
    return res.redirect(302, siteHome());
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res.status(200).send(buildZeroTraceHtml(destination));
});

// Static files last so /api/* is never shadowed by the filesystem
app.use(express.static(__dirname));

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`DesignFlare server running on http://localhost:${port}`);
});

