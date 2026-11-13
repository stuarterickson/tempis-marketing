/*
 * Close-up details of Tempis Play, drawn in the app's own colours.
 *
 * Deliberately NOT whole screens: each shows one piece of craft (the score keys,
 * a slice of the group card, the settle-up) and fades out at the edges, so the
 * site shows how Play looks and feels without giving away screen layouts or flows.
 */

function Stage({ children, label, fade }: { children: React.ReactNode; label: string; fade: 'bottom' | 'left' | 'both' }) {
  const mask =
    fade === 'bottom'
      ? '[mask-image:linear-gradient(to_bottom,black_62%,transparent_96%)]'
      : fade === 'left'
        ? '[mask-image:linear-gradient(to_right,transparent_2%,black_34%)]'
        : '[mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black_55%,transparent_100%)]';
  return (
    <figure
      role="img"
      aria-label={label}
      className="relative mx-auto flex aspect-[5/4] w-full max-w-[460px] items-center justify-center overflow-hidden rounded-[28px] border border-stone bg-[radial-gradient(circle_at_30%_20%,var(--color-ivory),var(--color-well)_70%)]"
    >
      <div className={`w-full px-7 ${mask}`}>{children}</div>
    </figure>
  );
}

/* ---------- 1. The score keys ---------- */

function Key({ n, state }: { n: number; state: 'plain' | 'chosen' | 'suggested' }) {
  const look =
    state === 'chosen'
      ? 'bg-flag text-ink shadow-[inset_0_3px_4px_rgb(23_22_21/0.25)] translate-y-[3px]'
      : state === 'suggested'
        ? 'border-2 border-dashed border-fairway bg-fairway-tint text-fairway'
        : 'border border-edge bg-gradient-to-b from-ivory to-well shadow-[0_3px_0_var(--color-bar)]';
  return (
    <div className={`flex h-[62px] items-center justify-center rounded-[14px] text-[28px] font-bold tabular-nums ${look}`}>{n}</div>
  );
}

function GolferKeys({ name, note, chosen, suggested }: { name: string; note: string; chosen?: number; suggested?: number }) {
  return (
    <div className="rounded-[18px] border border-stone bg-ivory px-4 py-4 shadow-[0_18px_40px_-24px_rgb(23_22_21/0.35)]">
      <div className="flex items-baseline justify-between">
        <span className="text-[19px] font-semibold">{name}</span>
        <span className="text-[14px] text-ink-soft">{note}</span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2.5">
        {[3, 4, 5, 6, 7].map((n) => (
          <Key key={n} n={n} state={n === chosen ? 'chosen' : n === suggested ? 'suggested' : 'plain'} />
        ))}
      </div>
    </div>
  );
}

export function KeysVignette() {
  return (
    <Stage label="Close-up of Tempis Play's score keys: big raised number keys, one pressed in, par suggested with a dashed outline" fade="bottom">
      <div className="space-y-3 pt-6">
        <GolferKeys name="Dave Keller" note="Plays off 12" chosen={5} />
        <GolferKeys name="Mike Sorensen" note="Plays off 17" suggested={4} />
      </div>
    </Stage>
  );
}

/* ---------- 2. A slice of the group card ---------- */

const HOLES = [6, 7, 8, 9];
const PARS = [5, 4, 3, 4];
const ROWS = [
  { name: 'Tom', scores: [5, 4, 3, 4], out: 36, viewer: true },
  { name: 'Dave', scores: [5, 5, 3, 4], out: 41 },
  { name: 'Mike', scores: [4, 4, 4, 5], out: 42 },
  { name: 'Bill', scores: [6, 5, 3, 5], out: 45 },
];

function Cell({ s, par }: { s: number; par: number }) {
  const look = s < par ? 'rounded-full bg-fairway text-ivory' : s > par + 1 ? 'rounded-[6px] border-2 border-ink-soft' : '';
  return <span className={`inline-flex h-[34px] w-[34px] items-center justify-center ${look}`}>{s}</span>;
}

export function CardVignette() {
  return (
    <Stage label="Close-up of a Tempis Play group scorecard: four golfers' scores on the closing holes of the front nine" fade="left">
      <div className="ml-auto max-w-[400px] rounded-[18px] border border-stone bg-ivory px-3 py-3 shadow-[0_18px_40px_-24px_rgb(23_22_21/0.35)]">
        <table className="w-full table-fixed text-center text-[19px] tabular-nums">
          <thead>
            <tr className="text-[12px] font-semibold uppercase tracking-[0.11em] text-ink-soft">
              <th className="w-[72px]" />
              {HOLES.map((h) => <th key={h} className="pb-1">{h}</th>)}
              <th className="w-[54px] pb-1">Out</th>
            </tr>
            <tr className="text-[14px] text-ink-soft">
              <td className="pb-1 text-left">Par</td>
              {PARS.map((p, i) => <td key={i}>{p}</td>)}
              <td>36</td>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name} className={r.viewer ? 'bg-[#E3EEFB]' : ''}>
                <td className="py-1.5 pl-1 text-left font-semibold">{r.name}</td>
                {r.scores.map((s, i) => <td key={i}><Cell s={s} par={PARS[i]} /></td>)}
                <td className="font-bold">{r.out}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}

/* ---------- 3. The settle-up ---------- */

export function SettleVignette() {
  return (
    <Stage label="Close-up of Tempis Play's settle-up: who pays whom, in plain sentences" fade="both">
      <div className="mx-auto max-w-[360px] rounded-[18px] border border-stone bg-ivory px-6 py-5 shadow-[0_18px_40px_-24px_rgb(23_22_21/0.35)]">
        <div className="text-[13px] font-semibold uppercase tracking-[0.11em] text-ink-soft">Who pays whom</div>
        <div className="mt-3 space-y-2.5 text-[22px] leading-snug">
          <div>Bill pays Tom <span className="font-bold tabular-nums">$7</span>.</div>
          <div>Mike pays Tom <span className="font-bold tabular-nums">$5</span>.</div>
          <div>Mike pays Dave <span className="font-bold tabular-nums">$2</span>.</div>
        </div>
      </div>
    </Stage>
  );
}
