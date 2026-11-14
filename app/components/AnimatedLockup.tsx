import { readFileSync } from 'node:fs';
import path from 'node:path';
import { BeatingLockup } from './BeatingLockup';

/**
 * The animated "From the pin" Backbeat Golf lockup, inlined so its CSS beat runs
 * (three beats, then the still) and can be paused. The markup is the approved file in public/brand, read as-is
 * at build time — never retyped. Use `onDark` on a #10301D ground.
 */
export function AnimatedLockup({ onDark = false }: { onDark?: boolean }) {
  const file = `backbeat-golf-lockup${onDark ? '-reversed' : ''}-animated.svg`;
  // The file loops; on the site it beats three times, then rests (CEO, 2026-11-13).
  const svg = readFileSync(path.join(process.cwd(), 'public', 'brand', file), 'utf8').replaceAll(
    '2.2s infinite',
    '2.2s 3',
  );
  return <BeatingLockup svg={svg} />;
}
