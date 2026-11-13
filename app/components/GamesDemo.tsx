'use client';

import { useEffect, useRef, useState } from 'react';
import Device from './Device';
import { GamesSummaryScreen, SettleUpScreen, SkinsBoardScreen } from './AppScreens';

/*
 * The hero demo: a finger opens Skins from the round's Games summary,
 * the hole-by-hole board slides in, then Settle up shows who pays whom.
 * One loop, about 12 seconds. It pauses off screen, and with reduced
 * motion it shows the settle-up screen and stays still.
 */

type Step = { at: number; scene: 0 | 1 | 2; finger?: 'skins' | 'settle'; press?: boolean; hot?: boolean; scrolled?: boolean; float?: boolean };

const TIMELINE: Step[] = [
  { at: 0, scene: 0 },
  { at: 1500, scene: 0, finger: 'skins' },
  { at: 2200, scene: 0, finger: 'skins', press: true, hot: true },
  { at: 2600, scene: 1 },
  { at: 3800, scene: 1, scrolled: true },
  { at: 5600, scene: 1, scrolled: true, finger: 'settle' },
  { at: 6300, scene: 1, scrolled: true, finger: 'settle', press: true },
  { at: 6700, scene: 2 },
  { at: 7600, scene: 2, float: true },
  { at: 11800, scene: 2 },
];
const LOOP_MS = 12400;

function offsetWithin(el: HTMLElement | null, root: HTMLElement | null) {
  // Offsets ignore the 3D tilt, so the finger lands on the element in the phone's own plane.
  let x = 0, y = 0, node: HTMLElement | null = el;
  while (node && node !== root) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
  return el ? { x: x + el.offsetWidth * 0.62, y: y + el.offsetHeight * 0.45 } : { x: 0, y: 0 };
}

export default function GamesDemo() {
  const [step, setStep] = useState<Step>(TIMELINE[0]);
  const [still, setStill] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const skinsRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      setStep({ at: 0, scene: 2, float: true });
      return;
    }
    let timers: number[] = [];
    let running = false;
    const run = () => {
      if (running) return;
      running = true;
      const cycle = () => {
        timers.forEach(clearTimeout);
        timers = TIMELINE.map((s) => window.setTimeout(() => setStep(s), s.at));
        timers.push(window.setTimeout(cycle, LOOP_MS));
      };
      cycle();
    };
    const stop = () => { running = false; timers.forEach(clearTimeout); timers = []; };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? run() : stop()), { threshold: 0.3 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => { io.disconnect(); stop(); };
  }, []);

  const target = step.finger === 'skins' ? skinsRef.current : step.finger === 'settle' ? settleRef.current : null;
  const lastPos = useRef({ x: 150, y: 300 });
  if (target) lastPos.current = offsetWithin(target, rootRef.current);
  const pos = lastPos.current;
  const place = (n: number) => (step.scene === n ? 'in' : step.scene > n ? 'left' : 'right');

  return (
    <Device
      tilt="hero"
      label="Backbeat Golf: a finger opens Skins from the round's games, the hole-by-hole board slides in, and Settle up shows who pays whom"
      float={
        <div className={`fl-card ${step.float ? '' : 'fl-hide'}`}>
          <small>Settled at the 18th green</small>
          Bill pays Tom <b>$7</b>.
        </div>
      }
    >
      <div ref={rootRef} className="gd" aria-hidden>
        <div className={`gd-scr ${place(0)}`}><GamesSummaryScreen skinsRef={skinsRef} hot={step.scene === 0 && step.hot} /></div>
        <div className={`gd-scr ${place(1)}`}><SkinsBoardScreen settleRef={settleRef} pressed={step.scene === 1 && step.press} scrolled={step.scrolled} /></div>
        <div className={`gd-scr ${place(2)}`}><SettleUpScreen /></div>
        {!still && (
          <div className={`gd-finger ${step.finger ? 'show' : ''} ${step.press ? 'press' : ''}`} style={{ left: pos.x, top: pos.y }} />
        )}
      </div>
    </Device>
  );
}
