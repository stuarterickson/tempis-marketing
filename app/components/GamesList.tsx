import { ChartNoAxesColumnIncreasing, Coins, Dice6, Dices, Hammer, Layers, ListOrdered, Medal, PawPrint, Rabbit, Sparkles, Worm } from 'lucide-react';

/*
 * The games Backbeat runs, set like the house rules on the back of a card:
 * each with the app's own icon for it, who plays, and what happens on a hole
 * (worded from the app's own game guide). Separated by rules, not boxes.
 */
const GAMES = [
  { name: 'Skins', Icon: Coins, who: '2–4 golfers', how: 'Low score alone takes the hole’s skin. A tie carries it to the next.' },
  { name: 'Nassau', Icon: Layers, who: '2 golfers, or two teams', how: 'Three bets in one: the front, the back and the eighteen. Press when you’re down.' },
  { name: 'Wolf', Icon: PawPrint, who: '4 golfers', how: 'The Wolf watches the tee shots, then picks a partner or goes it alone.' },
  { name: 'Vegas', Icon: Dices, who: 'Two teams of 2', how: 'Each team joins its scores into one number, 4 and 5 make 45. Low number wins the difference.' },
  { name: 'Sixes', Icon: Dice6, who: '4 golfers', how: 'Partners change every six holes, so everyone plays with everyone.' },
  { name: 'Nines', Icon: ListOrdered, who: '3 golfers', how: 'Nine points a hole, split 5-3-1 by finish.' },
  { name: 'Snake', Icon: Worm, who: '2–4 golfers', how: 'Three-putt and you’re holding the snake until someone else does.' },
  { name: 'Rabbit', Icon: Rabbit, who: '2–4 golfers', how: 'Win a hole alone to catch the rabbit. Keep it until someone else does.' },
  { name: 'Hammer', Icon: Hammer, who: '2 golfers, or two teams', how: 'Throw the hammer to double the hole. They take it, or give up the hole.' },
  { name: 'Junk', Icon: Sparkles, who: '2–4 golfers', how: 'A dot for greenies, sandies, birdies and more. A three-putt costs one.' },
  { name: 'Bingo Bango Bongo', Icon: Medal, who: '2–4 golfers', how: 'Three points a hole: first on, closest once all are on, first in.' },
  { name: 'Stableford', Icon: ChartNoAxesColumnIncreasing, who: '2–4 golfers', how: 'Points for your net score against par, so one bad hole won’t sink the day.' },
];

export default function GamesList() {
  return (
    <ul className="games-list" aria-label="Games Backbeat keeps">
      {GAMES.map(({ name, Icon, who, how }) => (
        <li key={name}>
          <span className="gl-ico" aria-hidden><Icon size={22} strokeWidth={1.9} /></span>
          <div>
            <div className="gl-head"><span className="display gl-name">{name}</span><span className="gl-who">{who}</span></div>
            <p className="gl-how">{how}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
