import type { Metadata } from 'next';
import SignupForm from '../components/SignupForm';

export const metadata: Metadata = {
  title: 'Join the beta',
  description: 'Help us finish Tempis Play. Beta testers play their normal rounds with the app and tell us what works.',
};

const ASKS = [
  'Play at least three of your normal rounds with Tempis Play this winter.',
  'Answer three short surveys. Each takes about two minutes.',
  'Tell us when something is wrong. A screenshot and one sentence is plenty.',
];

const GETS = [
  'Tempis Play before anyone else.',
  'A direct line to the people building it. We read every note.',
  'Your fingerprints on the app your club may run its season on.',
];

export default function BetaPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-20">
      <div>
        <h1 className="text-[2.75rem] font-semibold leading-[1.08] tracking-tight md:text-[3rem]">Help us finish Tempis Play.</h1>
        <p className="mt-4 text-[1.1875rem] leading-relaxed text-ink-soft">
          We’re inviting a small group of golfers to use Play for their regular rounds before it goes public.
          You don’t need to be good with phones. If anything, we want to hear from you most.
        </p>
        <h2 className="mt-10 text-[1.375rem] font-bold">What we ask</h2>
        <ul className="mt-3 space-y-3">
          {ASKS.map((a) => (
            <li key={a} className="flex gap-3"><span aria-hidden className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full bg-fairway" />{a}</li>
          ))}
        </ul>
        <h2 className="mt-8 text-[1.375rem] font-bold">What you get</h2>
        <ul className="mt-3 space-y-3">
          {GETS.map((g) => (
            <li key={g} className="flex gap-3"><span aria-hidden className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full bg-fairway" />{g}</li>
          ))}
        </ul>
      </div>
      <div>
        <SignupForm kind="beta" />
        <p className="mt-4 text-base text-ink-soft">We use your details only to run the beta. We never sell them.</p>
      </div>
    </div>
  );
}
