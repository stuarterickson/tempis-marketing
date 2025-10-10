export const metadata = {
  title: "Login to Tempis - Access Your Account",
  description: "Login to Tempis Studio or Tempis Play to access your account and projects",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Login to Tempis
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Choose which application you&rsquo;d like to access
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Tempis Studio Login */}
          <a
            href="https://app.tempislabs.com/studio"
            className="group p-8 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-foreground dark:hover:border-foreground transition-all hover:shadow-lg"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-foreground transition-colors">
                Tempis Studio
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Access your professional creative workspace
              </p>
            </div>
            <div className="inline-flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
              Login to Studio
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Tempis Play Login */}
          <a
            href="https://app.tempislabs.com/play"
            className="group p-8 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-foreground dark:hover:border-foreground transition-all hover:shadow-lg"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-foreground transition-colors">
                Tempis Play
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Access your interactive entertainment platform
              </p>
            </div>
            <div className="inline-flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
              Login to Play
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
          Don&rsquo;t have an account?{' '}
          <a href="/about" className="text-foreground hover:underline font-medium">
            Learn more about our products
          </a>
        </p>
      </div>
    </div>
  );
}

