/*
 * Backbeat's screens, redrawn in the app's own colours and type for the site.
 * The numbers all agree: Skins ($5 a man, 4 skins at $5) and Nassau ($2 a
 * side, Tom & Dave against Mike & Bill) net to Tom +$12, Dave +$2,
 * Mike −$7, Bill −$7, which is exactly who-pays-whom below.
 */

export function StatusBar() {
  return (
    <div className="ap-status">
      <span>9:41</span>
      <i>●●● ▰</i>
    </div>
  );
}

const money = (n: number) => (n > 0 ? `+$${n}` : n < 0 ? `−$${-n}` : '$0');
const tone = (n: number) => (n > 0 ? 'ap-won' : n < 0 ? 'ap-lost' : '');

const SKINS = [
  { name: 'Tom', skins: 3, net: 10, me: true },
  { name: 'Dave', skins: 1, net: 0 },
  { name: 'Mike', skins: 0, net: -5 },
  { name: 'Bill', skins: 0, net: -5 },
];

export function GamesSummaryScreen({ skinsRef, hot }: { skinsRef?: React.Ref<HTMLDivElement>; hot?: boolean }) {
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top">
        <span className="ap-back">‹</span>
        <div>
          <div className="ap-title">Wellshire</div>
          <div className="ap-sub">Saturday, 18 holes, round complete</div>
        </div>
      </div>
      <div className="ap-sec">Games</div>
      <div className="ap-body">
        <div ref={skinsRef} className={`ap-card gd-hl ${hot ? 'hot' : ''}`}>
          <div className="ap-card-h">
            <span className="ap-game"><span className="ap-ico">$</span>Skins</span>
            <span className="ap-chev">›</span>
          </div>
          <div className="ap-meta">$5 a man, 4 skins won</div>
          <table className="ap-tbl">
            <thead><tr><th>Golfer</th><th>Skins</th><th>Net</th></tr></thead>
            <tbody>
              {SKINS.map((r) => (
                <tr key={r.name} className={r.me ? 'me' : ''}>
                  <td>{r.name}</td><td>{r.skins}</td><td className={tone(r.net)}>{money(r.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ap-card">
          <div className="ap-card-h">
            <span className="ap-game"><span className="ap-ico">N</span>Nassau</span>
            <span className="ap-chev">›</span>
          </div>
          <div className="ap-meta">$2 a side. Tom &amp; Dave won the front and the match.</div>
          <table className="ap-tbl">
            <thead><tr><th>Side</th><th>Net each</th></tr></thead>
            <tbody>
              <tr className="me"><td>Tom &amp; Dave</td><td className="ap-won">+$2</td></tr>
              <tr><td>Mike &amp; Bill</td><td className="ap-lost">−$2</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const HOLES = [
  { hole: 2, who: 'Tom', how: 'Birdie, 2 on a par 3' },
  { hole: 6, who: 'Tom', how: 'Birdie, 4 on a par 5' },
  { hole: 8, who: 'Dave', how: 'Birdie, 2 on a par 3' },
  { hole: 11, who: 'Tom', how: 'Par, the only one' },
];

export function SkinsBoardScreen({ settleRef, pressed, scrolled }: { settleRef?: React.Ref<HTMLSpanElement>; pressed?: boolean; scrolled?: boolean }) {
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top">
        <span className="ap-back">‹</span>
        <div>
          <div className="ap-title">Skins</div>
          <div className="ap-sub">Hole by hole, $5 a skin</div>
        </div>
      </div>
      <div className="ap-body" style={{ marginTop: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <span className="ap-toggle"><span>Show ties</span><span className="on">Hide</span></span>
        </div>
        <div className="gd-scroll" style={{ transform: scrolled ? 'translateY(-34px)' : 'none' }}>
          {HOLES.map((h) => (
            <div key={h.hole} className="ap-tile won">
              <div className="hb"><small>HOLE</small>{h.hole}</div>
              <div className="tx"><b>{h.who}</b><span>{h.how}</span></div>
              <div className="mn">$5</div>
            </div>
          ))}
          <div className="ap-tile">
            <div className="hb"><small>HOLE</small>18</div>
            <div className="tx"><b>No skin</b><span>Tied, nothing carries</span></div>
            <div className="mn" style={{ color: '#66635E' }}>–</div>
          </div>
        </div>
      </div>
      <div className="ap-foot">
        <span ref={settleRef} className={`ap-btn ${pressed ? 'ap-pressed' : ''}`}>Settle up</span>
      </div>
    </div>
  );
}

const NETS = [
  { name: 'Tom', net: 12, me: true },
  { name: 'Dave', net: 2 },
  { name: 'Mike', net: -7 },
  { name: 'Bill', net: -7 },
];

export function SettleUpScreen() {
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top">
        <span className="ap-back">‹</span>
        <div>
          <div className="ap-title">Settle up</div>
          <div className="ap-sub">Skins and Nassau together</div>
        </div>
      </div>
      <div className="ap-body" style={{ marginTop: 8 }}>
        <div className="ap-card" style={{ padding: '14px 14px 10px' }}>
          <div className="ap-pay">Bill pays Tom <b>$7</b>.</div>
          <div className="ap-pay">Mike pays Tom <b>$5</b>.</div>
          <div className="ap-pay">Mike pays Dave <b>$2</b>.</div>
        </div>
        <div className="ap-card">
          <table className="ap-tbl" style={{ marginTop: 0 }}>
            <thead><tr><th>Golfer</th><th>Net</th></tr></thead>
            <tbody>
              {NETS.map((r) => (
                <tr key={r.name} className={r.me ? 'me' : ''}>
                  <td>{r.name}</td><td className={tone(r.net)}>{money(r.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Keys({ chosen, suggested }: { chosen?: number; suggested?: number }) {
  return (
    <div className="ap-keys">
      {[3, 4, 5, 6, 7].map((n) => (
        <div key={n} className={`ap-key ${n === chosen ? 'on' : !chosen && n === suggested ? 'sg' : ''}`}>{n}</div>
      ))}
    </div>
  );
}

export function ScoreEntryScreen() {
  const golfers = [
    { name: 'Tom Ruiz', hcp: 'Plays off 8', chosen: 4 },
    { name: 'Dave Keller', hcp: 'Plays off 12', chosen: 5 },
    { name: 'Mike Sorensen', hcp: 'Plays off 17' },
    { name: 'Bill Hanley', hcp: 'Plays off 21' },
  ];
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top" style={{ justifyContent: 'space-between' }}>
        <div>
          <div className="ap-title">Hole 7</div>
          <div className="ap-sub">Par 4, 412 yards</div>
        </div>
        <span className="ap-btn ap-btn2" style={{ height: 34, fontSize: 13, padding: '0 12px' }}>Games</span>
      </div>
      <div className="ap-body">
        {golfers.map((g) => (
          <div key={g.name} className="ap-card" style={{ padding: '10px 10px 11px', marginBottom: 8 }}>
            <div className="ap-card-h"><b style={{ fontSize: 14 }}>{g.name}</b><span className="ap-sub">{g.hcp}</span></div>
            <Keys chosen={g.chosen} suggested={4} />
          </div>
        ))}
      </div>
      <div className="ap-foot" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="ap-sub">Mike &amp; Bill at par</span>
        <span className="ap-btn">Save &amp; next</span>
      </div>
    </div>
  );
}

const PARS = [5, 4, 3, 4];
const ROWS = [
  { name: 'Tom', s: [5, 4, 2, 4], out: 35, me: true },
  { name: 'Dave', s: [6, 4, 2, 5], out: 39 },
  { name: 'Mike', s: [4, 5, 4, 5], out: 42 },
  { name: 'Bill', s: [6, 5, 3, 6], out: 45 },
];

export function GroupCardScreen() {
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top">
        <span className="ap-back">‹</span>
        <div>
          <div className="ap-title">Group card</div>
          <div className="ap-sub">Everyone scoring, front nine</div>
        </div>
      </div>
      <div className="ap-body" style={{ marginTop: 8 }}>
        <div className="ap-card">
          <table className="ap-tbl" style={{ marginTop: 0, textAlign: 'center', fontSize: 15 }}>
            <thead><tr><th style={{ textAlign: 'left' }}>Hole</th><th style={{ textAlign: 'center' }}>6</th><th style={{ textAlign: 'center' }}>7</th><th style={{ textAlign: 'center' }}>8</th><th style={{ textAlign: 'center' }}>9</th><th>Out</th></tr></thead>
            <tbody>
              <tr><td style={{ fontWeight: 400, color: '#66635E' }}>Par</td>{PARS.map((p, i) => <td key={i} style={{ textAlign: 'center', color: '#66635E' }}>{p}</td>)}<td style={{ color: '#66635E' }}>36</td></tr>
              {ROWS.map((r) => (
                <tr key={r.name} className={r.me ? 'me' : ''}>
                  <td>{r.name}</td>
                  {r.s.map((x, i) => (
                    <td key={i} style={{ textAlign: 'center', padding: '6px 0' }}>
                      <span style={{
                        display: 'inline-flex', width: 26, height: 26, alignItems: 'center', justifyContent: 'center',
                        ...(x < PARS[i] ? { borderRadius: 99, background: '#237849', color: '#FCFAF7' } : x > PARS[i] + 1 ? { borderRadius: 5, border: '1.5px solid #4F4D49' } : {}),
                      }}>{x}</span>
                    </td>
                  ))}
                  <td style={{ fontWeight: 700 }}>{r.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ap-card">
          <b>Every card matches</b>
          <div className="ap-meta">Each golfer entered his own scores. Nothing to sort out before you sign.</div>
        </div>
      </div>
      <div className="ap-foot"><span className="ap-btn">Sign my card</span></div>
    </div>
  );
}

/* ---------- The catch: one hole, scored on two phones ---------- */

export function HoleScreen({ rows, saveRef, keyRef, pressedSave }: {
  rows: { name: string; note: string; chosen?: number; keyRefFor?: number }[];
  saveRef?: React.Ref<HTMLSpanElement>;
  keyRef?: React.Ref<HTMLDivElement>;
  pressedSave?: boolean;
}) {
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top" style={{ justifyContent: 'space-between' }}>
        <div>
          <div className="ap-title">Hole 7</div>
          <div className="ap-sub">Par 4, 412 yards</div>
        </div>
      </div>
      <div className="ap-body">
        {rows.map((g) => (
          <div key={g.name} className="ap-card" style={{ padding: '10px 10px 11px', marginBottom: 8 }}>
            <div className="ap-card-h"><b style={{ fontSize: 14 }}>{g.name}</b><span className="ap-sub">{g.note}</span></div>
            <div className="ap-keys">
              {[3, 4, 5, 6, 7].map((n) => (
                <div key={n} ref={g.keyRefFor === n ? keyRef : undefined}
                  className={`ap-key ${n === g.chosen ? 'on' : !g.chosen && n === 4 ? 'sg' : ''}`}>{n}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="ap-foot"><span ref={saveRef} className={`ap-btn ${pressedSave ? 'ap-pressed' : ''}`}>Save &amp; next</span></div>
    </div>
  );
}

/* ---------- The open invite: the organizer's round ---------- */

export function OpenInviteScreen({ filled, out, inviteRef, hot, seatRef }: { filled: string[]; out?: boolean; inviteRef?: React.Ref<HTMLSpanElement>; hot?: boolean; seatRef?: (i: number, el: HTMLDivElement | null) => void }) {
  const open = 2 - filled.length;
  const seats = ['Dave', 'Tom', ...filled, ...Array(open).fill(null)];
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top">
        <span className="ap-back">‹</span>
        <div>
          <div className="ap-title">Wellshire</div>
          <div className="ap-sub">Saturday, 8:10 AM tee time</div>
        </div>
      </div>
      <div className="ap-body" style={{ marginTop: 6 }}>
        <div className={`ap-card iv-out ${out ? 'show' : ''}`}>
          <div className="ap-game" style={{ fontSize: 14 }}><span className="ap-ico">✉</span>Your open invite</div>
          <div className="ap-meta" style={{ marginTop: 6 }}>Sent to Saturday Regulars, 50 golfers</div>
          <div style={{ marginTop: 8, fontSize: 13.5, fontWeight: 600, color: open ? '#171615' : '#21643E' }}>
            {open ? `${open === 1 ? '1 spot' : `${open} spots`} open — first to say yes gets ${open === 1 ? 'it' : 'them'}.` : 'Every seat is taken.'}
          </div>
        </div>
        <div className="ap-sec" style={{ padding: '6px 4px 6px' }}>Who’s playing</div>
        <div className="ap-card" style={{ padding: '4px 12px' }}>
          {seats.map((s, i) => (
            <div key={i} ref={seatRef ? (el) => seatRef(i, el) : undefined} className={i > 1 && s ? 'iv-seat' : ''} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderTop: i ? '1px solid #EEE6DA' : 'none' }}>
              <span style={{ fontWeight: 600, color: s ? '#171615' : '#66635E' }}>{s ?? 'Open spot'}</span>
              <span className="ap-sub" style={i > 1 && s ? { color: '#21643E', fontWeight: 600 } : undefined}>{s ? (i < 2 ? (i === 0 ? 'Organizer' : 'In') : 'Said yes first') : out ? 'Invite out' : ''}</span>
            </div>
          ))}
        </div>
        {!out && (
          <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
            <span ref={inviteRef} className={`ap-btn ap-btn2 gd-hl ${hot ? 'ap-pressed' : ''}`} style={{ height: 38, fontSize: 13.5, padding: '0 12px', whiteSpace: 'nowrap' }}>👥&nbsp; Invite a group</span>
            <span className="ap-btn ap-btn2" style={{ height: 38, fontSize: 13.5, padding: '0 12px', whiteSpace: 'nowrap' }}>Add a player</span>
          </div>
        )}
      </div>
    </div>
  );
}

const GROUPS = [
  { name: 'Saturday Regulars', n: 50 },
  { name: 'Wellshire Men’s Club', n: 112 },
  { name: 'Thursday twilight', n: 14 },
];

/** The "Invite a group" sheet: pick a group, then one button sends it. */
export function InviteGroupSheet({ picked, rowRef, sendRef, rowHot, sendHot }: { picked: boolean; rowRef?: React.Ref<HTMLDivElement>; sendRef?: React.Ref<HTMLSpanElement>; rowHot?: boolean; sendHot?: boolean }) {
  return (
    <div className="iv-sheet-in">
      <div style={{ width: 38, height: 5, borderRadius: 5, background: '#D8CDBD', margin: '8px auto 10px' }} />
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 19, fontWeight: 800 }}>Invite a group</div>
        <div style={{ fontSize: 12, color: '#66635E', marginTop: 4 }}>Everyone in the groups you pick is asked “want to play?” for your open seats — the first to say yes get them.</div>
        <div style={{ fontSize: 14, fontWeight: 700, margin: '14px 0 6px' }}>Your groups</div>
        <div className="ap-card" style={{ padding: '2px 10px' }}>
          {GROUPS.map((g, i) => {
            const on = picked && i === 0;
            return (
              <div key={g.name} ref={i === 0 ? rowRef : undefined} className={`gd-hl ${i === 0 && rowHot ? 'hot' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 2px', borderTop: i ? '1px solid #EEE6DA' : 'none' }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#171615', background: on ? '#65B683' : 'linear-gradient(#FCFAF7,#EEE6DA)', border: `1px solid ${on ? '#237849' : '#7D7A75'}`, transition: 'background 200ms ease' }}>{on ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, display: 'block' }}>{g.name}</span>
                  <span className="ap-sub">{g.n} golfers</span>
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 12, color: '#66635E', minHeight: 16 }}>{picked ? 'Invitations will be sent to these 50 people' : ''}</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: '#66635E', fontSize: 14 }}>Cancel</span>
        {picked ? (
          <span ref={sendRef} className={`ap-btn ${sendHot ? 'ap-pressed' : ''}`}>Invite 50 people</span>
        ) : (
          <span className="ap-btn" style={{ background: '#EEE6DA', color: '#AAA7A2', borderColor: '#D8CDBD', boxShadow: 'none' }}>Invite</span>
        )}
      </div>
    </div>
  );
}

/* ---------- Jim's phone: the invitation arrives on Home ---------- */

/**
 * Jim's Home. Before he answers, the open invite is a To Do row (the app's own
 * words: "Dave has 2 spots open" · Respond). Once he's in, it's gone from To Do
 * and the round sits under Upcoming: the course, the tee time, who he's playing with.
 */
export function JimHomeScreen({ respondRef, hot, scheduled, withRick }: { respondRef?: React.Ref<HTMLSpanElement>; hot?: boolean; scheduled?: boolean; withRick?: boolean }) {
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top"><div><div className="ap-title">Home</div><div className="ap-sub">Jim Barnes</div></div></div>
      {!scheduled && (
        <>
          <div className="ap-sec">To Do</div>
          <div className="ap-body">
            <div className="ap-card" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Dave has 2 spots open</div>
                <div style={{ fontSize: 12, marginTop: 2 }}><b style={{ color: '#21643E' }}>Sat 8:10 AM</b> <span style={{ color: '#66635E' }}>· Wellshire</span></div>
              </div>
              <span ref={respondRef} className={`ap-btn ap-btn2 ${hot ? 'ap-pressed' : ''}`} style={{ height: 36, fontSize: 13.5, padding: '0 12px' }}>Respond</span>
            </div>
          </div>
        </>
      )}
      <div className="ap-sec">Upcoming</div>
      <div className="ap-body">
        {scheduled && (
          <div className="ap-card iv-new">
            <div style={{ fontWeight: 700, fontSize: 14 }}>Wellshire</div>
            <div style={{ fontSize: 12, marginTop: 2 }}><b style={{ color: '#21643E' }}>Sat 8:10 AM</b></div>
            <div style={{ fontSize: 12, color: '#66635E', marginTop: 2 }}>W/ Dave, Tom{withRick ? ', Rick' : ''}</div>
          </div>
        )}
        <div className="ap-card">
          <div style={{ fontWeight: 700, fontSize: 14 }}>Men’s Club Stableford</div>
          <div style={{ fontSize: 12, color: '#66635E', marginTop: 2 }}>Sat, Nov 22 · Wellshire</div>
        </div>
      </div>
    </div>
  );
}

/** Dave's round, as Jim sees it: the open invite with I'm in / Can't make it. */
export function JimInviteScreen({ inRef, hot, claimed }: { inRef?: React.Ref<HTMLSpanElement>; hot?: boolean; claimed?: boolean }) {
  const seats = ['Dave', 'Tom', claimed ? 'Jim B.' : null, null];
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top">
        <span className="ap-back">‹</span>
        <div><div className="ap-title">Wellshire</div><div className="ap-sub">Saturday, 8:10 AM tee time</div></div>
      </div>
      <div className="ap-body" style={{ marginTop: 6 }}>
        <div className="ap-card">
          <div className="ap-game" style={{ fontSize: 14 }}><span className="ap-ico">✉</span>Dave’s open invite</div>
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: claimed ? '#21643E' : '#171615' }}>
            {claimed ? 'You’re in Dave’s round.' : '2 spots open — first to say yes gets them.'}
          </div>
          {!claimed && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <span ref={inRef} className={`ap-btn ${hot ? 'ap-pressed' : ''}`} style={{ height: 38, fontSize: 14, padding: '0 16px' }}>I’m in</span>
              <span className="ap-btn ap-btn2" style={{ height: 38, fontSize: 14, padding: '0 12px', whiteSpace: 'nowrap' }}>Can’t make it</span>
            </div>
          )}
        </div>
        <div className="ap-sec" style={{ padding: '6px 4px' }}>Who’s playing</div>
        <div className="ap-card" style={{ padding: '2px 12px' }}>
          {seats.map((n, i) => (
            <div key={i} className={i === 2 && n ? 'iv-seat' : ''} style={{ padding: '8px 0', borderTop: i ? '1px solid #EEE6DA' : 'none', fontWeight: 600, color: n ? '#171615' : '#66635E' }}>{n ?? 'Open spot'}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Stats: the golfer's own goals ---------- */

const GOALS = [
  { name: 'Score', value: '86.4', unit: 'average per round', dots: [1, 1, 0, 1, 1, 0, 1], goal: '85', gap: '1.4 to go' },
  { name: 'Greens in regulation', value: '6.8', unit: 'per round', dots: [0, 1, 0, 1, 1, 0, 1], goal: '8', gap: '1.2 to go' },
  { name: 'Putts', value: '31.6', unit: 'per round', dots: [1, 1, 1, 0, 1, 1, 1], goal: '32', met: true },
  { name: 'Fairways hit', value: '7.9', unit: 'per round', dots: [1, 0, 1, 1, 1, 1, 0], goal: '7', met: true },
];

export function GoalsScreen() {
  return (
    <div className="ap">
      <StatusBar />
      <div className="ap-top">
        <div>
          <div className="ap-title">Statistics</div>
          <div className="ap-sub">Your last 20 rounds</div>
        </div>
      </div>
      <div className="ap-sec">Goals</div>
      <div className="ap-body">
        <div className="ap-card" style={{ padding: '2px 12px' }}>
          {GOALS.map((g, i) => (
            <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderTop: i ? '1px solid #EEE6DA' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{g.name}</div>
                <div style={{ fontSize: 12.5, color: '#66635E' }}><b style={{ color: '#171615', fontSize: 15 }}>{g.value}</b> {g.unit}</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                  {g.dots.map((d, k) => (
                    <span key={k} style={{ width: 9, height: 9, borderRadius: 9, background: d ? '#171615' : 'transparent', border: '1.5px solid #171615' }} />
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'center', width: 64 }}>
                <div style={{ border: `1.5px solid ${g.met ? '#C49B38' : '#D8CDBD'}`, background: g.met ? '#FCF4E4' : '#F5F1EA', borderRadius: 10, padding: '4px 0' }}>
                  <div style={{ fontSize: 9.5, color: '#66635E', fontWeight: 600 }}>Goal</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{g.goal}</div>
                </div>
                <div style={{ fontSize: 11, marginTop: 3, fontWeight: g.met ? 700 : 400, color: g.met ? '#795B02' : '#66635E' }}>{g.met ? 'Goal met' : g.gap}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
