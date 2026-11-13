'use client';

import { useEffect, useRef, useState } from 'react';
import Device from './Device';
import { OpenInviteScreen } from './AppScreens';

/*
 * The open invite: two open seats go out to a group of 50. Everyone
 * hears at once, the first two to say yes get the seats, and the next
 * golfer to answer simply sees they're taken. About 11 seconds a loop.
 */

const INITIALS = 'TW HG PS MA DS PH TC GW LM BF AK RN CJ DW SE JP MO TH WB GC EL RS KB NP AT JM DH FR CS BW LK MT PG RD HJ SW TB EG JL CM DP KW RA BH NS GF LT MW JR AD'.split(' ');
INITIALS[6] = 'JB'; INITIALS[23] = 'RT'; INITIALS[41] = 'KL';
const WINNERS = [6, 23];
const LATE = 41;

type Step = { at: number; lit: number; won: number; late: boolean; replies: number };
const TL: Step[] = [
  { at: 0, lit: 0, won: 0, late: false, replies: 0 },
  { at: 1000, lit: 50, won: 0, late: false, replies: 0 },
  { at: 3200, lit: 50, won: 1, late: false, replies: 1 },
  { at: 4400, lit: 50, won: 2, late: false, replies: 2 },
  { at: 6200, lit: 50, won: 2, late: true, replies: 3 },
];
const LOOP = 11000;

export default function InviteScene() {
  const [s, setS] = useState<Step>(TL[0]);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setS(TL[TL.length - 1]); return; }
    let timers: number[] = []; let on = false;
    const go = () => { if (on) return; on = true; const cycle = () => { timers.forEach(clearTimeout); timers = TL.map((t) => window.setTimeout(() => setS(t), t.at)); timers.push(window.setTimeout(cycle, LOOP)); }; cycle(); };
    const stop = () => { on = false; timers.forEach(clearTimeout); timers = []; };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? go() : stop()), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => { io.disconnect(); stop(); };
  }, []);

  const filled = ['Jim B.', 'Rick T.'].slice(0, s.won);
  return (
    <div ref={root} className="invite" role="img" aria-label="Stuart's Saturday tee time has two open seats. Play sends an open invite to 50 golfers at once; the first two to say yes get the seats, and the next golfer to reply sees the seats are taken.">
      <Device tilt="flat" label="The organizer's round with the open invite">
        <OpenInviteScreen filled={filled} />
      </Device>
      <div aria-hidden>
        <div className="crowd">
          {INITIALS.map((t, i) => {
            const won = WINNERS.indexOf(i) > -1 && WINNERS.indexOf(i) < s.won;
            const late = i === LATE && s.late;
            const lit = i < s.lit;
            return (
              <i key={i} className={won ? 'won' : late ? 'late' : lit ? 'lit' : ''} style={{ transitionDelay: lit && !won && !late ? `${(i % 10) * 40 + Math.floor(i / 10) * 60}ms` : '0ms' }}>{t}</i>
            );
          })}
        </div>
        <div className="replies">
          <div className={`reply ${s.replies >= 1 ? 'show' : ''}`} style={{ top: 0 }}><span><b>Jim B.</b> <small>replied first</small></span><span className="ok">I’m in</span></div>
          <div className={`reply ${s.replies >= 2 ? 'show' : ''}`} style={{ top: 50 }}><span><b>Rick T.</b> <small>replied second</small></span><span className="ok">I’m in</span></div>
          <div className={`reply ${s.replies >= 3 ? 'show' : ''}`} style={{ top: 100 }}><span><b>Ken L.</b> <small>a minute later</small></span><span className="no">No open spots left</span></div>
        </div>
      </div>
    </div>
  );
}
