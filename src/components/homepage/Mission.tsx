export default function Mission() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
          Our Mission
        </h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Get to Know Your City&trade; is dedicated to connecting residents and visitors with the heart of every community.
          We believe that every town has stories worth telling, events worth attending, and places worth discovering.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Whether you&apos;re a lifelong local or just passing through, we&apos;re here to help you experience
          the best of your community. From festivals to community gatherings, local businesses
          to hidden outdoor spots &mdash; we&apos;re your guide to everything that makes your city special.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-navy text-lg mb-2">Discover Places</h3>
            <p className="text-gray-600 text-sm">
              Find local businesses, restaurants, parks, and attractions throughout your community.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-navy text-lg mb-2">Explore Events</h3>
            <p className="text-gray-600 text-sm">
              Stay up-to-date with festivals, markets, community gatherings, and activities year-round.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-navy text-lg mb-2">Connect Community</h3>
            <p className="text-gray-600 text-sm">
              Join a growing network of locals and visitors who love their community as much as we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
