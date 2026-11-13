import Link from 'next/link';
import { Wordmark } from './Wordmark';

const NAV = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#side-games', label: 'Side games' },
  { href: '/clubs', label: 'For clubs' },
  { href: '/support', label: 'Help' },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-stone bg-oat/95 backdrop-blur supports-[backdrop-filter]:bg-oat/85 sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" aria-label="Tempis Play home" className="shrink-0">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[1.0625rem] font-medium text-ink-soft hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/beta" className="btn btn-primary btn-sm">Join the beta</Link>
      </div>
      <nav aria-label="Main" className="flex gap-5 overflow-x-auto border-t border-stone px-5 py-2.5 md:hidden">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-base font-medium text-ink-soft">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
