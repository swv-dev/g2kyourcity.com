import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | G2K Your City',
  description: 'Privacy policy for G2K Your City app and website.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-gray-300 mt-2">Last updated: March 1, 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-navy max-w-none">
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            When you use G2K Your City (&quot;G2K,&quot; &quot;we,&quot; &quot;our&quot;), we may collect the following information:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Account Information:</strong> Name, email address, organization name, phone number, and website when you create an account or apply.</li>
            <li><strong>Content You Submit:</strong> Events, place recommendations, and other content you submit through the platform.</li>
            <li><strong>Usage Data:</strong> How you interact with the app and website, including pages visited and features used.</li>
            <li><strong>Location Data:</strong> With your permission, approximate location to show nearby places and events in the app.</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>To provide, maintain, and improve the G2K platform</li>
            <li>To process account applications and submissions</li>
            <li>To show you relevant local events, businesses, and deals</li>
            <li>To communicate with you about your account or submissions</li>
            <li>To ensure the safety and integrity of the platform</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-gray-600 mb-4">
            We do not sell your personal information. We may share information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Public Content:</strong> Events and places you submit may be displayed publicly on the platform after approval.</li>
            <li><strong>Service Providers:</strong> We use trusted third-party services (e.g., Supabase for data storage, Vercel for hosting) that process data on our behalf.</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect rights and safety.</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-600 mb-6">
            We implement industry-standard security measures including encryption, secure authentication, and row-level security policies to protect your data. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of non-essential communications</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            6. Cookies
          </h2>
          <p className="text-gray-600 mb-6">
            We use essential cookies for authentication and session management. We do not use third-party advertising cookies or tracking pixels.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            7. Children&apos;s Privacy
          </h2>
          <p className="text-gray-600 mb-6">
            G2K is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-600 mb-6">
            We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            9. Contact Us
          </h2>
          <p className="text-gray-600 mb-2">
            If you have questions about this privacy policy, contact us at:
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
