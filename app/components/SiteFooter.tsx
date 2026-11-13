import Link from 'next/link';
import { SITE } from '../site';
import { Wordmark } from './Wordmark';

export default function SiteFooter() {
  return (
    <footer className="bg-graphite-deep text-on-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark onDark />
          <p className="mt-4 max-w-sm text-base text-on-dark-soft">
            {SITE.tagline} Made in Denver by {SITE.company}.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.11em] text-on-dark-soft">Tempis Play</h2>
          <ul className="mt-3 space-y-2 text-base">
            <li><Link href="/beta" className="hover:underline">Join the beta</Link></li>
            <li><Link href="/#how-it-works" className="hover:underline">How it works</Link></li>
            <li><a href={SITE.playWebUrl} className="hover:underline">Sign in on the web</a></li>
            <li><Link href="/clubs" className="hover:underline">Tempis Studio for clubs</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.11em] text-on-dark-soft">Help</h2>
          <ul className="mt-3 space-y-2 text-base">
            <li><Link href="/support" className="hover:underline">Support</Link></li>
            <li><a href={SITE.privacyUrl} className="hover:underline">Privacy</a></li>
            <li><Link href="/delete-account" className="hover:underline">Delete your account</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-graphite-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-on-dark-soft">
          © {new Date().getFullYear()} {SITE.company}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
