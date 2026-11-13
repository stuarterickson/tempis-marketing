import Link from 'next/link';
import { CardVignette, KeysVignette, SettleVignette } from './components/Vignettes';
import { SIDE_GAMES, SITE } from './site';

const FEATURES = [
  {
    title: 'Score in a couple of taps.',
    body: 'Big number keys, built for a moving cart and a gloved hand. Par is already suggested for every golfer. If the whole group made par, one tap saves the hole.',
    phone: <KeysVignette />,
  },
  {
    title: 'One card for the whole group.',
    body: 'Each golfer scores on his own phone, and everyone sees the same card, hole by hole. If two entries disagree, Play shows you before anyone signs.',
    phone: <CardVignette />,
  },
  {
    title: 'The bets settle themselves.',
    body: 'Pick the games on the first tee. When the last putt drops, Play shows who won what and who pays whom, down to the dollar. No more napkin math in the grill room.',
    phone: <SettleVignette />,
  },
];

const STEPS = [
  { n: '1', title: 'Get the app', body: 'Free on iPhone and Android. Sign in with your email.' },
  { n: '2', title: 'Start the round', body: 'Tap New Round, then Play now. Pick the course, your tees and who you’re playing with.' },
  { n: '3', title: 'Play', body: 'Score each hole as you go. When the last hole is in, everyone signs his card.' },
];

const FAQ = [
  {
    q: 'What does it cost?',
    a: 'Tempis Play is free. Clubs that run their season on Tempis Studio pay for Studio; their members still use Play for free.',
  },
  {
    q: 'iPhone or Android?',
    a: 'Both. During the beta, iPhone testers install through Apple’s TestFlight app and Android testers through a Google Play test link. We send step-by-step instructions with every invitation.',
  },
  {
    q: 'Does everyone in my group need the app?',
    a: 'No. One golfer can keep score for the whole group. If the others have Play too, each can score on his own phone and see the same card.',
  },
  {
    q: 'When can I get it?',
    a: 'The beta is open to invited golfers now. The public release follows in early 2027. Join the beta and we’ll tell you when there’s a spot.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:pb-24 md:pt-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.11em] text-fairway">Now in beta</p>
            <h1 className="mt-3 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight md:text-[4.5rem]">
              {SITE.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-[1.25rem] leading-relaxed text-ink-soft">
              Tempis Play keeps score for you and your group, settles the side games, and remembers every round.
              Free on iPhone and Android.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/beta" className="btn btn-primary">Join the beta</Link>
              <Link href="/#how-it-works" className="btn btn-secondary">See how it works</Link>
            </div>
            <p className="mt-6 text-base text-ink-soft">Built in Denver for club golfers who’d rather play the round than tally it.</p>
          </div>
        </div>
      </section>

      {/* Three things */}
      <section aria-labelledby="what-it-does" className="border-y border-stone bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <h2 id="what-it-does" className="text-[2rem] font-bold leading-tight tracking-tight md:text-[2.5rem]">
            Three things it does for you
          </h2>
          <div className="mt-12 space-y-20">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="grid items-center gap-10 md:grid-cols-2">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <p className="text-sm font-semibold uppercase tracking-[0.11em] text-ink-soft">0{i + 1}</p>
                  <h3 className="mt-2 text-[1.75rem] font-bold leading-tight">{f.title}</h3>
                  <p className="mt-3 max-w-md text-[1.1875rem] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
                <div className={`w-full ${i % 2 === 1 ? 'md:order-1' : ''}`}>{f.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <h2 id="how-heading" className="text-[2rem] font-bold leading-tight tracking-tight md:text-[2.5rem]">How it works</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-[14px] border border-stone bg-ivory p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-fairway text-lg font-bold text-ivory">{s.n}</span>
                <h3 className="mt-4 text-[1.375rem] font-bold">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Side games */}
      <section id="side-games" aria-labelledby="games-heading" className="scroll-mt-24 border-y border-stone bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 id="games-heading" className="text-[2rem] font-bold leading-tight tracking-tight md:text-[2.5rem]">
              The games your group already plays
            </h2>
            <p className="mt-4 text-[1.1875rem] text-ink-soft">
              Set the stakes once. Play keeps the running count during the round and settles it at the end, with handicaps applied the way you choose.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {SIDE_GAMES.map((g) => (
              <li key={g} className="rounded-full border border-stone bg-oat px-4 py-2 text-base font-semibold">{g}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio band */}
      <section aria-labelledby="studio-heading" className="bg-graphite text-on-dark">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.11em] text-flag">For men’s and women’s clubs</p>
            <h2 id="studio-heading" className="mt-3 text-[2rem] font-bold leading-tight tracking-tight md:text-[2.5rem]">
              Run your club’s season? Tempis <span className="italic text-gold">Studio</span> is coming.
            </h2>
            <p className="mt-4 max-w-xl text-[1.1875rem] leading-relaxed text-on-dark-soft">
              Studio is the back office for your board: memberships, the season schedule, registration, flights and tee times, scoring, results and payouts.
              Your board runs the season in Studio. Your members see all of it in the same Play app they already use for their Saturday game.
            </p>
          </div>
          <div className="rounded-[14px] border border-graphite-line bg-graphite-raised p-6">
            <h3 className="text-[1.375rem] font-bold">Get early access</h3>
            <p className="mt-2 text-on-dark-soft">
              We’re choosing a small number of clubs to run their 2027 season on Studio first.
            </p>
            <Link href="/clubs" className="btn btn-on-dark mt-5">Join the Studio list</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 id="faq-heading" className="text-[2rem] font-bold leading-tight tracking-tight md:text-[2.5rem]">Questions</h2>
          <dl className="mt-8 divide-y divide-stone border-y border-stone">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="text-[1.25rem] font-bold">{f.q}</dt>
                <dd className="mt-2 text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/beta" className="btn btn-primary">Join the beta</Link>
            <Link href="/support" className="link">More help</Link>
          </div>
        </div>
      </section>
    </>
  );
}
