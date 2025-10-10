export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Welcome to Tempis Labs
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Empowering creativity and productivity through innovative software solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/studio"
              className="rounded-lg bg-foreground text-background px-8 py-4 font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Explore Tempis Studio
            </a>
            <a
              href="/play"
              className="rounded-lg border-2 border-foreground px-8 py-4 font-semibold text-lg hover:bg-foreground hover:text-background transition-colors"
            >
              Try Tempis Play
            </a>
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Our Products
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-black p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Tempis Studio</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                A powerful creative workspace designed for professionals who demand precision and flexibility. 
                Tempis Studio provides cutting-edge tools for your most ambitious projects.
              </p>
              <a
                href="/studio"
                className="text-foreground font-semibold hover:underline"
              >
                Learn more →
              </a>
            </div>
            <div className="bg-white dark:bg-black p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Tempis Play</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Experience seamless entertainment and interactive experiences. 
                Tempis Play brings joy and engagement to users of all backgrounds with its intuitive design.
              </p>
              <a
                href="/play"
                className="text-foreground font-semibold hover:underline"
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Tempis Labs for their creative and productivity needs.
          </p>
          <a
            href="/about"
            className="inline-block rounded-lg border-2 border-foreground px-8 py-4 font-semibold text-lg hover:bg-foreground hover:text-background transition-colors"
          >
            Learn About Us
          </a>
        </div>
      </section>
    </div>
  );
}
