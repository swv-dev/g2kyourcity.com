import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Get 2 Know Henderson | Explore Vance County, NC',
  description: 'Discover local events, hidden gems, and unique experiences in Henderson and Vance County, North Carolina. Your guide to community activities, local businesses, and everything that makes our town special.',
  keywords: 'Henderson NC, Vance County, local events, things to do, tourism, community, North Carolina',
  openGraph: {
    title: 'Get 2 Know Henderson',
    description: 'Explore local events and unique experiences in Vance County, NC',
    url: 'https://g2khenderson.com',
    siteName: 'Get 2 Know Henderson',
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
