import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'G2K Your City | Get to Know Your City',
  description: 'Discover local events, hidden gems, and unique experiences in your community. One app, every city.',
  keywords: 'local events, things to do, tourism, community, North Carolina, Henderson, Vance County',
  openGraph: {
    title: 'G2K Your City',
    description: 'Discover local events, hidden gems, and unique experiences in your community.',
    url: 'https://g2kyourcity.com',
    siteName: 'G2K Your City',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
