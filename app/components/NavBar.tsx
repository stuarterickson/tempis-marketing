'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-xl hover:opacity-80 transition-opacity"
          >
            Tempis Labs
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/studio" 
              className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Studio
            </Link>
            <Link 
              href="/play" 
              className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Play
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/support" 
              className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Support
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-medium px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
            <Link 
              href="/" 
              className="block text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/studio" 
              className="block text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Studio
            </Link>
            <Link 
              href="/play" 
              className="block text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Play
            </Link>
            <Link 
              href="/about" 
              className="block text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/support" 
              className="block text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              href="/login" 
              className="block text-sm font-medium px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

