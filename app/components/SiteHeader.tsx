import Link from 'next/link';
import { AnimatedLockup } from './AnimatedLockup';
import { SITE } from '../site';

const NAV = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#side-games', label: 'Games' },
  { href: '/#goals', label: 'Stats' },
  { href: '/clubs', label: 'For clubs' },
  { href: '/support', label: 'Help' },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone bg-oat/95 backdrop-blur supports-[backdrop-filter]:bg-oat/90">
      {/* py-4 / md:py-5 and the gap keep the lockup's clear space (16px at 32px tall, 20px at 40px) */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:gap-5 md:px-8 md:py-5">
        <Link href="/" aria-label="Backbeat Golf" className="shrink-0">
          <AnimatedLockup />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[1.0625rem] text-ink-soft hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-4 md:gap-6">
          {/* Golfers already on Backbeat sign in to the web app (app.backbeatgolf.com); this site has no accounts. */}
          <a href={`${SITE.playWebUrl}/login`} className="hidden whitespace-nowrap text-[1.0625rem] text-ink-soft hover:text-ink lg:inline">Sign in</a>
          <Link href="/beta" className="btn btn-primary btn-sm whitespace-nowrap">Join the beta</Link>
        </div>
      </div>
      <nav aria-label="Sections" className="flex gap-6 overflow-x-auto border-t border-stone px-5 py-2.5 md:px-8 lg:hidden">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-base text-ink-soft">
            {item.label}
          </Link>
        ))}
        <a href={`${SITE.playWebUrl}/login`} className="whitespace-nowrap text-base text-ink-soft">Sign in</a>
      </nav>
    </header>
  );
}
