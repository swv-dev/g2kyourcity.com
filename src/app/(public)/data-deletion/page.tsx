import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delete My Data | G2K Your City',
  description: 'Request deletion of your G2K Your City account and associated data.',
}

export default function DataDeletionPage() {
  return (
    <>
      <section className="bg-navy text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Delete My Data</h1>
          <p className="text-gray-300 mt-2">Request deletion of your account and personal data</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-navy max-w-none">
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            Your Right to Deletion
          </h2>
          <p className="text-gray-600 mb-6">
            You have the right to request deletion of your G2K Your City account and all personal data associated with it. We take your privacy seriously and will process your request promptly.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            What Gets Deleted
          </h2>
          <p className="text-gray-600 mb-4">
            When you request account deletion, we will permanently remove:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Account information:</strong> Your name, email address, organization name, phone number, website, and all profile data</li>
            <li><strong>Submitted content:</strong> Events, place recommendations, and photos you have submitted</li>
            <li><strong>Authentication credentials:</strong> Your login credentials and session data</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            What Is Not Affected
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Anonymous analytics data:</strong> Aggregated, anonymous usage data (zone visits, session counts) is not linked to your identity and cannot be deleted because it cannot be traced back to you. See our <a href="/privacy" className="text-navy hover:text-gold">Privacy Policy</a> for details on how anonymous data is collected and used.</li>
            <li><strong>Local device data:</strong> Explorer score, badges, check-in history, and other gamification data stored on your device is not affected by server-side deletion. To remove local data, delete the G2K Henderson app from your device.</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            How to Request Deletion
          </h2>
          <p className="text-gray-600 mb-4">
            To request deletion of your account and data, email us at:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-navy font-semibold text-lg mb-2">
              <a href="mailto:info@g2kyourcity.com?subject=Account%20Deletion%20Request" className="text-navy hover:text-gold">
                info@g2kyourcity.com
              </a>
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Subject: Account Deletion Request
            </p>
            <p className="text-gray-600 text-sm">
              Please include the email address associated with your G2K account so we can locate and delete your data.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            Processing Time
          </h2>
          <p className="text-gray-600 mb-6">
            We will process your deletion request within 30 days. You will receive a confirmation email once your data has been permanently removed. During this period, your account will be deactivated immediately.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            Questions?
          </h2>
          <p className="text-gray-600 mb-2">
            If you have questions about data deletion, contact us at:
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
