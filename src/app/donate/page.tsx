'use client'

import { useState } from 'react'
import Link from 'next/link'

const donationTiers = [
  { amount: 10, label: 'Supporter', description: 'Buy a developer a coffee and keep the app running.' },
  { amount: 25, label: 'Advocate', description: 'Help us add a new local business to the platform.' },
  { amount: 50, label: 'Champion', description: 'Fund a month of community event coverage.' },
  { amount: 100, label: 'Patron', description: 'Sponsor a featured Henderson experience in the app.' },
]

const impactItems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: 'Free App for Everyone',
    description: 'G2K Henderson will always be free to download. Your donation keeps it that way — no ads, no paywalls.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 00.97-1.323L5.138 4.72A2.25 2.25 0 017.313 3h9.374c.918 0 1.742.56 2.084 1.414L19.97 8.03c.175.424.267.88.267 1.32" />
      </svg>
    ),
    title: 'Local Business Visibility',
    description: 'Every dollar helps us verify and list more Henderson businesses, giving them free exposure to the community.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: 'Event Coverage',
    description: 'We attend, photograph, and promote local events so the whole county knows what\'s happening.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'The Local Loop Podcast',
    description: 'Support real conversations with the people making Henderson happen — equipment, editing, and production.',
  },
]

export default function DonatePage() {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25)
  const [customAmount, setCustomAmount] = useState('')

  const activeAmount = selectedAmount ?? (customAmount ? Number(customAmount) : null)

  const handleDonate = () => {
    if (!activeAmount || activeAmount < 1) return
    // mailto fallback until payment processor is set up
    const subject = `G2K Donation — $${activeAmount} ${frequency === 'monthly' ? '/ month' : 'one-time'}`
    const body = `I'd like to donate $${activeAmount} ${frequency === 'monthly' ? 'monthly' : '(one-time)'} to support G2K Your City.\n\nPlease send me payment instructions.`
    window.location.href = `mailto:info@g2khenderson.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Support Your Community
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Help Us Put Henderson<br />on the Map
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              G2K is built by people who love this town. Your donation keeps the app free,
              supports local businesses, and helps more people discover everything Henderson has to offer.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Frequency Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setFrequency('once')}
                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                  frequency === 'once'
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setFrequency('monthly')}
                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                  frequency === 'monthly'
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Amount Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {donationTiers.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => { setSelectedAmount(tier.amount); setCustomAmount('') }}
                className={`relative rounded-xl p-5 text-center transition-all duration-200 border-2 ${
                  selectedAmount === tier.amount
                    ? 'border-gold bg-gold/5 shadow-md'
                    : 'border-gray-200 hover:border-gold/50 hover:shadow-sm'
                }`}
              >
                <p className="text-3xl font-bold text-navy">${tier.amount}</p>
                <p className={`text-xs font-semibold mt-1 ${
                  selectedAmount === tier.amount ? 'text-gold-dark' : 'text-gray-400'
                }`}>
                  {tier.label}
                </p>
                {frequency === 'monthly' && (
                  <p className="text-[10px] text-gray-400 mt-0.5">/ month</p>
                )}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-8">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
              <input
                type="number"
                min="1"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                onFocus={() => setSelectedAmount(null)}
                className="w-full pl-10 pr-4 py-4 text-xl font-semibold text-navy border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
          </div>

          {/* Tier Description */}
          {selectedAmount && (
            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-center">
              <p className="text-gray-600 text-sm">
                {donationTiers.find(t => t.amount === selectedAmount)?.description}
              </p>
            </div>
          )}

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={!activeAmount || activeAmount < 1}
            className="w-full btn-secondary text-lg py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {activeAmount
              ? `Donate $${activeAmount}${frequency === 'monthly' ? ' / month' : ''}`
              : 'Select an amount'
            }
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Secure payment processing coming soon. Clicking above will open an email to arrange your donation.
          </p>
        </div>
      </section>

      {/* What Your Donation Supports */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">Your Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Where Your Money Goes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every dollar stays local. We&apos;re a community project — not a corporation.
              Here&apos;s exactly what your support makes possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {impactItems.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 card-hover">
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center text-navy mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency / Trust */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">Our Promise</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">
                Built by Henderson,<br />for Henderson
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                G2K isn&apos;t backed by venture capital or a big tech company. It&apos;s built by people who
                live here, shop here, and care about this community&apos;s future.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '100% of donations go directly to app development and community coverage',
                  'Every business listing is verified — no pay-to-play, no favoritism',
                  'The app will always be free to download and use',
                  'Open roadmap — you can see exactly what we\'re building next',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote card */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <blockquote className="text-xl text-navy italic mb-6">
                &ldquo;I moved back to Henderson because I believe in this town. G2K is my way of making sure
                everyone else can see what I see — a community full of potential, great people, and untold stories.&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-navy font-bold mr-4">
                  S
                </div>
                <div>
                  <div className="font-semibold text-navy">Stephen Wolf</div>
                  <div className="text-gray-500 text-sm">Founder, G2K Your City</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Ready to Donate?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12">
            There are other ways to support the mission. Every bit helps.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share the Word</h3>
              <p className="text-gray-400 text-sm">
                Tell a friend about G2K. The more people who use it, the stronger our community gets.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit a Business</h3>
              <p className="text-gray-400 text-sm">
                Know a Henderson spot we&apos;re missing? Let us know and we&apos;ll get it listed.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit an Event</h3>
              <p className="text-gray-400 text-sm">
                Hosting something in Vance County? Submit it through the app and we&apos;ll spread the word.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="mailto:info@g2khenderson.com" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
