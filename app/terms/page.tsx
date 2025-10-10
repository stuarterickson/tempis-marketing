export const metadata = {
  title: "Terms of Service - Tempis Labs",
  description: "Terms of Service for Tempis Labs, Tempis Studio, and Tempis Play",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
          Last updated: October 10, 2025
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Please read these Terms of Service carefully before using Tempis Studio or Tempis Play.
        </p>

        {/* Acceptance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            By accessing or using Tempis Studio, Tempis Play, or any other services provided by Tempis Labs (collectively, the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use our Services.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We reserve the right to update and change these Terms from time to time without notice. Continued use of the Services after any such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        {/* Accounts */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Account Registration and Security</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            To use certain features of our Services, you must register for an account. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            You are responsible for maintaining the confidentiality of your account and password. Tempis Labs will not be liable for any loss or damage arising from your failure to protect your account information.
          </p>
        </section>

        {/* Acceptable Use */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. Acceptable Use</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Upload or transmit viruses, malware, or other malicious code</li>
            <li>Attempt to gain unauthorized access to our systems or other users&rsquo; accounts</li>
            <li>Use the Services for any illegal or unauthorized purpose</li>
            <li>Interfere with or disrupt the integrity or performance of the Services</li>
            <li>Collect or harvest any information from the Services using automated means</li>
          </ul>
        </section>

        {/* Payments */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. Payments and Billing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Certain features of our Services may require payment. By providing payment information, you represent and warrant that you have the legal right to use the payment method provided.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time. You will be notified of any price changes in advance, and your continued use of the Services after such changes constitutes acceptance of the new pricing.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            You may terminate your account at any time by contacting us. Upon termination, your right to use the Services will immediately cease.
          </p>
        </section>

        {/* Disclaimers */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">6. Disclaimers</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We do not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-400">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, TEMPIS LABS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICES.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-400">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Tempis Labs operates, without regard to its conflict of law provisions.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you have any questions about these Terms, please contact us:
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
            <a href="/privacy" className="text-foreground hover:underline">
              Privacy Policy
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

