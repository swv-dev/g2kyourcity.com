export interface Category {
  id: string
  name: string
  emoji: string
  colorHex: string
}

export interface Place {
  id: number
  name: string
  category: string
  address: string
  lat: number
  lng: number
  rating: number
  priceLevel: 'free' | 'budget' | 'moderate' | 'upscale'
  description: string
  shortDescription?: string
  isFeatured?: boolean
}

export interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  price: string
  isFree: boolean
}

export interface ExperienceStop {
  placeId: number
  name: string
  note: string
}

export interface Experience {
  id: number
  name: string
  description: string
  duration: string
  stops: ExperienceStop[]
  emoji: string
}

export interface Badge {
  id: number
  name: string
  emoji: string
  icon: string
  colorHex: string
  description: string
  requirement: number
  earned: boolean
}

export interface ExplorerLevel {
  level: number
  name: string
  emoji: string
  icon: string
  colorHex: string
  minScore: number
  maxScore: number
}

export interface Reward {
  id: number
  text: string
  emoji: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
}

export type TabId = 'home' | 'explore' | 'places' | 'events' | 'profile'

export interface TourStep {
  id: number
  tab: TabId
  title: string
  description: string
  action?: 'openPin' | 'openAR'
}

export interface SimulatorState {
  activeTab: TabId
  tourActive: boolean
  tourStep: number
  selectedPlace: Place | null
  arOverlayOpen: boolean
  tourCompleted: boolean
}
