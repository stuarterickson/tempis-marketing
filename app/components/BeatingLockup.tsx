'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Holds the inlined animated lockup and pauses its beat while it is off screen.
 * It only pauses and resumes (animation-play-state) — it never restarts the beat.
 * The SVG is decorative here: the surrounding link carries the name "Backbeat Golf".
 */
export function BeatingLockup({ svg }: { svg: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offScreen, setOffScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setOffScreen(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="lockup-live"
      data-paused={offScreen ? '' : undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
