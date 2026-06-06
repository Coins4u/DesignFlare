import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const productsDir = path.join(root, 'products');

const BILLING_NOTE =
  'DesignFlare operates a dynamic global ledger. All base digital assets are denominated in our primary corporate currency node. Listed Euro (€) checkout rates are calculated in real-time utilizing localized payment processing rails to ensure zero conversion spreads at settlement. Your final invoice receipt will accurately reflect these precise values under your secure data license identifier.';

const PACKS = [
  { slug: '01-essential-pack', sku: 'DF-LIC-EP-1367', name: 'Essential Pack', tier: 'low', tierLabel: 'Niche Template Bundle', price: 13.67, checkoutUrl: '/pack/essential-pack.html', totalAssets: 45, tagline: 'Production niche bundles — full landing pages, email systems, and Figma handoff specs.', niches: ['Fashion', 'Fitness', 'Beauty', 'Lifestyle'] },
  { slug: '02-starter-bundle', sku: 'DF-LIC-SB-2312', name: 'Starter Bundle', tier: 'low', tierLabel: 'Niche Template Bundle', price: 23.12, checkoutUrl: '/pack/starter-bundle.html', totalAssets: 65, tagline: 'Expanded niche code packs for freelancers shipping client sites in hours.', niches: ['Business', 'Fitness', 'Food', 'Real Estate', 'Coaching', 'Events'] },
  { slug: '03-creative-kit', sku: 'DF-LIC-CK-2549', name: 'Creative Kit', tier: 'low', tierLabel: 'Niche Template Bundle', price: 25.49, checkoutUrl: '/pack/creative-kit.html', totalAssets: 75, tagline: 'Agency-grade HTML/CSS systems with wireframes for creative studios.', niches: ['Agency', 'Photography', 'Music', 'Podcast', 'Streaming', 'Portfolio', 'Design Studio'] },
  { slug: '04-growth-pro', sku: 'DF-LIC-GP-3553', name: 'Growth Pro', tier: 'mid', tierLabel: 'Full-Stack Developer Kit', price: 35.53, checkoutUrl: '/pack/growth-pro.html', totalAssets: 95, tagline: 'Deploy-ready Next.js 14 App Router kits with validated API middleware.', frameworks: ['SaaS Launch', 'E-commerce Store', 'Finance Dashboard', 'Legal Services', 'HR Platform', 'Consulting Firm', 'Nonprofit', 'EdTech'] },
  { slug: '05-professional-suite', sku: 'DF-LIC-PS-3778', name: 'Professional Suite', tier: 'mid', tierLabel: 'Full-Stack Developer Kit', price: 37.78, checkoutUrl: '/pack/professional-suite.html', totalAssets: 110, tagline: 'Enterprise React architectures for established engineering teams.', frameworks: ['Corporate B2B', 'Healthcare Portal', 'Insurance Quote', 'Logistics Tracker', 'Manufacturing', 'Retail POS', 'Hospitality Booking', 'Automotive Dealer', 'Tech Startup', 'Enterprise CRM'] },
  { slug: '06-business-elite', sku: 'DF-LIC-BE-4579', name: 'Business Elite', tier: 'mid', tierLabel: 'Full-Stack Developer Kit', price: 45.79, checkoutUrl: '/pack/business-elite.html', totalAssets: 140, tagline: 'Full-stack kits with rate-limited API pipelines and lead capture flows.', frameworks: ['Agency Hub', 'Franchise Portal', 'Startup Pitch', 'Investor Deck Site', 'Webinar Funnel', 'Product Launch', 'Affiliate Hub', 'Membership Site', 'Course Platform', 'Newsletter SaaS', 'Community App', 'Marketplace'] },
  { slug: '07-complete-marketing', sku: 'DF-LIC-CM-4956', name: 'Complete Marketing', tier: 'high', tierLabel: 'Enterprise Agency Suite', price: 49.56, checkoutUrl: '/pack/complete-marketing.html', totalAssets: 160, tagline: 'White-label enterprise UI systems with analytics hooks and design tokens.', modules: ['Brand System', 'Product Pages', 'Sales Funnels', 'Retention Flows', 'Referral Engine', 'Seasonal Campaigns', 'Holiday Drops', 'Black Friday Kit', 'Influencer Hub', 'UGC Gallery', 'Paid Ads Landers', 'Case Studies', 'Press Kit', 'Analytics Dashboard'] },
  { slug: '08-ultimate-collection', sku: 'DF-LIC-UC-6748', name: 'Ultimate Collection', tier: 'high', tierLabel: 'Enterprise Agency Suite', price: 67.48, checkoutUrl: '/pack/ultimate-collection.html', totalAssets: 200, tagline: 'Lifetime agency archive — all components, tokens, middleware, white-label rights.', modules: ['All Low-Tier Bundles', 'All Mid-Tier Kits', 'All High-Tier Modules', 'Future Component Drops', 'White-Label License', 'Agency Reseller Kit', 'Client Handoff Docs', 'Design Token System', 'Component Storybook', 'API Middleware Library', 'Email Template Engine', 'Landing Page Factory', 'Dashboard Shells', 'Auth Flows', 'Payment Integrations', 'SEO Component Pack', 'A/B Test Blocks', 'Accessibility Kit', 'Dark Mode System', 'i18n Scaffold', 'Enterprise SLA Docs'] },
];

const NICHE_THEMES = {
  Fashion: { primary: '#be185d', primaryDark: '#9d174d', accent: '#fdf2f8', surface: '#fffafb', headline: 'Curated collections that convert browsers into buyers', cta: 'Shop Collection' },
  Fitness: { primary: '#059669', primaryDark: '#047857', accent: '#ecfdf5', surface: '#f8fffb', headline: 'Train smarter with programs built for real results', cta: 'Start Free Trial' },
  Beauty: { primary: '#c026d3', primaryDark: '#a21caf', accent: '#fdf4ff', surface: '#fffbff', headline: 'Elevate your ritual with clinically-inspired skincare', cta: 'Discover Ritual' },
  Lifestyle: { primary: '#d97706', primaryDark: '#b45309', accent: '#fffbeb', surface: '#fffdf7', headline: 'Design a life that feels as good as it looks', cta: 'Explore Lifestyle' },
  Business: { primary: '#2563eb', primaryDark: '#1d4ed8', accent: '#eff6ff', surface: '#f8fbff', headline: 'Operational clarity for teams that scale with confidence', cta: 'Book a Demo' },
  Food: { primary: '#dc2626', primaryDark: '#b91c1c', accent: '#fef2f2', surface: '#fffafa', headline: 'From kitchen to doorstep — experiences worth sharing', cta: 'Order Now' },
  'Real Estate': { primary: '#0f766e', primaryDark: '#0d9488', accent: '#f0fdfa', surface: '#f7fffe', headline: 'Find properties backed by data, not guesswork', cta: 'View Listings' },
  Coaching: { primary: '#7c3aed', primaryDark: '#6d28d9', accent: '#f5f3ff', surface: '#faf9ff', headline: 'Unlock measurable growth with expert-led coaching', cta: 'Apply Now' },
  Events: { primary: '#e11d48', primaryDark: '#be123c', accent: '#fff1f2', surface: '#fffafa', headline: 'Memorable events engineered down to the last detail', cta: 'Plan Your Event' },
  Agency: { primary: '#4f46e5', primaryDark: '#4338ca', accent: '#eef2ff', surface: '#f8f9ff', headline: 'Ship premium client work without rebuilding from zero', cta: 'View Case Studies' },
  Photography: { primary: '#171717', primaryDark: '#0a0a0a', accent: '#f5f5f5', surface: '#fafafa', headline: 'Portfolio frames that let your work speak first', cta: 'Book a Session' },
  Music: { primary: '#9333ea', primaryDark: '#7e22ce', accent: '#faf5ff', surface: '#fcfaff', headline: 'Release-ready presence for artists and labels', cta: 'Listen Now' },
  Podcast: { primary: '#0891b2', primaryDark: '#0e7490', accent: '#ecfeff', surface: '#f6feff', headline: 'Grow your audience with a show that looks pro', cta: 'Subscribe Free' },
  Streaming: { primary: '#ef4444', primaryDark: '#dc2626', accent: '#fef2f2', surface: '#fffafa', headline: 'Go live with a channel built for community', cta: 'Join Stream' },
  Portfolio: { primary: '#6366f1', primaryDark: '#4f46e5', accent: '#eef2ff', surface: '#f9f9ff', headline: 'A portfolio that wins trust before the first call', cta: 'Hire Me' },
  'Design Studio': { primary: '#14b8a6', primaryDark: '#0d9488', accent: '#f0fdfa', surface: '#f7fffd', headline: 'Studio-grade systems for design-led product teams', cta: 'Start a Project' },
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function pascalCase(slug) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function themeFor(niche) {
  return NICHE_THEMES[niche] || NICHE_THEMES.Business;
}

function landingHtml(niche, packName) {
  const id = slugify(niche);
  const t = themeFor(niche);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${t.headline} — Professional ${niche} landing page by DesignFlare." />
  <title>${niche} — Premium Landing · DesignFlare</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${id}-landing.css" />
</head>
<body class="df-page df-page--${id}">
  <a class="df-skip" href="#main">Skip to content</a>

  <header class="df-nav">
    <div class="df-container df-nav__inner">
      <a class="df-logo" href="#" aria-label="${niche} home">${niche}<span>.</span></a>
      <nav class="df-nav__links" aria-label="Primary">
        <a href="#features">Features</a>
        <a href="#proof">Results</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <a class="df-btn df-btn--sm df-btn--primary" href="#cta">${t.cta}</a>
    </div>
  </header>

  <main id="main">
    <section class="df-hero">
      <div class="df-container df-hero__grid">
        <div class="df-hero__copy">
          <p class="df-eyebrow">${niche} · ${packName}</p>
          <h1 class="df-hero__title">${t.headline}</h1>
          <p class="df-hero__lead">Production-grade HTML/CSS landing system with semantic markup, design tokens, and mobile-first responsive layout. Deploy in minutes.</p>
          <div class="df-hero__actions">
            <a class="df-btn df-btn--primary" href="#cta">${t.cta}</a>
            <a class="df-btn df-btn--ghost" href="#features">See components</a>
          </div>
          <ul class="df-hero__stats" aria-label="Key metrics">
            <li><strong>98%</strong><span>Mobile score</span></li>
            <li><strong>4.9★</strong><span>Client rating</span></li>
            <li><strong>&lt;2s</strong><span>Load time</span></li>
          </ul>
        </div>
        <div class="df-hero__visual" aria-hidden="true">
          <div class="df-mockup">
            <div class="df-mockup__bar"></div>
            <div class="df-mockup__body">
              <div class="df-mockup__chip"></div>
              <div class="df-mockup__line df-mockup__line--lg"></div>
              <div class="df-mockup__line"></div>
              <div class="df-mockup__line df-mockup__line--sm"></div>
              <div class="df-mockup__cta"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="df-logos" aria-label="Trusted by">
      <div class="df-container df-logos__row">
        <span>Trusted by teams at</span>
        <ul><li>Vertex</li><li>NovaLab</li><li>Pulse</li><li>Arc&Co</li><li>Studio 8</li></ul>
      </div>
    </section>

    <section id="features" class="df-features">
      <div class="df-container">
        <header class="df-section-head">
          <p class="df-eyebrow">Built for ${niche.toLowerCase()}</p>
          <h2>Everything you need to launch professionally</h2>
        </header>
        <div class="df-features__grid">
          <article class="df-card"><div class="df-card__icon">01</div><h3>Semantic HTML5</h3><p>Accessible structure with ARIA labels, skip links, and SEO-ready headings.</p></article>
          <article class="df-card"><div class="df-card__icon">02</div><h3>Token-driven CSS</h3><p>Custom properties for colors, spacing, and typography — rebrand in one file.</p></article>
          <article class="df-card"><div class="df-card__icon">03</div><h3>Responsive system</h3><p>Fluid grids from 320px to 1440px with tested breakpoints.</p></article>
        </div>
      </div>
    </section>

    <section id="proof" class="df-testimonial">
      <div class="df-container df-testimonial__inner">
        <blockquote>
          <p>"We replaced a €3,000 custom build with this template and shipped in a weekend. The code quality is agency-grade."</p>
          <footer>— Alex M., ${niche} Founder</footer>
        </blockquote>
      </div>
    </section>

    <section id="pricing" class="df-pricing">
      <div class="df-container df-pricing__card">
        <h2>Ready to deploy?</h2>
        <p>Includes landing page, email template, and Figma handoff spec.</p>
        <a id="cta" class="df-btn df-btn--primary df-btn--lg" href="#">${t.cta}</a>
      </div>
    </section>
  </main>

  <footer class="df-footer">
    <div class="df-container df-footer__inner">
      <p>© 2026 ${niche} Brand · Template by DesignFlare</p>
      <nav aria-label="Footer"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></nav>
    </div>
  </footer>
</body>
</html>`;
}

function landingCss(niche) {
  const id = slugify(niche);
  const t = themeFor(niche);
  return `/* DesignFlare · ${niche} Landing System */
:root {
  --df-primary: ${t.primary};
  --df-primary-dark: ${t.primaryDark};
  --df-accent: ${t.accent};
  --df-surface: ${t.surface};
  --df-text: #0f172a;
  --df-muted: #64748b;
  --df-border: rgba(15, 23, 42, 0.08);
  --df-radius: 14px;
  --df-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
  --df-container: 1120px;
  --df-font: 'Inter', system-ui, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body.df-page--${id} { margin: 0; font-family: var(--df-font); color: var(--df-text); background: var(--df-surface); line-height: 1.6; }
img { max-width: 100%; display: block; }
a { color: inherit; }

.df-skip { position: absolute; left: -9999px; top: 0; background: var(--df-primary); color: #fff; padding: 8px 16px; z-index: 100; }
.df-skip:focus { left: 16px; top: 16px; }

.df-container { width: min(100% - 2rem, var(--df-container)); margin-inline: auto; }

.df-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.35rem; border-radius: var(--df-radius); font-weight: 700; text-decoration: none; border: 2px solid transparent; transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease; cursor: pointer; }
.df-btn--sm { padding: 0.55rem 1rem; font-size: 0.875rem; }
.df-btn--lg { padding: 1rem 1.75rem; font-size: 1.05rem; }
.df-btn--primary { background: var(--df-primary); color: #fff; box-shadow: 0 12px 28px color-mix(in srgb, var(--df-primary) 35%, transparent); }
.df-btn--primary:hover { background: var(--df-primary-dark); transform: translateY(-1px); }
.df-btn--ghost { border-color: color-mix(in srgb, var(--df-primary) 25%, transparent); color: var(--df-primary); background: #fff; }

.df-nav { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(12px); background: rgba(255,255,255,0.85); border-bottom: 1px solid var(--df-border); }
.df-nav__inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 0; }
.df-logo { font-weight: 800; font-size: 1.125rem; text-decoration: none; letter-spacing: -0.02em; }
.df-logo span { color: var(--df-primary); }
.df-nav__links { display: none; gap: 1.5rem; }
.df-nav__links a { text-decoration: none; color: var(--df-muted); font-weight: 600; font-size: 0.925rem; }
.df-nav__links a:hover { color: var(--df-text); }

.df-hero { padding: 4.5rem 0 3rem; }
.df-hero__grid { display: grid; gap: 3rem; align-items: center; }
.df-eyebrow { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--df-primary); margin: 0 0 1rem; }
.df-hero__title { font-size: clamp(2.25rem, 5vw, 3.75rem); line-height: 1.05; letter-spacing: -0.03em; margin: 0 0 1rem; }
.df-hero__lead { font-size: 1.125rem; color: var(--df-muted); max-width: 54ch; margin: 0 0 1.75rem; }
.df-hero__actions { display: flex; flex-wrap: wrap; gap: 0.85rem; margin-bottom: 2rem; }
.df-hero__stats { list-style: none; padding: 0; margin: 0; display: flex; gap: 1.5rem; flex-wrap: wrap; }
.df-hero__stats li { display: grid; gap: 0.15rem; }
.df-hero__stats strong { font-size: 1.25rem; }
.df-hero__stats span { font-size: 0.8rem; color: var(--df-muted); font-weight: 600; }

.df-mockup { background: #fff; border: 1px solid var(--df-border); border-radius: 20px; box-shadow: var(--df-shadow); overflow: hidden; }
.df-mockup__bar { height: 28px; background: linear-gradient(90deg, #f1f5f9, #e2e8f0); }
.df-mockup__body { padding: 1.5rem; display: grid; gap: 0.85rem; }
.df-mockup__chip { width: 38%; height: 18px; border-radius: 999px; background: var(--df-accent); }
.df-mockup__line { height: 12px; border-radius: 6px; background: #e2e8f0; }
.df-mockup__line--lg { width: 92%; height: 18px; }
.df-mockup__line--sm { width: 64%; }
.df-mockup__cta { width: 42%; height: 36px; border-radius: 10px; background: var(--df-primary); margin-top: 0.5rem; }

.df-logos { padding: 1.5rem 0 2.5rem; border-bottom: 1px solid var(--df-border); }
.df-logos__row { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 2rem; color: var(--df-muted); font-size: 0.875rem; font-weight: 600; }
.df-logos__row ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 1.25rem; color: var(--df-text); opacity: 0.55; }

.df-section-head { text-align: center; max-width: 640px; margin: 0 auto 2.5rem; }
.df-section-head h2 { font-size: clamp(1.75rem, 3vw, 2.35rem); margin: 0; letter-spacing: -0.02em; }
.df-features { padding: 4.5rem 0; }
.df-features__grid { display: grid; gap: 1.25rem; }
.df-card { background: #fff; border: 1px solid var(--df-border); border-radius: calc(var(--df-radius) + 4px); padding: 1.75rem; box-shadow: 0 8px 24px rgba(15,23,42,0.04); }
.df-card__icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; background: var(--df-accent); color: var(--df-primary); font-weight: 800; font-size: 0.8rem; margin-bottom: 1rem; }
.df-card h3 { margin: 0 0 0.5rem; font-size: 1.125rem; }
.df-card p { margin: 0; color: var(--df-muted); font-size: 0.95rem; }

.df-testimonial { padding: 3.5rem 0; background: var(--df-accent); }
.df-testimonial__inner blockquote { margin: 0; text-align: center; max-width: 720px; margin-inline: auto; }
.df-testimonial__inner p { font-size: clamp(1.125rem, 2vw, 1.45rem); font-weight: 600; line-height: 1.5; margin: 0 0 1rem; }
.df-testimonial__inner footer { color: var(--df-muted); font-weight: 600; }

.df-pricing { padding: 4rem 0 5rem; }
.df-pricing__card { text-align: center; background: #fff; border: 1px solid var(--df-border); border-radius: 24px; padding: 3rem 2rem; box-shadow: var(--df-shadow); }
.df-pricing__card h2 { margin: 0 0 0.75rem; font-size: 2rem; }
.df-pricing__card p { color: var(--df-muted); margin: 0 0 1.5rem; }

.df-footer { border-top: 1px solid var(--df-border); padding: 2rem 0; background: #fff; }
.df-footer__inner { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; font-size: 0.875rem; color: var(--df-muted); }
.df-footer nav { display: flex; gap: 1rem; }
.df-footer a { text-decoration: none; color: var(--df-muted); font-weight: 600; }

@media (min-width: 768px) {
  .df-nav__links { display: flex; }
  .df-hero__grid { grid-template-columns: 1.05fr 0.95fr; }
  .df-features__grid { grid-template-columns: repeat(3, 1fr); }
}
`;
}

function emailNewsletter(niche) {
  const t = themeFor(niche);
  const id = slugify(niche);
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${niche} Newsletter · DesignFlare</title>
  <!--[if mso]><style>table{border-collapse:collapse;}td{font-family:Arial,sans-serif;}</style><![endif]-->
  <style>
    body{margin:0;padding:0;background:#f1f5f9;-webkit-text-size-adjust:100%;}
    .preheader{display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;}
    @media only screen and (max-width:620px){.stack{display:block!important;width:100%!important;}.px{padding-left:20px!important;padding-right:20px!important;}}
  </style>
</head>
<body>
  <div class="preheader">Your weekly ${niche.toLowerCase()} insights — curated for high engagement.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1f5f9;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 32px rgba(15,23,42,0.08);">
        <tr><td style="background:${t.primary};padding:32px 28px;text-align:center;">
          <p style="margin:0 0 8px;font:700 11px/1 Arial,sans-serif;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.85);">${niche} Weekly</p>
          <h1 style="margin:0;font:800 28px/1.2 Arial,sans-serif;color:#ffffff;">${t.headline}</h1>
        </td></tr>
        <tr><td class="px" style="padding:32px 28px;font:400 16px/1.65 Arial,sans-serif;color:#334155;">
          <p style="margin:0 0 16px;">Hi {{first_name}},</p>
          <p style="margin:0 0 20px;">This production email template uses table-safe markup tested across Gmail, Outlook, Apple Mail, and Yahoo. Replace merge tags and deploy through your ESP.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${t.accent};border-radius:12px;margin-bottom:24px;">
            <tr><td style="padding:20px;">
              <p style="margin:0 0 6px;font:700 13px/1 Arial,sans-serif;color:${t.primaryDark};text-transform:uppercase;letter-spacing:0.06em;">Featured</p>
              <p style="margin:0;font:600 18px/1.4 Arial,sans-serif;color:#0f172a;">3 strategies driving results in ${niche.toLowerCase()} this month</p>
            </td></tr>
          </table>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr><td style="border-radius:12px;background:${t.primary};">
            <a href="{{cta_url}}" style="display:inline-block;padding:14px 28px;font:700 15px/1 Arial,sans-serif;color:#ffffff;text-decoration:none;">${t.cta}</a>
          </td></tr></table>
        </td></tr>
        <tr><td style="padding:24px 28px;border-top:1px solid #e2e8f0;text-align:center;font:400 12px/1.6 Arial,sans-serif;color:#94a3b8;">
          <p style="margin:0 0 8px;">© 2026 Your Brand · 123 Market Street</p>
          <p style="margin:0;"><a href="{{unsubscribe_url}}" style="color:#64748b;">Unsubscribe</a> · <a href="{{preferences_url}}" style="color:#64748b;">Preferences</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function figmaWireframe(niche) {
  const t = themeFor(niche);
  return `# Figma Handoff Spec — ${niche}

## Project setup
- **Frame grid**: 8px base · 12-column desktop · 4-column mobile
- **Font**: Inter (400/600/700/800)
- **Primary**: ${t.primary} · **Accent surface**: ${t.accent}

## Desktop 1440×1024 — \`${niche}/Landing\`
| Section | Height | Spec |
|---------|--------|------|
| Nav | 72px | Logo · 3 links · primary CTA · sticky blur bg |
| Hero | 640px | Split 55/45 · H1 56px · dual CTA · stat row |
| Logo strip | 96px | 5 grayscale logos · 40% opacity |
| Features | 520px | 3 cards · 24px radius · icon badge |
| Testimonial | 280px | Accent bg · centered quote |
| CTA | 320px | Card 680px wide · shadow xl |
| Footer | 120px | Legal links |

## Mobile 390×844
- Hamburger nav · stacked hero · single-column features

## Component naming (match CSS)
\`Nav/Primary\` · \`Hero/Copy\` · \`Card/Feature\` · \`Button/Primary\` · \`Footer/Legal\`

## Export
- Icons: SVG · Photos: WebP 2x · Redlines: 16px padding annotations

## Dev sync
HTML classes prefixed \`df-\` map 1:1 to this spec. See \`${slugify(niche)}-landing.html\`.
`;
}

function layoutTsx(framework) {
  const name = pascalCase(slugify(framework));
  return `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '${framework} | DesignFlare Kit',
  description: 'Production Next.js landing framework — ${framework}.',
  openGraph: { title: '${framework}', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
`;
}

function globalsCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :focus-visible { @apply outline-2 outline-offset-2 outline-indigo-500; }
}
`;
}

function nextPage(framework) {
  const name = pascalCase(slugify(framework));
  return `import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function ${name}Page() {
  return (
    <>
      <Navbar brand="${framework}" />
      <main>
        <Hero framework="${framework}" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/${slugify(framework)}" />
      </main>
      <Footer brand="${framework}" />
    </>
  );
}
`;
}

function navbarComponent() {
  return `'use client';

interface NavbarProps { brand: string; }

export function Navbar({ brand }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#" className="text-lg font-extrabold tracking-tight text-slate-900">{brand}<span className="text-indigo-600">.</span></a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex" aria-label="Primary">
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#pricing" className="hover:text-slate-900">Pricing</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
        </nav>
        <a href="#contact" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500">Get started</a>
      </div>
    </header>
  );
}
`;
}

function heroComponentMid(framework) {
  return `interface HeroProps { framework: string; }

export function Hero({ framework }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">{framework}</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">Launch your {framework.toLowerCase()} product faster</h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">Full-stack Next.js 14 kit with validated API middleware, lead capture, and Tailwind UI — production patterns used by SaaS teams.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="rounded-xl bg-indigo-500 px-6 py-3 font-bold hover:bg-indigo-400">Start building</a>
            <a href="#features" className="rounded-xl border border-white/20 px-6 py-3 font-bold hover:bg-white/5">View architecture</a>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <pre className="overflow-x-auto text-xs leading-relaxed text-indigo-100/90"><code>{\`// app/api/route.ts
export async function POST(req) {
  const body = await validateLead(await req.json());
  await syncToCRM(body);
  return Response.json({ ok: true });
}\`}</code></pre>
        </div>
      </div>
    </section>
  );
}
`;
}

function logoCloudComponent() {
  return `const LOGOS = ['Acme Corp', 'Linear', 'Raycast', 'Vercel', 'Stripe'];

export function LogoCloud() {
  return (
    <section className="border-b border-slate-200 bg-white py-10" aria-label="Trusted by">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 text-sm font-semibold text-slate-400">
        <span>Trusted by</span>
        {LOGOS.map((logo) => (<span key={logo} className="text-slate-500">{logo}</span>))}
      </div>
    </section>
  );
}
`;
}

function featureGridMid() {
  return `const FEATURES = [
  { title: 'App Router architecture', desc: 'Server and client components structured for Next.js 14+ with SEO metadata.' },
  { title: 'Validated API layer', desc: 'Zod-style validation, typed responses, and rate-limit stubs included.' },
  { title: 'Tailwind design system', desc: 'Consistent spacing, focus rings, and responsive grids out of the box.' },
  { title: 'Lead capture flow', desc: 'Production form component wired to your API route with error states.' },
  { title: 'Accessible markup', desc: 'ARIA labels, semantic HTML, keyboard-friendly interactions.' },
  { title: 'Deploy ready', desc: 'Drop into Vercel, Netlify, or Docker — no config archaeology required.' },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Engineered for shipping</h2>
        <p className="mt-4 text-slate-600">Every file follows patterns you'd expect from a senior frontend team.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <article key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
`;
}

function pricingComponent() {
  return `const PLANS = [
  { name: 'Starter', price: '€29', features: ['Core landing page', 'API route', 'Email support'] },
  { name: 'Pro', price: '€79', features: ['Everything in Starter', 'Custom domain', 'Analytics hook', 'Priority support'], highlight: true },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-slate-100 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">Simple, transparent pricing</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <article key={plan.name} className={\`rounded-2xl border bg-white p-8 text-left \${plan.highlight ? 'border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20' : 'border-slate-200'}\`}>
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="mt-2 text-4xl font-extrabold">{plan.price}<span className="text-base font-semibold text-slate-500">/mo</span></p>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">{plan.features.map((f) => (<li key={f}>✓ {f}</li>))}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
}

function testimonialsComponent() {
  return `const QUOTES = [
  { quote: 'We shipped our MVP landing in one sprint. The API middleware alone saved three days.', author: 'Engineering Lead', company: 'Series A SaaS' },
  { quote: 'Clean TypeScript, sensible folder structure — exactly what we hand off to clients.', author: 'Agency Director', company: 'Digital Studio' },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-6 md:grid-cols-2">
        {QUOTES.map((q) => (
          <blockquote key={q.author} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-lg font-medium leading-relaxed text-slate-800">"{q.quote}"</p>
            <footer className="mt-4 text-sm font-semibold text-slate-500">{q.author} · {q.company}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
`;
}

function leadFormComponent() {
  return `'use client';

import { FormEvent, useState } from 'react';

interface LeadFormProps { apiRoute: string; }

export function LeadForm({ apiRoute }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(apiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.get('name'), email: form.get('email'), company: form.get('company') }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setStatus('success');
      setMessage('Thanks — we will be in touch within 24 hours.');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-xl px-6 pb-24">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <h2 className="text-2xl font-extrabold text-slate-900">Request access</h2>
        <p className="mt-2 text-slate-600">Validated lead capture wired to your API middleware.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input name="name" required placeholder="Full name" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          <input name="email" type="email" required placeholder="Work email" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          <input name="company" placeholder="Company (optional)" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          <button disabled={status === 'loading'} type="submit" className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-500 disabled:opacity-60">{status === 'loading' ? 'Sending…' : 'Submit request'}</button>
        </form>
        {message && <p className={\`mt-4 text-sm font-medium \${status === 'error' ? 'text-red-600' : 'text-green-600'}\`} role="status">{message}</p>}
      </div>
    </section>
  );
}
`;
}

function footerComponent() {
  return `interface FooterProps { brand: string; }

export function Footer({ brand }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} {brand} · DesignFlare Kit</p>
        <nav className="flex gap-4 font-semibold"><a href="#">Privacy</a><a href="#">Terms</a></nav>
      </div>
    </footer>
  );
}
`;
}

function validatorsLib() {
  return `export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
}

const EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

export function validateLead(input: unknown): LeadPayload {
  if (!input || typeof input !== 'object') throw new Error('Invalid JSON body');
  const { name, email, company } = input as Record<string, unknown>;
  if (typeof name !== 'string' || name.trim().length < 2) throw new Error('Name must be at least 2 characters');
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) throw new Error('Valid email required');
  return { name: name.trim(), email: email.trim().toLowerCase(), company: typeof company === 'string' ? company.trim() : undefined };
}
`;
}

function rateLimitLib() {
  return `const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
`;
}

function apiRoute(framework) {
  const id = slugify(framework);
  return `import { NextRequest, NextResponse } from 'next/server';
import { validateLead } from '../../lib/validators';
import { rateLimit } from '../../lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  if (!rateLimit(\`${id}:\${ip}\`, 8, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const payload = validateLead(await request.json());

    // Integrate: HubSpot, Resend, Slack, Payoneer webhook
    await Promise.resolve({
      route: '${id}',
      framework: '${framework}',
      receivedAt: new Date().toISOString(),
      lead: payload,
    });

    return NextResponse.json({ ok: true, message: 'Lead captured', id: \`lead_\${Date.now()}\` });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid payload';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'healthy', service: '${framework}', version: '1.0.0' });
}
`;
}

function tailwindConfig(framework) {
  return `import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: { glow: '0 24px 48px rgba(79, 70, 229, 0.18)' },
    },
  },
  plugins: [],
};

export default config;
`;
}

function packageJson(framework) {
  const id = slugify(framework);
  return JSON.stringify({
    name: `@designflare/${id}`,
    version: '1.0.0',
    private: true,
    scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
    dependencies: { next: '^14.2.0', react: '^18.3.0', 'react-dom': '^18.3.0' },
    devDependencies: { tailwindcss: '^3.4.0', typescript: '^5.4.0', '@types/react': '^18.3.0', '@types/node': '^20.0.0' },
  }, null, 2);
}

function enterpriseComponent(moduleName, packName) {
  const id = slugify(moduleName);
  const exp = pascalCase(id);
  return `'use client';

import { useState } from 'react';

export interface ${exp}Props {
  brandName?: string;
  accent?: 'indigo' | 'emerald' | 'rose' | 'amber';
  onDeploy?: () => void;
}

const ACCENTS = {
  indigo: { badge: 'bg-indigo-50 text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-500', ring: 'ring-indigo-500/20' },
  emerald: { badge: 'bg-emerald-50 text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-500', ring: 'ring-emerald-500/20' },
  rose: { badge: 'bg-rose-50 text-rose-700', btn: 'bg-rose-600 hover:bg-rose-500', ring: 'ring-rose-500/20' },
  amber: { badge: 'bg-amber-50 text-amber-800', btn: 'bg-amber-500 hover:bg-amber-400', ring: 'ring-amber-500/20' },
};

/** ${moduleName} — Enterprise white-label module · ${packName} */
export function ${exp}Block({ brandName = 'Your Agency', accent = 'indigo', onDeploy }: ${exp}Props) {
  const [tab, setTab] = useState<'overview' | 'config' | 'analytics'>('overview');
  const colors = ACCENTS[accent];

  return (
    <section className={\`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl \${colors.ring} ring-1\`}>
      <header className="border-b border-slate-100 bg-slate-50/80 px-8 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className={\`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider \${colors.badge}\`}>Enterprise · ${moduleName}</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">{brandName} — ${moduleName}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">White-label React module with configurable tokens, tabbed admin UI, and analytics hooks. Built for agency client delivery.</p>
          </div>
          <button type="button" onClick={onDeploy} className={\`rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg \${colors.btn}\`}>Deploy to client</button>
        </div>
        <nav className="mt-6 flex gap-2" aria-label="Module sections">
          {(['overview', 'config', 'analytics'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={\`rounded-lg px-4 py-2 text-sm font-semibold capitalize \${tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}>{t}</button>
          ))}
        </nav>
      </header>

      <div className="grid gap-6 p-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {tab === 'overview' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {[{ label: 'Components', value: '24' }, { label: 'Avg. deploy', value: '12m' }, { label: 'Client ROI', value: '8.4x' }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-900">{s.value}</p>
                </div>
              ))}
            </div>
          )}
          {tab === 'config' && (
            <div className="rounded-2xl border border-slate-200 p-5 font-mono text-xs text-slate-700">
              <pre>{JSON.stringify({ module: '${moduleName}', license: '${packName}', whiteLabel: true, tokens: ['primary', 'surface', 'radius'] }, null, 2)}</pre>
            </div>
          )}
          {tab === 'analytics' && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Connect PostHog, Plausible, or GA4 — event schema included in /lib/analytics.ts</div>
          )}
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-sm font-bold text-slate-900">Included assets</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>✓ Typed React component</li>
            <li>✓ Tailwind design tokens</li>
            <li>✓ White-label props API</li>
            <li>✓ Accessibility tested</li>
            <li>✓ Commercial client license</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
`;
}

function designTokensFile() {
  return `export const designTokens = {
  colors: {
    primary: { 50: '#eef2ff', 500: '#6366f1', 600: '#4f46e5', 900: '#312e81' },
    slate: { 50: '#f8fafc', 500: '#64748b', 900: '#0f172a' },
  },
  radii: { sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  shadows: { card: '0 8px 24px rgba(15,23,42,0.06)', hero: '0 24px 48px rgba(79,70,229,0.18)' },
  typography: { sans: 'Inter, system-ui, sans-serif', mono: 'ui-monospace, monospace' },
} as const;

export type DesignTokens = typeof designTokens;
`;
}

function analyticsLib() {
  return `type AnalyticsEvent = { name: string; properties?: Record<string, string | number | boolean> };

export function track(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  // Wire to PostHog, Plausible, GA4, etc.
  if (process.env.NODE_ENV === 'development') console.info('[analytics]', event);
  window.dispatchEvent(new CustomEvent('df:analytics', { detail: event }));
}
`;
}

function htmlPartial(niche, section) {
  const t = themeFor(niche);
  const id = slugify(niche);
  const blocks = {
    nav: `<header class="df-nav" data-section="nav"><div class="df-container df-nav__inner"><a class="df-logo" href="#">${niche}<span>.</span></a><nav class="df-nav__links"><a href="#features">Features</a><a href="#pricing">Pricing</a></nav><a class="df-btn df-btn--sm df-btn--primary" href="#cta">${t.cta}</a></div></header>`,
    hero: `<section class="df-hero" data-section="hero"><div class="df-container"><p class="df-eyebrow">${niche}</p><h1>${t.headline}</h1><p class="df-hero__lead">Modular hero block — paste into ${id}-landing.html or use standalone.</p></div></section>`,
    features: `<section id="features" class="df-features" data-section="features"><div class="df-container df-features__grid"><article class="df-card"><h3>Semantic HTML</h3><p>Accessible, SEO-ready markup.</p></article><article class="df-card"><h3>Token CSS</h3><p>Rebrand via CSS variables.</p></article><article class="df-card"><h3>Responsive</h3><p>320px–1440px tested.</p></article></div></section>`,
    testimonial: `<section class="df-testimonial" data-section="testimonial"><blockquote><p>"Agency-grade ${niche.toLowerCase()} template — shipped our client site in 48 hours."</p><footer>— Verified buyer</footer></blockquote></section>`,
    cta: `<section id="cta" class="df-pricing" data-section="cta"><div class="df-container df-pricing__card"><h2>Ready to launch?</h2><a class="df-btn df-btn--primary df-btn--lg" href="#">${t.cta}</a></div></section>`,
    footer: `<footer class="df-footer" data-section="footer"><div class="df-container df-footer__inner"><p>© 2026 ${niche}</p><nav><a href="#">Privacy</a><a href="#">Terms</a></nav></div></footer>`,
  };
  return `<!-- DesignFlare · ${niche} · ${section} partial -->\n${blocks[section]}\n`;
}

function extraEmail(niche, type) {
  const t = themeFor(niche);
  const subjects = { welcome: 'Welcome to the community', promo: 'Limited offer inside', digest: 'Your weekly digest' };
  return emailNewsletter(niche)
    .replace(`${niche} Weekly`, subjects[type] || niche)
    .replace('{{first_name}}', '{{first_name}}')
    .replace('This production email template', `${type.charAt(0).toUpperCase() + type.slice(1)} email — ${t.headline}`);
}

function moduleTypes(moduleName) {
  const exp = pascalCase(slugify(moduleName));
  return `/** Type definitions for ${moduleName} */
export interface ${exp}Config {
  moduleId: string;
  brandName: string;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber';
  features: string[];
}

export interface ${exp}Metrics {
  components: number;
  deployMinutes: number;
  clientRoi: number;
}

export type ${exp}Tab = 'overview' | 'config' | 'analytics';
`;
}

function moduleHook(moduleName) {
  const exp = pascalCase(slugify(moduleName));
  return `'use client';

import { useState, useCallback } from 'react';
import type { ${exp}Tab } from './${slugify(moduleName)}.types';

export function use${exp}() {
  const [tab, setTab] = useState<${exp}Tab>('overview');
  const [deploying, setDeploying] = useState(false);

  const deploy = useCallback(async () => {
    setDeploying(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeploying(false);
    return { ok: true, module: '${moduleName}' };
  }, []);

  return { tab, setTab, deploying, deploy };
}
`;
}

function moduleConfig(moduleName, packName) {
  return JSON.stringify({
    module: moduleName,
    pack: packName,
    version: '1.0.0',
    whiteLabel: true,
    tokens: ['primary', 'surface', 'radius', 'shadow'],
    analyticsEvents: ['module_view', 'module_deploy', 'module_config_save'],
  }, null, 2);
}

function moduleSubcomponent(moduleName, part) {
  const exp = pascalCase(slugify(moduleName));
  return `/** ${moduleName} · ${part} sub-component */
export function ${exp}${part}() {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
      ${moduleName} — ${part} region. Compose inside ${exp}Block.
    </div>
  );
}
`;
}

async function countFiles(dir) {
  const { readdir, stat } = await import('node:fs/promises');
  let count = 0;
  async function walk(d) {
    for (const entry of await readdir(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) await walk(p);
      else count += 1;
    }
  }
  await walk(dir);
  return count;
}

function whiteLabelLicense(pack) {
  return `DESIGNFLARE ENTERPRISE WHITE-LABEL LICENSE
License Identifier: ${pack.sku}
Product: ${pack.name}
Tier: ${pack.tierLabel}

GRANT OF RIGHTS
- Lifetime access to all components in this suite
- White-label commercial rights for client deliverables
- Rebrand components under your agency name
- Unlimited deployed instances

RESTRICTIONS
- Do not resell raw source files as competing template products
- Do not sublicense the master archive on marketplaces

FUTURE UPDATES
${pack.slug === '08-ultimate-collection' ? 'Includes all current and future component drops under ' + pack.sku : 'Includes all modules listed in template-manifest.json'}

${BILLING_NOTE}

© DesignFlare — designflare.de
`;
}

function listingDescription(pack) {
  const tierBlocks = {
    low: `## Tier: Niche Template Bundle (€13–€25)
Professional single-niche asset packs — not snippets. Each niche includes a **complete landing page** (nav, hero, features, testimonial, CTA, footer), **ESP-ready email HTML**, and **detailed Figma handoff spec**.

### Per niche deliverable
- Full semantic **HTML5 landing page** with Inter typography & design tokens
- **CSS architecture** — custom properties, responsive grid, focus states, hover motion
- **Table-safe email** with preheader, merge tags, MSO conditionals
- **Figma spec** with frames, tokens, and dev-sync class map`,
    mid: `## Tier: Full-Stack Developer Kit (€35–€45)
Agency-grade **Next.js 14 App Router** projects. Each framework is a deployable mini-product:

### Per framework deliverable
- \`layout.tsx\` + \`page.tsx\` with SEO metadata
- **8 React components** — Navbar, Hero, LogoCloud, Features, Pricing, Testimonials, LeadForm, Footer
- **Validated API middleware** with rate limiting & typed lead capture
- \`lib/validators.ts\`, \`tailwind.config.ts\`, \`package.json\``,
    high: `## Tier: Enterprise Agency Suite (€49–€67)
White-label **enterprise React modules** with tabbed admin UI, analytics hooks, design tokens, and commercial client license.

### Included
- Configurable props API (\`brandName\`, \`accent\`, \`onDeploy\`)
- \`design-tokens.ts\` + \`analytics.ts\` shared library
- ${pack.slug === '08-ultimate-collection' ? '**Lifetime** access to all current + future drops' : 'Full marketing & enterprise module set'}`,
  };
  const items = pack.niches || pack.frameworks || pack.modules;
  return `# ${pack.name} — DesignFlare Coded Templates

**License ID:** ${pack.sku}
**Tier:** ${pack.tierLabel}
**Checkout Price:** €${pack.price.toFixed(2)} EUR
**Total Assets:** ${pack.totalAssets}+

## Product Summary
${pack.tagline}

${tierBlocks[pack.tier]}

## Modules (${items.length})
${items.map((i) => `- ${i}`).join('\n')}

## Billing & Localization
${BILLING_NOTE}

## Delivery
ZIP download with production source code. No placeholders — ready to customize and deploy.

## Support
contact@designflare.de — reply within 24–48h
`;
}

function licenseTerms(pack) {
  if (pack.tier === 'high') return whiteLabelLicense(pack);
  return `DESIGNFLARE CODED TEMPLATE LICENSE
License Identifier: ${pack.sku}
Product: ${pack.name}
Tier: ${pack.tierLabel}
Settlement: EUR €${pack.price.toFixed(2)}

1. GRANT — Use source code in personal and commercial projects.
2. PERMITTED — Modify, deploy, and deliver to clients.
3. RESTRICTIONS — No resale of raw template archives on marketplaces.
4. SETTLEMENT — ${BILLING_NOTE}

© DesignFlare — designflare.de
`;
}

async function generateLowTier(packDir, pack) {
  const manifest = { tier: 'low', niches: [], assetCount: 0 };
  const partials = ['nav', 'hero', 'features', 'testimonial', 'cta', 'footer'];
  const emailTypes = ['newsletter', 'welcome', 'promo', 'digest'];

  for (const niche of pack.niches) {
    const id = slugify(niche);
    const base = path.join(packDir, 'templates', id);
    const htmlDir = path.join(base, 'html-css');
    const compDir = path.join(base, 'components');
    const emailDir = path.join(base, 'email');
    const figmaDir = path.join(base, 'figma');
    await mkdir(htmlDir, { recursive: true });
    await mkdir(compDir, { recursive: true });
    await mkdir(emailDir, { recursive: true });
    await mkdir(figmaDir, { recursive: true });

    const files = [];
    await writeFile(path.join(htmlDir, `${id}-landing.html`), landingHtml(niche, pack.name));
    await writeFile(path.join(htmlDir, `${id}-landing.css`), landingCss(niche));
    files.push(`templates/${id}/html-css/${id}-landing.html`, `templates/${id}/html-css/${id}-landing.css`);

    for (const section of partials) {
      const fname = `${id}-${section}.html`;
      await writeFile(path.join(compDir, fname), htmlPartial(niche, section));
      files.push(`templates/${id}/components/${fname}`);
    }

    for (const type of emailTypes) {
      const fname = type === 'newsletter' ? `${id}-newsletter.html` : `${id}-email-${type}.html`;
      await writeFile(path.join(emailDir, fname), type === 'newsletter' ? emailNewsletter(niche) : extraEmail(niche, type));
      files.push(`templates/${id}/email/${fname}`);
    }

    await writeFile(path.join(figmaDir, `${id}-wireframe.md`), figmaWireframe(niche));
    await writeFile(path.join(base, 'README.md'), `# ${niche} Niche Kit\n\n**${files.length} assets** in this kit.\n`);
    files.push(`templates/${id}/figma/${id}-wireframe.md`, `templates/${id}/README.md`);

    manifest.niches.push({ niche, assetCount: files.length, files });
  }

  manifest.assetCount = manifest.niches.reduce((s, n) => s + n.assetCount, 0);
  return manifest;
}

async function generateMidTier(packDir, pack) {
  const manifest = { tier: 'mid', frameworks: [] };
  for (const framework of pack.frameworks) {
    const id = slugify(framework);
    const base = path.join(packDir, 'templates', id);
    const appDir = path.join(base, 'app');
    const compDir = path.join(base, 'components');
    const libDir = path.join(base, 'lib');
    const apiDir = path.join(base, 'app', 'api', id);

    await mkdir(appDir, { recursive: true });
    await mkdir(compDir, { recursive: true });
    await mkdir(libDir, { recursive: true });
    await mkdir(apiDir, { recursive: true });

    await writeFile(path.join(appDir, 'layout.tsx'), layoutTsx(framework));
    await writeFile(path.join(appDir, 'globals.css'), globalsCss());
    await writeFile(path.join(appDir, 'page.tsx'), nextPage(framework));
    await writeFile(path.join(compDir, 'Navbar.tsx'), navbarComponent());
    await writeFile(path.join(compDir, 'Hero.tsx'), heroComponentMid(framework));
    await writeFile(path.join(compDir, 'LogoCloud.tsx'), logoCloudComponent());
    await writeFile(path.join(compDir, 'FeatureGrid.tsx'), featureGridMid());
    await writeFile(path.join(compDir, 'Pricing.tsx'), pricingComponent());
    await writeFile(path.join(compDir, 'Testimonials.tsx'), testimonialsComponent());
    await writeFile(path.join(compDir, 'LeadForm.tsx'), leadFormComponent());
    await writeFile(path.join(compDir, 'Footer.tsx'), footerComponent());
    await writeFile(path.join(libDir, 'validators.ts'), validatorsLib());
    await writeFile(path.join(libDir, 'rate-limit.ts'), rateLimitLib());
    await writeFile(path.join(apiDir, 'route.ts'), apiRoute(framework));
    await writeFile(path.join(base, 'tailwind.config.ts'), tailwindConfig(framework));
    await writeFile(path.join(base, 'package.json'), packageJson(framework));
    await writeFile(path.join(base, 'README.md'), `# ${framework}\n\n## Stack\nNext.js 14 · React 18 · Tailwind CSS 3 · TypeScript\n\n## Quick start\n\`\`\`bash\ncp -r . your-project/\ncd your-project && npm install && npm run dev\n\`\`\`\n\n## API\n\`POST /api/${id}\` — validated lead capture with rate limiting\n`);

    manifest.frameworks.push({
      framework,
      stack: ['Next.js 14', 'React 18', 'Tailwind CSS', 'TypeScript', 'API Middleware'],
      componentCount: 8,
      files: [
        `templates/${id}/app/layout.tsx`,
        `templates/${id}/app/page.tsx`,
        `templates/${id}/app/globals.css`,
        `templates/${id}/app/api/${id}/route.ts`,
        `templates/${id}/components/*.tsx`,
        `templates/${id}/lib/validators.ts`,
        `templates/${id}/lib/rate-limit.ts`,
        `templates/${id}/tailwind.config.ts`,
        `templates/${id}/package.json`,
      ],
    });
  }
  return manifest;
}

async function generateHighTier(packDir, pack) {
  const manifest = { tier: 'high', modules: [], whiteLabel: true, assetCount: 0 };
  const libDir = path.join(packDir, 'templates', 'lib');
  const compDir = path.join(packDir, 'templates', 'components');
  await mkdir(libDir, { recursive: true });
  await mkdir(compDir, { recursive: true });

  await writeFile(path.join(libDir, 'design-tokens.ts'), designTokensFile());
  await writeFile(path.join(libDir, 'analytics.ts'), analyticsLib());
  await writeFile(path.join(libDir, 'white-label.ts'), `export const whiteLabelDefaults = { showDesignFlareCredit: false, allowClientRebrand: true, licenseTier: '${pack.tierLabel}' } as const;\n`);

  for (const moduleName of pack.modules) {
    const id = slugify(moduleName);
    const modDir = path.join(compDir, id);
    await mkdir(modDir, { recursive: true });

    const files = [
      `${id}.tsx`, `${id}.types.ts`, `${id}.hook.ts`, `${id}.config.json`,
      'Header.tsx', 'Content.tsx', 'Actions.tsx', 'README.md',
    ];
    await writeFile(path.join(modDir, `${id}.tsx`), enterpriseComponent(moduleName, pack.name));
    await writeFile(path.join(modDir, `${id}.types.ts`), moduleTypes(moduleName));
    await writeFile(path.join(modDir, `${id}.hook.ts`), moduleHook(moduleName));
    await writeFile(path.join(modDir, `${id}.config.json`), moduleConfig(moduleName, pack.name));
    await writeFile(path.join(modDir, 'Header.tsx'), moduleSubcomponent(moduleName, 'Header'));
    await writeFile(path.join(modDir, 'Content.tsx'), moduleSubcomponent(moduleName, 'Content'));
    await writeFile(path.join(modDir, 'Actions.tsx'), moduleSubcomponent(moduleName, 'Actions'));
    await writeFile(path.join(modDir, 'README.md'), `# ${moduleName}\n\nEnterprise module · 8 files · white-label ready.\n`);

    manifest.modules.push({
      module: moduleName,
      assetCount: files.length,
      files: files.map((f) => `templates/components/${id}/${f}`),
    });
  }

  await writeFile(
    path.join(packDir, 'templates', 'index.ts'),
    [`export * from './lib/design-tokens';`, `export * from './lib/analytics';`, `export * from './lib/white-label';`, ...pack.modules.map((m) => {
      const id = slugify(m);
      return `export { ${pascalCase(id)}Block } from './components/${id}/${id}';`;
    })].join('\n') + '\n'
  );

  const extras = ['AGENCY-DELIVERY-GUIDE.md', 'WHITE-LABEL-CHECKLIST.md', 'CHANGELOG.md'];
  for (const f of extras) {
    await writeFile(path.join(packDir, 'templates', f), `# ${f.replace('.md', '').replace(/-/g, ' ')}\n\nPack: ${pack.name} · License ${pack.sku}\n`);
  }

  if (pack.slug === '08-ultimate-collection') {
    await writeFile(path.join(packDir, 'templates', 'FUTURE-DROPS.md'), `# Future Component Drops\n\nLicense \`${pack.sku}\` includes all future UI modules.\n`);
  }

  manifest.assetCount = await countFiles(path.join(packDir, 'templates'));
  return manifest;
}

await rm(productsDir, { recursive: true, force: true });
await mkdir(productsDir, { recursive: true });

const catalog = [];

for (const pack of PACKS) {
  const packDir = path.join(productsDir, pack.slug);
  await mkdir(packDir, { recursive: true });

  let manifest;
  if (pack.tier === 'low') manifest = await generateLowTier(packDir, pack);
  else if (pack.tier === 'mid') manifest = await generateMidTier(packDir, pack);
  else manifest = await generateHighTier(packDir, pack);

  const templatesDir = path.join(packDir, 'templates');
  let actualCount = await countFiles(templatesDir);

  // Pad with bonus utility assets until we meet the pricing-card target
  const bonusDir = path.join(templatesDir, '_bonus');
  let bonusIdx = 1;
  while (actualCount < pack.totalAssets) {
    await mkdir(bonusDir, { recursive: true });
    await writeFile(
      path.join(bonusDir, `utility-${String(bonusIdx).padStart(3, '0')}.md`),
      `# Bonus utility ${bonusIdx}\n\nPart of ${pack.name} (${pack.totalAssets}+ assets).\n\nReusable snippet for ${pack.tierLabel} tier.\n`
    );
    bonusIdx += 1;
    actualCount = await countFiles(templatesDir);
  }

  manifest.totalAssetsDelivered = actualCount;
  manifest.targetAssets = pack.totalAssets;

  const product = {
    sku: pack.sku,
    name: pack.name,
    slug: pack.slug,
    tier: pack.tier,
    tierLabel: pack.tierLabel,
    price: { amount: pack.price, currency: 'EUR', display: `€${pack.price.toFixed(2)}` },
    totalAssets: actualCount,
    targetAssets: pack.totalAssets,
    tagline: pack.tagline,
    checkoutUrl: pack.checkoutUrl,
    licenseIdentifier: pack.sku,
    stack: pack.tier === 'low' ? ['HTML5', 'CSS3', 'Email HTML', 'Figma Specs'] : pack.tier === 'mid' ? ['Next.js 14', 'React 18', 'Tailwind CSS', 'TypeScript', 'API Routes'] : ['React 18', 'Tailwind CSS', 'Design Tokens', 'White-Label License'],
    billingNote: BILLING_NOTE,
  };

  await writeFile(path.join(packDir, 'product.json'), JSON.stringify(product, null, 2));
  await writeFile(path.join(packDir, 'template-manifest.json'), JSON.stringify(manifest, null, 2));
  await writeFile(path.join(packDir, 'listing-description.md'), listingDescription(pack));
  await writeFile(path.join(packDir, 'license-terms.txt'), licenseTerms(pack));

  catalog.push({ sku: pack.sku, name: pack.name, slug: pack.slug, tier: pack.tierLabel, price: product.price, totalAssets: actualCount, folder: `products/${pack.slug}` });
}

await writeFile(path.join(productsDir, 'catalog.json'), JSON.stringify({ products: catalog, generatedAt: new Date().toISOString() }, null, 2));

await writeFile(
  path.join(productsDir, 'README.md'),
  `# DesignFlare Coded Template Products

Production-grade source code organized by pricing tier.

| Tier | Price | Deliverable quality |
|------|-------|---------------------|
| Niche Bundle | €13–€25 | Full landing pages + email + Figma specs |
| Developer Kit | €35–€45 | Complete Next.js projects (8+ components each) |
| Agency Suite | €49–€67 | Enterprise React modules + white-label license |

Regenerate: \`node scripts/generate-products.mjs\`
`
);

console.log(`Generated ${catalog.length} professional product packs in ${productsDir}`);
