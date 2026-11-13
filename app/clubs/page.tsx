import type { Metadata } from 'next';
import SignupForm from '../components/SignupForm';
import { Wordmark } from '../components/Wordmark';

export const metadata: Metadata = {
  title: 'Backbeat for Clubs',
  description: 'Backbeat for Clubs runs your men’s or women’s club season: memberships, events, registration, flights, tee times, scoring, results and payouts.',
};

const JOBS = [
  { title: 'Memberships', body: 'Invitations, renewals and dues for the season, with a clear list of who’s in.' },
  { title: 'The season schedule', body: 'Every event in one calendar, published to your members’ phones.' },
  { title: 'Registration', body: 'Members sign up in Backbeat. Teams, partners and waitlists included.' },
  { title: 'Flights and tee times', body: 'Built from handicaps in minutes, locked when you’re ready, sent to every player.' },
  { title: 'Scoring and results', body: 'Members score in Backbeat. Leaderboards are live, and results are final when you say so.' },
  { title: 'Payouts', body: 'Purses, skins and season-long races worked out to the dollar, with a record of every change.' },
];

export default function ClubsPage() {
  return (
    <>
      <section className="bg-graphite text-on-dark">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Wordmark product="Clubs" onDark height={34} />
          <h1 className="mt-8 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight md:text-[3.25rem]">
            Your board runs the season. Your members just play.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.1875rem] leading-relaxed text-on-dark-soft">
            Backbeat for Clubs is the back office for men’s and women’s golf clubs. It replaces the spreadsheets, the email chains and the clipboard at the first tee.
            Everything your board sets up shows up in Backbeat Golf, the app your members already use for their casual rounds.
          </p>
          <div className="mt-8 h-px w-28 bg-gold" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <h2 className="text-[2.25rem] leading-[1.1] md:col-span-4 md:text-[2.75rem]">What it handles</h2>
        <dl className="grid border-t-2 border-ink sm:grid-cols-2 sm:gap-x-10 md:col-span-7 md:col-start-6">
          {JOBS.map((j) => (
            <div key={j.title} className="border-b border-stone py-6">
              <dt className="display text-[1.375rem]">{j.title}</dt>
              <dd className="mt-1.5 text-ink-soft">{j.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-stone bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <div>
            <h2 className="text-[2rem] font-bold leading-tight tracking-tight">Run your 2027 season on Backbeat for Clubs</h2>
            <p className="mt-4 text-[1.1875rem] leading-relaxed text-ink-soft">
              We’re choosing a small number of clubs to go first. Join the list and we’ll set up a 15-minute look with you and your board.
            </p>
          </div>
          <SignupForm kind="studio" />
        </div>
      </section>
    </>
  );
}
