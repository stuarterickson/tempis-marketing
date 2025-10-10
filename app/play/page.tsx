export const metadata = {
  title: "Tempis Play - Interactive Entertainment Platform",
  description: "Tempis Play brings joy and engagement through intuitive interactive experiences",
};

export default function PlayPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            Tempis Play
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8">
            Interactive entertainment designed for everyone
          </p>
          <button className="rounded-lg bg-foreground text-background px-8 py-4 font-semibold text-lg hover:opacity-90 transition-opacity">
            Start Playing Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Why Choose Tempis Play?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-black p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Intuitive Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tempis Play features an interface that's easy to learn and enjoyable to use for all skill levels.
              </p>
            </div>
            <div className="bg-white dark:bg-black p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Engaging Experiences</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover countless hours of entertainment with Tempis Play's diverse content library.
              </p>
            </div>
            <div className="bg-white dark:bg-black p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Cross-Platform</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access Tempis Play on any device, anytime, anywhere with seamless synchronization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Instant Access</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Jump right into Tempis Play with no lengthy setup or complicated installation process.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Social Features</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Connect with friends and share your experiences within Tempis Play.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Regular Updates</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enjoy fresh content and new features added regularly to Tempis Play.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Personalization</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Customize Tempis Play to match your preferences and style.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Offline Mode</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Continue enjoying Tempis Play even without an internet connection.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Safe Environment</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Tempis Play provides a secure and family-friendly experience for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Experience Tempis Play?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join millions of users worldwide who have made Tempis Play their go-to entertainment platform.
          </p>
          <button className="rounded-lg bg-foreground text-background px-8 py-4 font-semibold text-lg hover:opacity-90 transition-opacity">
            Download Tempis Play
          </button>
        </div>
      </section>
    </div>
  );
}

