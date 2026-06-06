import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DesignFlare',
  description: 'Premium Canva templates and design services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
