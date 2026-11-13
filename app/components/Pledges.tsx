/*
 * What a club golfer needs to know before he trusts his card, and his
 * wallet, to an app. Each line is something Backbeat actually does.
 */

const I = {
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  save: <><path d="M12 3v11" /><path d="M7.5 9.5L12 14l4.5-4.5" /><path d="M5 17v2.5h14V17" /></>,
  sign: <><path d="M4 19c3-.2 5.5-5.8 8-6 2-.2 1.2 3.2 3 3.4 1.5.2 2.6-2 5-2.4" /><path d="M4 21.5h16" /></>,
  dollar: <><path d="M12 3v18" /><path d="M16.5 7.5c-.8-1.4-2.4-2-4.5-2-2.6 0-4.2 1.3-4.2 3.1 0 4.4 9 2.4 9 6.8 0 1.9-1.8 3.1-4.6 3.1-2.3 0-4-.8-4.8-2.3" /></>,
  scale: <><path d="M12 4v16" /><path d="M5 20h14" /><path d="M5 8h14" /><path d="M5 8l-2.5 6a3 3 0 0 0 5 0z" /><path d="M19 8l-2.5 6a3 3 0 0 0 5 0z" /></>,
  person: <><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></>,
};

const PLEDGES: { icon: keyof typeof I; title: string; body: string }[] = [
  { icon: 'check', title: 'Every score is checked.', body: 'When two phones disagree on a hole, Backbeat stops and asks which score is right, before anyone signs.' },
  { icon: 'save', title: 'Nothing gets lost.', body: 'Each hole is saved as you go. If the signal drops on the back nine, scores wait on the phone and go through when it returns.' },
  { icon: 'sign', title: 'Nothing is final until you sign.', body: 'Each golfer reviews and signs his own card. Fix any hole before then.' },
  { icon: 'dollar', title: 'Every dollar shows its work.', body: 'Tap any hole to see who won it and why. The settle-up adds up to the dollar.' },
  { icon: 'scale', title: 'Handicaps you can follow.', body: 'Tap any golfer’s handicap to see how it was worked out: his index, the tees, the strokes he gets.' },
  { icon: 'person', title: 'A real person answers.', body: 'We don’t sell your information or use it for advertising. Write to us and someone who plays the game writes back.' },
];

export default function Pledges() {
  return (
    <ul className="grid gap-x-12 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-3">
      {PLEDGES.map((p) => (
        <li key={p.title} className="border-b border-stone py-8">
          <span className="pledge-ico" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{I[p.icon]}</svg>
          </span>
          <h3 className="mt-5 text-[1.5rem] leading-tight">{p.title}</h3>
          <p className="mt-2 text-ink-soft">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
