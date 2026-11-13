'use client';

import { useEffect, useRef, useState } from 'react';
import Device from './Device';
import { GoalsScreen } from './AppScreens';

/*
 * Stats and goals, as an exploded view: the golfer's Goals list on a phone
 * facing the reader, with the app's own charts lifted out around it — the
 * score trend against his goal, his putts, and where Saturday's strokes went —
 * and Saturday's goal tiles in front. When the scene comes into view the cards
 * settle in one after another, the trend line draws and the bars grow; with
 * reduced motion everything is simply there.
 */

// Twelve rounds, oldest first; the last five average 86.0.
const ROUNDS = [91, 89, 92, 88, 90, 87, 89, 88, 86, 87, 85, 84];
const GOAL = 85;

function TrendCard() {
  const W = 252, H = 118, L = 24, R = 10, T = 10, B = 18;
  const lo = 82, hi = 94;
  const x = (i: number) => L + (i * (W - L - R)) / (ROUNDS.length - 1);
  const y = (v: number) => T + ((hi - v) * (H - T - B)) / (hi - lo);
  const avg = ROUNDS.map((_, i) => (i < 4 ? null : ROUNDS.slice(i - 4, i + 1).reduce((a, b) => a + b, 0) / 5));
  const thin = ROUNDS.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const pts = avg.map((v, i) => (v == null ? null : [x(i), y(v)] as const)).filter(Boolean) as [number, number][];
  const thick = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
  const end = pts[pts.length - 1];
  return (
    <div className="gc-card gc-trend">
      <div className="gc-h"><b>Score trend</b><span>Gross</span></div>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden>
        {[85, 90].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#EEE6DA" />
            <text x={L - 5} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill="#66635E">{t}</text>
          </g>
        ))}
        <line x1={L} x2={W - R} y1={y(GOAL)} y2={y(GOAL)} stroke="#7D7A75" strokeWidth="1.2" strokeDasharray="4 3" />
        <g>
          <rect x={L + 4} y={y(GOAL) - 8} width="50" height="16" rx="8" fill="#FCFAF7" stroke="#7D7A75" strokeDasharray="3 2" />
          <text x={L + 29} y={y(GOAL) + 3.5} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#171615">Goal {GOAL}</text>
        </g>
        <path className="gc-draw" d={thin} fill="none" stroke="#8DCBA2" strokeWidth="1.5" pathLength={1} />
        {ROUNDS.map((v, i) => <circle key={i} className="gc-dot" cx={x(i)} cy={y(v)} r="2.2" fill="#8DCBA2" style={{ transitionDelay: `${300 + i * 60}ms` }} />)}
        <path className="gc-draw gc-draw-late" d={thick} fill="none" stroke="#237849" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        <circle className="gc-dot gc-end" cx={end[0]} cy={end[1]} r="5" fill="#237849" stroke="#FCFAF7" strokeWidth="2" />
        <text x={L} y={H - 3} fontSize="10" fill="#66635E">Aug</text>
        <text x={W - R} y={H - 3} fontSize="10" fill="#66635E" textAnchor="end">Nov</text>
      </svg>
      <div className="gc-legend"><span><i className="thin" />Round score</span><span><i />5-round average <b>86.0</b></span></div>
    </div>
  );
}

const PUTTS = [
  { label: '0–1 putts', pct: 30, fill: '#439A67' },
  { label: '2 putts', pct: 64, fill: '#8DCBA2' },
  { label: '3+ putts', pct: 6, fill: '#E64343' },
];

function PuttsCard() {
  return (
    <div className="gc-card gc-putts">
      <div className="gc-h"><b>Putts</b></div>
      <div className="gc-figs">
        <div><b>1.8</b><span>Per hole</span></div>
        <div><b>31.6</b><span>Per round</span></div>
      </div>
      {PUTTS.map((p, i) => (
        <div key={p.label} className="gc-prow">
          <span className="gc-plab">{p.label}</span>
          <span className="gc-ptrack"><i className="gc-grow" style={{ width: `${p.pct}%`, background: p.fill, transitionDelay: `${250 + i * 120}ms` }} /></span>
          <span className="gc-pct">{p.pct}%</span>
        </div>
      ))}
    </div>
  );
}

// Saturday's 84 on a par 72: one birdie, seven pars, seven bogeys, three doubles = +12.
const IMPACT = [
  { label: 'Eagle+', strokes: 0, none: true },
  { label: 'Birdie', strokes: -1, fill: '#439A67', ink: '#171615' },
  { label: 'Par', strokes: 0 },
  { label: 'Bogey', strokes: 7, fill: '#E64343', ink: '#171615' },
  { label: 'Double+', strokes: 6, fill: '#9B1E22', ink: '#FCFAF7' },
];

function ImpactCard() {
  const unit = 18; // px a stroke
  const under = 2 * unit;
  return (
    <div className="gc-card gc-impact">
      <div className="gc-h"><b>Score impact</b><span>Saturday, 84</span></div>
      {IMPACT.map((r, i) => (
        <div key={r.label} className="gc-irow">
          <span className="gc-ilab">{r.label}</span>
          <span className="gc-iunder" style={{ width: under }}>
            {r.strokes < 0 && <i className="gc-grow gc-left" style={{ width: -r.strokes * unit + 12, background: r.fill, color: r.ink, transitionDelay: `${250 + i * 100}ms` }}>−1</i>}
          </span>
          <span className="gc-iline">{r.label === 'Par' && <em>0</em>}</span>
          <span className="gc-iover">
            {r.strokes > 0 && <i className="gc-grow" style={{ width: r.strokes * unit, background: r.fill, color: r.ink, transitionDelay: `${250 + i * 100}ms` }}>+{r.strokes}</i>}
          </span>
        </div>
      ))}
    </div>
  );
}

function RoundTile({ name, value, result, target, met }: { name: string; value: string; result: string; target: string; met?: boolean }) {
  return (
    <div className={`goal-tile ${met ? 'met' : ''}`}>
      <div className="gt-name">{name}{met ? <span className="gt-check" aria-hidden>✓</span> : null}</div>
      <div className="gt-row"><b>{value}</b><span>{result}</span></div>
      <div className="gt-target">{target}</div>
    </div>
  );
}

export default function GoalsScene() {
  const root = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<'still' | 'armed' | 'on'>('still');
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setStage('armed');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStage('on'); io.disconnect(); } }, { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className={`goals-scene gs-${stage}`} role="img" aria-label="Backbeat's statistics: the Goals list on a phone, with the score trend over twelve rounds against a goal of 85, putts per hole (30% one putt or fewer, 64% two putts, 6% three or more), and Saturday's score impact — one birdie saved a stroke, bogeys cost seven and doubles six. In front, Saturday's goals: score 84, met; putts 33, one short.">
      <Device tilt="flat" label="Goals">
        <GoalsScreen />
      </Device>
      <div className="goals-float goals-float-a gf-1"><RoundTile name="Score" value="84" result="Met" target="Goal 85 or lower" met /></div>
      <div className="goals-float goals-float-c gf-6"><div className="fl-card"><small>Saturday at Wellshire</small>2 of 3 goals <b>met</b>.</div></div>
      <div className="goals-charts">
        <div className="goals-float gc-pos-trend gf-2"><TrendCard /></div>
        <div className="goals-float gc-pos-putts gf-3"><PuttsCard /></div>
        <div className="goals-float gc-pos-impact gf-4"><ImpactCard /></div>
      </div>
    </div>
  );
}
