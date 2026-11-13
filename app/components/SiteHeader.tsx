import Link from 'next/link';
import { Wordmark } from './Wordmark';

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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" aria-label="Backbeat Golf home" className="shrink-0">
          <span className="md:hidden"><Wordmark height={28} /></span><span className="hidden md:block"><Wordmark height={34} /></span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[1.0625rem] text-ink-soft hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/beta" className="btn btn-primary btn-sm whitespace-nowrap">Join the beta</Link>
      </div>
      <nav aria-label="Sections" className="flex gap-6 overflow-x-auto border-t border-stone px-5 py-2.5 md:hidden">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-base text-ink-soft">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
