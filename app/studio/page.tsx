export const metadata = {
  title: "Tempis Studio - Professional Creative Workspace",
  description: "Tempis Studio is a powerful creative workspace for professionals",
};

export default function StudioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            Tempis Studio
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8">
            Professional creative workspace built for precision and performance
          </p>
          <button className="rounded-lg bg-foreground text-background px-8 py-4 font-semibold text-lg hover:opacity-90 transition-opacity">
            Get Started with Tempis Studio
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-black p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Advanced Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tempis Studio provides professional-grade tools for complex creative workflows and projects.
              </p>
            </div>
            <div className="bg-white dark:bg-black p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Seamless Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Work together in real-time with team members across the globe using Tempis Studio.
              </p>
            </div>
            <div className="bg-white dark:bg-black p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Flexible Workflow</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Customize Tempis Studio to match your unique creative process and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Perfect For
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">Creative Professionals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Designers, artists, and creators who need powerful tools to bring their vision to life with Tempis Studio.
            </p>
          </div>
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">Enterprise Teams</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Large organizations requiring robust collaboration and project management capabilities in Tempis Studio.
            </p>
          </div>
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">Agencies</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Creative agencies managing multiple clients and projects simultaneously with Tempis Studio.
            </p>
          </div>
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">Freelancers</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Independent professionals who need a reliable, professional workspace like Tempis Studio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

