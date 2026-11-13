/*
 * Play's screens, redrawn in the app's own colours and type for the site.
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
