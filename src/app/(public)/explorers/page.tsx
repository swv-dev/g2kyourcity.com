import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Explorers | G2K Your City',
  description:
    'Explore your city for free or upgrade to unlock cloud sync, boosted rewards, exclusive map skins, and more. Choose the tier that fits your adventure.',
  openGraph: {
    title: 'G2K Explorers',
    description:
      'Free forever. Premium when you\'re ready to level up.',
    url: 'https://g2kyourcity.com/explorers',
  },
}

const freeTierFeatures = [
  { text: 'Full interactive map with every local spot', included: true },
  { text: 'All places, events, and navigation', included: true },
  { text: 'Check-ins with standard reward rolls', included: true },
  { text: 'Explorer Score, levels & all 63 badges', included: true },
  { text: 'Streets & trails fog-of-war discovery', included: true },
  { text: 'Distance tracking & step counter', included: true },
  { text: 'AR mode (with watermark)', included: true },
  { text: 'Default Explorer map skin', included: true },
  { text: 'Last 50 check-ins visible', included: true },
]

const explorerFeatures = [
  { text: 'Everything in Free, plus...', included: true, highlight: true },
  { text: 'Cloud sync & progress backup', included: true, anchor: true },
  { text: 'All map skins (current + future)', included: true },
  { text: 'Full check-in history (500+)', included: true },
  { text: 'Boosted reward roll odds', included: true },
  { text: 'Per-neighborhood street/trail stats', included: true },
  { text: 'Stats dashboard with trends', included: true },
  { text: 'Streak Shield (1 free miss/month)', included: true },
  { text: 'Profile photo as your map marker', included: true },
  { text: 'Clean AR selfies (no watermark)', included: true },
  { text: 'Explorer Wrapped year-end summary', included: true },
  { text: 'Monthly exclusive badge variant', included: true },
]

const adventureFeatures = [
  { text: 'Everything in Explorer, plus...', included: true, highlight: true },
  { text: 'Challenge packs & competitions', included: true },
  { text: 'Create private Capture the Flag games', included: true },
  { text: 'Custom walking routes', included: true },
  { text: 'Family sharing (up to 4 people)', included: true },
  { text: 'Priority 5K race registration', included: true },
  { text: '"Trailblazer" profile indicator', included: true },
  { text: 'Early access to new features', included: true },
]

const upcomingActivities = [
  {
    icon: 'M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525',
    title: 'Treasure Chests',
    description:
      'Geocached rewards hidden around town. Local businesses stock real coupons and deals inside — you find them by exploring. No loot boxes, no tricks, just real treasure.',
    tag: 'Coming First',
  },
  {
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    title: 'Walking Challenges',
    description:
      'Monthly and route-based challenges that push you to explore new parts of town. Hit distance goals, discover new streets, and compete with friends.',
    tag: 'Coming Soon',
  },
  {
    icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
    title: 'Capture the Flag',
    description:
      'Plant your team\'s flag at locations around town. Other players capture it by visiting in person. Slow-burn, async territory control — perfect for a small town.',
    tag: 'Coming Soon',
  },
  {
    icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
    title: '5K Explorer Runs',
    description:
      'Real-world running events through Henderson\'s best routes. The app handles registration, live GPS tracking, and results. Run your city, literally.',
    tag: 'Future',
  },
]

const faqs = [
  {
    q: 'Is the free tier actually free forever?',
    a: 'Yes. The core G2K experience — the full map, every place, all events, check-ins, explorer score, badges, fog-of-war streets and trails — is free forever. We will never paywall the basics of exploring your city.',
  },
  {
    q: 'What happens to my progress if I don\'t subscribe?',
    a: 'Your explorer score, badges, and check-in data are stored locally on your device. It works great — but if you switch phones, delete the app, or want to access your stats across devices, that data is gone. Cloud sync (Explorer Pass) protects your progress and lets you pick up where you left off on any device.',
  },
  {
    q: 'Can I try premium before committing?',
    a: 'We\'ll offer a free trial when subscriptions launch. You\'ll get to experience cloud sync, boosted rewards, and all the premium goodies before you decide.',
  },
  {
    q: 'What are "boosted reward rolls"?',
    a: 'Every check-in gives you a reward roll — think of it like a loot drop. Free users get standard odds (60% normal, 25% bonus, 10% rare, 5% legendary). Explorer Pass shifts the odds in your favor: 45% normal, 25% bonus, 20% rare, 10% legendary. More rare rewards, more often.',
  },
  {
    q: 'What\'s the Streak Shield?',
    a: 'Life happens. The Streak Shield gives you one free "miss" per month so your check-in streak doesn\'t break when you can\'t make it out. Your longest streak is safe.',
  },
  {
    q: 'When do subscriptions launch?',
    a: 'We\'re building the premium infrastructure now. The free app comes first — subscriptions will roll out once the core experience is rock-solid. Follow us to be the first to know.',
  },
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
    </svg>
  )
}

export default function PlansPage() {
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Choose Your Adventure
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Free to Explore.<br />
            <span className="text-gold">Premium to Dominate.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The full G2K experience is free — every place, every event, every badge.
            When you&apos;re ready to take your exploration to the next level, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">

            {/* Free Tier */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy">Free</h3>
                <p className="text-gray-500 mt-1">Core Discovery</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy">$0</span>
                <span className="text-gray-500 ml-1">/ forever</span>
              </div>
              <ul className="space-y-3 flex-grow">
                {freeTierFeatures.map((f) => (
                  <li key={f.text} className="flex gap-3 text-gray-700">
                    <CheckIcon />
                    <span className="text-sm">{f.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/app" className="block w-full text-center btn-outline">
                  Get the App
                </Link>
              </div>
            </div>

            {/* Explorer Pass — Featured */}
            <div className="relative bg-navy rounded-2xl p-8 border-2 border-gold text-white flex flex-col shadow-xl md:-mt-4 md:mb-[-1rem]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gold text-navy text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Explorer Pass</h3>
                <p className="text-gray-400 mt-1">Level Up Your Game</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$3.99</span>
                <span className="text-gray-400 ml-1">/ month</span>
                <p className="text-sm text-gold mt-1">or $29.99/year (save 37%)</p>
              </div>
              <ul className="space-y-3 flex-grow">
                {explorerFeatures.map((f) => (
                  <li key={f.text} className="flex gap-3">
                    {f.anchor ? <StarIcon /> : <CheckIcon />}
                    <span className={`text-sm ${f.anchor ? 'text-gold font-semibold' : f.highlight ? 'text-gray-300 font-medium' : 'text-gray-300'}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button disabled className="block w-full text-center bg-gold text-navy px-6 py-3 rounded-lg font-semibold opacity-80 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Adventure Pass */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-navy" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy">Adventure Pass</h3>
                <p className="text-gray-500 mt-1">For the Trailblazers</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy">$7.99</span>
                <span className="text-gray-500 ml-1">/ month</span>
                <p className="text-sm text-gold-dark mt-1">or $54.99/year (save 43%)</p>
              </div>
              <ul className="space-y-3 flex-grow">
                {adventureFeatures.map((f) => (
                  <li key={f.text} className="flex gap-3 text-gray-700">
                    {f.highlight ? (
                      <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <CheckIcon />
                    )}
                    <span className={`text-sm ${f.highlight ? 'font-medium text-navy' : ''}`}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button disabled className="block w-full text-center btn-outline opacity-60 cursor-not-allowed">
                  Coming Later
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            All prices in USD. Subscriptions managed through the App Store.
          </p>
        </div>
      </section>

      {/* Cloud Sync Spotlight */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">
                The #1 Reason to Upgrade
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">
                Your Progress, Protected
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                You&apos;ve walked 47 miles, checked in at 83 places, earned 21 badges, and unlocked
                60% of Henderson&apos;s streets. That&apos;s <strong>hundreds of hours</strong> of real exploring.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Without cloud sync, all of that lives on your phone alone. New phone? Gone. Deleted the app
                by accident? Gone. With <strong>Explorer Pass</strong>, your progress syncs to the cloud and
                follows you everywhere.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Cross-device sync', desc: 'Phone, tablet — same progress' },
                  { label: 'Reinstall protection', desc: 'Delete and restore, no data lost' },
                  { label: 'Automatic backups', desc: 'Your data is always safe' },
                  { label: 'Progress restoration', desc: 'Switch phones seamlessly' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-navy text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-navy/5 rounded-full" />
                <div className="absolute inset-4 bg-navy/10 rounded-full" />
                <div className="absolute inset-8 bg-navy/10 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-navy mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                    </svg>
                    <p className="text-navy font-bold text-lg">Cloud Sync</p>
                    <p className="text-gray-500 text-sm">Never lose progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Perks Breakdown */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Explorer Pass Perks
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              More Than Just a Subscription
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every perk is designed to make exploring more rewarding, more personal, and way more fun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
                title: 'All Map Skins',
                description: 'Swap your map style whenever you want. Holiday themes, dark mode, terrain view — unlock them all, including every future skin we release.',
              },
              {
                icon: 'M16 18l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M4 8h.01M8 8h.01M4 12h.01M8 12h.01M4 16h.01M8 16h.01M12 8h.01M12 12h.01M12 16h.01',
                title: 'Boosted Reward Rolls',
                description: 'Every check-in spins a reward. Free gets standard odds. Explorer Pass doubles your rare and legendary drop rates. More epic rewards, more often.',
              },
              {
                icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
                title: 'Stats Dashboard',
                description: 'See your exploration data beautifully visualized. Trends over time, category breakdowns, per-neighborhood completion — a data nerd\'s dream.',
              },
              {
                icon: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z',
                title: 'Streak Shield',
                description: 'Life happens. One free pass per month means a busy day won\'t destroy your 45-day check-in streak. Your dedication stays protected.',
              },
              {
                icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z',
                title: 'Clean AR Selfies',
                description: 'Take AR selfies at any location without the watermark. Show off your explorer moments with a clean, shareable photo stamped with the location.',
              },
              {
                icon: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
                title: 'Explorer Wrapped',
                description: 'At year\'s end, get your personal exploration summary — places visited, miles walked, badges earned, favorite spots. Share it and make everyone jealous.',
              },
            ].map((perk) => (
              <div key={perk.title} className="bg-gray-50 rounded-2xl p-8 card-hover">
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center text-navy mb-5">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={perk.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{perk.title}</h3>
                <p className="text-gray-600 text-sm">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reward Roll Comparison */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              The Odds Are in Your Favor
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Reward Roll Comparison
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Every check-in earns a reward roll. Here&apos;s how the odds stack up.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Free Odds */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-300">Free Tier</h3>
              <div className="space-y-3">
                {[
                  { label: 'Normal', pct: 60, color: 'bg-gray-500' },
                  { label: 'Bonus', pct: 25, color: 'bg-blue-500' },
                  { label: 'Rare', pct: 10, color: 'bg-purple-500' },
                  { label: 'Legendary', pct: 5, color: 'bg-gold' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{row.label}</span>
                      <span className="font-medium">{row.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explorer Odds */}
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-gold">Explorer Pass</h3>
              <div className="space-y-3">
                {[
                  { label: 'Normal', pct: 45, color: 'bg-gray-500' },
                  { label: 'Bonus', pct: 25, color: 'bg-blue-500' },
                  { label: 'Rare', pct: 20, color: 'bg-purple-500' },
                  { label: 'Legendary', pct: 10, color: 'bg-gold' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{row.label}</span>
                      <span className="font-medium">{row.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gold/80 text-xs mt-4 text-center">
                2x rare drops, 2x legendary drops
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Activities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              On the Horizon
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              What&apos;s Coming to G2K
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re building way more than a map app. These activities turn your city into a playground.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingActivities.map((activity) => (
              <div key={activity.title} className="bg-gray-50 rounded-2xl p-8 card-hover relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    activity.tag === 'Coming First'
                      ? 'bg-gold/20 text-gold-dark'
                      : activity.tag === 'Coming Soon'
                        ? 'bg-navy/10 text-navy'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {activity.tag}
                  </span>
                </div>
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center text-navy mb-5">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={activity.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            ))}
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
              Got Questions?
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-navy text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Exploring for Free
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Download the app and start discovering your city today.
            Premium features are coming — but the adventure starts now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app" className="btn-secondary text-center">
              Get the App
            </Link>
            <Link
              href="/henderson"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-navy text-center"
            >
              Explore Henderson
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
