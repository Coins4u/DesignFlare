import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const legalDir = path.join(root, 'legal');
const pdfDir = path.join(legalDir, 'pdfs');
const cssPath = path.join(legalDir, 'pdf-template.css');

const META = {
  company: 'DesignFlare',
  tradeName: 'D.F',
  owner: 'Ayoub Esadik',
  website: 'https://designflare.de',
  email: 'contact@designflare.de',
  phone: '+212 637 338 555',
  effectiveDate: 'June 5, 2026',
  jurisdiction: 'Morocco',
};

function shell(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} | ${META.company}</title>
  <link rel="stylesheet" href="${cssPath}">
</head>
<body>
  <div class="cover-band"></div>
  <header class="header">
    <div class="brand">${META.company}</div>
    <div class="brand-sub">Premium Coded Templates &amp; Digital Assets</div>
    <h1 class="doc-title">${title}</h1>
    <div class="doc-meta">
      <span>Effective: ${META.effectiveDate}</span>
      <span>${META.website.replace('https://', '')}</span>
    </div>
  </header>
  <main class="content">
    ${bodyHtml}
    <dl class="contact-block">
      <dt>Legal &amp; Support Contact</dt>
      <dd>${META.owner} · ${META.company} (${META.tradeName})</dd>
      <dd>${META.email} · ${META.phone}</dd>
      <dd>${META.website}</dd>
    </dl>
    <p class="doc-end">© ${new Date().getFullYear()} ${META.company} (${META.tradeName}). All rights reserved.</p>
  </main>
</body>
</html>`;
}

const documents = [
  {
    filename: 'DesignFlare-Terms-of-Service.pdf',
    title: 'Terms of Service',
    body: `
      <p class="intro">These Terms of Service ("Terms") govern your access to and use of ${META.website}, products, and services offered by ${META.company} ("we", "us", "our"), operated by ${META.owner}. By accessing our website, submitting an order, or completing a purchase, you agree to be bound by these Terms.</p>

      <section>
        <h2>1. About DesignFlare</h2>
        <p>${META.company} is an independent digital studio specializing in production-ready coded website templates, UI kits, and related digital assets. ${META.company} is not affiliated with, endorsed by, or sponsored by any third-party platform mentioned on our website unless explicitly stated.</p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>You must be at least 18 years old and capable of entering into a binding contract to use our services. By placing an order, you represent that the information you provide is accurate and that you are authorized to use the payment method submitted.</p>
      </section>

      <section>
        <h2>3. Digital Products &amp; Delivery</h2>
        <p>All products sold through ${META.company} are digital goods. Upon successful payment confirmation, license credentials, download links, server paths, and setup instructions are delivered electronically to the email address associated with your order. No physical goods are shipped.</p>
        <p>Delivery is typically automated and occurs within minutes of payment. You are responsible for providing a valid email address and checking spam, junk, promotions, and updates folders if delivery is delayed.</p>
      </section>

      <section>
        <h2>4. Orders &amp; Payments</h2>
        <p>Payments are processed securely through Whop and/or other authorized payment processors. We do not store full payment card details on our servers. Prices are displayed at checkout and may be updated at any time; the price shown at the time of purchase applies to your order.</p>
        <p>We reserve the right to refuse or cancel orders in cases of suspected fraud, pricing errors, or violation of these Terms.</p>
      </section>

      <section>
        <h2>5. License Grant</h2>
        <p>Subject to payment and compliance with these Terms and our End User License Agreement (EULA), we grant you a non-exclusive, non-transferable license to use the purchased digital assets as described in the applicable product documentation and EULA. Ownership of all templates, source code, designs, and intellectual property remains with ${META.company}.</p>
      </section>

      <section>
        <h2>6. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Resell, redistribute, sublicense, or share source files, license keys, or download links except as expressly permitted</li>
          <li>Claim our products as your own original work without attribution where required</li>
          <li>Reverse engineer, decompile, or extract assets for the purpose of creating competing template libraries</li>
          <li>Use our products in any unlawful manner or to infringe third-party rights</li>
          <li>Attempt to bypass delivery, licensing, or access controls</li>
        </ul>
      </section>

      <section>
        <h2>7. Refunds &amp; Returns</h2>
        <p>Refunds are handled in accordance with our Return Policy, incorporated herein by reference. Due to the nature of digital goods, certain limitations may apply once assets have been delivered or accessed.</p>
      </section>

      <section>
        <h2>8. Intellectual Property</h2>
        <p>All content on ${META.website}, including trademarks, logos, text, graphics, code, and template designs, is the property of ${META.company} or its licensors and is protected by applicable intellectual property laws.</p>
      </section>

      <section>
        <h2>9. Disclaimer of Warranties</h2>
        <p>Our products and website are provided "as is" and "as available" without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee uninterrupted access or error-free operation.</p>
      </section>

      <section>
        <h2>10. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, ${META.company} and ${META.owner} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or business opportunities arising from your use of our products or services. Our total liability for any claim shall not exceed the amount you paid for the specific product giving rise to the claim.</p>
      </section>

      <section>
        <h2>11. Privacy</h2>
        <p>Your use of our services is also governed by our Privacy Policy, which describes how we collect, use, and protect personal information.</p>
      </section>

      <section>
        <h2>12. Modifications</h2>
        <p>We may update these Terms at any time. Material changes will be posted on ${META.website} with an updated effective date. Continued use of our services after changes constitutes acceptance of the revised Terms.</p>
      </section>

      <section>
        <h2>13. Governing Law</h2>
        <p>These Terms are governed by the laws of ${META.jurisdiction}, without regard to conflict-of-law principles. Any disputes shall be resolved in the courts of competent jurisdiction in ${META.jurisdiction}, unless otherwise required by mandatory consumer protection laws in your country of residence.</p>
      </section>

      <section>
        <h2>14. Contact</h2>
        <p>For questions regarding these Terms, contact ${META.owner} at ${META.email}.</p>
      </section>
    `,
  },
  {
    filename: 'DesignFlare-Privacy-Policy.pdf',
    title: 'Privacy Policy',
    body: `
      <p class="intro">${META.company} ("we", "us", "our"), operated by ${META.owner}, respects your privacy. This Privacy Policy explains what personal information we collect, how we use it, and your rights when you visit ${META.website} or purchase our digital products.</p>

      <section>
        <h2>1. Information We Collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li>Contact details (name, email address, phone number) when you submit checkout forms or contact us</li>
          <li>Order and billing information necessary to process your purchase</li>
          <li>Communications you send to our support team</li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>Device type, browser, IP address, and general usage data</li>
          <li>Pages visited, referral source, and interaction with our website</li>
          <li>Cookies and similar technologies used for site functionality and analytics</li>
        </ul>
        <h3>Payment information</h3>
        <p>Payments are processed by Whop and other authorized payment providers. We do not store complete payment card numbers on our servers. Payment processors may collect and process data according to their own privacy policies.</p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Process orders and deliver digital products, licenses, and credentials</li>
          <li>Send transactional emails, invoices, and payment links</li>
          <li>Respond to support requests and billing inquiries</li>
          <li>Improve our website, products, and customer experience</li>
          <li>Detect fraud, abuse, and security incidents</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>3. Legal Bases for Processing (GDPR)</h2>
        <p>Where applicable under the General Data Protection Regulation (GDPR), we process personal data based on:</p>
        <ul>
          <li><strong>Contract performance</strong> — to fulfill your order and deliver purchased products</li>
          <li><strong>Legitimate interests</strong> — to operate, secure, and improve our business</li>
          <li><strong>Legal obligation</strong> — to comply with tax, accounting, and regulatory requirements</li>
          <li><strong>Consent</strong> — where required for optional marketing communications</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of Information</h2>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul>
          <li>Payment processors (e.g., Whop) to complete transactions</li>
          <li>Email delivery and hosting providers to send invoices and product credentials</li>
          <li>Analytics and infrastructure providers that assist in operating our website</li>
          <li>Law enforcement or regulators when required by law or to protect our rights</li>
        </ul>
        <p>All service providers are required to handle data securely and only for authorized purposes.</p>
      </section>

      <section>
        <h2>5. Data Retention</h2>
        <p>We retain personal information only as long as necessary to fulfill the purposes described in this policy, including order fulfillment, support, legal compliance, and dispute resolution. Order records may be retained for accounting and tax purposes as required by law.</p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>Our website may use essential cookies for functionality and optional analytics cookies to understand site usage. You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.</p>
      </section>

      <section>
        <h2>7. International Transfers</h2>
        <p>Your information may be processed in countries other than your own, including where our service providers operate. We take reasonable steps to ensure appropriate safeguards are in place for international data transfers where required.</p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your data, subject to legal retention requirements</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Withdraw consent where processing is consent-based</li>
          <li>Lodge a complaint with a supervisory authority</li>
        </ul>
        <p>To exercise these rights, contact us at ${META.email}. We will respond within a reasonable timeframe as required by applicable law.</p>
      </section>

      <section>
        <h2>9. Security</h2>
        <p>We implement reasonable technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.</p>
      </section>

      <section>
        <h2>10. Children's Privacy</h2>
        <p>Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe a child has provided us data, contact us and we will delete it promptly.</p>
      </section>

      <section>
        <h2>11. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. The effective date at the top of this document indicates when it was last revised. Material changes will be posted on ${META.website}.</p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>For privacy-related inquiries, contact ${META.owner} at ${META.email}.</p>
      </section>
    `,
  },
  {
    filename: 'DesignFlare-Return-Policy.pdf',
    title: 'Return Policy',
    body: `
      <p class="intro">At ${META.company}, we stand behind the quality of our coded templates and digital products. This Return Policy explains your options if a purchase does not meet your expectations. Please read this policy carefully before completing a purchase.</p>

      <section>
        <h2>1. Digital Product Nature</h2>
        <p>All products sold by ${META.company} are intangible digital goods delivered electronically via email. Once license credentials, download links, or source files have been delivered, the product is considered fulfilled. Because digital assets cannot be "returned" in the traditional sense, our policy balances customer satisfaction with the nature of instant digital delivery.</p>
      </section>

      <section>
        <h2>2. 14-Day Satisfaction Guarantee</h2>
        <p>We offer a <strong>14-day money-back guarantee</strong> from the date of purchase. If you are not satisfied with your purchase, you may request a full refund within fourteen (14) calendar days of the original transaction date, provided the conditions below are met.</p>
      </section>

      <section>
        <h2>3. Refund Eligibility</h2>
        <p>You may be eligible for a refund if:</p>
        <ul>
          <li>Your request is submitted within 14 days of purchase</li>
          <li>The product files were not downloaded, accessed, or deployed in a production environment (where verifiable)</li>
          <li>You did not violate our Terms of Service or EULA, including redistribution of source files</li>
          <li>The product was purchased directly through ${META.company} or an authorized payment channel</li>
        </ul>
        <p>Refunds are granted at our discretion when delivery failures, duplicate charges, or technical issues prevent you from accessing the product we sold.</p>
      </section>

      <section>
        <h2>4. Non-Refundable Situations</h2>
        <p>Refunds may be denied when:</p>
        <ul>
          <li>The 14-day window has expired</li>
          <li>You have already downloaded, deployed, or extensively used the product</li>
          <li>You purchased the wrong package due to buyer error after successful delivery</li>
          <li>You violated licensing terms by sharing, reselling, or redistributing source files</li>
          <li>A chargeback was initiated without first contacting our support team</li>
        </ul>
      </section>

      <section>
        <h2>5. How to Request a Refund</h2>
        <p>To initiate a return or refund request:</p>
        <ol>
          <li>Email ${META.email} within 14 days of your purchase date</li>
          <li>Include your order number, billing email, and purchase date</li>
          <li>Briefly describe the reason for your request</li>
        </ol>
        <p>Our team will review your request and respond within 2–3 business days. Approved refunds are processed to the original payment method used at checkout. Processing times may vary depending on your bank or payment provider (typically 5–10 business days).</p>
      </section>

      <section>
        <h2>6. Exchanges &amp; Package Upgrades</h2>
        <p>If you purchased the wrong tier or wish to upgrade to a higher package, contact us at ${META.email}. We will work with you on a fair solution, which may include a partial credit or upgrade path depending on your usage and the price difference.</p>
      </section>

      <section>
        <h2>7. Delivery Issues</h2>
        <p>If you did not receive your license credentials or download link within 24 hours of payment:</p>
        <ul>
          <li>Check your spam, junk, promotions, and updates folders</li>
          <li>Verify the email address submitted at checkout</li>
          <li>Contact ${META.email} with your billing details for manual resend</li>
        </ul>
        <p>We will resend delivery at no additional charge. This does not automatically qualify for a refund unless the product cannot be delivered after reasonable support efforts.</p>
      </section>

      <section>
        <h2>8. Chargebacks</h2>
        <p>We encourage you to contact us before initiating a chargeback or payment dispute. Unauthorized chargebacks for successfully delivered digital products may result in license revocation and restriction of future purchases.</p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>For return and refund inquiries, contact ${META.owner} at ${META.email} or ${META.phone}.</p>
      </section>
    `,
  },
  {
    filename: 'DesignFlare-EULA.pdf',
    title: 'End User License Agreement',
    body: `
      <p class="intro">This End User License Agreement ("EULA") is a legal agreement between you ("Licensee", "you") and ${META.company}, operated by ${META.owner} ("Licensor", "we", "us"), for the use of coded website templates, UI components, source files, and related digital assets ("Licensed Materials") purchased from ${META.website}.</p>

      <section>
        <h2>1. Acceptance</h2>
        <p>By downloading, accessing, installing, or using any Licensed Materials, you agree to be bound by this EULA. If you do not agree, do not download or use the Licensed Materials and contact us for a refund in accordance with our Return Policy.</p>
      </section>

      <section>
        <h2>2. License Grant</h2>
        <p>Upon full payment, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Licensed Materials subject to the terms of your purchased package:</p>
        <ul>
          <li><strong>Personal / Single Project:</strong> Use in one (1) end product or client project</li>
          <li><strong>Commercial:</strong> Use in multiple client projects and commercial deployments as specified in your package tier</li>
          <li><strong>Extended / Agency:</strong> Use across unlimited client projects within your organization, excluding resale of source files</li>
        </ul>
        <p>The specific scope of your license is defined at the time of purchase and in accompanying product documentation.</p>
      </section>

      <section>
        <h2>3. Permitted Uses</h2>
        <p>You may:</p>
        <ul>
          <li>Modify, customize, and integrate Licensed Materials into your websites and applications</li>
          <li>Use modified versions in client work and commercial projects within your licensed scope</li>
          <li>Deploy finished end products to production servers</li>
          <li>Create derivative works for your own business or clients, provided source files are not redistributed</li>
        </ul>
      </section>

      <section>
        <h2>4. Restrictions</h2>
        <p>You may not, without prior written consent from ${META.company}:</p>
        <ul>
          <li>Resell, sublicense, lease, or redistribute the Licensed Materials or source files in any form</li>
          <li>Include Licensed Materials in template marketplaces, theme stores, or competing product libraries</li>
          <li>Share download links, license keys, or credentials with unauthorized third parties</li>
          <li>Remove or alter copyright notices, attribution, or proprietary markings where required</li>
          <li>Reverse engineer or extract assets for the purpose of creating substitute products</li>
          <li>Use Licensed Materials in unlawful, defamatory, or infringing content</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>The Licensed Materials are licensed, not sold. ${META.company} retains all right, title, and interest in and to the Licensed Materials, including all copyrights, trademarks, trade secrets, and other intellectual property rights. This EULA does not transfer ownership of any intellectual property to you.</p>
      </section>

      <section>
        <h2>6. Third-Party Components</h2>
        <p>Licensed Materials may incorporate third-party fonts, icons, libraries, or open-source components subject to their respective licenses. You are responsible for compliance with any third-party license terms included in the product documentation.</p>
      </section>

      <section>
        <h2>7. Updates &amp; Support</h2>
        <p>Unless explicitly stated in your package, we are not obligated to provide updates, maintenance, or ongoing support beyond initial delivery. Optional update packages may be offered separately. Support inquiries may be directed to ${META.email}.</p>
      </section>

      <section>
        <h2>8. Term &amp; Termination</h2>
        <p>This license is effective upon payment and delivery and continues until terminated. We may terminate this license immediately if you breach any term of this EULA. Upon termination, you must cease all use of the Licensed Materials and destroy all copies in your possession, except for deployed end products already in production that were created in compliance with this EULA prior to termination.</p>
      </section>

      <section>
        <h2>9. Warranty Disclaimer</h2>
        <p>THE LICENSED MATERIALS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE LICENSED MATERIALS WILL BE ERROR-FREE OR COMPATIBLE WITH ALL ENVIRONMENTS.</p>
      </section>

      <section>
        <h2>10. Limitation of Liability</h2>
        <p>IN NO EVENT SHALL ${META.company.toUpperCase()} OR ${META.owner.toUpperCase()} BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY ARISING FROM THIS EULA SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SPECIFIC LICENSED MATERIALS GIVING RISE TO THE CLAIM.</p>
      </section>

      <section>
        <h2>11. Indemnification</h2>
        <p>You agree to indemnify and hold harmless ${META.company} and ${META.owner} from any claims, damages, or expenses arising from your misuse of the Licensed Materials or violation of this EULA.</p>
      </section>

      <section>
        <h2>12. Governing Law</h2>
        <p>This EULA is governed by the laws of ${META.jurisdiction}. Disputes shall be resolved in accordance with our Terms of Service unless mandatory consumer protection laws in your jurisdiction provide otherwise.</p>
      </section>

      <section>
        <h2>13. Entire Agreement</h2>
        <p>This EULA, together with our Terms of Service, Privacy Policy, and Return Policy, constitutes the entire agreement regarding the Licensed Materials and supersedes prior understandings on the same subject matter.</p>
      </section>

      <section>
        <h2>14. Contact</h2>
        <p>Licensing questions: ${META.email} · ${META.owner}, ${META.company} (${META.tradeName})</p>
      </section>
    `,
  },
];

async function main() {
  await mkdir(pdfDir, { recursive: true });

  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch {
    console.error('Installing puppeteer…');
    const require = createRequire(import.meta.url);
    const { execSync } = await import('node:child_process');
    execSync('npm install --no-save puppeteer', { cwd: root, stdio: 'inherit' });
    puppeteer = (await import('puppeteer')).default;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const doc of documents) {
    const htmlPath = path.join(legalDir, `_tmp-${doc.filename.replace('.pdf', '.html')}`);
    const pdfPath = path.join(pdfDir, doc.filename);
    const html = shell(doc.title, doc.body);

    await writeFile(htmlPath, html, 'utf8');

    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '18mm', right: '18mm', bottom: '22mm', left: '18mm' },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="width:100%; font-size:8px; color:#94a3b8; padding:0 18mm; display:flex; justify-content:space-between; font-family:Helvetica,Arial,sans-serif;">
          <span>${META.company} (${META.tradeName}) — ${doc.title}</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>`,
    });
    await page.close();

    console.log('Generated', pdfPath);
  }

  await browser.close();
  console.log(`\nDone — ${documents.length} PDFs saved to legal/pdfs/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
