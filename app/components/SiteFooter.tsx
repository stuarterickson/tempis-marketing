import Link from 'next/link';
import { SITE } from '../site';
import { Wordmark } from './Wordmark';

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-oat text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Wordmark height={30} />
          <p className="mt-4 max-w-sm text-base text-ink-soft">
            Made in Denver by {SITE.company}, for golfers who’d rather play the round than tally it.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal">Tempis Play</h2>
          <ul className="mt-3 space-y-2 text-base text-ink-soft">
            <li><Link href="/beta" className="hover:text-ink hover:underline">Join the beta</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-ink hover:underline">How it works</Link></li>
            <li><a href={SITE.playWebUrl} className="hover:text-ink hover:underline">Sign in on the web</a></li>
            <li><Link href="/clubs" className="hover:text-ink hover:underline">Tempis Studio for clubs</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal">Help</h2>
          <ul className="mt-3 space-y-2 text-base text-ink-soft">
            <li><Link href="/support" className="hover:text-ink hover:underline">Support</Link></li>
            <li><a href={SITE.privacyUrl} className="hover:text-ink hover:underline">Privacy</a></li>
            <li><Link href="/delete-account" className="hover:text-ink hover:underline">Delete your account</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-ink-soft md:px-8">
          © {new Date().getFullYear()} {SITE.company}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
