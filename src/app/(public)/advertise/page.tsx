import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from './LeadForm'

export const metadata: Metadata = {
  title: 'Advertise with G2K\u2122 | Get Your Business Seen',
  description:
    'Sponsor your business on G2K and reach every local in Henderson. Featured listings, AR emblems, deals, and more.',
  openGraph: {
    title: 'Advertise with G2K',
    description:
      'Put your business in front of every Henderson local. Sponsorships, AR emblems, deals, and featured placement.',
    url: 'https://g2kyourcity.com/advertise',
  },
}

const tiers = [
  {
    name: 'Basic',
    price: 49,
    annual: 490,
    description: 'Get found. Stand out from the crowd with a verified listing and your first deal.',
    features: [
      'Verified business badge',
      'Enhanced listing with photos & hours',
      '1 active deal or coupon',
      'Appear in "Sponsored" section',
      'Basic analytics dashboard',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: 99,
    annual: 990,
    description: 'Get noticed. AR emblems, priority placement, and more deals to drive foot traffic.',
    features: [
      'Everything in Basic',
      'AR emblem — spin to win perks',
      'Priority placement on map & search',
      'Up to 3 active deals',
      'Monthly performance report',
      'Featured in category pages',
    ],
    cta: 'Go Premium',
    highlight: true,
  },
  {
    name: 'Elite',
    price: 199,
    annual: 1990,
    description: 'Get everywhere. Maximum visibility with custom AR, homepage features, and push notifications.',
    features: [
      'Everything in Premium',
      'Custom-designed AR emblem',
      'Homepage featured business spot',
      'Unlimited active deals',
      'Push notification mentions',
      'Dedicated account support',
      'Event co-promotion',
    ],
    cta: 'Go Elite',
    highlight: false,
  },
]

const benefits = [
  {
    icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    title: 'Pin on the Map',
    description:
      'Your business shows up on the interactive map with a branded pin. Locals find you while exploring their city.',
  },
  {
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    title: 'AR Emblems',
    description:
      'Customers spin your AR emblem when they visit — unlocking perks, discounts, and surprises. It turns a visit into an experience.',
  },
  {
    icon: 'M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008H9.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    title: 'Deals & Coupons',
    description:
      'Create deals that show up in the app — percentage off, BOGO, free items, or custom offers. Track redemptions in real time.',
  },
  {
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    title: 'Analytics That Matter',
    description:
      'See how many people view your listing, tap your deals, and spin your AR emblem. Know exactly what\'s working.',
  },
]

const faqs = [
  {
    q: 'How is this different from Google or Yelp?',
    a: 'G2K is built specifically for Henderson. We\'re not a national platform where you compete with chains for attention. Every listing is verified, every business is local, and features like AR emblems and deals are designed to drive real foot traffic — not just clicks.',
  },
  {
    q: 'Can I change my tier later?',
    a: 'Absolutely. Upgrade or downgrade anytime. If you upgrade mid-cycle, you\'ll be prorated. If you downgrade, the change takes effect at the end of your current billing period.',
  },
  {
    q: 'What\'s an AR emblem?',
    a: 'It\'s an augmented reality logo that customers can interact with when they visit your location. They spin it in the app and win perks — discounts, free items, or loyalty points. It gamifies the in-store experience and gives people a reason to come back.',
  },
  {
    q: 'How do deals work?',
    a: 'You create a deal (e.g. "20% off your first visit" or "Buy one get one free") and it shows up in the app. Customers show the deal at checkout and you mark it as redeemed. You control the terms, limits, and expiration.',
  },
  {
    q: 'Do I need to be tech-savvy?',
    a: 'Not at all. We handle all the setup — your listing, AR emblem, and initial deals. You\'ll get a simple dashboard to manage things going forward, and we\'re always a phone call away.',
  },
  {
    q: 'Is there a contract?',
    a: 'No long-term contracts. Monthly plans are month-to-month. Annual plans save you 2 months but you can cancel anytime — we\'ll refund the unused portion.',
  },
]

export default function AdvertisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 00.97-1.323L5.138 4.72A2.25 2.25 0 017.313 3h9.374c.918 0 1.742.56 2.084 1.414L19.97 8.03c.175.424.267.88.267 1.32"
                />
              </svg>
              For Local Businesses
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Put Your Business in Front<br />of Every Local
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              G2K is where Henderson goes to discover what&apos;s around them.
              Sponsorships give your business featured placement, AR experiences,
              deals, and real analytics — not vanity metrics.
            </p>
            <a
              href="#pricing"
              className="btn-secondary inline-block"
            >
              See Pricing
            </a>
          </div>
        </div>
      </section>

      {/* How It Works for Businesses */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Why G2K
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Advertising That Actually Drives Foot Traffic
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No impressions, no CPMs, no guessing. G2K puts your business on the
              map — literally — and gives customers a reason to walk through your
              door.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-8 card-hover"
              >
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center text-navy mb-5">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no long-term contracts. Choose the tier that fits
              your business and upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  tier.highlight
                    ? 'bg-navy text-white shadow-xl scale-[1.02]'
                    : 'bg-white shadow-md hover:shadow-lg'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-navy text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3
                  className={`text-xl font-bold mb-1 ${
                    tier.highlight ? 'text-gold' : 'text-navy'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    tier.highlight ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {tier.description}
                </p>

                <div className="mb-6">
                  <span
                    className={`text-4xl font-bold ${
                      tier.highlight ? 'text-white' : 'text-navy'
                    }`}
                  >
                    ${tier.price}
                  </span>
                  <span
                    className={`text-sm ${
                      tier.highlight ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    /month
                  </span>
                  <p
                    className={`text-xs mt-1 ${
                      tier.highlight ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  >
                    or ${tier.annual}/yr (save 2 months)
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm">
                      <svg
                        className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                          tier.highlight ? 'text-gold' : 'text-gold'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={
                          tier.highlight ? 'text-gray-200' : 'text-gray-700'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#inquiry"
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    tier.highlight
                      ? 'bg-gold text-navy hover:bg-gold-dark'
                      : 'bg-navy text-white hover:bg-navy-dark'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            All plans are month-to-month. Annual plans save 2 months.
            No setup fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Social Proof / Why Henderson */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">
                Why Now
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">
                Henderson Is Ready for This
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                There&apos;s no single place where locals go to find what&apos;s
                happening in Vance County. G2K changes that — and early
                sponsors get the most visibility as the platform grows.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Be one of the first businesses on the platform — maximum visibility',
                  'Reach locals who are actively looking for things to do and places to go',
                  'AR emblems create experiences that social media can\'t replicate',
                  'Deals drive real foot traffic — not just likes and follows',
                  'Support the community while growing your business',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats card */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <h3 className="text-lg font-semibold text-navy mb-8">
                What You Get as an Early Sponsor
              </h3>
              <div className="space-y-8">
                {[
                  {
                    stat: 'Day 1',
                    label: 'Visibility',
                    desc: 'Your business is featured from the moment G2K launches in Henderson',
                  },
                  {
                    stat: '0',
                    label: 'Setup Cost',
                    desc: 'We handle your listing, AR emblem design, and initial deal creation',
                  },
                  {
                    stat: '24hr',
                    label: 'Turnaround',
                    desc: 'Changes to your listing, deals, and promotions go live within a day',
                  },
                  {
                    stat: '1:1',
                    label: 'Support',
                    desc: 'You\'re not a ticket number. Call or text us directly — we\'re local too',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-bold text-sm">
                        {item.stat}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-navy mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadForm />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join the first wave of Henderson businesses on G2K. Early sponsors
            get the best placement and the most attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#inquiry"
              className="btn-secondary text-center"
            >
              Get in Touch
            </a>
            <a
              href="#pricing"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-navy text-center"
            >
              Compare Plans
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Or call us directly — we&apos;re local and happy to chat.
          </p>
        </div>
      </section>
    </>
  )
}
