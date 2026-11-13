'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Device from './Device';
import { InviteGroupSheet, OpenInviteScreen } from './AppScreens';

/*
 * The open invite, start to finish: Stuart has booked Saturday at 8:10
 * with two seats open. He taps Invite a group, picks Saturday Regulars
 * (50 golfers) and sends it. The invitations fly out to all fifty at
 * once; the first two yeses fly back and fill the seats; the next golfer
 * to answer is told they're taken. About 15 seconds a loop. Pauses off
 * screen; with reduced motion it shows the finished round and stays still.
 */

const INITIALS = 'TW HG PS MA DS PH TC GW LM BF AK RN CJ DW SE JP MO TH WB GC EL RS KB NP AT JM DH FR CS BW LK MT PG RD HJ SW TB EG JL CM DP KW RA BH NS GF LT MW JR AD'.split(' ');
INITIALS[6] = 'JB'; INITIALS[23] = 'RT'; INITIALS[41] = 'KL';
const WINNERS = [6, 23];
const LATE = 41;
/** The cells the flying invitations land on — spread across the grid. */
const FLY_TO = [...Array.from({ length: 25 }, (_, i) => i * 2), 23];

type Finger = 'invite' | 'row' | 'send';
type Step = {
  at: number;
  finger?: Finger; press?: boolean;
  sheet?: boolean; picked?: boolean; out?: boolean;
  fly?: boolean; lit?: boolean; won: number; late?: boolean;
};
const TL: Step[] = [
  { at: 0, won: 0 },
  { at: 1100, won: 0, finger: 'invite' },
  { at: 1800, won: 0, finger: 'invite', press: true },
  { at: 2150, won: 0, sheet: true },
  { at: 3000, won: 0, sheet: true, finger: 'row' },
  { at: 3600, won: 0, sheet: true, finger: 'row', press: true, picked: true },
  { at: 4000, won: 0, sheet: true, picked: true, finger: 'row' },
  { at: 4500, won: 0, sheet: true, picked: true, finger: 'send' },
  { at: 5100, won: 0, sheet: true, picked: true, finger: 'send', press: true },
  { at: 5450, won: 0, out: true, fly: true },
  { at: 6300, won: 0, out: true, fly: true, lit: true },
  { at: 8100, won: 1, out: true, lit: true },
  { at: 9300, won: 2, out: true, lit: true },
  { at: 10900, won: 2, out: true, lit: true, late: true },
];
const LOOP = 15200;
const END: Step = { ...TL[TL.length - 1] };

type Pt = { x: number; y: number };

function offsetWithin(el: HTMLElement | null, root: HTMLElement | null): Pt | null {
  let x = 0, y = 0, node: HTMLElement | null = el;
  while (node && node !== root) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
  return el ? { x: x + el.offsetWidth * 0.6, y: y + el.offsetHeight * 0.5 } : null;
}

export default function InviteScene() {
  const [s, setS] = useState<Step>(TL[0]);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLElement | null)[]>([]);
  const inviteRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<{ from: Pt; to: Pt[] } | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStill(true); setS(END); return; }
    let timers: number[] = []; let on = false;
    const go = () => { if (on) return; on = true; const cycle = () => { timers.forEach(clearTimeout); timers = TL.map((t) => window.setTimeout(() => setS(t), t.at)); timers.push(window.setTimeout(cycle, LOOP)); }; cycle(); };
    const stop = () => { on = false; timers.forEach(clearTimeout); timers = []; };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? go() : stop()), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => { io.disconnect(); stop(); };
  }, []);

  // Where the invitations leave from (the phone) and land (the golfers), in the scene's own space.
  const measure = useCallback(() => {
    const r = root.current, p = phone.current;
    if (!r || !p) return;
    const rb = r.getBoundingClientRect();
    const pb = p.getBoundingClientRect();
    const from = { x: pb.left + pb.width * 0.62 - rb.left, y: pb.top + pb.height * 0.3 - rb.top };
    const to = FLY_TO.map((i) => {
      const c = cells.current[i]?.getBoundingClientRect();
      return c ? { x: c.left + c.width / 2 - rb.left, y: c.top + c.height / 2 - rb.top } : from;
    });
    setGeo({ from, to });
  }, []);
  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const target = s.finger === 'invite' ? inviteRef.current : s.finger === 'row' ? rowRef.current : s.finger === 'send' ? sendRef.current : null;
  const last = useRef<Pt>({ x: 150, y: 420 });
  const t = offsetWithin(target, screen.current);
  if (t) last.current = t;

  const filled = ['Jim B.', 'Rick T.'].slice(0, s.won);
  const wonIdx = WINNERS.slice(0, s.won);

  return (
    <div ref={root} className="invite" role="img" aria-label="Stuart's Saturday tee time has two open spots. He taps Invite a group, picks Saturday Regulars, 50 golfers, and sends it. The invitations go out to all fifty at once; the first two to say yes fill the seats, and the next golfer to answer sees there are no open spots left.">
      <div ref={phone}>
        <Device tilt="flat" label="Stuart's round on Backbeat Golf">
          <div ref={screen} className="gd" aria-hidden>
            <div className="gd-scr in"><OpenInviteScreen filled={filled} out={s.out} inviteRef={inviteRef} hot={s.finger === 'invite' && s.press} /></div>
            <div className={`iv-scrim ${s.sheet ? 'show' : ''}`} />
            <div className={`iv-sheet ${s.sheet ? 'show' : ''}`}>
              <InviteGroupSheet picked={!!s.picked} rowRef={rowRef} sendRef={sendRef} rowHot={s.finger === 'row' && s.press} sendHot={s.finger === 'send' && s.press} />
            </div>
            {!still && <div className={`gd-finger ${s.finger ? 'show' : ''} ${s.press ? 'press' : ''}`} style={{ left: last.current.x, top: last.current.y }} />}
          </div>
        </Device>
      </div>

      <div aria-hidden className="iv-side">
        <div className="iv-label">Saturday Regulars <span>50 golfers</span></div>
        <div className="crowd">
          {INITIALS.map((txt, i) => {
            const won = wonIdx.includes(i);
            const late = i === LATE && s.late;
            return (
              <i key={i} ref={(el) => { cells.current[i] = el; }} className={won ? 'won' : late ? 'late' : s.lit ? 'lit' : ''} style={{ transitionDelay: s.lit && !won && !late ? `${(i % 10) * 35 + Math.floor(i / 10) * 70}ms` : '0ms' }}>{txt}</i>
            );
          })}
        </div>
        <div className="replies">
          <div className={`reply ${s.won >= 1 ? 'show' : ''}`}><span><b>Jim B.</b> <small>replied first</small></span><span className="ok">I’m in</span></div>
          <div className={`reply ${s.won >= 2 ? 'show' : ''}`}><span><b>Rick T.</b> <small>replied second</small></span><span className="ok">I’m in</span></div>
          <div className={`reply ${s.late ? 'show' : ''}`}><span><b>Ken L.</b> <small>a minute later</small></span><span className="no">No open spots left</span></div>
        </div>
      </div>

      {geo && !still && (
        <div className="iv-air" aria-hidden>
          {s.fly && geo.to.map((p, k) => (
            <span key={`o${k}`} className="iv-env out" style={{ ['--sx' as string]: `${geo.from.x}px`, ['--sy' as string]: `${geo.from.y}px`, ['--tx' as string]: `${p.x}px`, ['--ty' as string]: `${p.y}px`, animationDelay: `${k * 35}ms` }} />
          ))}
          {WINNERS.map((cell, k) => {
            const p = geo.to[FLY_TO.indexOf(cell)];
            return s.won === k + 1 ? (
              <span key={`b${k}`} className="iv-env back" style={{ ['--sx' as string]: `${p.x}px`, ['--sy' as string]: `${p.y}px`, ['--tx' as string]: `${geo.from.x}px`, ['--ty' as string]: `${geo.from.y + 40}px` }} />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
