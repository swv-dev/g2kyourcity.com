import Hero from '@/components/home/Hero'
import Mission from '@/components/home/Mission'
import Features from '@/components/home/Features'
import AppFeatures from '@/components/home/AppFeatures'
import Events from '@/components/home/Events'
import LocalLoopPreview from '@/components/home/LocalLoopPreview'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
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
