'use client';

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
