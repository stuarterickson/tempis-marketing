import Link from 'next/link';
import Device from './components/Device';
import GamesDemo from './components/GamesDemo';
import { ScoreEntryScreen } from './components/AppScreens';
import CatchScene from './components/CatchScene';
import InviteScene from './components/InviteScene';
import Pledges from './components/Pledges';
import './components/device.css';
import { Wordmark } from './components/Wordmark';
import { SIDE_GAMES, SITE } from './site';

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
      {/* Opening: the headline beside the games demo */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 pt-12 md:grid-cols-12 md:px-8 md:pt-20">
          <div className="md:col-span-6">
            <h1 className="text-[3.25rem] leading-[1.0] md:text-[5rem] md:leading-[0.98]">{SITE.tagline}</h1>
            <p className="mt-7 max-w-lg text-[1.25rem] leading-relaxed text-ink-soft">
              Tempis Play keeps score for you and your group, settles the side games, and remembers every round. Free on iPhone and Android.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/beta" className="btn btn-primary">Join the beta</Link>
              <Link href="/#how-it-works" className="btn btn-secondary">See how it works</Link>
            </div>
          </div>
          <div className="md:col-span-6 md:pl-6">
            <GamesDemo />
          </div>
        </div>
      </section>

      {/* Score entry: a macro view, close enough to touch */}
      <section aria-labelledby="score-heading">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-5">
            <h2 id="score-heading" className="text-[2.25rem] leading-[1.08] md:text-[3rem]">Score in a couple of taps.</h2>
            <p className="mt-5 max-w-md text-[1.1875rem] leading-relaxed text-ink-soft">
              Big number keys, built for a moving cart and a gloved hand. Par is already suggested for every golfer. If the whole group made par, one tap saves the hole.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="macro" role="img" aria-label="A close view of Tempis Play's score keys: one row of big raised number keys for each golfer">
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
              Each golfer can score on his own phone. If Tom enters a 4 for Bob and Bob entered a 5, Play catches it the moment Tom saves the hole and asks which is right. No arguments at the 18th green, and nobody signs a card that doesn’t match.
            </p>
          </div>
          <div className="mt-10 md:mt-14"><CatchScene /></div>
        </div>
      </section>

      {/* The open invite: one phone, fifty golfers */}
      <section aria-labelledby="invite-heading" className="border-t border-stone bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="invite-heading" className="text-[2.25rem] leading-[1.08] md:col-span-5 md:text-[3rem]">Fill your tee time without the texts.</h2>
            <p className="max-w-xl text-[1.1875rem] leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
              Two open spots on Saturday? Send one open invite to your whole group. Everyone hears at once, and the first to tap <b className="text-ink">I’m in</b> gets the seat. Anyone who answers late simply sees the seats are taken. No group texts, no keeping track, no telling a friend he missed out.
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
