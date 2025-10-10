export const metadata = {
  title: "Support - Tempis Labs Help Center",
  description: "Get help and support for Tempis Studio and Tempis Play",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Support Center
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          We&rsquo;re here to help you get the most out of Tempis products
        </p>

        {/* Email Support */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-3">Contact Support</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Have a question or need assistance? Our support team is ready to help.
          </p>
          <a 
            href="mailto:support@tempislabs.com"
            className="inline-flex items-center gap-2 text-foreground font-semibold hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@tempislabs.com
          </a>
        </div>

        {/* Product-Specific Support */}
        <h2 className="text-2xl font-bold mb-6">Product Support</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Studio Support */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Tempis Studio</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get help with your professional creative workspace
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <a href="/studio" className="text-foreground hover:underline">
                  Product Overview
                </a>
              </li>
              <li className="text-gray-500 dark:text-gray-500">Documentation (Coming Soon)</li>
              <li className="text-gray-500 dark:text-gray-500">Tutorials (Coming Soon)</li>
              <li className="text-gray-500 dark:text-gray-500">Community Forum (Coming Soon)</li>
            </ul>
          </div>

          {/* Play Support */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Tempis Play</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get help with your interactive entertainment platform
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <a href="/play" className="text-foreground hover:underline">
                  Product Overview
                </a>
              </li>
              <li className="text-gray-500 dark:text-gray-500">Documentation (Coming Soon)</li>
              <li className="text-gray-500 dark:text-gray-500">FAQs (Coming Soon)</li>
              <li className="text-gray-500 dark:text-gray-500">Community Forum (Coming Soon)</li>
            </ul>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="space-y-4">
            <a 
              href="/about" 
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-foreground transition-colors"
            >
              <h3 className="font-semibold mb-1">About Tempis Labs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn more about our company and mission</p>
            </a>
            <a 
              href="/terms" 
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-foreground transition-colors"
            >
              <h3 className="font-semibold mb-1">Terms of Service</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Review our terms and conditions</p>
            </a>
            <a 
              href="/privacy" 
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-foreground transition-colors"
            >
              <h3 className="font-semibold mb-1">Privacy Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Understand how we protect your data</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

