'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Device from './Device';
import PhoneTag from './PhoneTag';
import { InviteGroupSheet, JimHomeScreen, JimInviteScreen, OpenInviteScreen } from './AppScreens';

/*
 * The open invite, both sides of it. Dave has booked Saturday at 8:10 with
 * two spots open. He taps Invite a group, picks Saturday Regulars (50 golfers)
 * and sends it; the invitations fly out to all fifty at once. Then Jim's phone
 * opens out of the crowd: the invitation is on his Home, he taps Respond, then
 * I'm in — and his yes flies across into Dave's open spot, which fills with
 * his name, while his own Home now shows the round under Upcoming. Rick's yes flies into the second spot; Ken, a minute late, is told
 * there are no open spots left. About 20 seconds a loop. Pauses off screen;
 * with reduced motion it shows the finished round and stays still.
 */

const INITIALS = 'TW HG PS MA DS PH TC GW LM BF AK RN CJ DW SE JP MO TH WB GC EL RS KB NP AT JM DH FR CS BW LK MT PG RD HJ SW TB EG JL CM DP KW RA BH NS GF LT MW JR AD'.split(' ');
INITIALS[6] = 'JB'; INITIALS[23] = 'RT'; INITIALS[41] = 'KL';
const JB = 6, RT = 23, LATE = 41;
/** The cells the outgoing invitations land on — spread across the grid. */
const FLY_TO = [...Array.from({ length: 25 }, (_, i) => i * 2), RT];

type Finger = 'invite' | 'row' | 'send';
type JimFinger = 'respond' | 'in';
type Step = {
  at: number;
  finger?: Finger; press?: boolean;
  sheet?: boolean; picked?: boolean; out?: boolean;
  fly?: boolean; lit?: boolean;
  jim?: 'home' | 'invite' | 'claimed' | 'scheduled'; jimFinger?: JimFinger; jimPress?: boolean;
  /** Who has said yes (their circle turns green, their reply card shows). */
  replied: number;
  /** Which yes is in the air, flying to Dave's open spot. */
  back?: 1 | 2;
  /** How many of Dave's open spots are filled. */
  seated: number;
  late?: boolean;
};

const base = { replied: 0, seated: 0 };
const TL: Step[] = [
  { at: 0, ...base },
  { at: 1100, ...base, finger: 'invite' },
  { at: 1800, ...base, finger: 'invite', press: true },
  { at: 2150, ...base, sheet: true },
  { at: 3000, ...base, sheet: true, finger: 'row' },
  { at: 3600, ...base, sheet: true, finger: 'row', press: true, picked: true },
  { at: 4000, ...base, sheet: true, picked: true, finger: 'row' },
  { at: 4500, ...base, sheet: true, picked: true, finger: 'send' },
  { at: 5100, ...base, sheet: true, picked: true, finger: 'send', press: true },
  { at: 5450, ...base, out: true, fly: true },
  { at: 6300, ...base, out: true, fly: true, lit: true },
  // Jim's phone opens out of his circle, with the invitation on Home
  { at: 7400, ...base, out: true, lit: true, jim: 'home' },
  { at: 8500, ...base, out: true, lit: true, jim: 'home', jimFinger: 'respond' },
  { at: 9100, ...base, out: true, lit: true, jim: 'home', jimFinger: 'respond', jimPress: true },
  { at: 9450, ...base, out: true, lit: true, jim: 'invite' },
  { at: 10300, ...base, out: true, lit: true, jim: 'invite', jimFinger: 'in' },
  { at: 10900, ...base, out: true, lit: true, jim: 'invite', jimFinger: 'in', jimPress: true },
  // his yes flies across into Dave's first open spot
  { at: 11250, out: true, lit: true, jim: 'claimed', replied: 1, back: 1, seated: 0 },
  { at: 12350, out: true, lit: true, jim: 'claimed', replied: 1, seated: 1 },
  // …and his Home now has the round under Upcoming, ready to go
  { at: 13300, out: true, lit: true, jim: 'scheduled', replied: 1, seated: 1 },
  // Rick's yes, straight from the group into the second spot
  { at: 14600, out: true, lit: true, jim: 'scheduled', replied: 2, back: 2, seated: 1 },
  { at: 15700, out: true, lit: true, jim: 'scheduled', replied: 2, seated: 2 },
  { at: 17000, out: true, lit: true, jim: 'scheduled', replied: 2, seated: 2, late: true },
];
const LOOP = 21000;
const END: Step = { ...TL[TL.length - 1] };

type Pt = { x: number; y: number };
type Geo = { from: Pt; to: Pt[]; seats: Pt[]; jimIn: Pt; jb: Pt; rt: Pt; jimBox: { left: number; top: number } };

function offsetWithin(el: HTMLElement | null, root: HTMLElement | null): Pt | null {
  let x = 0, y = 0, node: HTMLElement | null = el;
  while (node && node !== root) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
  return el ? { x: x + el.offsetWidth * 0.6, y: y + el.offsetHeight * 0.5 } : null;
}

const vars = (a: Pt, b: Pt, delay = 0): React.CSSProperties => ({
  ['--sx' as string]: `${a.x}px`, ['--sy' as string]: `${a.y}px`, ['--tx' as string]: `${b.x}px`, ['--ty' as string]: `${b.y}px`, animationDelay: `${delay}ms`,
});

export default function InviteScene() {
  const [s, setS] = useState<Step>(TL[0]);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const side = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLElement | null)[]>([]);
  const seatEls = useRef<(HTMLDivElement | null)[]>([]);
  const inviteRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const jimScreen = useRef<HTMLDivElement>(null);
  const respondRef = useRef<HTMLSpanElement>(null);
  const inRef = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStill(true); setS(END); return; }
    let timers: number[] = []; let on = false;
    const go = () => { if (on) return; on = true; const cycle = () => { timers.forEach(clearTimeout); timers = TL.map((t) => window.setTimeout(() => setS(t), t.at)); timers.push(window.setTimeout(cycle, LOOP)); }; cycle(); };
    const stop = () => { on = false; timers.forEach(clearTimeout); timers = []; };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? go() : stop()), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => { io.disconnect(); stop(); };
  }, []);

  // Where everything sits, in the scene's own space (measured, so it holds on every screen size).
  const measure = useCallback(() => {
    const r = root.current, p = phone.current, sd = side.current;
    if (!r || !p || !sd) return;
    const rb = r.getBoundingClientRect();
    const centre = (el: Element | null | undefined, fx = 0.5, fy = 0.5): Pt | null => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: b.left + b.width * fx - rb.left, y: b.top + b.height * fy - rb.top };
    };
    const pb = p.getBoundingClientRect();
    const from = { x: pb.left + pb.width * 0.62 - rb.left, y: pb.top + pb.height * 0.3 - rb.top };
    const to = FLY_TO.map((i) => centre(cells.current[i]) ?? from);
    const seats = [2, 3].map((i) => centre(seatEls.current[i], 0.3) ?? from);
    const jb = centre(cells.current[JB]) ?? from;
    const rt = centre(cells.current[RT]) ?? from;
    // Jim's phone opens over the group, near his circle.
    const sb = sd.getBoundingClientRect();
    const narrow = sb.width < 460;
    const jimBox = { left: sb.left - rb.left + (narrow ? Math.max(0, sb.width - 250) : sb.width - 250), top: sb.top - rb.top - (narrow ? 40 : 90) };
    const jimIn = centre(inRef.current) ?? jb;
    setGeo({ from, to, seats, jimIn, jb, rt, jimBox });
  }, []);
  useLayoutEffect(() => { measure(); }, [measure, s.out, s.jim, s.seated]);
  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // The finger on Dave's phone
  const target = s.finger === 'invite' ? inviteRef.current : s.finger === 'row' ? rowRef.current : s.finger === 'send' ? sendRef.current : null;
  const last = useRef<Pt>({ x: 150, y: 420 });
  const t = offsetWithin(target, screen.current);
  if (t) last.current = t;
  // …and on Jim's
  const jTarget = s.jimFinger === 'respond' ? respondRef.current : s.jimFinger === 'in' ? inRef.current : null;
  const jLast = useRef<Pt>({ x: 200, y: 160 });
  const jt = offsetWithin(jTarget, jimScreen.current);
  if (jt) jLast.current = jt;

  const filled = ['Jim B.', 'Rick T.'].slice(0, s.seated);
  const won = [JB, RT].slice(0, s.replied);
  const jimOpen = !!s.jim;
  const jimOrigin = geo ? `${geo.jb.x - geo.jimBox.left}px ${geo.jb.y - geo.jimBox.top}px` : '50% 0';

  return (
    <div ref={root} className="invite" role="img" aria-label="Dave's Saturday tee time has two open spots. He taps Invite a group, picks Saturday Regulars, 50 golfers, and sends it. The invitations go out to all fifty at once. On Jim's phone the invitation is waiting on Home; he taps Respond, then I'm in; his name fills Dave's first open spot and the round appears on his Home under Upcoming. Rick's yes fills the second; Ken, a minute later, sees there are no open spots left.">
      <div ref={phone}>
        <Device tilt="flat" label="Dave's round on Backbeat Golf">
          <div ref={screen} className="gd" aria-hidden>
            <div className="gd-scr in"><OpenInviteScreen filled={filled} out={s.out} inviteRef={inviteRef} hot={s.finger === 'invite' && s.press} seatRef={(i, el) => { seatEls.current[i] = el; }} /></div>
            <div className={`iv-scrim ${s.sheet ? 'show' : ''}`} />
            <div className={`iv-sheet ${s.sheet ? 'show' : ''}`}>
              <InviteGroupSheet picked={!!s.picked} rowRef={rowRef} sendRef={sendRef} rowHot={s.finger === 'row' && s.press} sendHot={s.finger === 'send' && s.press} />
            </div>
            {!still && <div className={`gd-finger ${s.finger ? 'show' : ''} ${s.press ? 'press' : ''}`} style={{ left: last.current.x, top: last.current.y }} />}
          </div>
        </Device>
        <PhoneTag name="Dave’s phone" mark="D" role="Booked Saturday at 8:10" />
      </div>

      <div ref={side} aria-hidden className="iv-side">
        <div className="iv-label">Saturday Regulars <span>50 golfers</span></div>
        <div className="crowd">
          {INITIALS.map((txt, i) => {
            const isWon = won.includes(i);
            const late = i === LATE && s.late;
            const hot = i === JB && jimOpen && !isWon;
            return (
              <i key={i} ref={(el) => { cells.current[i] = el; }} className={isWon ? 'won' : late ? 'late' : hot ? 'lit hot' : s.lit ? 'lit' : ''} style={{ transitionDelay: s.lit && !isWon && !late && !hot ? `${(i % 10) * 35 + Math.floor(i / 10) * 70}ms` : '0ms' }}>{txt}</i>
            );
          })}
        </div>
        <div className="replies">
          <div className={`reply ${s.replied >= 1 ? 'show' : ''}`}><span><b>Jim B.</b> <small>replied first</small></span><span className="ok">I’m in</span></div>
          <div className={`reply ${s.replied >= 2 ? 'show' : ''}`}><span><b>Rick T.</b> <small>replied second</small></span><span className="ok">I’m in</span></div>
          <div className={`reply ${s.late ? 'show' : ''}`}><span><b>Ken L.</b> <small>a minute later</small></span><span className="no">No open spots left</span></div>
        </div>
      </div>

      {/* Jim's phone, opening out of his circle in the group */}
      {!still && (
        <div className={`iv-jim ${jimOpen ? 'open' : ''}`} style={geo ? { left: geo.jimBox.left, top: geo.jimBox.top, transformOrigin: jimOrigin } : undefined} aria-hidden>
          <Device tilt="flat" size="sm" label="Jim's phone">
            <div ref={jimScreen} className="gd">
              <div className={`gd-scr ${s.jim === 'home' || s.jim === 'scheduled' || !s.jim ? 'in' : 'left'}`}><JimHomeScreen respondRef={respondRef} hot={s.jimFinger === 'respond' && s.jimPress} scheduled={s.jim === 'scheduled'} withRick={s.seated >= 2} /></div>
              <div className={`gd-scr ${s.jim === 'invite' || s.jim === 'claimed' ? 'in' : s.jim === 'scheduled' ? 'right' : 'right'}`}><JimInviteScreen inRef={inRef} hot={s.jimFinger === 'in' && s.jimPress} claimed={s.jim === 'claimed'} /></div>
              <div className={`gd-finger ${s.jimFinger ? 'show' : ''} ${s.jimPress ? 'press' : ''}`} style={{ left: jLast.current.x, top: jLast.current.y }} />
            </div>
          </Device>
          <PhoneTag name="Jim’s phone" mark="J" role="One of the 50" />
        </div>
      )}

      {geo && !still && (
        <div className="iv-air" aria-hidden>
          {s.fly && geo.to.map((p, k) => <span key={`o${k}`} className="iv-env out" style={vars(geo.from, p, k * 35)} />)}
          {s.back === 1 && <span key="b1" className="iv-env back" style={vars(geo.jimIn, geo.seats[0])} />}
          {s.back === 2 && <span key="b2" className="iv-env back" style={vars(geo.rt, geo.seats[1])} />}
        </div>
      )}
    </div>
  );
}
