/*
 * The brand's motif: one golfer's front nine on a printed scorecard strip.
 * On load the scores fill in hole by hole, once (pure CSS, no script);
 * with reduced motion it simply shows the finished card.
 */

const PARS = [4, 3, 5, 4, 4, 5, 4, 3, 4];
const SCORES = [4, 3, 5, 5, 4, 4, 4, 2, 4];
const OUT_PAR = PARS.reduce((a, b) => a + b, 0);
const OUT = SCORES.reduce((a, b) => a + b, 0);
const STEP_MS = 160;
const START_MS = 450;

function mark(score: number, par: number) {
  if (score < par) return 'birdie';
  if (score > par + 1) return 'double';
  return '';
}

export default function ScorecardStrip() {
  return (
    <figure className="sc" aria-label={`A scorecard: Tom's front nine, ${OUT} against a par of ${OUT_PAR}, with birdies on 6 and 8`}>
      <table>
        <thead>
          <tr>
            <th scope="col">Hole</th>
            {PARS.map((_, i) => <th key={i} scope="col">{i + 1}</th>)}
            <th scope="col">Out</th>
          </tr>
        </thead>
        <tbody>
          <tr className="par">
            <th scope="row">Par</th>
            {PARS.map((p, i) => <td key={i}>{p}</td>)}
            <td>{OUT_PAR}</td>
          </tr>
          <tr className="score">
            <th scope="row">Tom</th>
            {SCORES.map((s, i) => (
              <td key={i}>
                <span className={`fill ${mark(s, PARS[i])}`} style={{ animationDelay: `${START_MS + i * STEP_MS}ms` }}>{s}</span>
              </td>
            ))}
            <td>
              <span className="fill tot" style={{ animationDelay: `${START_MS + 9 * STEP_MS + 120}ms` }}>{OUT}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <style>{`
        .sc { margin: 0; font-family: var(--font-display); color: var(--color-ink); border-top: 2px solid var(--color-ink); border-bottom: 2px solid var(--color-ink); font-variant-numeric: tabular-nums lining-nums; }
        .sc table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .sc th, .sc td { text-align: center; border-left: 1px solid var(--color-stone); padding: 0; }
        .sc th:first-child { border-left: 0; text-align: left; width: 22%; font-family: var(--font-sans); font-weight: 500; font-size: 0.9375rem; color: var(--color-ink-soft); letter-spacing: 0; }
        .sc thead th { font-weight: 600; font-size: 1rem; height: 2.5rem; border-bottom: 1px solid var(--color-stone); }
        .sc thead th:last-child, .sc td:last-child { width: 12%; }
        .sc .par td { font-size: 0.9375rem; color: var(--color-ink-soft); height: 2.25rem; border-bottom: 1px solid var(--color-stone); }
        .sc .score td { height: 4.25rem; font-size: 1.75rem; font-weight: 600; }
        .sc .fill { display: inline-flex; align-items: center; justify-content: center; width: 2.6rem; height: 2.6rem; opacity: 0; animation: sc-in 420ms cubic-bezier(.22,.61,.36,1) forwards; }
        .sc .birdie { border-radius: 999px; box-shadow: inset 0 0 0 2px var(--color-fairway); }
        .sc .double { border-radius: 6px; box-shadow: inset 0 0 0 2px var(--color-ink); }
        .sc .tot { font-weight: 700; }
        @keyframes sc-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @media (max-width: 520px) {
          .sc th:first-child { width: 15%; font-size: 0.8125rem; }
          .sc thead th, .sc .par td { font-size: 0.8125rem; }
          .sc .score td { height: 3.25rem; font-size: 1.25rem; }
          .sc .fill { width: 1.9rem; height: 1.9rem; }
          .sc thead th:last-child, .sc td:last-child { width: 13%; }
        }
        @media (prefers-reduced-motion: reduce) { .sc .fill { animation: none; opacity: 1; } }
      `}</style>
    </figure>
  );
}
