const FEATURES = [
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
