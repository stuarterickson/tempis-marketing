import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
      <h1 className="text-[2.75rem] font-semibold leading-[1.08] tracking-tight">Out of bounds. That page isn’t here.</h1>
      <p className="mt-4 text-[1.1875rem] text-ink-soft">The address may have changed. Start again from the home page.</p>
      <Link href="/" className="btn btn-primary mt-8">Go to the home page</Link>
    </div>
  );
}
