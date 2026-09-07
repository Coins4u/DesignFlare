interface FooterProps { brand: string; }

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
