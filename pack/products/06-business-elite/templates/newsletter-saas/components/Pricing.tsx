const PLANS = [
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
            <article key={plan.name} className={`rounded-2xl border bg-white p-8 text-left ${plan.highlight ? 'border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20' : 'border-slate-200'}`}>
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
