import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter/opsz.css';
import '@fontsource-variable/schibsted-grotesk';
import './globals.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { SITE } from './site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'Backbeat Golf keeps score for you and your group, settles the side games, and remembers every round. Free on iPhone and Android.',
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'Scoring, group rounds and side games that settle themselves. Free on iPhone and Android.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FCFAF7',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ivory focus:px-4 focus:py-2">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
