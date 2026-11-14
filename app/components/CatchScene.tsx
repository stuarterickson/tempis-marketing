'use client';

import { useEffect, useRef, useState } from 'react';
import Device from './Device';
import PhoneTag from './PhoneTag';
import { HoleScreen } from './AppScreens';

/*
 * Differences caught as you play: Bob scores himself a 5 on his phone;
 * Tom, keeping the group's card, taps 4 for Bob and saves. Backbeat stops
 * and asks which is Bob's score. Tom picks 5. About 10 seconds a loop.
 */

type Step = { at: number; bob?: number; tomForBob?: number; finger?: 'bob' | 'key' | 'save' | 'tile'; press?: boolean; dialog?: boolean; pick?: boolean };
const TIMELINE: Step[] = [
  { at: 0 },
  // Bob taps 5 for himself on his own phone
  { at: 500, finger: 'bob' },
  { at: 1000, finger: 'bob', press: true, bob: 5 },
  { at: 1350, bob: 5 },
  // Tom, keeping the card, taps 4 for Bob and saves
  { at: 1900, bob: 5, finger: 'key' },
  { at: 2500, bob: 5, finger: 'key', press: true, tomForBob: 4 },
  { at: 3000, bob: 5, tomForBob: 4, finger: 'save' },
  { at: 3600, bob: 5, tomForBob: 4, finger: 'save', press: true },
  // Backbeat asks which is right; Tom picks Bob's 5
  { at: 4000, bob: 5, tomForBob: 4, dialog: true },
  { at: 5600, bob: 5, tomForBob: 4, dialog: true, finger: 'tile' },
  { at: 6200, bob: 5, tomForBob: 4, dialog: true, finger: 'tile', press: true, pick: true },
  { at: 6600, bob: 5, tomForBob: 4, dialog: true, pick: true },
  { at: 8400, bob: 5, tomForBob: 5 },
];
const LOOP = 10400;

function offsetWithin(el: HTMLElement | null, root: HTMLElement | null) {
  let x = 0, y = 0, n: HTMLElement | null = el;
  while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
  return el ? { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 } : null;
}

export default function CatchScene() {
  const [s, setS] = useState<Step>(TIMELINE[0]);
  const root = useRef<HTMLDivElement>(null);
  const tomRoot = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const saveRef = useRef<HTMLSpanElement>(null);
  const last = useRef({ x: 140, y: 300 });
  const bobRoot = useRef<HTMLDivElement>(null);
  const bobKey = useRef<HTMLDivElement>(null);
  const bobLast = useRef({ x: 150, y: 200 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setS({ at: 0, bob: 5, tomForBob: 4, dialog: true }); return; }
    let timers: number[] = []; let on = false;
    const go = () => { if (on) return; on = true; const cycle = () => { timers.forEach(clearTimeout); timers = TIMELINE.map((t) => window.setTimeout(() => setS(t), t.at)); timers.push(window.setTimeout(cycle, LOOP)); }; cycle(); };
    const stop = () => { on = false; timers.forEach(clearTimeout); timers = []; };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? go() : stop()), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => { io.disconnect(); stop(); };
  }, []);

  const target = s.finger === 'key' ? keyRef.current : s.finger === 'save' ? saveRef.current : null;
  const p = offsetWithin(target, tomRoot.current);
  if (p) last.current = p;
  const bp = offsetWithin(s.finger === 'bob' ? bobKey.current : null, bobRoot.current);
  if (bp) bobLast.current = bp;

  return (
    <div ref={root} className="catch" role="img" aria-label="Two phones score the same hole. Bob entered a 5 for himself; Tom entered a 4 for Bob. When Tom saves, Backbeat asks which is Bob's score before anyone can sign.">
      <div>
        <Device tilt="face-left" size="sm" label="Tom's phone">
          <div ref={tomRoot} className="gd" aria-hidden>
            <HoleScreen
              rows={[{ name: 'Tom', note: 'Keeping the card', chosen: 4 }, { name: 'Bob', note: 'Plays off 14', chosen: s.tomForBob, keyRefFor: 4 }, { name: 'Ed', note: 'Plays off 9', chosen: 4 }]}
              keyRef={keyRef} saveRef={saveRef} pressedSave={s.finger === 'save' && s.press}
            />
            <div className={`gd-finger ${s.finger === 'key' || s.finger === 'save' ? 'show' : ''} ${(s.finger === 'key' || s.finger === 'save') && s.press ? 'press' : ''}`} style={{ left: last.current.x, top: last.current.y }} />
          </div>
        </Device>
        <PhoneTag name="Tom’s phone" mark="T" role="Keeping the group’s card" />
      </div>
      <div>
        <Device tilt="face-right" size="sm" label="Bob's phone">
          <div ref={bobRoot} className="gd" aria-hidden>
            <HoleScreen rows={[{ name: 'Bob', note: 'Plays off 14', chosen: s.bob, keyRefFor: 5 }]} keyRef={bobKey} />
            <div className={`gd-finger ${s.finger === 'bob' ? 'show' : ''} ${s.finger === 'bob' && s.press ? 'press' : ''}`} style={{ left: bobLast.current.x, top: bobLast.current.y }} />
          </div>
        </Device>
        <PhoneTag name="Bob’s phone" mark="B" role="Scoring his own" />
      </div>
      <div className={`catch-dialog ${s.dialog ? 'show' : ''}`} aria-hidden>
        <div className="dlg">
          <div className="dlg-h"><span className="dlg-t">Hole 7 · Scores don’t match</span></div>
          <div className="dlg-q">Which is Bob’s score?</div>
          <div className="dlg-tiles">
            <div className="dlg-tile"><b>4</b><span>Entered by Tom</span></div>
            <div className={`dlg-tile ${s.pick ? 'pick' : ''}`} style={{ position: 'relative' }}>
              <b>5</b><span>Entered by Bob</span>
              <div className={`gd-finger ${s.finger === 'tile' ? 'show' : ''} ${s.finger === 'tile' && s.press ? 'press' : ''}`} style={{ left: '50%', top: '42%' }} />
            </div>
          </div>
          <div className="dlg-note">The card can’t be signed until the scores agree.</div>
        </div>
      </div>
    </div>
  );
}
