'use client'

import { useEffect, useRef, useState } from 'react'

interface LayerConfig {
  url: string
  style?: (feature?: any) => any
  onEachFeature?: (feature: any, layer: any) => void
}

interface MapLeafletProps {
  layers: LayerConfig[]
  className?: string
}

export default function MapLeaflet({ layers, className = 'h-96 w-full' }: MapLeafletProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const layerGroupRef = useRef<any>(null)
  const [isClient, setIsClient] = useState(false)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return

    let mounted = true

    const initMap = async () => {
      try {
        // Dynamic import of Leaflet
        const L = await import('leaflet')
        
        if (!mounted) return

        // Fix for default markers in Next.js
        delete (L.default.Icon.Default.prototype as any)._getIconUrl
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        // Initialize map
        const map = L.default.map(mapRef.current!, {
          center: [47.6062, -122.3321],
          zoom: 11,
          zoomControl: true,
          attributionControl: true,
          preferCanvas: false
        })
        
        if (!mounted) {
          map.remove()
          return
        }
        
        mapInstanceRef.current = map

        // Add tile layer
        const tileLayer = L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
          subdomains: ['a', 'b', 'c'],
          crossOrigin: true
        })
        
        tileLayer.addTo(map)

        // Create layer group
        const layerGroup = L.default.layerGroup().addTo(map)
        layerGroupRef.current = layerGroup

        // Wait for tiles to load
        tileLayer.on('load', () => {
          if (mounted) {
            setTimeout(() => {
              map.invalidateSize()
              setMapReady(true)
            }, 200)
          }
        })

        // Fallback if load event doesn't fire
        setTimeout(() => {
          if (mounted && !mapReady) {
            map.invalidateSize()
            setMapReady(true)
          }
        }, 1000)

      } catch (error) {
        console.error('Failed to initialize map:', error)
        if (mounted) {
          setMapReady(true) // Show error state
        }
      }
    }

    initMap()

    return () => {
      mounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        layerGroupRef.current = null
        setMapReady(false)
      }
    }
  }, [isClient])

  useEffect(() => {
    if (!isClient || !layerGroupRef.current || !mapReady) return

    const loadLayers = async () => {
      // Clear existing layers
      layerGroupRef.current.clearLayers()

      // Load each layer
      for (const layerConfig of layers) {
        try {
          const response = await fetch(layerConfig.url)
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          
          const geojson = await response.json()
          
          // Import Leaflet for geoJSON
          const L = await import('leaflet')
          
          const geoJsonLayer = L.default.geoJSON(geojson, {
            style: layerConfig.style,
            onEachFeature: layerConfig.onEachFeature,
          })

          layerGroupRef.current?.addLayer(geoJsonLayer)
          
          // Fit bounds if this is the first layer
          if (layers.indexOf(layerConfig) === 0 && geoJsonLayer.getBounds && geoJsonLayer.getBounds().isValid()) {
            mapInstanceRef.current?.fitBounds(geoJsonLayer.getBounds(), { 
              padding: [20, 20],
              maxZoom: 15
            })
          }
          
        } catch (error) {
          console.error(`Failed to load layer from ${layerConfig.url}:`, error)
        }
      }
    }

    loadLayers()
  }, [layers, isClient, mapReady])

  if (!isClient) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500">Loading map...</div>
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
          width: '100%',
          height: '100%'
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
