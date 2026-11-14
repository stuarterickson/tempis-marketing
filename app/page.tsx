import Link from 'next/link';
import Device from './components/Device';
import GamesDemo from './components/GamesDemo';
import { ScoreEntryScreen } from './components/AppScreens';
import CatchScene from './components/CatchScene';
import InviteScene from './components/InviteScene';
import GoalsScene from './components/GoalsScene';
import OldScorecard from './components/OldScorecard';
import GamesList from './components/GamesList';
import PhoneTag from './components/PhoneTag';
import Pledges from './components/Pledges';
import './components/device.css';
import { Wordmark } from './components/Wordmark';
import { SITE } from './site';

const STEPS = [
  { title: 'Get the app', body: 'Free on iPhone and Android. Sign in with your email.' },
  { title: 'Start the round', body: 'Tap New Round, then Play now. Pick the course, your tees and who you’re playing with.' },
  { title: 'Play', body: 'Score each hole as you go. When the last hole is in, everyone signs his card.' },
];

const STUDIO_JOBS = [
  { term: 'Memberships', detail: 'Invitations, renewals and dues, with a clear list of who’s in this season.' },
  { term: 'The schedule', detail: 'Every event of the season, published to every member’s phone.' },
  { term: 'Flights and tee times', detail: 'Built from handicaps in minutes, locked when the board is ready.' },
  { term: 'Results and payouts', detail: 'Final in minutes after the last group, worked out to the dollar.' },
];

const FAQ = [
  {
    q: 'What does it cost?',
    a: 'Backbeat is free. Clubs that run their season on Backbeat for Clubs pay for it; their members still use Backbeat for free.',
  },
  {
    q: 'iPhone or Android?',
    a: 'Both. During the beta, iPhone testers install through Apple’s TestFlight app and Android testers through a Google Play test link. Every invitation comes with step-by-step instructions.',
  },
  {
    q: 'Does everyone in my group need the app?',
    a: 'No. One golfer can keep score for the whole group. If the others have Backbeat too, each scores on his own phone and sees the same card.',
  },
  {
    q: 'When can I get it?',
    a: 'The beta is open to invited golfers now. The public release follows in early 2027. Apply for the beta and we’ll tell you when there’s a spot.',
  },
];

export default function Home() {
  return (
    <>
      {/* Opening: the scorecard — a macro view of the keys, close enough to touch */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-16 md:grid-cols-12 md:px-8 md:pt-20 md:pb-24">
          <div className="md:col-span-6">
            <h1 className="text-[3.25rem] leading-[1.0] md:text-[5rem] md:leading-[0.98]">{SITE.tagline}</h1>
            <p className="mt-7 max-w-lg text-[1.25rem] leading-relaxed text-ink-soft">
              Backbeat Golf keeps score for your group with big keys and big numbers you can hit from a bouncing cart. Par is already suggested for every golfer, so if the whole group made par, one tap saves the hole. Free on iPhone and Android.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/beta" className="btn btn-primary">Join the beta</Link>
              <Link href="/#how-it-works" className="btn btn-secondary">See how it works</Link>
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="macro" role="img" aria-label="A close view of Backbeat's score keys: one row of big raised number keys for each golfer">
              <Device tilt="flat" label="Score entry"><ScoreEntryScreen /></Device>
              <div className="macro-tag fl-card"><small>Hole 7</small>Two taps. <b>Saved.</b></div>
            </div>
          </div>
        </div>
      </section>

      {/* The catch: two phones, one dialog */}
      <section aria-labelledby="catch-heading" className="border-t border-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="catch-heading" className="text-[2.25rem] leading-[1.08] md:col-span-5 md:text-[3rem]">Differences caught on the spot.</h2>
            <p className="max-w-xl text-[1.1875rem] leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
              Each golfer can score on his own phone. If Tom enters a 4 for Bob and Bob entered a 5, Backbeat catches it the moment Tom saves the hole and asks which is right. No arguments at the 18th green, and nobody signs a card that doesn’t match.
            </p>
          </div>
          <div className="mt-10 md:mt-14"><CatchScene /></div>
        </div>
      </section>

      {/* Games and the wallet: the old way (a pencil scorecard) beside the new (the games demo) */}
      <section id="side-games" aria-labelledby="games-heading" className="scroll-mt-24 overflow-hidden border-t border-stone bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="games-heading" className="text-[2.25rem] leading-[1.08] md:col-span-5 md:text-[3rem]">Your games and your wallet, handled.</h2>
            <p className="max-w-xl text-[1.1875rem] leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
              No more Nassau and Wolf kept in pencil on the back of the card, worked out three times at the bar. Set the games and the stakes before the first tee. Backbeat keeps the running count as you play, shows every hole’s result, and settles up at the end: who pays whom, to the dollar, with the math one tap away.
            </p>
          </div>
          <div className="games-stage mt-10 md:mt-14">
            <figure className="old-card">
              <OldScorecard />
              <figcaption><b className="display">The old way</b><span>Pencil, eraser, and an argument at the bar.</span></figcaption>
            </figure>
            <div className="new-way"><GamesDemo /><PhoneTag name="The new way" mark="✓" role="Every game kept, every dollar settled" /></div>
          </div>
          <div className="mt-16 md:mt-20"><GamesList /></div>
        </div>
      </section>

      {/* Statistics and goals: the phone and the app's own charts around it */}
      <section id="goals" aria-labelledby="goals-heading" className="scroll-mt-24 overflow-hidden border-t border-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="goals-heading" className="text-[2.25rem] leading-[1.08] md:col-span-5 md:text-[3rem]">Know where your game is headed.</h2>
            <div className="max-w-xl md:col-span-6 md:col-start-7">
              <p className="text-[1.1875rem] leading-relaxed text-ink-soft">
                Set a goal for the numbers you care about: score, putts, greens, fairways. After every round Backbeat shows which goals you met, how your scoring is trending, and where the strokes went. No spreadsheets, and nothing to work out.
              </p>
              <p className="mt-4 text-ink-soft">Putts, fairways and greens are one extra tap per hole, and only if you want them.</p>
            </div>
          </div>
          <div className="mt-10 md:mt-14"><GoalsScene /></div>
        </div>
      </section>

      {/* The open invite: book the time, send one invite, the seats fill themselves */}
      <section aria-labelledby="invite-heading" className="overflow-hidden border-t border-stone bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="invite-heading" className="text-[2.25rem] leading-[1.08] md:col-span-5 md:text-[3rem]">Book the time. Backbeat fills the seats.</h2>
            <p className="max-w-xl text-[1.1875rem] leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
              Two open spots on Saturday? Tap <b className="text-ink">Invite a group</b>, pick the group, and send. All fifty hear at once, and the first to tap <b className="text-ink">I’m in</b> take the seats. Anyone who answers late simply sees they’re taken. No group texts, no keeping track, no telling a friend he missed out.
            </p>
          </div>
          <div className="mt-12 md:mt-16"><InviteScene /></div>
        </div>
      </section>

      {/* Trust: what a golfer needs to know first */}
      <section aria-labelledby="trust-heading" className="border-t border-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
          <h2 id="trust-heading" className="max-w-3xl text-[2.25rem] leading-[1.08] md:text-[3.25rem]">Built to be trusted with your card and your wallet.</h2>
          <div className="mt-12"><Pledges /></div>
        </div>
      </section>

      {/* How it works: a real sequence */}
      <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-24 border-t border-stone">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <h2 id="how-heading" className="text-[2.25rem] leading-[1.1] md:col-span-4 md:text-[3rem]">How it works</h2>
          <ol className="space-y-10 md:col-span-7 md:col-start-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4">
                <span className="display figures text-[2.75rem] leading-none text-ink">{i + 1}</span>
                <div>
                  <h3 className="font-sans text-[1.375rem] font-semibold tracking-normal">{s.title}</h3>
                  <p className="mt-1.5 text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Backbeat for Clubs: the honour board */}
      <section aria-labelledby="studio-heading" className="bg-graphite text-on-dark">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-6">
            <Wordmark product="Clubs" onDark height={28} />
            <h2 id="studio-heading" className="mt-8 text-[2.25rem] leading-[1.08] md:text-[3.25rem]">
              Your board runs the season. Your members just play.
            </h2>
            <div className="mt-8 h-px w-28 bg-gold" />
            <p className="mt-8 max-w-lg text-[1.1875rem] leading-relaxed text-on-dark-soft">
              Backbeat for Clubs is coming for men’s and women’s golf clubs. Everything the board sets up shows in the same Backbeat app members use for their Saturday game.
            </p>
            <Link href="/clubs" className="btn btn-on-dark mt-9">Join the clubs list</Link>
          </div>
          <dl className="self-end md:col-span-5 md:col-start-8">
            {STUDIO_JOBS.map((j) => (
              <div key={j.term} className="border-t border-graphite-line py-5">
                <dt className="display text-[1.375rem]">{j.term}</dt>
                <dd className="mt-1 text-on-dark-soft">{j.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="faq-heading">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <h2 id="faq-heading" className="text-[2.25rem] leading-[1.1] md:col-span-4 md:text-[3rem]">Questions</h2>
          <div className="md:col-span-7 md:col-start-6">
            <dl className="border-t-2 border-ink">
              {FAQ.map((f) => (
                <div key={f.q} className="border-b border-stone py-6">
                  <dt className="display text-[1.375rem]">{f.q}</dt>
                  <dd className="mt-2 text-ink-soft">{f.a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href="/beta" className="btn btn-primary">Join the beta</Link>
              <Link href="/support" className="link">More help</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
