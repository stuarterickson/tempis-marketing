import '@fontsource-variable/caveat';
import '@fontsource/reenie-beanie';

/*
 * The old way: a printed scorecard after eighteen holes of Nassau and Wolf
 * kept in pencil. Scores written over erased scores, eraser smudges, a press
 * squeezed in, the wolf picks scrawled underneath, the money worked out three
 * times in the margin, and a coffee ring. Drawn, not photographed; deterministic,
 * so it looks the same on every load.
 */

const PAR = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 3, 5, 4, 4, 3, 4, 5, 4];
const HCP = [7, 3, 15, 11, 1, 9, 17, 5, 13, 8, 16, 12, 2, 6, 18, 10, 4, 14];
const PLAYERS = [
  { name: 'Tom', hcp: 8, strokes: 0, scores: [5, 4, 3, 6, 5, 4, 3, 5, 5, 3, 4, 5, 5, 4, 3, 5, 6, 5] },
  { name: 'Dave', hcp: 12, strokes: 4, scores: [5, 5, 4, 5, 6, 4, 3, 4, 6, 5, 3, 6, 3, 5, 4, 4, 5, 5] },
  { name: 'Mike', hcp: 17, strokes: 9, scores: [6, 5, 3, 6, 5, 5, 4, 5, 6, 5, 4, 6, 5, 5, 3, 5, 6, 6] },
  { name: 'Bill', hcp: 22, strokes: 14, scores: [5, 6, 4, 7, 5, 5, 3, 6, 5, 6, 4, 5, 6, 6, 4, 5, 6, 5] },
];
/** Scores written over an erased one: [player, hole index, what was there first]. */
const OVERWRITES: [number, number, number][] = [[0, 3, 5], [1, 4, 5], [2, 11, 5], [3, 3, 6], [3, 13, 5], [0, 16, 5]];
/** Totals that were worked out wrong first: [player, column, first try]. */
const BAD_TOTALS: [number, 'out' | 'in' | 'tot', number][] = [[0, 'in', 41], [3, 'out', 45], [2, 'tot', 89]];
/** The front-nine match (Tom & Dave against Mike & Bill), and the press from 6. */
const NASSAU_FRONT = ['+1', '+1', 'AS', '1dn', 'AS', '+1', '+1', '+2', '+2'];
const PRESS_FRONT = ['', '', '', '', '', 'AS', 'AS', '+1', '+1'];
const NASSAU_BACK = ['+1', 'AS', '1dn', '+1', 'AS', '+1', '+1', 'AS', '+1'];
/** Who had the wolf, and his pick ("LONE" when he went alone). */
const WOLF = ['T·M', 'D·B', 'M·T', 'B·D', 'T·D', 'D·M', 'M·B', 'B·T', 'T·B', 'D·T', 'M·D', 'B·M', 'T·M', 'D·B', 'M·T', 'LONE', 'T·D', 'D·M'];

// layout
const X0 = 30, LABEL_W = 96, COL = 34;
const ROW = { hole: 72, par: 96, hcp: 116, players: 136, playerH: 38, nassau: 288, wolf: 326, end: 362 };
const cols = [...Array.from({ length: 9 }, (_, i) => ({ kind: 'hole' as const, i })), { kind: 'out' as const, i: -1 }, ...Array.from({ length: 9 }, (_, i) => ({ kind: 'hole' as const, i: i + 9 })), { kind: 'in' as const, i: -1 }, { kind: 'tot' as const, i: -1 }, { kind: 'hcp' as const, i: -1 }];
const colX = (c: number) => X0 + LABEL_W + c * COL;
const holeCol = (i: number) => (i < 9 ? i : i + 1);
const RIGHT = colX(cols.length);

// a small seeded jitter so the hand isn't perfectly regular
function jitter(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x) - 0.5;
}

const INK = '#2F6E4D';
const LEAD = '#3B3A38';

function Hand({ x, y, children, size = 25, seed = 0, font = 'caveat', bold = false, opacity = 0.9, anchor = 'middle' }: { x: number; y: number; children: React.ReactNode; size?: number; seed?: number; font?: 'caveat' | 'reenie'; bold?: boolean; opacity?: number; anchor?: 'middle' | 'start' }) {
  const r = jitter(seed) * 8;
  const dx = jitter(seed + 1) * 3;
  const dy = jitter(seed + 2) * 3;
  return (
    <text x={x + dx} y={y + dy} transform={`rotate(${r.toFixed(1)} ${x} ${y})`} textAnchor={anchor} fontSize={size} fontWeight={bold ? 700 : 500} fill={LEAD} opacity={opacity} filter="url(#oc-lead)" fontFamily={font === 'caveat' ? "'Caveat Variable', cursive" : "'Reenie Beanie', cursive"}>
      {children}
    </text>
  );
}

function Smudge({ x, y, w = 30, h = 18, seed = 0 }: { x: number; y: number; w?: number; h?: number; seed?: number }) {
  return <ellipse cx={x} cy={y} rx={w / 2} ry={h / 2} fill="#8A8783" opacity={0.2 + jitter(seed) * 0.08} filter="url(#oc-smudge)" transform={`rotate(${(jitter(seed + 3) * 30).toFixed(0)} ${x} ${y})`} />;
}

function Strike({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <path d={`M${x1},${y1} Q${(x1 + x2) / 2},${(y1 + y2) / 2 - 3} ${x2},${y2}`} stroke={LEAD} strokeWidth="1.8" fill="none" opacity="0.8" filter="url(#oc-lead)" />;
}

export default function OldScorecard() {
  const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);
  const totals = PLAYERS.map((p) => ({ out: sum(p.scores.slice(0, 9)), in: sum(p.scores.slice(9)), tot: sum(p.scores) }));
  const cellCentre = (c: number) => colX(c) + COL / 2;
  const playerY = (k: number) => ROW.players + k * ROW.playerH;

  return (
    <svg viewBox="0 0 940 500" className="oc-svg" role="img" aria-label="The old way: a pencil scorecard after a round of Nassau and Wolf. Scores are written over erased ones, the totals were added up twice, a press is squeezed in under the front nine, the wolf picks are scrawled underneath, and the money is worked out three times in the margin with question marks.">
      <defs>
        <filter id="oc-lead" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="4" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.35" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
        <filter id="oc-smudge" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="oc-ghost"><feGaussianBlur stdDeviation="0.7" /></filter>
        <filter id="oc-paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="9" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.5  0 0 0 0 0.42  0 0 0 0.09 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="oc-ring"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>

      {/* the card */}
      <g>
        <rect x="10" y="12" width="910" height="470" rx="6" fill="#FBF7EC" />
        <rect x="10" y="12" width="910" height="470" rx="6" fill="#000" filter="url(#oc-paper)" />
        <rect x="10" y="12" width="910" height="470" rx="6" fill="none" stroke="#E4DCC8" />
      </g>

      {/* printed header */}
      <text x={X0} y="44" fontSize="17" fontWeight="800" letterSpacing="1.5" fill={INK} fontFamily="Georgia, serif">WELLSHIRE GOLF COURSE</text>
      <text x={X0} y="60" fontSize="10.5" fill={INK} fontFamily="Georgia, serif">Denver, Colorado · White tees</text>
      <text x="610" y="50" fontSize="11" fill={INK} fontFamily="Georgia, serif">Date</text>
      <line x1="640" x2="720" y1="52" y2="52" stroke={INK} strokeWidth="0.8" />
      <Hand x={668} y={49} size={22} seed={71}>11/8</Hand>
      <text x="735" y="50" fontSize="11" fill={INK} fontFamily="Georgia, serif">Attest</text>
      <line x1="772" x2="890" y1="52" y2="52" stroke={INK} strokeWidth="0.8" />

      {/* printed grid */}
      <g stroke={INK} strokeWidth="0.9" fill="none">
        <rect x={X0} y={ROW.hole} width={RIGHT - X0} height={ROW.end - ROW.hole} />
        {[ROW.par, ROW.hcp, ROW.players, ...PLAYERS.map((_, k) => playerY(k + 1)), ROW.wolf].map((y, i) => (
          <line key={i} x1={X0} x2={RIGHT} y1={y} y2={y} />
        ))}
        {cols.map((_, c) => <line key={c} x1={colX(c)} x2={colX(c)} y1={ROW.hole} y2={ROW.end} />)}
      </g>
      <rect x={X0} y={ROW.hole} width={RIGHT - X0} height={ROW.par - ROW.hole} fill={INK} opacity="0.92" />
      {[9, 19, 20].map((c) => <rect key={c} x={colX(c)} y={ROW.par} width={COL} height={ROW.end - ROW.par} fill={INK} opacity="0.07" />)}
      <g fontFamily="Georgia, serif" textAnchor="middle">
        <text x={X0 + 8} y={ROW.hole + 16} textAnchor="start" fontSize="11" fontWeight="700" fill="#FBF7EC" letterSpacing="1">HOLE</text>
        <text x={X0 + 8} y={ROW.par + 14} textAnchor="start" fontSize="10.5" fontWeight="700" fill={INK}>PAR</text>
        <text x={X0 + 8} y={ROW.hcp + 13} textAnchor="start" fontSize="9.5" fill={INK}>HANDICAP</text>
        {cols.map((c, k) => {
          const label = c.kind === 'hole' ? String(c.i + 1) : c.kind.toUpperCase();
          return (
            <g key={k}>
              <text x={cellCentre(k)} y={ROW.hole + 16} fontSize={c.kind === 'hole' ? 12 : 9.5} fontWeight="700" fill="#FBF7EC">{label}</text>
              {c.kind === 'hole' && <text x={cellCentre(k)} y={ROW.par + 14} fontSize="11" fill={INK}>{PAR[c.i]}</text>}
              {c.kind === 'hole' && <text x={cellCentre(k)} y={ROW.hcp + 13} fontSize="9" fill={INK}>{HCP[c.i]}</text>}
              {c.kind === 'out' && <text x={cellCentre(k)} y={ROW.par + 14} fontSize="11" fill={INK}>36</text>}
              {c.kind === 'in' && <text x={cellCentre(k)} y={ROW.par + 14} fontSize="11" fill={INK}>36</text>}
              {c.kind === 'tot' && <text x={cellCentre(k)} y={ROW.par + 14} fontSize="11" fill={INK}>72</text>}
            </g>
          );
        })}
      </g>

      {/* coffee ring, under the pencil but over the print */}
      <circle cx="808" cy="104" r="40" fill="none" stroke="#8A5A2B" strokeWidth="7" opacity="0.14" filter="url(#oc-ring)" />
      <circle cx="811" cy="101" r="37" fill="none" stroke="#8A5A2B" strokeWidth="1.5" opacity="0.18" />

      {/* players: names, scores, strokes, overwrites */}
      {PLAYERS.map((p, k) => {
        const y = playerY(k) + 28;
        return (
          <g key={p.name}>
            <Hand x={X0 + 10} y={y} size={28} seed={k * 7 + 1} anchor="start">{p.name}</Hand>
            {p.scores.map((sc, i) => {
              const c = holeCol(i);
              const cx = cellCentre(c);
              const ow = OVERWRITES.find(([pk, h]) => pk === k && h === i);
              const birdie = sc < PAR[i];
              const dot = HCP[i] <= p.strokes;
              return (
                <g key={i}>
                  {ow && <Smudge x={cx} y={y - 9} seed={k * 31 + i} />}
                  {ow && <text x={cx - 2} y={y - 1} textAnchor="middle" fontSize="24" fill={LEAD} opacity="0.22" filter="url(#oc-ghost)" fontFamily="'Caveat Variable', cursive">{ow[2]}</text>}
                  <Hand x={cx} y={y} seed={k * 100 + i} bold={!!ow}>{sc}</Hand>
                  {birdie && <ellipse cx={cx + 1} cy={y - 8} rx="12" ry="13" fill="none" stroke={LEAD} strokeWidth="1.4" opacity="0.8" filter="url(#oc-lead)" transform={`rotate(${(jitter(i + k) * 20).toFixed(0)} ${cx} ${y - 8})`} />}
                  {dot && <circle cx={colX(c) + COL - 6} cy={playerY(k) + 7} r="2.1" fill={LEAD} opacity="0.75" />}
                </g>
              );
            })}
            {(['out', 'in', 'tot'] as const).map((key) => {
              const c = key === 'out' ? 9 : key === 'in' ? 19 : 20;
              const cx = cellCentre(c);
              const bad = BAD_TOTALS.find(([pk, col]) => pk === k && col === key);
              return (
                <g key={key}>
                  {bad && <Smudge x={cx} y={y - 9} w={34} h={20} seed={k + c} />}
                  {bad && key !== 'tot' && <text x={cx + 1} y={y} textAnchor="middle" fontSize="22" fill={LEAD} opacity="0.22" filter="url(#oc-ghost)" fontFamily="'Caveat Variable', cursive">{bad[2]}</text>}
                  {bad && key === 'tot' ? (
                    <>
                      <Hand x={cx - 3} y={y - 6} size={18} seed={c + k}>{bad[2]}</Hand>
                      <Strike x1={cx - 14} y1={y - 12} x2={cx + 8} y2={y - 9} />
                      <Hand x={cx + 4} y={y + 8} size={20} seed={c + k + 5} bold>{totals[k].tot}</Hand>
                    </>
                  ) : (
                    <Hand x={cx} y={y} size={key === 'tot' ? 24 : 22} seed={c * 3 + k} bold={!!bad}>{totals[k][key]}</Hand>
                  )}
                </g>
              );
            })}
            <Hand x={cellCentre(21)} y={y} size={22} seed={k + 400}>{p.hcp}</Hand>
          </g>
        );
      })}

      {/* the Nassau, squeezed into a blank row */}
      <Hand x={X0 + 6} y={ROW.nassau + 22} size={20} seed={501} font="reenie" anchor="start">T/D v M/B</Hand>
      {NASSAU_FRONT.map((v, i) => <Hand key={`f${i}`} x={cellCentre(i)} y={ROW.nassau + 15} size={15} seed={600 + i} font="reenie">{v}</Hand>)}
      {PRESS_FRONT.map((v, i) => (v ? <Hand key={`p${i}`} x={cellCentre(i)} y={ROW.nassau + 32} size={14} seed={650 + i} font="reenie">{v}</Hand> : null))}
      <path d={`M${colX(5) + 3},${ROW.nassau + 22} l6,-4 l-2,8 Z`} fill={LEAD} opacity="0.7" />
      <Hand x={colX(5) - 6} y={ROW.nassau + 33} size={13} seed={660} font="reenie">P</Hand>
      {NASSAU_BACK.map((v, i) => {
        const c = holeCol(i + 9);
        const erased = i === 7;
        return (
          <g key={`b${i}`}>
            {erased && <Smudge x={cellCentre(c)} y={ROW.nassau + 14} w={30} h={16} seed={700} />}
            <Hand x={cellCentre(c)} y={ROW.nassau + 16} size={15} seed={700 + i} font="reenie" bold={erased}>{erased ? '+1?' : v}</Hand>
          </g>
        );
      })}
      <Hand x={cellCentre(14) - 4} y={ROW.nassau + 33} size={13} seed={720} font="reenie">P →</Hand>
      <Hand x={cellCentre(9)} y={ROW.nassau + 22} size={18} seed={730} font="reenie">+2</Hand>
      <Hand x={cellCentre(19)} y={ROW.nassau + 22} size={18} seed={731} font="reenie">+1</Hand>

      {/* the Wolf, in the last row */}
      <Hand x={X0 + 6} y={ROW.wolf + 25} size={22} seed={801} font="reenie" anchor="start">WOLF</Hand>
      {WOLF.map((w, i) => {
        const c = holeCol(i);
        const cx = cellCentre(c);
        const lone = w === 'LONE';
        const redo = i === 11;
        return (
          <g key={`w${i}`}>
            {redo && <Smudge x={cx} y={ROW.wolf + 18} w={32} h={18} seed={810} />}
            <Hand x={cx} y={ROW.wolf + 23} size={lone ? 16 : 15} seed={820 + i} font="reenie" bold={lone || redo}>{w}</Hand>
            {lone && <ellipse cx={cx} cy={ROW.wolf + 18} rx="17" ry="11" fill="none" stroke={LEAD} strokeWidth="1.3" opacity="0.8" filter="url(#oc-lead)" />}
            {lone && <Hand x={cx + 14} y={ROW.wolf + 7} size={13} seed={840} font="reenie">x2!</Hand>}
          </g>
        );
      })}

      {/* the money, worked out in the margin */}
      <Hand x={40} y={398} size={26} seed={901} font="reenie" anchor="start">Nassau $2-2-2  · press on 6 &amp; 14</Hand>
      <Hand x={40} y={428} size={26} seed={902} font="reenie" anchor="start">Wolf $1 a pt</Hand>
      <Hand x={190} y={430} size={24} seed={903} font="reenie" anchor="start">T 7   D 3   M</Hand>
      <Smudge x={300} y={420} w={34} h={20} seed={904} />
      <Hand x={292} y={430} size={24} seed={905} font="reenie" anchor="start" bold>-5</Hand>
      <Hand x={325} y={430} size={24} seed={906} font="reenie" anchor="start">B -5</Hand>
      <Hand x={40} y={462} size={24} seed={907} font="reenie" anchor="start">front +2  back +2??  press 6 +2  press 14 -2</Hand>
      <Strike x1={170} y1={455} x2={250} y2={452} />
      <Hand x={520} y={410} size={26} seed={908} font="reenie" anchor="start">Bill → Tom $9</Hand>
      <Strike x1={520} y1={402} x2={668} y2={399} />
      <Hand x={530} y={440} size={28} seed={909} font="reenie" anchor="start" bold>Bill → Tom $7 ?</Hand>
      <ellipse cx="610" cy="430" rx="92" ry="22" fill="none" stroke={LEAD} strokeWidth="1.4" opacity="0.75" filter="url(#oc-lead)" transform="rotate(-3 610 430)" />
      <Hand x={530} y={470} size={22} seed={910} font="reenie" anchor="start">Mike owes Dave 2 (or 4?) — ask Dave</Hand>
      <Hand x={745} y={392} size={20} seed={911} font="reenie" anchor="start">who had wolf on 12??</Hand>
      <path d="M800,398 C820,404 832,380 845,372" stroke={LEAD} strokeWidth="1.3" fill="none" opacity="0.7" filter="url(#oc-lead)" />

      {/* eraser crumbs */}
      {[[452, 268, 2], [470, 274, 1.6], [462, 282, 1.3], [700, 470, 1.8], [712, 462, 1.4], [205, 250, 1.5]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#C9A49F" opacity="0.7" />
      ))}

      {/* the pencil, left on the card */}
      <g transform="translate(700 470) rotate(-14)">
        <rect x="0" y="-8" width="170" height="16" rx="2" fill="#E3B341" />
        <rect x="0" y="-8" width="170" height="5" fill="#EFC75E" />
        <rect x="0" y="3" width="170" height="5" fill="#C9962C" />
        <polygon points="0,-8 -26,0 0,8" fill="#E7C69A" />
        <polygon points="-17,-3 -26,0 -17,3" fill="#3B3A38" />
        <rect x="170" y="-8.5" width="16" height="17" fill="#B9B6AE" />
        <rect x="174" y="-8.5" width="2" height="17" fill="#9A968D" />
        <rect x="186" y="-8" width="14" height="16" rx="4" fill="#D98C86" />
      </g>
    </svg>
  );
}
