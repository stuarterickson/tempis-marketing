export const metadata = {
  title: "About Tempis Labs - Our Mission and Values",
  description: "Learn about Tempis Labs and our commitment to innovative software solutions",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            About Tempis Labs
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400">
            We're building the future of creative and interactive software
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              At Tempis Labs, we believe in empowering people through innovative software solutions. 
              Our mission is to create tools that enhance creativity, boost productivity, and bring joy 
              to users around the world.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Through our flagship products, Tempis Studio and Tempis Play, we're committed to delivering 
              exceptional experiences that make a real difference in people's lives.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">Innovation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We constantly push the boundaries of what's possible, exploring new technologies and 
              approaches to solve real-world problems.
            </p>
          </div>
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">User-Centric Design</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Every decision we make is guided by the needs and experiences of our users. Your success 
              is our success.
            </p>
          </div>
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">Quality</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We're committed to delivering products that meet the highest standards of performance, 
              reliability, and design.
            </p>
          </div>
          <div className="border-l-4 border-foreground pl-6">
            <h3 className="text-2xl font-bold mb-3">Accessibility</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our software is designed to be inclusive and accessible to everyone, regardless of 
              background or ability.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Our Products
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
            <div>
              <h3 className="text-2xl font-bold mb-4">Tempis Studio</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tempis Studio was born from the need for a professional creative workspace that doesn't 
                compromise on power or usability. It's the result of years of research and collaboration 
                with creative professionals worldwide.
              </p>
              <a
                href="/studio"
                className="text-foreground font-semibold hover:underline"
              >
                Learn more about Tempis Studio →
              </a>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Tempis Play</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tempis Play represents our vision for accessible, engaging entertainment. We've designed 
                it to be intuitive enough for anyone to enjoy, yet deep enough to provide lasting value 
                to our users.
              </p>
              <a
                href="/play"
                className="text-foreground font-semibold hover:underline"
              >
                Learn more about Tempis Play →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Want to Learn More?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to learn more about Tempis Labs, Tempis Studio, 
            or Tempis Play.
          </p>
          <button className="rounded-lg bg-foreground text-background px-8 py-4 font-semibold text-lg hover:opacity-90 transition-opacity">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}

