const QUOTES = [
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
