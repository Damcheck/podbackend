import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SiteShell } from '@/components/ui';
import './globals.css';
const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','600','700'], display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'PODBACKEND — Podcasts that build brands', template: '%s | PODBACKEND' },
  description: 'Strategy, production and growth. PODBACKEND helps modern brands turn conversations into opportunities with professional podcasts.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={roboto.className}><SiteShell>{children}</SiteShell></body></html>;
}
