interface HeroProps { framework: string; }

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
          <pre className="overflow-x-auto text-xs leading-relaxed text-indigo-100/90"><code>{`// app/api/route.ts
export async function POST(req) {
  const body = await validateLead(await req.json());
  await syncToCRM(body);
  return Response.json({ ok: true });
}`}</code></pre>
        </div>
      </div>
    </section>
  );
}
