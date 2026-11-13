import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '../site';

export const metadata: Metadata = {
  title: 'Help',
  description: 'Get help with Tempis Play.',
};

const TOPICS = [
  {
    q: 'I was invited to the beta. How do I install the app?',
    a: 'Your invitation email has step-by-step instructions for iPhone and Android. If you can’t find it or get stuck, email us and we’ll call you if that’s easier.',
  },
  {
    q: 'Something isn’t working.',
    a: 'Email us a screenshot and one sentence about what you expected. In the app, you can also send us feedback from your Profile.',
  },
  {
    q: 'How do I delete my account?',
    a: null,
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <h1 className="text-[2.5rem] font-extrabold leading-[1.08] tracking-tight">Help</h1>
      <p className="mt-4 text-[1.1875rem] text-ink-soft">
        Email <a className="link" href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>. A person answers, usually within a day.
      </p>
      <dl className="mt-10 divide-y divide-stone border-y border-stone">
        {TOPICS.map((t) => (
          <div key={t.q} className="py-6">
            <dt className="text-[1.25rem] font-bold">{t.q}</dt>
            <dd className="mt-2 text-ink-soft">
              {t.a ?? (
                <>See <Link className="link" href="/delete-account">Delete your account</Link>.</>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
