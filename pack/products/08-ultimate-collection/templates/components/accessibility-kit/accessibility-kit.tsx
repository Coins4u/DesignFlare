'use client';

import { useState } from 'react';

export interface AccessibilityKitProps {
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

/** Accessibility Kit — Enterprise white-label module · Ultimate Collection */
export function AccessibilityKitBlock({ brandName = 'Your Agency', accent = 'indigo', onDeploy }: AccessibilityKitProps) {
  const [tab, setTab] = useState<'overview' | 'config' | 'analytics'>('overview');
  const colors = ACCENTS[accent];

  return (
    <section className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl ${colors.ring} ring-1`}>
      <header className="border-b border-slate-100 bg-slate-50/80 px-8 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${colors.badge}`}>Enterprise · Accessibility Kit</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">{brandName} — Accessibility Kit</h2>
            <p className="mt-2 max-w-2xl text-slate-600">White-label React module with configurable tokens, tabbed admin UI, and analytics hooks. Built for agency client delivery.</p>
          </div>
          <button type="button" onClick={onDeploy} className={`rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg ${colors.btn}`}>Deploy to client</button>
        </div>
        <nav className="mt-6 flex gap-2" aria-label="Module sections">
          {(['overview', 'config', 'analytics'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize ${tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>{t}</button>
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
              <pre>{JSON.stringify({ module: 'Accessibility Kit', license: 'Ultimate Collection', whiteLabel: true, tokens: ['primary', 'surface', 'radius'] }, null, 2)}</pre>
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
