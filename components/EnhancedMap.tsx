'use client'

import { useEffect, useRef, useState } from 'react'

interface LayerConfig {
  url: string
  style?: (feature?: any) => any
  onEachFeature?: (feature: any, layer: any) => void
}

interface EnhancedMapProps {
  layers: LayerConfig[]
  className?: string
  showWalkingBuffers?: boolean
}

export default function EnhancedMap({ layers, className = 'h-96 w-full', showWalkingBuffers = false }: EnhancedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const layerGroupRef = useRef<any>(null)
  const bufferGroupRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [mapReady, setMapReady] = useState(false)

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

        // Create custom icons that reflect both grocery and pharmacy functions
        const hubIcon = L.default.divIcon({
          className: 'custom-hub-icon',
          html: `
            <div style="position: relative; width: 24px; height: 24px;">
              <div style="background: #8b5cf6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                <div style="color: white; font-size: 12px; font-weight: bold;">H</div>
              </div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })

        const cornerIcon = L.default.divIcon({
          className: 'custom-corner-icon',
          html: `
            <div style="position: relative; width: 20px; height: 20px;">
              <div style="background: #06b6d4; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                <div style="color: white; font-size: 10px; font-weight: bold;">G+P</div>
              </div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
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

        // Create layer groups
        const layerGroup = L.default.layerGroup().addTo(map)
        const bufferGroup = L.default.layerGroup().addTo(map)
        
        layerGroupRef.current = layerGroup
        bufferGroupRef.current = bufferGroup

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
        console.error('Map initialization failed:', err)
        setMapReady(true)
      }
    }

    initializeMap()

    return () => {
      isActive = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        layerGroupRef.current = null
        bufferGroupRef.current = null
        setMapReady(false)
      }
    }
  }, [isMounted])

  useEffect(() => {
    if (!mapReady || !layerGroupRef.current || !layers.length) return

    const loadLayers = async () => {
      try {
        // Clear existing layers
        layerGroupRef.current.clearLayers()
        if (bufferGroupRef.current) {
          bufferGroupRef.current.clearLayers()
        }

        // Load layers sequentially
        for (let i = 0; i < layers.length; i++) {
          const layerConfig = layers[i]
          
          const response = await fetch(layerConfig.url)
          if (!response.ok) {
            throw new Error(`Failed to fetch ${layerConfig.url}: ${response.status}`)
          }
          
          const geojson = await response.json()

          // Import Leaflet for geoJSON
          const L = await import('leaflet')
          
          const geoJsonLayer = L.default.geoJSON(geojson, {
            style: layerConfig.style,
            onEachFeature: layerConfig.onEachFeature,
            pointToLayer: (feature: any, latlng: any) => {
              // Use custom icons for points that reflect both grocery and pharmacy functions
              if (feature.properties.site_type === 'hub') {
                return L.default.marker(latlng, { icon: L.default.divIcon({
                  className: 'custom-hub-icon',
                  html: `
                    <div style="position: relative; width: 24px; height: 24px;">
                      <div style="background: #8b5cf6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                        <div style="color: white; font-size: 12px; font-weight: bold;">H</div>
                      </div>
                    </div>
                  `,
                  iconSize: [24, 24],
                  iconAnchor: [12, 12]
                })})
              } else if (feature.properties.site_type === 'corner_store_pharmacy') {
                return L.default.marker(latlng, { icon: L.default.divIcon({
                  className: 'custom-corner-icon',
                  html: `
                    <div style="position: relative; width: 20px; height: 20px;">
                      <div style="background: #06b6d4; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                        <div style="color: white; font-size: 10px; font-weight: bold;">G+P</div>
                      </div>
                    </div>
                  `,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                })})
              }
              return L.default.marker(latlng)
            }
          })

          layerGroupRef.current.addLayer(geoJsonLayer)

          // Fit bounds for the first layer
          if (i === 0 && geoJsonLayer.getBounds && geoJsonLayer.getBounds().isValid()) {
            mapInstanceRef.current.fitBounds(geoJsonLayer.getBounds(), { 
              padding: [20, 20],
              maxZoom: 15
            })
          }
        }

        // Load walking buffers if enabled
        if (showWalkingBuffers) {
          const bufferResponse = await fetch('/data/walking_buffers.geojson')
          if (bufferResponse.ok) {
            const bufferData = await bufferResponse.json()
            const L = await import('leaflet')
            
            const bufferLayer = L.default.geoJSON(bufferData, {
              style: (feature: any) => ({
                fillColor: feature.properties.distance === 0.25 ? '#22c55e' :
                          feature.properties.distance === 0.5 ? '#f59e0b' : '#ef4444',
                fillOpacity: 0.2,
                color: feature.properties.distance === 0.25 ? '#22c55e' :
                       feature.properties.distance === 0.5 ? '#f59e0b' : '#ef4444',
                weight: 2,
                opacity: 0.6
              }),
              onEachFeature: (feature: any, layer: any) => {
                const props = feature.properties
                layer.bindPopup(`
                  <div class="p-2">
                    <h3 class="font-semibold">${props.site_name}</h3>
                    <p><strong>Walking Distance:</strong> ${props.distance} mile${props.distance !== 1 ? 's' : ''}</p>
                    <p class="text-sm text-gray-600">Coverage area from this hub</p>
                  </div>
                `)
              }
            })

            bufferGroupRef.current.addLayer(bufferLayer)
          }
        }
        
      } catch (err) {
        console.error('Layer loading failed:', err)
      }
    }

    loadLayers()
  }, [layers, mapReady, showWalkingBuffers])

  if (!isMounted) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500">Loading...</div>
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
