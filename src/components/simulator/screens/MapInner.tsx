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

// Henderson center coordinates (matches iOS: 36.3300, -78.4100)
const HENDERSON_CENTER: [number, number] = [36.3300, -78.4100]

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
          width: 26px; height: 26px;
          background: ${color};
          border: 2.5px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          cursor: pointer;
        ">${cat?.emoji || '📍'}</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
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
    <div className="w-full h-full g2k-map">
      <MapContainer
        center={HENDERSON_CENTER}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
      >
        {/* CartoDB Voyager — warm tones, clean labels, closest to iOS G2K style */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <MapMarkers places={places} categories={categories} onPinTap={onPinTap} />
      </MapContainer>
    </div>
  )
}
