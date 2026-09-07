'use client';

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
        {message && <p className={`mt-4 text-sm font-medium ${status === 'error' ? 'text-red-600' : 'text-green-600'}`} role="status">{message}</p>}
      </div>
    </section>
  );
}
