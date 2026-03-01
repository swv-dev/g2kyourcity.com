'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import IPhoneFrame from './IPhoneFrame'
import TabBar from './TabBar'
import GuidedTour from './GuidedTour'
import HomeScreen from './screens/HomeScreen'
import ExploreScreen from './screens/ExploreScreen'
import PlacesScreen from './screens/PlacesScreen'
import EventsScreen from './screens/EventsScreen'
import ProfileScreen from './screens/ProfileScreen'
import PinCard from './overlays/PinCard'
import ARSpinOverlay from './overlays/ARSpinOverlay'
import { TabId, Place, TourStep, SimulatorState } from './types'

import categoriesData from '@/data/categories.json'
import placesData from '@/data/places.json'
import eventsData from '@/data/events.json'
import experiencesData from '@/data/experiences.json'
import badgesData from '@/data/badges.json'
import levelsData from '@/data/explorerLevels.json'
import rewardsData from '@/data/rewards.json'

import type { Category, Event, Experience, Badge, ExplorerLevel, Reward } from './types'

const categories = categoriesData as Category[]
const places = placesData as Place[]
const events = eventsData as Event[]
const experiences = experiencesData as Experience[]
const badges = badgesData as Badge[]
const levels = levelsData as ExplorerLevel[]
const rewards = rewardsData as Reward[]

const categoryMap = Object.fromEntries(categories.map(c => [c.id, c]))

const TOUR_STEPS: TourStep[] = [
  { id: 1, tab: 'home', title: 'Discover Henderson', description: 'Your home base for events, top-rated places, and curated experiences in Vance County.' },
  { id: 2, tab: 'explore', title: 'Explore the Map', description: 'Every pin is a real Henderson business or attraction. Tap any pin for details.' },
  { id: 3, tab: 'explore', title: 'Find a Place', description: 'Tap a pin to see ratings, descriptions, and get directions instantly.', action: 'openPin' },
  { id: 4, tab: 'events', title: 'Never Miss Events', description: 'Browse upcoming events or use the calendar to find what\'s happening any day.' },
  { id: 5, tab: 'profile', title: 'Earn Your Explorer Score', description: 'Check in at places, attend events, and earn badges as you explore Henderson.' },
  { id: 6, tab: 'explore', title: 'AR Spin to Win', description: 'Find AR emblems at local businesses, spin them, and win real rewards!', action: 'openAR' },
]

export default function SimulatorShell() {
  const [state, setState] = useState<SimulatorState>({
    activeTab: 'home',
    tourActive: true,
    tourStep: 0,
    selectedPlace: null,
    arOverlayOpen: false,
    tourCompleted: false,
  })

  const setTab = useCallback((tab: TabId) => {
    setState(s => ({ ...s, activeTab: tab, selectedPlace: null }))
  }, [])

  const selectPlace = useCallback((place: Place) => {
    setState(s => ({ ...s, selectedPlace: place }))
  }, [])

  const closePlace = useCallback(() => {
    setState(s => ({ ...s, selectedPlace: null }))
  }, [])

  const openAR = useCallback(() => {
    setState(s => ({ ...s, arOverlayOpen: true }))
  }, [])

  const closeAR = useCallback(() => {
    setState(s => ({ ...s, arOverlayOpen: false }))
  }, [])

  // Tour step advancement
  const advanceTour = useCallback(() => {
    setState(s => {
      const nextStep = s.tourStep + 1
      if (nextStep >= TOUR_STEPS.length) {
        return { ...s, tourActive: false, tourCompleted: true, arOverlayOpen: false, selectedPlace: null }
      }
      const next = TOUR_STEPS[nextStep]
      return {
        ...s,
        tourStep: nextStep,
        activeTab: next.tab,
        selectedPlace: null,
        arOverlayOpen: false,
      }
    })
  }, [])

  const skipTour = useCallback(() => {
    setState(s => ({
      ...s,
      tourActive: false,
      tourCompleted: true,
      activeTab: 'home',
      selectedPlace: null,
      arOverlayOpen: false,
    }))
  }, [])

  // Execute tour step actions after tab switch
  useEffect(() => {
    if (!state.tourActive) return
    const step = TOUR_STEPS[state.tourStep]
    if (!step) return

    const timer = setTimeout(() => {
      if (step.action === 'openPin') {
        // Auto-select a downtown place
        const demoPlace = places.find(p => p.name === "Sadie's Coffee Corner") || places[0]
        setState(s => ({ ...s, selectedPlace: demoPlace }))
      } else if (step.action === 'openAR') {
        setState(s => ({ ...s, arOverlayOpen: true }))
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [state.tourStep, state.tourActive])

  const renderScreen = () => {
    switch (state.activeTab) {
      case 'home':
        return (
          <HomeScreen
            places={places}
            categories={categories}
            events={events}
            experiences={experiences}
            onPlaceSelect={selectPlace}
          />
        )
      case 'explore':
        return (
          <ExploreScreen
            places={places}
            categories={categories}
            onPinTap={selectPlace}
            onAROpen={openAR}
          />
        )
      case 'places':
        return (
          <PlacesScreen
            places={places}
            categories={categories}
            onPlaceSelect={selectPlace}
          />
        )
      case 'events':
        return <EventsScreen events={events} categories={categories} />
      case 'profile':
        return <ProfileScreen badges={badges} levels={levels} />
    }
  }

  return (
    <IPhoneFrame>
      <div className="relative w-full h-full">
        {/* Screen content */}
        {renderScreen()}

        {/* Tab bar */}
        <TabBar
          activeTab={state.activeTab}
          onTabChange={setTab}
          disabled={state.tourActive}
        />

        {/* Pin card overlay */}
        <AnimatePresence>
          {state.selectedPlace && (
            <PinCard
              place={state.selectedPlace}
              category={categoryMap[state.selectedPlace.category]}
              onClose={closePlace}
            />
          )}
        </AnimatePresence>

        {/* AR Spin overlay */}
        <AnimatePresence>
          {state.arOverlayOpen && (
            <ARSpinOverlay rewards={rewards} onClose={closeAR} />
          )}
        </AnimatePresence>

        {/* Guided tour annotations */}
        {state.tourActive && (
          <GuidedTour
            steps={TOUR_STEPS}
            currentStep={state.tourStep}
            onNext={advanceTour}
            onSkip={skipTour}
          />
        )}

        {/* Tour completion message */}
        {state.tourCompleted && !state.tourActive && (
          <TourCompleteBanner onDismiss={() => setState(s => ({ ...s, tourCompleted: false }))} />
        )}
      </div>
    </IPhoneFrame>
  )
}

function TourCompleteBanner({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="absolute top-2 left-3 right-3 z-[999] animate-slide-up">
      <div className="bg-[#1B365D] text-white rounded-2xl p-3 text-center" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
        <p className="text-[12px] font-bold">Now it&apos;s your turn!</p>
        <p className="text-[9px] text-white/70 mt-0.5">Explore freely — tap any tab below</p>
      </div>
    </div>
  )
}
