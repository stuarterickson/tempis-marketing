import Link from 'next/link';
import ScorecardStrip from './components/ScorecardStrip';
import { CardVignette, KeysVignette, SettleVignette } from './components/Vignettes';
import { Wordmark } from './components/Wordmark';
import { SIDE_GAMES, SITE } from './site';

const FEATURES = [
  {
    title: 'Score in a couple of taps.',
    body: 'Big number keys, built for a moving cart and a gloved hand. Par is already suggested for every golfer. If the whole group made par, one tap saves the hole.',
    picture: <KeysVignette />,
  },
  {
    title: 'One card for the whole group.',
    body: 'Each golfer scores on his own phone, and everyone sees the same card, hole by hole. If two entries disagree, Play shows you before anyone signs.',
    picture: <CardVignette />,
  },
  {
    title: 'The bets settle themselves.',
    body: 'Pick the games on the first tee. When the last putt drops, Play shows who won what and who pays whom, down to the dollar. No more napkin math in the grill room.',
    picture: <SettleVignette />,
  },
];

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
    a: 'Tempis Play is free. Clubs that run their season on Tempis Studio pay for Studio; their members still use Play for free.',
  },
  {
    q: 'iPhone or Android?',
    a: 'Both. During the beta, iPhone testers install through Apple’s TestFlight app and Android testers through a Google Play test link. Every invitation comes with step-by-step instructions.',
  },
  {
    q: 'Does everyone in my group need the app?',
    a: 'No. One golfer can keep score for the whole group. If the others have Play too, each scores on his own phone and sees the same card.',
  },
  {
    q: 'When can I get it?',
    a: 'The beta is open to invited golfers now. The public release follows in early 2027. Apply for the beta and we’ll tell you when there’s a spot.',
  },
];

export default function Home() {
  return (
    <>
      {/* Opening: the headline, then the card filling in */}
      <section>
        <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-28">
          <h1 className="text-[3.25rem] leading-[0.98] md:text-[6rem] md:leading-[0.94]">
            The scorecard,<br className="hidden md:inline" /> handled.
          </h1>
          <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
            <p className="text-[1.25rem] leading-relaxed text-ink-soft md:col-span-6">
              Tempis Play keeps score for you and your group, settles the side games, and remembers every round. Free on iPhone and Android.
            </p>
            <div className="flex flex-wrap gap-4 md:col-span-5 md:col-start-8 md:justify-end">
              <Link href="/beta" className="btn btn-primary">Join the beta</Link>
              <Link href="/#how-it-works" className="btn btn-secondary">See how it works</Link>
            </div>
          </div>
          <div className="mt-14 md:mt-20">
            <ScorecardStrip />
            <p className="mt-3 text-base text-ink-soft">
              Tom’s front nine, one hole at a time. The card adds itself up.
            </p>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section aria-labelledby="what-it-does">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-32">
          <h2 id="what-it-does" className="max-w-2xl text-[2.25rem] leading-[1.1] md:text-[3rem]">
            Built for the cart, the group and the grill room.
          </h2>
          <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="grid items-center gap-10 md:grid-cols-12">
                <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2 md:col-start-8' : ''}`}>
                  <h3 className="text-[1.875rem] leading-tight md:text-[2.125rem]">{f.title}</h3>
                  <p className="mt-4 max-w-md text-[1.1875rem] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
                <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>{f.picture}</div>
              </div>
            ))}
          </div>
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

      {/* Side games: set like a pin sheet */}
      <section id="side-games" aria-labelledby="games-heading" className="scroll-mt-24 border-t border-stone">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <h2 id="games-heading" className="text-[2.25rem] leading-[1.1] md:text-[3rem]">The games your group already plays</h2>
            <p className="mt-5 text-[1.1875rem] leading-relaxed text-ink-soft">
              Set the stakes once. Play keeps the running count during the round and settles it at the end, with handicaps applied the way you choose.
            </p>
          </div>
          <ul className="grid grid-cols-2 border-t-2 border-ink md:col-span-7 md:col-start-6 md:grid-cols-3">
            {SIDE_GAMES.map((g) => (
              <li key={g} className="display border-b border-stone py-4 pr-3 text-[1.375rem] leading-snug">{g}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio: the honour board */}
      <section aria-labelledby="studio-heading" className="bg-graphite text-on-dark">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-6">
            <Wordmark product="Studio" onDark height={34} />
            <h2 id="studio-heading" className="mt-8 text-[2.25rem] leading-[1.08] md:text-[3.25rem]">
              Your board runs the season. Your members just play.
            </h2>
            <div className="mt-8 h-px w-28 bg-gold" />
            <p className="mt-8 max-w-lg text-[1.1875rem] leading-relaxed text-on-dark-soft">
              Tempis Studio is coming for men’s and women’s golf clubs. Everything the board sets up shows in the same Play app members use for their Saturday game.
            </p>
            <Link href="/clubs" className="btn btn-on-dark mt-9">Join the Studio list</Link>
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
