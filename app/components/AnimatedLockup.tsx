import { readFileSync } from 'node:fs';
import path from 'node:path';
import { BeatingLockup } from './BeatingLockup';

/**
 * The animated "From the pin" Backbeat Golf lockup, inlined so its CSS beat runs
 * and can be paused. The markup is the approved file in public/brand, read as-is
 * at build time — never retyped. Use `onDark` on a #10301D ground.
 */
export function AnimatedLockup({ onDark = false }: { onDark?: boolean }) {
  const file = `backbeat-golf-lockup${onDark ? '-reversed' : ''}-animated.svg`;
  const svg = readFileSync(path.join(process.cwd(), 'public', 'brand', file), 'utf8');
  return <BeatingLockup svg={svg} />;
}
