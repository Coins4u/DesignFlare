/**
 * Package tier labels used on checkout forms.
 * Payment is by bank transfer — credentials are emailed personally after each order.
 */
export const TIER_NAMES = [
  'Essential Pack',
  'Starter Bundle',
  'Creative Kit',
  'Growth Pro',
  'Professional Suite',
  'Business Elite',
  'Complete Marketing',
  'Ultimate Collection',
] as const;

export function isKnownTier(tierName: string): boolean {
  if (!tierName?.trim()) return false;
  return (TIER_NAMES as readonly string[]).includes(tierName.trim());
}

/** @deprecated Kept for compatibility — bank transfer no longer uses payment links. */
export function getPaymentLinkForTier(_tierName: string): string | null {
  return null;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/**
 * Customer confirmation after checkout form submit.
 * Bank details are sent in a follow-up email from DesignFlare (personal contact).
 */
export function buildCustomerOrderConfirmationEmail({
  fullName,
  tierName,
  price,
}: {
  fullName: string;
  tierName: string;
  price: string;
}): { subject: string; text: string; html: string } {
  const safeName = fullName.trim();
  const safeTier = tierName.trim();
  const safePrice = price?.trim() || '';

  const subject = `Order received — ${safeTier} | DesignFlare`;

  const text = [
    `Hi ${safeName},`,
    '',
    'Thank you for submitting your order with DesignFlare. We have received your request and our team will contact you shortly.',
    '',
    'Order summary',
    `Product: ${safeTier}`,
    safePrice ? `Amount: ${safePrice}` : '',
    '',
    'What happens next',
    '1. We review your order and reply to this email with our bank transfer details and payment instructions.',
    '2. You complete the bank transfer using those details (please keep your receipt).',
    '3. Once payment is confirmed, we email your coded template ZIP download link and license credentials to this address.',
    '',
    'This personal follow-up lets us confirm your order, answer questions, and make sure everything is clear before you pay.',
    '',
    'Please check your inbox (and Spam / Junk / Promotions folders) for our next message. If you need anything in the meantime, simply reply to this email or write to contact@designflare.de.',
    '',
    '— DesignFlare (D.F)',
    'Ayoub Esadik · contact@designflare.de',
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #0f172a; line-height: 1.55; background: #f8fafc; padding: 32px 16px;">
      <div style="max-width: 560px; margin: 0 auto;">
        <div style="border: 1px solid rgba(148,163,184,.35); border-radius: 16px; overflow: hidden; background: #ffffff; box-shadow: 0 18px 40px rgba(15,23,42,.08);">
          <div style="padding: 22px 24px; background: linear-gradient(135deg,#4f46e5,#6366f1); color: white;">
            <div style="font-weight: 800; font-size: 18px; letter-spacing: .02em;">DesignFlare</div>
            <div style="opacity: .92; font-size: 13px; margin-top: 4px;">Order received — bank transfer next</div>
          </div>
          <div style="padding: 24px;">
            <p style="margin: 0 0 16px 0; font-size: 15px;">Hi ${escapeHtml(safeName)},</p>
            <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px;">Thank you for submitting your order. We have received your request and will contact you personally with bank transfer details so everything is clear before you pay.</p>

            <div style="border: 1px solid rgba(148,163,184,.28); border-radius: 14px; padding: 16px 18px; background: #f8fafc; margin-bottom: 22px;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #64748b; margin-bottom: 10px;">Order summary</div>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 100px;">Product</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${escapeHtml(safeTier)}</td>
                </tr>
                ${
                  safePrice
                    ? `<tr>
                  <td style="padding: 6px 0; color: #64748b;">Amount</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${escapeHtml(safePrice)}</td>
                </tr>`
                    : ''
                }
              </table>
            </div>

            <div style="padding: 14px 16px; background: rgba(79,70,229,.06); border: 1px solid rgba(79,70,229,.18); border-radius: 14px; margin-bottom: 18px;">
              <div style="font-weight: 800; font-size: 13px; color: #3730a3; margin-bottom: 8px;">What happens next</div>
              <ol style="margin: 0; padding-left: 18px; font-size: 13px; color: #4338ca;">
                <li style="margin-bottom: 6px;">We email you our <strong>bank transfer details</strong> and payment instructions.</li>
                <li style="margin-bottom: 6px;">You complete the transfer and keep your receipt.</li>
                <li>After payment is confirmed, we send your coded template ZIP and license credentials to this email.</li>
              </ol>
            </div>

            <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569;">This personal follow-up helps us confirm your order, answer questions, and stay in direct contact with you.</p>
            <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">Questions? Reply to this email or write to <a href="mailto:contact@designflare.de" style="color: #4f46e5;">contact@designflare.de</a></p>
          </div>
        </div>
        <p style="margin: 14px 0 0 0; font-size: 11px; color: #94a3b8; text-align: center;">© DesignFlare — Premium coded templates</p>
      </div>
    </div>
  `.trim();

  return { subject, text, html };
}

/** @deprecated Use buildCustomerOrderConfirmationEmail */
export function buildCustomerInvoiceEmail(args: {
  fullName: string;
  tierName: string;
  price: string;
  paymentLink?: string;
}): { subject: string; text: string; html: string } {
  return buildCustomerOrderConfirmationEmail(args);
}
