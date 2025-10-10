import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl hover:opacity-80 transition-opacity">
            Tempis Labs
          </Link>
          <div className="flex gap-6">
            <Link 
              href="/studio" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium"
            >
              Tempis Studio
            </Link>
            <Link 
              href="/play" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium"
            >
              Tempis Play
            </Link>
            <Link 
              href="/about" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

