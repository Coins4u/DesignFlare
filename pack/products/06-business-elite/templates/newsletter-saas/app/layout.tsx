import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Newsletter SaaS | DesignFlare Kit',
  description: 'Production Next.js landing framework — Newsletter SaaS.',
  openGraph: { title: 'Newsletter SaaS', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
