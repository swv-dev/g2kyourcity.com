export default function AppFeatures() {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            More Than Just an App
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Get to Know Your City&trade; combines cutting-edge technology with local discovery
            to create an experience unlike any other.
          </p>
        </div>

        {/* AR Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Augmented Reality
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              See Your City Like Never Before
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>AR Navigation</strong> — Point your phone and get turn-by-turn directions overlaid on the real world</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Historical Markers</strong> — View historical information about landmarks through your camera</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Interactive Discovery</strong> — Scan locations to unlock hidden content, stories, and special offers</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 text-center">
            <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-300">Experience your city through augmented reality on your iPhone</p>
          </div>
        </div>

        {/* Badges & Points */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1 bg-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-4">
              {['Explorer', 'Foodie', 'History Buff', 'Event Goer', 'Local Hero', 'Adventurer'].map((badge) => (
                <div key={badge} className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-300">{badge}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Rewards System
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Earn Badges, Score Points, Get Perks
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Check In</strong> — Earn points every time you visit a local business or attend an event</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Collect Badges</strong> — Unlock achievements for exploring different categories and locations</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Redeem Perks</strong> — Use your points for discounts, freebies, and exclusive access at participating businesses</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Leaderboards</strong> — Compete with friends and other locals to become the ultimate city explorer</span>
              </li>
            </ul>
          </div>
        </div>

        {/* For Businesses & Government */}
        <div className="bg-white/5 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              For Businesses &amp; Local Government
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Partner with Get to Know Your City&trade; to reach engaged locals and visitors through powerful location-based tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Geofencing</h4>
              <p className="text-gray-400 text-sm">
                Trigger notifications, offers, and content when users enter your location or area. Perfect for events, sales, and special promotions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Analytics</h4>
              <p className="text-gray-400 text-sm">
                Understand foot traffic, visitor demographics, and engagement patterns. Make data-driven decisions for your business or community programs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Targeted Advertising</h4>
              <p className="text-gray-400 text-sm">
                Reach users based on their interests, location history, and app activity. Promote your business to the people most likely to visit.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="mailto:info@g2kyourcity.com" className="btn-secondary">
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
