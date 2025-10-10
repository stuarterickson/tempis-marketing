import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl font-bold text-gray-300 dark:text-gray-700 mb-4">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Looks like you missed the fairway.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <Link
            href="/"
            className="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-800 hover:border-foreground dark:hover:border-foreground transition-colors font-medium text-sm"
          >
            Home
          </Link>
          <Link
            href="/studio"
            className="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-800 hover:border-foreground dark:hover:border-foreground transition-colors font-medium text-sm"
          >
            Studio
          </Link>
          <Link
            href="/play"
            className="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-800 hover:border-foreground dark:hover:border-foreground transition-colors font-medium text-sm"
          >
            Play
          </Link>
          <Link
            href="/login"
            className="px-4 py-3 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-medium text-sm"
          >
            Login
          </Link>
        </div>

        <div className="mt-8">
          <Link 
            href="/support" 
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
          >
            Need help? Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}

