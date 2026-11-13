import type { Metadata } from 'next';
import SignupForm from '../components/SignupForm';
import { Wordmark } from '../components/Wordmark';

export const metadata: Metadata = {
  title: 'Tempis Studio for clubs',
  description: 'Tempis Studio runs your men’s or women’s club season: memberships, events, registration, flights, tee times, scoring, results and payouts.',
};

const JOBS = [
  { title: 'Memberships', body: 'Invitations, renewals and dues for the season, with a clear list of who’s in.' },
  { title: 'The season schedule', body: 'Every event in one calendar, published to your members’ phones.' },
  { title: 'Registration', body: 'Members sign up in Play. Teams, partners and waitlists included.' },
  { title: 'Flights and tee times', body: 'Built from handicaps in minutes, locked when you’re ready, sent to every player.' },
  { title: 'Scoring and results', body: 'Members score in Play. Leaderboards are live, and results are final when you say so.' },
  { title: 'Payouts', body: 'Purses, skins and season-long races worked out to the dollar, with a record of every change.' },
];

export default function ClubsPage() {
  return (
    <>
      <section className="bg-graphite text-on-dark">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Wordmark product="Studio" onDark />
          <h1 className="mt-6 max-w-3xl text-[2.5rem] font-extrabold leading-[1.08] tracking-tight md:text-[3.25rem]">
            Your board runs the season. Your members just play.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.1875rem] leading-relaxed text-on-dark-soft">
            Tempis Studio is the back office for men’s and women’s golf clubs. It replaces the spreadsheets, the email chains and the clipboard at the first tee.
            Everything your board sets up shows up in Tempis Play, the app your members already use for their casual rounds.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <h2 className="text-[2rem] font-bold leading-tight tracking-tight">What Studio handles</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.map((j) => (
            <div key={j.title} className="rounded-[14px] border border-stone bg-ivory p-6">
              <h3 className="text-[1.25rem] font-bold">{j.title}</h3>
              <p className="mt-2 text-ink-soft">{j.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-stone bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <div>
            <h2 className="text-[2rem] font-bold leading-tight tracking-tight">Run your 2027 season on Studio</h2>
            <p className="mt-4 text-[1.1875rem] leading-relaxed text-ink-soft">
              We’re choosing a small number of clubs to go first. Join the list and we’ll set up a 15-minute look at Studio with you and your board.
            </p>
          </div>
          <SignupForm kind="studio" />
        </div>
      </section>
    </>
  );
}
