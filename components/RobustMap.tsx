'use client'

import { useEffect, useRef, useState } from 'react'

interface LayerConfig {
  url: string
  style?: (feature?: any) => any
  onEachFeature?: (feature: any, layer: any) => void
}

interface RobustMapProps {
  layers: LayerConfig[]
  className?: string
}

export default function RobustMap({ layers, className = 'h-96 w-full' }: RobustMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const layerGroupRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Only render on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !mapRef.current || mapInstanceRef.current) return

    let isActive = true

    const initializeMap = async () => {
      try {
        // Load Leaflet CSS if not already loaded
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)
        }

        // Import Leaflet
        const L = await import('leaflet')
        
        if (!isActive) return

        // Fix for default markers
        delete (L.default.Icon.Default.prototype as any)._getIconUrl
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        // Create map
        const map = L.default.map(mapRef.current!, {
          center: [47.6062, -122.3321],
          zoom: 11,
          zoomControl: true,
          attributionControl: true
        })

        if (!isActive) {
          map.remove()
          return
        }

        mapInstanceRef.current = map

        // Add tile layer
        const tileLayer = L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
          subdomains: ['a', 'b', 'c']
        })

        tileLayer.addTo(map)

        // Create layer group
        const layerGroup = L.default.layerGroup().addTo(map)
        layerGroupRef.current = layerGroup

        // Wait for map to be ready
        map.whenReady(() => {
          if (isActive) {
            setTimeout(() => {
              map.invalidateSize()
              setMapReady(true)
            }, 100)
          }
        })

      } catch (err) {
        if (isActive) {
          console.error('Map initialization failed:', err)
          setError(err instanceof Error ? err.message : 'Map initialization failed')
          setMapReady(true) // Show error state
        }
      }
    }

    initializeMap()

    return () => {
      isActive = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        layerGroupRef.current = null
        setMapReady(false)
        setError(null)
      }
    }
  }, [isMounted])

  useEffect(() => {
    if (!mapReady || !layerGroupRef.current || !layers.length) return

    const loadLayers = async () => {
      try {
        console.log('Loading layers:', layers.length)
        
        // Clear existing layers
        layerGroupRef.current.clearLayers()

        // Load layers sequentially
        for (let i = 0; i < layers.length; i++) {
          const layerConfig = layers[i]
          console.log(`Loading layer ${i + 1}/${layers.length}:`, layerConfig.url)
          
          const response = await fetch(layerConfig.url)
          if (!response.ok) {
            throw new Error(`Failed to fetch ${layerConfig.url}: ${response.status}`)
          }
          
          const geojson = await response.json()
          console.log(`Loaded ${geojson.features?.length || 0} features from ${layerConfig.url}`)

          // Import Leaflet for geoJSON
          const L = await import('leaflet')
          
          const geoJsonLayer = L.default.geoJSON(geojson, {
            style: layerConfig.style,
            onEachFeature: layerConfig.onEachFeature,
          })

          layerGroupRef.current.addLayer(geoJsonLayer)
          console.log(`Added layer ${i + 1} to map`)

          // Fit bounds for the first layer
          if (i === 0 && geoJsonLayer.getBounds && geoJsonLayer.getBounds().isValid()) {
            mapInstanceRef.current.fitBounds(geoJsonLayer.getBounds(), { 
              padding: [20, 20],
              maxZoom: 15
            })
            console.log('Fitted map bounds to data')
          }
        }
        
        console.log('All layers loaded successfully')
        
      } catch (err) {
        console.error('Layer loading failed:', err)
        setError(err instanceof Error ? err.message : 'Layer loading failed')
      }
    }

    loadLayers()
  }, [layers, mapReady])

  if (!isMounted) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} bg-red-50 flex items-center justify-center`}>
        <div className="text-red-600 text-center">
          <div className="font-semibold">Map Error</div>
          <div className="text-sm mt-1">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className={className}
        style={{ 
          minHeight: '400px',
          width: '100%'
        }} 
      />
      {!mapReady && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  )
}
