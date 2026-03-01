'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Place, Category } from '../types'
import 'leaflet/dist/leaflet.css'

interface MapInnerProps {
  places: Place[]
  categories: Category[]
  onPinTap: (place: Place) => void
}

// Henderson center coordinates
const HENDERSON_CENTER: [number, number] = [36.3295, -78.3990]

function MapMarkers({ places, categories, onPinTap }: MapInnerProps) {
  const map = useMap()

  useEffect(() => {
    const catMap = Object.fromEntries(categories.map(c => [c.id, c]))

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer)
    })

    places.forEach((place) => {
      if (place.lat === 0 && place.lng === 0) return
      const cat = catMap[place.category]
      const color = cat?.colorHex || '#6366F1'

      const icon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="
          width: 22px; height: 22px;
          background: ${color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
        ">${cat?.emoji || '📍'}</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })

      L.marker([place.lat, place.lng], { icon })
        .addTo(map)
        .on('click', () => onPinTap(place))
    })
  }, [map, places, categories, onPinTap])

  return null
}

export default function MapInner({ places, categories, onPinTap }: MapInnerProps) {
  return (
    <MapContainer
      center={HENDERSON_CENTER}
      zoom={13}
      className="w-full h-full"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapMarkers places={places} categories={categories} onPinTap={onPinTap} />
    </MapContainer>
  )
}
