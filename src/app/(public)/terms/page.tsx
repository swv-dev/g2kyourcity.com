import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | G2K Your City',
  description: 'Terms of service for G2K Your City app and website.',
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-navy text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          <p className="text-gray-300 mt-2">Last updated: March 1, 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-navy max-w-none">
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 mb-6">
            By accessing or using G2K Your City (&quot;G2K,&quot; &quot;we,&quot; &quot;our&quot;), including our website at g2kyourcity.com and the G2K mobile application, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            2. Use of the Platform
          </h2>
          <p className="text-gray-600 mb-4">You agree to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Provide accurate information when creating an account or submitting content</li>
            <li>Use the platform only for lawful purposes</li>
            <li>Not submit false, misleading, or harmful content</li>
            <li>Not attempt to interfere with the platform&apos;s operation or security</li>
            <li>Respect other users and the Henderson community</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            3. Accounts
          </h2>
          <p className="text-gray-600 mb-6">
            Account applications are reviewed and approved at our discretion. We reserve the right to suspend or terminate accounts that violate these terms. You are responsible for maintaining the security of your account credentials.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            4. User Content
          </h2>
          <p className="text-gray-600 mb-4">
            When you submit content (events, place recommendations, etc.) to G2K:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>You retain ownership of your content</li>
            <li>You grant G2K a non-exclusive, royalty-free license to use, display, and distribute your content on the platform</li>
            <li>All submissions are subject to moderation and may be approved, rejected, or modified</li>
            <li>You represent that you have the right to submit the content and that it does not infringe on any third-party rights</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            5. Sponsorships & Business Listings
          </h2>
          <p className="text-gray-600 mb-6">
            Business sponsorships are subject to separate agreements. Sponsored listings, AR emblems, and deals are provided as described in the applicable sponsorship tier. G2K reserves the right to modify sponsorship features and pricing with reasonable notice.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            6. Deals & Coupons
          </h2>
          <p className="text-gray-600 mb-6">
            Deals and coupons displayed on G2K are provided by participating businesses. G2K is not responsible for the fulfillment of deals. Terms, availability, and restrictions are set by the sponsoring business.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            7. Intellectual Property
          </h2>
          <p className="text-gray-600 mb-6">
            The G2K platform, including its design, features, code, and branding, is owned by G2K Your City. You may not copy, modify, or distribute any part of the platform without our written permission.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            8. Disclaimer
          </h2>
          <p className="text-gray-600 mb-6">
            G2K is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy of event listings, business information, or user-submitted content. We are not liable for any damages arising from your use of the platform.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            9. Limitation of Liability
          </h2>
          <p className="text-gray-600 mb-6">
            To the maximum extent permitted by law, G2K Your City shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of the platform.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            10. Changes to Terms
          </h2>
          <p className="text-gray-600 mb-6">
            We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            11. Governing Law
          </h2>
          <p className="text-gray-600 mb-6">
            These terms are governed by the laws of the State of North Carolina. Any disputes shall be resolved in the courts of Vance County, North Carolina.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            12. Contact
          </h2>
          <p className="text-gray-600 mb-2">
            Questions about these terms? Contact us at:
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Email:</strong>{' '}
            <a href="mailto:info@g2kyourcity.com" className="text-navy hover:text-gold">
              info@g2kyourcity.com
            </a>
          </p>
          <p className="text-gray-600">
            <strong>Address:</strong> 100 South Garnett Street, Henderson, NC 27536
          </p>
        </div>
      </section>
    </>
  )
}
