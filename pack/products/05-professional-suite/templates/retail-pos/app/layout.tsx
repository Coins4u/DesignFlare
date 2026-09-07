import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Retail POS | DesignFlare Kit',
  description: 'Production Next.js landing framework — Retail POS.',
  openGraph: { title: 'Retail POS', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
