/**
 * Direct Whop checkout links — sent to customers who order via DesignFlare
 * (pack checkout forms → invoice email). These are normal, public Whop URLs.
 */
export const TIER_PAYMENT_LINKS: Record<string, string> = {
  'Essential Pack': 'https://whop.com/checkout/plan_O4eX3wTV2l037',
  'Starter Bundle': 'https://whop.com/checkout/plan_zQiBMdH2kL2WT',
  'Creative Kit': 'https://whop.com/checkout/plan_0DBS3ne0JVLhS',
  'Growth Pro': 'https://whop.com/checkout/plan_aCelFgaz1Xpdb',
  'Professional Suite': 'https://whop.com/checkout/plan_OCuSKCwdTIr06',
  'Business Elite': 'https://whop.com/checkout/plan_rR0WC6TfL1t9Y',
  'Complete Marketing': 'https://whop.com/checkout/plan_JVVYEuhP263fs',
  'Ultimate Collection': 'https://whop.com/checkout/plan_LnJ4oMkQqfshS',
};

export function getPaymentLinkForTier(tierName: string): string | null {
  if (!tierName?.trim()) return null;
  return TIER_PAYMENT_LINKS[tierName.trim()] ?? null;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function buildCustomerInvoiceEmail({
  fullName,
  tierName,
  price,
  paymentLink,
}: {
  fullName: string;
  tierName: string;
  price: string;
  paymentLink: string;
}): { subject: string; text: string; html: string } {
  const safeName = fullName.trim();
  const safeTier = tierName.trim();
  const safePrice = price?.trim() || '';
  const safeLink = paymentLink.trim();

  const subject = `Your DesignFlare invoice — ${safeTier}`;

  const text = [
    `Hi ${safeName},`,
    '',
    'Thank you for your order request with DesignFlare.',
    '',
    'Invoice summary',
    `Product: ${safeTier}`,
    safePrice ? `Amount: ${safePrice}` : '',
    '',
    'Complete your purchase using the secure Whop payment link below:',
    safeLink,
    '',
    'After payment is confirmed, your coded template ZIP download link will be sent to this email address automatically.',
    '',
    'If you have any questions, reply to this email or contact us at contact@designflare.de.',
    '',
    '— DesignFlare',
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #0f172a; line-height: 1.55; background: #f8fafc; padding: 32px 16px;">
      <div style="max-width: 560px; margin: 0 auto;">
        <div style="border: 1px solid rgba(148,163,184,.35); border-radius: 16px; overflow: hidden; background: #ffffff; box-shadow: 0 18px 40px rgba(15,23,42,.08);">
          <div style="padding: 22px 24px; background: linear-gradient(135deg,#4f46e5,#6366f1); color: white;">
            <div style="font-weight: 800; font-size: 18px; letter-spacing: .02em;">DesignFlare</div>
            <div style="opacity: .92; font-size: 13px; margin-top: 4px;">Whop invoice — ready for payment</div>
          </div>
          <div style="padding: 24px;">
            <p style="margin: 0 0 16px 0; font-size: 15px;">Hi ${escapeHtml(safeName)},</p>
            <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px;">Thank you for your order request. Your invoice is ready — use the secure payment link below to complete your purchase via Whop.</p>

            <div style="border: 1px solid rgba(148,163,184,.28); border-radius: 14px; padding: 16px 18px; background: #f8fafc; margin-bottom: 22px;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #64748b; margin-bottom: 10px;">Invoice summary</div>
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

            <div style="text-align: center; margin: 28px 0;">
              <a href="${escapeHtml(safeLink)}" style="display: inline-block; background: linear-gradient(135deg,#4f46e5,#6366f1); color: #ffffff; text-decoration: none; font-weight: 800; font-size: 15px; padding: 14px 28px; border-radius: 14px; box-shadow: 0 14px 32px rgba(79,70,229,.35);">Pay now via Whop</a>
            </div>

            <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-align: center;">Or copy this link into your browser:</p>
            <p style="margin: 0 0 22px 0; font-size: 12px; word-break: break-all; text-align: center;"><a href="${escapeHtml(safeLink)}" style="color: #4f46e5;">${escapeHtml(safeLink)}</a></p>

            <div style="padding: 14px 16px; background: rgba(34,197,94,.08); border: 1px solid rgba(34,197,94,.22); border-radius: 14px; margin-bottom: 18px;">
              <div style="font-weight: 800; font-size: 13px; color: #166534; margin-bottom: 4px;">What happens next</div>
              <div style="font-size: 13px; color: #15803d;">Once payment is confirmed, your coded template ZIP download link will be delivered to this email automatically.</div>
            </div>

            <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">Questions? Reply to this email or write to contact@designflare.de</p>
          </div>
        </div>
        <p style="margin: 14px 0 0 0; font-size: 11px; color: #94a3b8; text-align: center;">© DesignFlare — Premium coded templates</p>
      </div>
    </div>
  `.trim();

  return { subject, text, html };
}
