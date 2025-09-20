'use client'

import { useEffect, useRef, useState } from 'react'

interface LayerConfig {
  url: string
  style?: (feature?: any) => any
  onEachFeature?: (feature: any, layer: any) => void
}

interface DebugMapProps {
  layers: LayerConfig[]
  className?: string
}

export default function DebugMap({ layers, className = 'h-96 w-full' }: DebugMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  const addDebugInfo = (message: string) => {
    console.log(message)
    setDebugInfo(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    setIsMounted(true)
    addDebugInfo('Component mounted')
  }, [])

  useEffect(() => {
    if (!isMounted || !mapRef.current) return

    addDebugInfo('Starting map initialization')
    
    let mapInstance: any = null
    let layerGroup: any = null

    const initMap = async () => {
      try {
        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)
          addDebugInfo('Added Leaflet CSS')
        }

        // Import Leaflet
        const L = await import('leaflet')
        addDebugInfo('Leaflet imported successfully')

        // Fix for default markers
        delete (L.default.Icon.Default.prototype as any)._getIconUrl
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })
        addDebugInfo('Fixed Leaflet icons')

        // Create map
        mapInstance = L.default.map(mapRef.current!, {
          center: [47.6062, -122.3321],
          zoom: 11
        })
        addDebugInfo('Map created')

        // Add tiles
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(mapInstance)
        addDebugInfo('Tiles added')

        // Create layer group
        layerGroup = L.default.layerGroup().addTo(mapInstance)
        addDebugInfo('Layer group created')

        // Load layers
        for (const layerConfig of layers) {
          addDebugInfo(`Loading layer: ${layerConfig.url}`)
          
          const response = await fetch(layerConfig.url)
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }
          
          const geojson = await response.json()
          addDebugInfo(`Loaded ${geojson.features?.length || 0} features`)

          const geoJsonLayer = L.default.geoJSON(geojson, {
            style: layerConfig.style,
            onEachFeature: layerConfig.onEachFeature,
          })

          layerGroup.addLayer(geoJsonLayer)
          addDebugInfo('Layer added to map')

          // Fit bounds
          if (geoJsonLayer.getBounds && geoJsonLayer.getBounds().isValid()) {
            mapInstance.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] })
            addDebugInfo('Map bounds fitted')
          }
        }

        addDebugInfo('Map initialization complete')

      } catch (error) {
        addDebugInfo(`Error: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    initMap()

    return () => {
      if (mapInstance) {
        mapInstance.remove()
        addDebugInfo('Map cleaned up')
      }
    }
  }, [isMounted, layers])

  if (!isMounted) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Information:</h3>
        <div className="text-sm space-y-1">
          {debugInfo.map((info, index) => (
            <div key={index} className="text-gray-600">{info}</div>
          ))}
        </div>
      </div>
      <div 
        ref={mapRef} 
        className={className}
        style={{ 
          minHeight: '400px',
          width: '100%'
        }} 
      />
    </div>
  )
}
