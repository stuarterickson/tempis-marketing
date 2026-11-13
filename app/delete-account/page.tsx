import type { Metadata } from 'next';
import { SITE } from '../site';

export const metadata: Metadata = {
  title: 'Delete your account',
  description: 'How to delete your Tempis Play account and what happens to your information.',
};

export default function DeleteAccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <h1 className="text-[2.5rem] font-semibold leading-[1.08] tracking-tight">Delete your Tempis Play account</h1>

      <h2 className="mt-10 text-[1.5rem] font-bold">In the app</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-6">
        <li>Open Tempis Play and go to your <strong>Profile</strong>.</li>
        <li>Scroll to the bottom, under <strong>Sign out</strong>.</li>
        <li>Tap <strong>Delete my account</strong>. Play shows what will be removed before you confirm.</li>
      </ol>

      <h2 className="mt-10 text-[1.5rem] font-bold">By email</h2>
      <p className="mt-3">
        Can’t sign in? Email <a className="link" href={`mailto:${SITE.supportEmail}?subject=Delete%20my%20account`}>{SITE.supportEmail}</a> from the address on your account, and we’ll delete it for you.
      </p>

      <h2 className="mt-10 text-[1.5rem] font-bold">What happens</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>Your sign-in is closed, and your email, phone number, GHIN number and preferences are removed.</li>
        <li>Your own rounds, statistics, shot locations, golf bag, friends, saved guests and favorite courses are deleted.</li>
      </ul>
      <p className="mt-6 text-ink-soft">
        The full details are in our <a className="link" href={SITE.privacyUrl}>privacy policy</a>.
      </p>
    </div>
  );
}
