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
          <p className="text-gray-300 mt-2">Last updated: March 2, 2026</p>
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
            <li><strong>Usage Data:</strong> How you interact with the app and website, including pages visited, features used, and session duration.</li>
            <li><strong>Location Data:</strong> With your permission, the app collects location data to show you nearby places and events. This includes detecting when you enter or exit designated geographic zones (such as commercial districts and points of interest), which places you visit or check into, and how long you spend at those locations. Location data is collected both while the app is in the foreground and in the background when location permissions are enabled.</li>
            <li><strong>Anonymous Analytics Data:</strong> We generate a random, anonymous identifier on your device that is not linked to your account or personal identity. This identifier is used solely to associate anonymous usage patterns — such as zone visits, place check-ins, and session activity — for aggregated analytics. You cannot be personally identified from this data.</li>
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
            <li>To generate anonymous, aggregated analytics — such as which areas receive the most foot traffic, popular times of day, and average visit duration — to help local community planning and economic development efforts</li>
            <li>To send you location-based notifications about nearby places, events, and deals when you enter designated areas (with your permission)</li>
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
            <li><strong>Anonymous Aggregated Data:</strong> We may sell or license anonymous, aggregated location and usage data to local community planning organizations, municipal departments, and economic development partners to support informed decision-making for the community. This data includes general traffic patterns (e.g., which areas are most visited, peak hours, average time spent at locations) and never contains personally identifiable information. Individual users cannot be identified from this data. Any third parties receiving this data are bound by data processing agreements that prohibit attempts to re-identify individuals and require the data to be used solely for community planning and development purposes.</li>
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
            6. Data Retention
          </h2>
          <p className="text-gray-600 mb-4">
            We retain your personal account information for as long as your account is active or as needed to provide you with our services. You may request deletion of your account at any time.
          </p>
          <p className="text-gray-600 mb-6">
            Anonymous analytics data is retained in aggregated form and cannot be traced back to individual users. Because this data is anonymous, it may be retained indefinitely for historical trend analysis and community planning purposes.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            7. Your Choices &amp; Location Controls
          </h2>
          <p className="text-gray-600 mb-4">
            You are in control of the location data the app collects:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Location Permission:</strong> You can grant or revoke location access at any time through your device&apos;s Settings. Revoking location permission will stop all location-based data collection, including zone entry/exit tracking and place visit analytics.</li>
            <li><strong>Background Location:</strong> The app may request &quot;Always&quot; location permission to detect when you enter geographic zones while the app is not actively open. You can change this to &quot;While Using the App&quot; or &quot;Never&quot; in your device&apos;s Settings at any time.</li>
            <li><strong>Notifications:</strong> The app may send you local notifications when you enter designated areas. You can disable notifications in your device&apos;s Settings.</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            8. Cookies
          </h2>
          <p className="text-gray-600 mb-6">
            We use essential cookies for authentication and session management. We do not use third-party advertising cookies or tracking pixels. We do not track you across other apps or websites, and we do not share data with advertising networks.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            9. Children&apos;s Privacy
          </h2>
          <p className="text-gray-600 mb-6">
            G2K is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            10. Changes to This Policy
          </h2>
          <p className="text-gray-600 mb-6">
            We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            11. Governing Law
          </h2>
          <p className="text-gray-600 mb-6">
            This privacy policy and your use of G2K Your City are governed by and construed in accordance with the laws of the State of North Carolina, without regard to its conflict of law provisions. Any disputes arising under this policy shall be subject to the exclusive jurisdiction of the courts located in Vance County, North Carolina.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            12. Contact Us
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
