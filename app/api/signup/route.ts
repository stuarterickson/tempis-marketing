import { NextResponse } from 'next/server';

/*
 * Beta applications and Studio waitlist sign-ups.
 *
 * Each sign-up is emailed to the team inbox through Resend (the email service
 * the Tempis apps already use). Needs, in the hosting environment:
 *   RESEND_API_KEY     — a Resend key allowed to send from SIGNUP_FROM_EMAIL
 *   SIGNUP_TO_EMAIL    — the inbox that receives sign-ups
 *   SIGNUP_FROM_EMAIL  — a verified sender, e.g. "Tempis Labs <hello@tempislabs.com>"
 * Without them the form says it couldn't send; nothing is silently dropped.
 */

const MAX_LEN = 200;
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > LIMIT;
}

function clean(v: unknown): string {
  return typeof v === 'string' ? v.trim().slice(0, MAX_LEN) : '';
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

const FIELDS: Record<'beta' | 'studio', string[]> = {
  beta: ['name', 'email', 'phone', 'club', 'rounds', 'mobile'],
  studio: ['name', 'email', 'club', 'course', 'role', 'members'],
};

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'That’s a lot of sign-ups at once. Please try again in a few minutes.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'We couldn’t read that form. Please try again.' }, { status: 400 });
  }

  // Spam trap filled in: answer like a success, send nothing.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const kind = body.kind === 'studio' ? 'studio' : body.kind === 'beta' ? 'beta' : null;
  if (!kind) return NextResponse.json({ error: 'We couldn’t read that form. Please try again.' }, { status: 400 });

  const values = Object.fromEntries(FIELDS[kind].map((f) => [f, clean(body[f])]));
  if (!values.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return NextResponse.json({ error: 'Please add your name and a working email address.' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.SIGNUP_TO_EMAIL;
  const from = process.env.SIGNUP_FROM_EMAIL;
  if (!key || !to || !from) {
    console.error('[signup] RESEND_API_KEY, SIGNUP_TO_EMAIL or SIGNUP_FROM_EMAIL is not set');
    return NextResponse.json({ error: 'We couldn’t send that just now. Please email us instead.' }, { status: 503 });
  }

  const subject = kind === 'beta' ? `Beta application: ${values.name}` : `Studio list: ${values.club || values.name}`;
  const rows = Object.entries(values)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#4F4D49">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v || '—')}</td></tr>`)
    .join('');
  const text = Object.entries(values).map(([k, v]) => `${k}: ${v || '—'}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: values.email,
      subject,
      text,
      html: `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2><table style="font-family:sans-serif;font-size:15px">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error('[signup] Resend refused the email', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ error: 'We couldn’t send that just now. Please try again in a minute.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
