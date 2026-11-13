'use client';

import { useState } from 'react';

type Kind = 'beta' | 'studio';

interface Choice { value: string; label: string }

const PHONE_CHOICES: Choice[] = [
  { value: 'iphone', label: 'iPhone' },
  { value: 'android', label: 'Android' },
];

const ROUNDS_CHOICES: Choice[] = [
  { value: '1-2', label: '1–2 a month' },
  { value: '3-6', label: '3–6 a month' },
  { value: '7+', label: '7 or more' },
];

const ROLE_CHOICES: Choice[] = [
  { value: 'president', label: 'President' },
  { value: 'tournament', label: 'Tournament chair' },
  { value: 'handicap', label: 'Handicap chair' },
  { value: 'treasurer', label: 'Treasurer or secretary' },
  { value: 'pro', label: 'Golf professional or staff' },
  { value: 'member', label: 'Member' },
];

function ChoiceGroup({ name, legend, choices, columns = 2 }: { name: string; legend: string; choices: Choice[]; columns?: number }) {
  return (
    <fieldset>
      <legend className="mb-2 font-semibold">{legend}</legend>
      <div className={`grid gap-2.5 ${columns === 3 ? 'sm:grid-cols-3' : 'grid-cols-2'}`}>
        {choices.map((c) => (
          <label key={c.value} className="choice relative">
            <input type="radio" name={name} value={c.value} required />
            <span>{c.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-base text-ink-soft">{hint}</p>}
    </div>
  );
}

export default function SignupForm({ kind }: { kind: Kind }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, ...data }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || 'We couldn’t send that. Please try again.');
      setFirstName(String(data.name ?? '').trim().split(/\s+/)[0] ?? '');
      setStatus('sent');
    } catch (err) {
      // Keep everything they typed; show the error where they'll see it.
      setError(err instanceof Error ? err.message : 'We couldn’t send that. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-[14px] border border-stone bg-ivory p-6">
        <h2 className="text-[1.5rem] font-bold">Thanks{firstName ? `, ${firstName}` : ''}.</h2>
        <p className="mt-2 text-ink-soft">
          {kind === 'beta'
            ? 'We’ll email you within a week. If there’s a spot, the email has everything you need to install Tempis Play.'
            : 'You’re on the Studio list. We’ll be in touch to set up a 15-minute look at Studio with you and your board.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-[14px] border border-stone bg-ivory p-6 md:p-8" noValidate={false}>
      <Field id="name" label="Your name">
        <input id="name" name="name" className="field" autoComplete="name" required maxLength={80} />
      </Field>
      <Field id="email" label="Email">
        <input id="email" name="email" type="email" className="field" autoComplete="email" inputMode="email" required maxLength={120} />
      </Field>

      {kind === 'beta' ? (
        <>
          <ChoiceGroup name="phone" legend="Which phone do you carry on the course?" choices={PHONE_CHOICES} />
          <Field id="club" label="Your home club or course" hint="Optional.">
            <input id="club" name="club" className="field" maxLength={100} />
          </Field>
          <ChoiceGroup name="rounds" legend="How often do you play?" choices={ROUNDS_CHOICES} columns={3} />
          <Field id="mobile" label="Mobile number" hint="Optional. Only so we can text you if the install gets stuck.">
            <input id="mobile" name="mobile" type="tel" className="field" autoComplete="tel" inputMode="tel" maxLength={30} />
          </Field>
        </>
      ) : (
        <>
          <Field id="club" label="Club name">
            <input id="club" name="club" className="field" required maxLength={100} />
          </Field>
          <Field id="course" label="Home course">
            <input id="course" name="course" className="field" maxLength={100} />
          </Field>
          <ChoiceGroup name="role" legend="Your role" choices={ROLE_CHOICES} />
          <Field id="members" label="About how many members?" hint="Optional.">
            <input id="members" name="members" type="number" min={1} max={5000} className="field" inputMode="numeric" />
          </Field>
        </>
      )}

      {/* Spam trap: people never see or fill this. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="rounded-[10px] border border-error bg-ivory px-4 py-3 font-semibold text-error">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : kind === 'beta' ? 'Apply for the beta' : 'Join the Studio list'}
      </button>
    </form>
  );
}
