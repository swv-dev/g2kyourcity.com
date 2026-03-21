const counties = [
  { county: 'Vance County', city: 'Henderson', active: true },
  { county: 'Granville County', city: 'Oxford', active: false },
  { county: 'Warren County', city: 'Warrenton', active: false },
  { county: 'Franklin County', city: 'Franklinton', active: false },
  { county: 'Person County', city: 'Roxboro', active: false },
]

export default function CoverageArea() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Where We Are
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            One app that auto-detects your city and serves up hyper-local content.
            We&apos;re starting in North Carolina&apos;s Kerr-Tar region and growing from there.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {counties.map((item) => (
            <div
              key={item.county}
              className={`rounded-xl p-6 text-center transition-shadow ${
                item.active
                  ? 'bg-navy text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  item.active ? 'bg-gold/20' : 'bg-gray-100'
                }`}
              >
                <svg
                  className={`w-6 h-6 ${item.active ? 'text-gold' : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3
                className={`font-semibold text-lg mb-1 ${
                  item.active ? 'text-white' : 'text-navy'
                }`}
              >
                {item.city}
              </h3>
              <p
                className={`text-sm ${
                  item.active ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {item.county}
              </p>
              {item.active ? (
                <span className="inline-block mt-3 text-xs font-medium bg-gold/20 text-gold px-3 py-1 rounded-full">
                  Live Now
                </span>
              ) : (
                <span className="inline-block mt-3 text-xs font-medium bg-gray-100 text-gray-400 px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center bg-white rounded-xl p-8 border-2 border-dashed border-gold/40">
          <svg className="w-10 h-10 text-gold mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-semibold text-navy text-lg mb-2">
            Expanding Across North Carolina
          </h3>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Every community deserves to be known. We&apos;re building city-by-city so each place gets the attention it deserves &mdash; not a one-size-fits-all directory.
          </p>
        </div>
      </div>
    </section>
  )
}
