import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hospitality Booking | DesignFlare Kit',
  description: 'Production Next.js landing framework — Hospitality Booking.',
  openGraph: { title: 'Hospitality Booking', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
