'use client'

import { useEffect, useRef, useState } from 'react'

interface LayerConfig {
  url: string
  style?: (feature?: any) => any
  onEachFeature?: (feature: any, layer: any) => void
}

interface SimpleMapProps {
  layers: LayerConfig[]
  className?: string
}

export default function SimpleMap({ layers, className = 'h-96 w-full' }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const layerGroupRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      try {
        // Import Leaflet
        const L = await import('leaflet')
        
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
          zoom: 11
        })

        // Add tiles
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map)

        // Create layer group
        const lg = L.default.layerGroup().addTo(map)
        
        mapInstanceRef.current = map
        layerGroupRef.current = lg
        setIsLoaded(true)

        // Force resize
        setTimeout(() => map.invalidateSize(), 100)

      } catch (error) {
        console.error('Map initialization error:', error)
        setIsLoaded(true) // Show error state
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        layerGroupRef.current = null
        setIsLoaded(false)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !layerGroupRef.current || !layers.length) return

    const loadLayers = async () => {
      try {
        console.log('Starting to load layers:', layers.length)
        
        // Clear existing layers
        layerGroupRef.current.clearLayers()

        // Load each layer
        for (const layerConfig of layers) {
          console.log('Loading layer:', layerConfig.url)
          
          const response = await fetch(layerConfig.url)
          console.log('Response status:', response.status)
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          
          const geojson = await response.json()
          console.log('Loaded GeoJSON features:', geojson.features?.length || 0)

          // Import Leaflet for geoJSON
          const L = await import('leaflet')
          
          const geoJsonLayer = L.default.geoJSON(geojson, {
            style: layerConfig.style,
            onEachFeature: layerConfig.onEachFeature,
          })

          layerGroupRef.current.addLayer(geoJsonLayer)
          console.log('Successfully added layer to map')
          
          // Fit bounds to show the data
          if (geoJsonLayer.getBounds && geoJsonLayer.getBounds().isValid()) {
            mapInstanceRef.current.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] })
            console.log('Fitted map bounds to data')
          }
        }
      } catch (error) {
        console.error('Layer loading error:', error)
        console.error('Error details:', {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        })
      }
    }

    loadLayers()
  }, [layers, isLoaded])

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
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  )
}
