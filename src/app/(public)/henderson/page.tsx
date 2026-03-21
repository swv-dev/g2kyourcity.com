import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Mission from '@/components/home/Mission'
import Features from '@/components/home/Features'
import AppFeatures from '@/components/home/AppFeatures'
import Events from '@/components/home/Events'
import LocalLoopPreview from '@/components/home/LocalLoopPreview'
import Newsletter from '@/components/home/Newsletter'

export const metadata: Metadata = {
  title: 'Get to Know Henderson\u2122 | G2K Your City\u2122',
  description: 'Discover local events, hidden gems, and unique experiences in Henderson and Vance County, North Carolina. Your guide to community activities, local businesses, and everything that makes our town special.',
  alternates: {
    canonical: 'https://g2kyourcity.com/henderson',
  },
  openGraph: {
    title: 'Get to Know Henderson\u2122',
    description: 'Explore local events and unique experiences in Vance County, NC',
    url: 'https://g2kyourcity.com/henderson',
    siteName: 'G2K Your City\u2122',
    locale: 'en_US',
    type: 'website',
  },
}

export default function HendersonPage() {
  return (
    <>
      <Hero />
      <Mission />
      <Features />
      <AppFeatures />
      <Events />
      <LocalLoopPreview />
      <Newsletter />
    </>
  )
}
