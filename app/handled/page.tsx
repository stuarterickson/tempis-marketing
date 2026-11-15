import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { SITE } from '../site';

export const metadata: Metadata = {
  title: 'When the round doesn’t go to plan',
  description:
    'How Backbeat Golf handles a player who stops mid-round, a dead phone, an unsigned card, a wrong score, season-long competitions and rounds cut short by darkness, and who decides.',
};

/*
 * Source of truth: the Policy Register in the Chief Marketing Officer project
 * (Policies/…). Each entry here is the public version of a decided policy.
 * Change the policy first, then this page.
 */
type Problem = {
  id: string;
  question: string;
  answer: string;
  /** Not in the app yet: decided and being built. Shows a "Coming" tag. */
  coming?: boolean;
  detail: Array<string | { rulings: Array<{ when: string; then: string }> }>;
};

const SECTIONS: Array<{ title: string; problems: Problem[] }> = [
  {
    title: 'Scoring and scorecards',
    problems: [
      {
        id: 'player-stops',
        question: 'A player has to stop partway through a round.',
        answer:
          'They withdraw in the app and say why. Their score comes off the leaderboard, and the tournament director sees when and why they stopped.',
        detail: [
          'Withdraw is in the scoring menu. The player picks a reason: injury or illness, had to leave, weather or darkness, or something else in a few words.',
          'If the player has already left the course, the partner keeping their card can withdraw them instead.',
          'The card closes after the last hole played. It stays on record but is left out of the leaderboard, prize money, skins and closest to the pin.',
          'Only the tournament director can undo a withdrawal.',
        ],
      },
      {
        id: 'phone-dies',
        question: 'A phone dies on the course.',
        answer: 'Nothing is lost. Every hole is saved as it’s entered, and anyone in the group can pick up the card and carry on.',
        detail: [
          'Scores go to Backbeat hole by hole. With no signal, they wait on the phone and send themselves once the signal is back.',
          'Each card is kept by a partner, the way you swap paper cards. If that partner’s phone dies, another player in the group picks up the card. Every hole already entered stays.',
          'A player can sign later from any phone, or on the web at app.backbeatgolf.com.',
        ],
      },
      {
        id: 'unsigned-card',
        question: 'A player finishes but never signs their card.',
        answer: 'Backbeat reminds them. If they still don’t sign, the tournament director decides what happens.',
        detail: [
          'Every card needs two signatures: the player’s and the partner’s who kept it. The first signature locks the scores, so nothing changes while you wait for the second.',
          'The player sees “Sign your card” when they open the app. The tournament director sees every unsigned card in one list.',
          'The director can complete the card, disqualify it or withdraw the player, each with a reason on the record. Under the Rules of Golf an unsigned card is a disqualification. Many clubs are more forgiving, so the call stays with the director.',
        ],
      },
      {
        id: 'wrong-score',
        question: 'A score turns out to be wrong after the card is signed.',
        answer:
          'Only the tournament director can change a signed card. Backbeat shows the Rules of Golf ruling first, and the director makes the call.',
        detail: [
          'Before both signatures are in, the player and partner fix it themselves: take back the signature, correct the hole, sign again.',
          'After that, the director corrects it, and Backbeat asks which way the card was wrong, and why:',
          {
            rulings: [
              { when: 'The card shows more strokes than were played', then: 'The higher score stands.' },
              { when: 'Too few, because of a penalty the player didn’t know about', then: 'Add the strokes. No disqualification.' },
              { when: 'Too few, for any other reason', then: 'Disqualification.' },
            ],
          },
          'That’s Rule 3.3b, and it’s selected for the director. They can make a club ruling instead, with a reason, and the record shows which they chose.',
          'Once results are final, they have to be reopened before any score changes. That’s deliberate: final results decide the prize money.',
        ],
      },
      {
        id: 'unfinished-cards',
        question: 'The results are ready, but some cards aren’t.',
        answer:
          'Backbeat names every unfinished card before the director finalizes. Finalize anyway, and those players get no placing.',
        detail: [
          'Before finalizing, the director sees each card that’s missing holes or a signature, by name.',
          'They can complete, withdraw or disqualify each one first. They don’t have to.',
          'If they finalize anyway, those players get no placing. An unfinished card never beats a finished one.',
        ],
      },
      {
        id: 'withdrawn-or-dq-season',
        question: 'A player withdraws or is disqualified. What about season-long competitions?',
        answer:
          'Holes played honestly count. A disqualification takes the whole round out.',
        detail: [
          'Withdrawn: no placing in the event, but every hole they finished still counts for Season Long Best Ball, skins and closest to the pin, and the event counts as one they played in the season points race.',
          'Disqualified: nothing from that round counts anywhere: no placing, no Best Ball holes, no skins, no closest to the pin and no season points.',
          'If the tournament director reinstates the card, everything comes back as if it never happened.',
        ],
      },
      {
        id: 'darkness',
        question: 'Some groups can’t finish before dark.',
        answer:
          'The tournament director tells Backbeat how to settle it, once, and Backbeat applies it to the results, skins, closest to the pin and Best Ball.',
        detail: [
          'There are three choices. Finish another day, which the Rules of Golf prefer. Cancel the round, where everyone’s scores for the day are cancelled and side-game money is returned. Or count only the holes everyone finished, the one Backbeat suggests when finishing another day isn’t practical.',
          'Counting the holes everyone finished works with shotgun starts too: Backbeat finds exactly which holes every player completed and scores everyone on those.',
          'Skins on holes not everyone reached are void, and their share goes to the holes that count. A closest-to-the-pin hole that not every group reached is void, and its money is returned.',
          'Season Long Best Ball keeps every hole actually played, unless the round is cancelled.',
          'A club can set its choice before the event, so everyone knows the rule before they tee off.',
        ],
      },
    ],
  },
];

export default function HandledPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <p className="text-base font-semibold text-fairway">Backbeat for Clubs</p>
      <h1 className="mt-2 text-[2.5rem] font-semibold leading-[1.08] tracking-tight">When the round doesn’t go to plan</h1>
      <p className="mt-4 text-[1.1875rem] text-ink-soft">
        Players get hurt, phones die, cards go unsigned, and a stroke turns up two days later. Here’s how Backbeat handles each one, and who decides.
      </p>

      <div className="mt-8 border-l-2 border-fairway pl-5">
        <p className="font-semibold">Our rule of thumb</p>
        <p className="mt-1 text-ink-soft">
          The Rules of Golf are the default. Your tournament director has the last word. Every change is recorded with who made it and why.
        </p>
      </div>

      {SECTIONS.map((section) => (
        <section key={section.title} className="mt-12">
          <h2 className="text-[1.75rem] leading-tight">{section.title}</h2>
          <ul className="mt-4 divide-y divide-stone border-y border-stone">
            {section.problems.map((p) => (
              <li key={p.id} id={p.id} className="scroll-mt-28 py-6">
                <h3 className="text-[1.25rem] font-bold leading-snug">
                  {p.question}
                  {p.coming ? (
                    <span className="ml-2 inline-block translate-y-[-0.15em] rounded-full border border-stone px-2.5 py-0.5 align-middle text-sm font-semibold text-ink-soft">
                      Coming
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 text-ink-soft">{p.answer}</p>
                <details className="group mt-3">
                  <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-semibold text-fairway hover:text-fairway-dark [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">How it works</span>
                    <span className="hidden group-open:inline">Hide the detail</span>
                    <ChevronDown aria-hidden size={18} className="transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
                  </summary>
                  <ul className="mt-2 space-y-3 text-ink-soft">
                    {p.detail.map((d, i) =>
                      typeof d === 'string' ? (
                        <li key={i} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-fairway" />
                          <span>{d}</span>
                        </li>
                      ) : (
                        <li key={i}>
                          <dl className="ml-[1.125rem] divide-y divide-stone rounded-lg border border-stone bg-ivory">
                            {d.rulings.map((r) => (
                              <div key={r.when} className="grid gap-1 px-4 py-3 sm:grid-cols-[18rem_1fr] sm:gap-6">
                                <dt>{r.when}</dt>
                                <dd className="font-semibold text-ink">{r.then}</dd>
                              </div>
                            ))}
                          </dl>
                        </li>
                      ),
                    )}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="mt-12">
        <h2 className="text-[1.75rem] leading-tight">Don’t see your situation?</h2>
        <p className="mt-3 text-ink-soft">
          Email <a className="link" href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>. A person answers, and the answer ends up on this page.
          {' '}For the rest of what Backbeat does for your club, see <Link className="link" href="/clubs">Backbeat for Clubs</Link>.
        </p>
      </div>
    </div>
  );
}
