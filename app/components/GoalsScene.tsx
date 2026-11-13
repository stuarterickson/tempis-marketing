import Device from './Device';
import { GoalsScreen } from './AppScreens';

/*
 * Stats and goals, as an exploded view: the golfer's Goals list on a phone
 * facing the reader, and the last round's goal tiles lifted out in front of it.
 */

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
  return (
    <div className="goals-scene" role="img" aria-label="Backbeat's Goals list on a phone: score, greens in regulation, putts and fairways, each with the last seven rounds as met or missed and how far from the goal. In front, Saturday's round: score 84, goal met; putts 33, one short.">
      <Device tilt="flat" label="Goals">
        <GoalsScreen />
      </Device>
      <div className="goals-float goals-float-a"><RoundTile name="Score" value="84" result="Met" target="Goal 85 or lower" met /></div>
      <div className="goals-float goals-float-b"><RoundTile name="Putts" value="33" result="1 short" target="Goal 32" /></div>
      <div className="goals-float goals-float-c"><div className="fl-card"><small>Saturday at Wellshire</small>2 of 3 goals <b>met</b>.</div></div>
    </div>
  );
}
