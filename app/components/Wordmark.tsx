/** The Tempis mark: a flag in a ring. Drawn in the brand's own green on graphite. */
export function TempisMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#0F1212" />
      <circle cx="32" cy="32" r="22.5" fill="none" stroke="#FCFAF7" strokeWidth="4.5" />
      <rect x="25.2" y="18.2" width="3" height="27.6" rx="1.5" fill="#FCFAF7" />
      <path d="M29.6 18.6 L48.2 25.8 L29.6 33 Z" fill="#65B683" strokeLinejoin="round" />
    </svg>
  );
}

/** "Tempis Play": light "Tempis", bold italic gold "Play", as in the app's top bar. */
export function Wordmark({ product = 'Play', onDark = false }: { product?: 'Play' | 'Studio'; onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <TempisMark size={34} />
      <span className="text-[1.5rem] leading-none tracking-tight">
        <span className={`font-light ${onDark ? 'text-on-dark' : 'text-ink'}`}>Tempis</span>{' '}
        <span className={`font-bold italic ${onDark ? 'text-gold' : 'text-gold-text'}`}>{product}</span>
      </span>
    </span>
  );
}
