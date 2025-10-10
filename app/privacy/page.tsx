export const metadata = {
  title: "Privacy Policy - Tempis Labs",
  description: "Privacy Policy for Tempis Labs, Tempis Studio, and Tempis Play",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
          Last updated: October 10, 2025
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          At Tempis Labs, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
        </p>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Tempis Labs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates Tempis Studio and Tempis Play (collectively, the &ldquo;Services&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Services.
          </p>
        </section>

        {/* What We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. What We Collect</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
            <li>Account information (name, email address, password)</li>
            <li>Profile information and preferences</li>
            <li>Content you create, upload, or share through our Services</li>
            <li>Communications you send to us</li>
            <li>Payment and billing information</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            We also automatically collect certain information when you use our Services, such as device information, usage data, and analytics information.
          </p>
        </section>

        {/* How We Use Data */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Data</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Provide, maintain, and improve our Services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize and improve the Services and provide content or features that match your interests</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with small amounts of data that are sent to your browser from a website and stored on your device.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We retain your personal information for as long as necessary to provide you with our Services and as described in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <p className="font-semibold mb-2">Tempis Labs</p>
            <p className="text-gray-600 dark:text-gray-400">
              Email:{' '}
              <a href="mailto:support@tempislabs.com" className="text-foreground hover:underline">
                support@tempislabs.com
              </a>
            </p>
          </div>
        </section>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="/terms" className="text-foreground hover:underline">
              Terms of Service
            </a>
            <a href="/support" className="text-gray-600 dark:text-gray-400 hover:text-foreground">
              Support
            </a>
            <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-foreground">
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

