'use client';

import { useEffect, useRef, useState } from 'react';

/** Set once the lockup has beaten in this tab, so later pages open on the still. */
const BEAT_KEY = 'backbeat-lockup-beat';

/**
 * Holds the inlined animated lockup: three beats on the first page of a visit
 * (per browser tab), then the still. It pauses while off screen and never
 * restarts or speeds up the beat.
 * The SVG is decorative here: the surrounding link carries the name "Backbeat Golf".
 */
export function BeatingLockup({ svg }: { svg: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offScreen, setOffScreen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(BEAT_KEY) === '1';
      sessionStorage.setItem(BEAT_KEY, '1');
    } catch {
      // Storage unavailable (private mode): the beat simply plays on each page.
    }
    if (seen) {
      setDone(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    // The stroke's third pass ending is the end of the beat; the timer is a backstop.
    const finish = (e?: AnimationEvent) => {
      if (!e || (e.target as Element).getAttribute('class')?.endsWith('-run')) setDone(true);
    };
    el.addEventListener('animationend', finish);
    const timer = window.setTimeout(() => finish(), 2200 * 3 + 500);
    return () => {
      el.removeEventListener('animationend', finish);
      window.clearTimeout(timer);
    };
  }, []);

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
      data-done={done ? '' : undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
