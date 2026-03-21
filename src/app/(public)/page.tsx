import type { Metadata } from 'next'
import Hero from '@/components/homepage/Hero'
import Mission from '@/components/homepage/Mission'
import CoverageArea from '@/components/homepage/CoverageArea'
import Features from '@/components/homepage/Features'
import AppFeatures from '@/components/homepage/AppFeatures'
import Newsletter from '@/components/home/Newsletter'

export const metadata: Metadata = {
  title: 'G2K Your City™ | Discover Your Community',
  description: 'Discover local events, hidden gems, and unique experiences in your community. One app, every city. Starting in North Carolina.',
  openGraph: {
    title: 'G2K Your City™',
    description: 'Discover local events, hidden gems, and unique experiences in your community.',
    url: 'https://g2kyourcity.com',
    siteName: 'G2K Your City™',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <CoverageArea />
      <Features />
      <AppFeatures />
      <Newsletter description="Be the first to know when we launch in new cities. Get updates on features, events, and community stories across North Carolina." />
    </>
  )
}
