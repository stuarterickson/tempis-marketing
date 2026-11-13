/*
 * Simplified drawings of three Play screens, built in the app's own colours.
 * They illustrate; they are not screenshots. Swap in real screenshots from
 * the beta build once the screens are final.
 */

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure
      role="img"
      aria-label={label}
      className="relative mx-auto w-[270px] shrink-0 rounded-[2.6rem] border border-ink/80 bg-graphite-deep p-[10px] shadow-[0_24px_48px_-18px_rgb(23_22_21/0.45)]"
    >
      <div className="absolute left-1/2 top-[18px] z-10 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-graphite-deep" />
      <div className="h-[580px] overflow-hidden rounded-[2rem] bg-oat text-ink">{children}</div>
    </figure>
  );
}

function StatusBar() {
  return (
    <div className="flex h-[46px] items-end justify-between px-6 pb-1 text-[11px] font-semibold">
      <span>9:41</span>
      <span aria-hidden>●●● ▮</span>
    </div>
  );
}

/* ---------------- Score entry ---------------- */

const KEYS = [3, 4, 5, 6, 7];

function ScoreKeys({ chosen, suggested }: { chosen?: number; suggested?: number }) {
  return (
    <div className="mt-2 grid grid-cols-5 gap-1.5">
      {KEYS.map((n) => {
        const isChosen = n === chosen;
        const isSuggested = !chosen && n === suggested;
        return (
          <div
            key={n}
            className={[
              'flex h-[44px] items-center justify-center rounded-[10px] text-[19px] font-bold tabular-nums',
              isChosen
                ? 'bg-flag text-ink shadow-[inset_0_2px_3px_rgb(23_22_21/0.25)]'
                : isSuggested
                  ? 'border-[1.5px] border-dashed border-fairway bg-fairway-tint text-fairway'
                  : 'border border-edge bg-gradient-to-b from-ivory to-well shadow-[0_2.5px_0_var(--color-bar)]',
            ].join(' ')}
          >
            {n}
          </div>
        );
      })}
    </div>
  );
}

function PlayerCard({ name, hcp, chosen }: { name: string; hcp: string; chosen?: number }) {
  return (
    <div className="rounded-[14px] border border-stone bg-ivory px-3 py-2.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-semibold">{name}</span>
        <span className="text-[11px] text-ink-soft">{hcp}</span>
      </div>
      <ScoreKeys chosen={chosen} suggested={4} />
    </div>
  );
}

export function ScoreEntryPhone() {
  return (
    <Phone label="Tempis Play score entry: one row of big number keys for each golfer, with par already suggested">
      <StatusBar />
      <div className="px-3.5">
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-[18px] font-extrabold leading-tight">Hole 7</div>
            <div className="text-[12px] text-ink-soft">Par 4 · 412 yds · Hcp 3</div>
          </div>
          <div className="rounded-full border border-edge bg-gradient-to-b from-ivory to-well px-3 py-1 text-[11px] font-semibold">
            Games
          </div>
        </div>
        <div className="space-y-2">
          <PlayerCard name="Dave Keller" hcp="Plays off 12" chosen={5} />
          <PlayerCard name="Tom Ruiz" hcp="Plays off 8" chosen={4} />
          <PlayerCard name="Mike Sorensen" hcp="Plays off 17" />
          <PlayerCard name="Bill Hanley" hcp="Plays off 21" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-ink-soft">Mike & Bill at par</span>
          <span className="rounded-[10px] border border-fairway-deep bg-gradient-to-b from-fairway to-fairway-dark px-4 py-2.5 text-[13px] font-semibold text-ivory shadow-[0_3px_0_var(--color-fairway-deep)]">
            Save & next
          </span>
        </div>
      </div>
    </Phone>
  );
}

/* ---------------- Group card ---------------- */

const GROUP = [
  { name: 'Tom', scores: [4, 3, 5, 4, 4, 5, 4, 3, 4], viewer: true },
  { name: 'Dave', scores: [5, 4, 5, 4, 6, 5, 5, 3, 4] },
  { name: 'Mike', scores: [5, 4, 6, 5, 5, 4, 4, 4, 5] },
  { name: 'Bill', scores: [6, 4, 5, 5, 6, 6, 5, 3, 5] },
];
const PARS = [4, 3, 5, 4, 4, 5, 4, 3, 4];

function cellTone(score: number, par: number) {
  if (score < par) return 'rounded-full bg-fairway text-ivory';
  if (score > par + 1) return 'rounded-[4px] border border-ink-soft';
  return '';
}

export function GroupCardPhone() {
  return (
    <Phone label="Tempis Play group scorecard: four golfers' scores for the front nine on one card">
      <StatusBar />
      <div className="px-3.5">
        <div className="py-2">
          <div className="text-[18px] font-extrabold leading-tight">Wellshire</div>
          <div className="text-[12px] text-ink-soft">Front nine · everyone scoring</div>
        </div>
        <div className="rounded-[14px] border border-stone bg-ivory p-2">
          <table className="w-full table-fixed text-center text-[11px] tabular-nums">
            <thead>
              <tr className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                <th className="w-[44px] py-1 text-left">Hole</th>
                {PARS.map((_, i) => <th key={i}>{i + 1}</th>)}
                <th className="w-[26px]">Out</th>
              </tr>
              <tr className="text-[10px] text-ink-soft">
                <td className="py-0.5 text-left">Par</td>
                {PARS.map((p, i) => <td key={i}>{p}</td>)}
                <td>36</td>
              </tr>
            </thead>
            <tbody>
              {GROUP.map((g) => (
                <tr key={g.name} className={g.viewer ? 'bg-[#E3EEFB]' : ''}>
                  <td className="py-1.5 text-left font-semibold">{g.name}</td>
                  {g.scores.map((s, i) => (
                    <td key={i}>
                      <span className={`inline-flex h-[18px] w-[18px] items-center justify-center ${cellTone(s, PARS[i])}`}>{s}</span>
                    </td>
                  ))}
                  <td className="font-bold">{g.scores.reduce((a, b) => a + b, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 rounded-[14px] border border-stone bg-ivory p-3">
          <div className="text-[13px] font-semibold">Every card matches</div>
          <div className="mt-0.5 text-[12px] text-ink-soft">
            Each golfer entered his own scores. Nothing to settle before you sign.
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <span className="rounded-[10px] border border-fairway-deep bg-gradient-to-b from-fairway to-fairway-dark px-4 py-2.5 text-[13px] font-semibold text-ivory shadow-[0_3px_0_var(--color-fairway-deep)]">
            Sign my card
          </span>
        </div>
      </div>
    </Phone>
  );
}

/* ---------------- Side games settled ---------------- */

export function SettlePhone() {
  return (
    <Phone label="Tempis Play side games result: who won the Skins and Nassau, and who pays whom">
      <StatusBar />
      <div className="px-3.5">
        <div className="py-2">
          <div className="text-[18px] font-extrabold leading-tight">Games</div>
          <div className="text-[12px] text-ink-soft">Round complete · settled</div>
        </div>
        <div className="space-y-2">
          <div className="rounded-[14px] border border-stone bg-ivory p-3">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-soft">Skins · $5 a man</div>
            <div className="mt-1.5 space-y-1 text-[13px]">
              <div className="flex gap-3"><span className="w-[52px] font-semibold">Tom</span><span>3 skins</span><span className="font-semibold text-gold-text">$15</span></div>
              <div className="flex gap-3"><span className="w-[52px] font-semibold">Dave</span><span>1 skin</span><span className="font-semibold text-gold-text">$5</span></div>
            </div>
          </div>
          <div className="rounded-[14px] border border-stone bg-ivory p-3">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-soft">Nassau · $2 a side</div>
            <div className="mt-1.5 space-y-1 text-[13px]">
              <div className="flex gap-3"><span className="w-[52px] text-ink-soft">Front</span><span>Tom & Dave, 2 up</span></div>
              <div className="flex gap-3"><span className="w-[52px] text-ink-soft">Back</span><span>Mike & Bill, 1 up</span></div>
              <div className="flex gap-3"><span className="w-[52px] text-ink-soft">Overall</span><span>Tom & Dave, 1 up</span></div>
            </div>
          </div>
          <div className="rounded-[14px] border border-stone bg-ivory p-3">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-soft">Who pays whom</div>
            <div className="mt-1.5 space-y-1.5 text-[14px]">
              <div>Bill pays Tom <span className="font-bold tabular-nums">$7</span>.</div>
              <div>Mike pays Tom <span className="font-bold tabular-nums">$5</span>.</div>
              <div>Mike pays Dave <span className="font-bold tabular-nums">$2</span>.</div>
            </div>
          </div>
        </div>
      </div>
    </Phone>
  );
}
