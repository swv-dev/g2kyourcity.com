import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | G2K Your City\u2122',
  description:
    'Get in touch with the G2K\u2122 team. Questions, partnerships, sponsorships, or just want to say hello.',
  openGraph: {
    title: 'Contact G2K Your City\u2122',
    description: 'Reach out to the G2K team in Henderson, NC.',
    url: 'https://g2kyourcity.com/contact',
  },
}

const contactMethods = [
  {
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    label: 'Email',
    value: 'info@g2kyourcity.com',
    href: 'mailto:info@g2kyourcity.com',
    description: 'For general inquiries, partnerships, and support.',
  },
  {
    icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    label: 'Office',
    value: '100 South Garnett Street\nHenderson, NC 27536',
    href: 'https://maps.google.com/?q=100+South+Garnett+Street+Henderson+NC+27536',
    description: 'Come say hello — we\'re downtown.',
  },
  {
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Hours',
    value: 'Monday — Friday\n9:00 AM — 5:00 PM',
    href: null,
    description: 'We typically respond within 24 hours.',
  },
]

const quickLinks = [
  {
    title: 'Want to advertise?',
    description: 'Learn about sponsorship tiers, AR emblems, and deals for your business.',
    href: '/advertise',
    cta: 'View Sponsorships',
  },
  {
    title: 'Want to submit an event?',
    description: 'Share what\'s happening in Henderson with the community.',
    href: '/submit',
    cta: 'Submit Event',
  },
  {
    title: 'Want to get involved?',
    description: 'Apply for an account and start contributing to G2K.',
    href: '/community',
    cta: 'Learn More',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a question, idea, or just want to talk about Henderson?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <div
                key={method.label}
                className="bg-gray-50 rounded-2xl p-8 text-center card-hover"
              >
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center text-navy mx-auto mb-5">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={method.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {method.label}
                </h3>
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-navy font-medium hover:text-gold transition-colors whitespace-pre-line"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">
                    {method.value}
                  </p>
                )}
                <p className="text-gray-500 text-sm mt-2">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">
            Looking for Something Specific?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <div
                key={link.title}
                className="bg-white rounded-xl p-6 card-hover"
              >
                <h3 className="font-semibold text-navy mb-2">{link.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {link.description}
                </p>
                <Link
                  href={link.href}
                  className="text-navy font-medium text-sm hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  {link.cta}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Follow Along</h2>
          <p className="text-gray-300 mb-8">
            Stay connected with G2K on social media.
          </p>
          <div className="flex justify-center gap-6">
            {[
              { href: 'https://facebook.com/g2khenderson', label: 'Facebook', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
              { href: 'https://instagram.com/g2khenderson', label: 'Instagram', path: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z' },
              { href: 'https://youtube.com/@g2khenderson', label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label={social.label}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
