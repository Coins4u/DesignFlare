const LOGOS = ['Acme Corp', 'Linear', 'Raycast', 'Vercel', 'Stripe'];

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
