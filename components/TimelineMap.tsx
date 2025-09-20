'use client'

import { useEffect, useRef, useState } from 'react'

interface LocationData {
  id: string
  name: string
  type: 'grocery' | 'pharmacy' | 'grocery_pharmacy'
  lat: number
  lng: number
  year: number
  population_served: number
  transit_routes?: string[]
}

interface PopulationDensityData {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    properties: {
      population: number
      area_sq_miles: number
      density_per_sq_mile: number
      has_grocery: boolean
      has_pharmacy: boolean
      distance_to_nearest_grocery: number
      distance_to_nearest_pharmacy: number
    }
    geometry: {
      type: 'Polygon'
      coordinates: number[][][]
    }
  }>
}

interface TimelineMapProps {
  className?: string
}

export default function TimelineMap({ className = 'h-96 w-full' }: TimelineMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const layerGroupRef = useRef<any>(null)
  const populationGroupRef = useRef<any>(null)
  const transitGroupRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [currentYear, setCurrentYear] = useState(2015)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [showTransit, setShowTransit] = useState(false)

  // Mock data for demonstration
  const mockLocations: LocationData[] = [
    // 2015 locations
    { id: '1', name: 'Safeway Capitol Hill', type: 'grocery', lat: 47.6205, lng: -122.3214, year: 2015, population_served: 15000, transit_routes: ['Route 10', 'Route 49'] },
    { id: '2', name: 'Bartell Drugs Broadway', type: 'pharmacy', lat: 47.6195, lng: -122.3204, year: 2015, population_served: 12000, transit_routes: ['Route 10', 'Route 11'] },
    { id: '3', name: 'QFC Ballard', type: 'grocery', lat: 47.6689, lng: -122.3769, year: 2015, population_served: 18000, transit_routes: ['Route 40', 'Route 44'] },
    { id: '4', name: 'CVS Ballard', type: 'pharmacy', lat: 47.6699, lng: -122.3779, year: 2015, population_served: 14000, transit_routes: ['Route 40'] },
    { id: '5', name: 'Whole Foods West Seattle', type: 'grocery', lat: 47.5623, lng: -122.3871, year: 2015, population_served: 16000, transit_routes: ['Route 50', 'Route 21'] },
    { id: '6', name: 'Rite Aid West Seattle', type: 'pharmacy', lat: 47.5633, lng: -122.3881, year: 2015, population_served: 13000, transit_routes: ['Route 50'] },
    { id: '7', name: 'Kroger Beacon Hill', type: 'grocery', lat: 47.5804, lng: -122.3104, year: 2015, population_served: 14000, transit_routes: ['Route 36', 'Route 60'] },
    { id: '8', name: 'Walgreens Rainier Valley', type: 'pharmacy', lat: 47.5134, lng: -122.2654, year: 2015, population_served: 12000, transit_routes: ['Route 7', 'Route 106'] },
    
    // 2025 locations (some closures, some new)
    { id: '9', name: 'Safeway Capitol Hill', type: 'grocery', lat: 47.6205, lng: -122.3214, year: 2025, population_served: 15000, transit_routes: ['Route 10', 'Route 49'] },
    { id: '10', name: 'Central District Grocery-Pharmacy', type: 'grocery_pharmacy', lat: 47.6195, lng: -122.3204, year: 2025, population_served: 20000, transit_routes: ['Route 10', 'Route 11'] },
    { id: '11', name: 'QFC Ballard', type: 'grocery', lat: 47.6689, lng: -122.3769, year: 2025, population_served: 18000, transit_routes: ['Route 40', 'Route 44'] },
    { id: '12', name: 'Ballard Grocery-Pharmacy', type: 'grocery_pharmacy', lat: 47.6699, lng: -122.3779, year: 2025, population_served: 19000, transit_routes: ['Route 40'] },
    { id: '13', name: 'Whole Foods West Seattle', type: 'grocery', lat: 47.5623, lng: -122.3871, year: 2025, population_served: 16000, transit_routes: ['Route 50', 'Route 21'] },
    { id: '14', name: 'West Seattle Grocery-Pharmacy', type: 'grocery_pharmacy', lat: 47.5633, lng: -122.3881, year: 2025, population_served: 18000, transit_routes: ['Route 50'] },
    { id: '15', name: 'Beacon Hill Grocery-Pharmacy', type: 'grocery_pharmacy', lat: 47.5804, lng: -122.3104, year: 2025, population_served: 17000, transit_routes: ['Route 36', 'Route 60'] },
    { id: '16', name: 'Rainier Beach Grocery-Pharmacy', type: 'grocery_pharmacy', lat: 47.5134, lng: -122.2654, year: 2025, population_served: 15000, transit_routes: ['Route 7', 'Route 106'] },
    { id: '17', name: 'Fremont Grocery-Pharmacy', type: 'grocery_pharmacy', lat: 47.6512, lng: -122.3507, year: 2025, population_served: 16000, transit_routes: ['Route 31', 'Route 32'] },
  ]

  // Create dynamic population data based on current year with housing density changes
  const getPopulationData = (): PopulationDensityData => {
    // Calculate housing density changes over time (more development in 2025)
    const densityMultiplier = 1 + ((currentYear - 2015) / 10) * 0.3 // 30% increase over 10 years
    
    return {
      type: 'FeatureCollection',
      features: [
        // Capitol Hill - high density, always well served
        {
          type: 'Feature',
          properties: {
            population: Math.round(8500 * densityMultiplier),
            area_sq_miles: 0.8,
            density_per_sq_mile: Math.round(10625 * densityMultiplier),
            has_grocery: true,
            has_pharmacy: true,
            distance_to_nearest_grocery: 0.3,
            distance_to_nearest_pharmacy: 0.2
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[47.62, -122.33], [47.63, -122.33], [47.63, -122.32], [47.62, -122.32], [47.62, -122.33]]]
          }
        },
        // Ballard - high density, always well served
        {
          type: 'Feature',
          properties: {
            population: Math.round(12000 * densityMultiplier),
            area_sq_miles: 1.2,
            density_per_sq_mile: Math.round(10000 * densityMultiplier),
            has_grocery: true,
            has_pharmacy: true,
            distance_to_nearest_grocery: 0.4,
            distance_to_nearest_pharmacy: 0.3
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[47.67, -122.38], [47.68, -122.38], [47.68, -122.37], [47.67, -122.37], [47.67, -122.38]]]
          }
        },
        // West Seattle - medium density, always well served
        {
          type: 'Feature',
          properties: {
            population: Math.round(9500 * densityMultiplier),
            area_sq_miles: 1.5,
            density_per_sq_mile: Math.round(6333 * densityMultiplier),
            has_grocery: true,
            has_pharmacy: true,
            distance_to_nearest_grocery: 0.5,
            distance_to_nearest_pharmacy: 0.4
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[47.56, -122.39], [47.57, -122.39], [47.57, -122.38], [47.56, -122.38], [47.56, -122.39]]]
          }
        },
        // Beacon Hill - growing density, underserved in 2015, served in 2025
        {
          type: 'Feature',
          properties: {
            population: Math.round(11000 * densityMultiplier),
            area_sq_miles: 1.1,
            density_per_sq_mile: Math.round(10000 * densityMultiplier),
            has_grocery: currentYear >= 2025,
            has_pharmacy: currentYear >= 2025,
            distance_to_nearest_grocery: currentYear >= 2025 ? 0.3 : 1.2,
            distance_to_nearest_pharmacy: currentYear >= 2025 ? 0.3 : 1.3
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[47.58, -122.31], [47.59, -122.31], [47.59, -122.30], [47.58, -122.30], [47.58, -122.31]]]
          }
        },
        // Rainier Valley - high density growth, underserved in 2015, served in 2025
        {
          type: 'Feature',
          properties: {
            population: Math.round(13500 * densityMultiplier),
            area_sq_miles: 1.3,
            density_per_sq_mile: Math.round(10385 * densityMultiplier),
            has_grocery: currentYear >= 2025,
            has_pharmacy: currentYear >= 2025,
            distance_to_nearest_grocery: currentYear >= 2025 ? 0.4 : 1.4,
            distance_to_nearest_pharmacy: currentYear >= 2025 ? 0.4 : 1.5
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[47.51, -122.27], [47.52, -122.27], [47.52, -122.26], [47.51, -122.26], [47.51, -122.27]]]
          }
        },
        // Fremont - rapid density growth, underserved in 2015, served in 2025
        {
          type: 'Feature',
          properties: {
            population: Math.round(8000 * densityMultiplier),
            area_sq_miles: 0.9,
            density_per_sq_mile: Math.round(8889 * densityMultiplier),
            has_grocery: currentYear >= 2025,
            has_pharmacy: currentYear >= 2025,
            distance_to_nearest_grocery: currentYear >= 2025 ? 0.2 : 1.1,
            distance_to_nearest_pharmacy: currentYear >= 2025 ? 0.2 : 1.2
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[47.65, -122.35], [47.66, -122.35], [47.66, -122.34], [47.65, -122.34], [47.65, -122.35]]]
          }
        },
        // Central District - highest density growth, underserved in 2015, served in 2025
        {
          type: 'Feature',
          properties: {
            population: Math.round(12500 * densityMultiplier),
            area_sq_miles: 1.0,
            density_per_sq_mile: Math.round(12500 * densityMultiplier),
            has_grocery: currentYear >= 2025,
            has_pharmacy: currentYear >= 2025,
            distance_to_nearest_grocery: currentYear >= 2025 ? 0.1 : 1.3,
            distance_to_nearest_pharmacy: currentYear >= 2025 ? 0.1 : 1.4
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[47.61, -122.32], [47.62, -122.32], [47.62, -122.31], [47.61, -122.31], [47.61, -122.32]]]
          }
        }
      ]
    }
  }

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

        // Create layer groups
        const layerGroup = L.default.layerGroup().addTo(map)
        const populationGroup = L.default.layerGroup().addTo(map)
        const transitGroup = L.default.layerGroup().addTo(map)
        
        layerGroupRef.current = layerGroup
        populationGroupRef.current = populationGroup
        transitGroupRef.current = transitGroup

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
        populationGroupRef.current = null
        transitGroupRef.current = null
        setMapReady(false)
      }
    }
  }, [isMounted])

  useEffect(() => {
    if (!mapReady || !layerGroupRef.current) return

    const updateMapData = async () => {
      try {
        // Clear existing layers
        layerGroupRef.current.clearLayers()
        transitGroupRef.current.clearLayers()

        // Import Leaflet
        const L = await import('leaflet')

        // Filter locations by current year
        const yearLocations = mockLocations.filter(loc => loc.year === currentYear)
        console.log(`Year ${currentYear}: Found ${yearLocations.length} locations`, yearLocations)

        // Add location markers
        yearLocations.forEach(location => {
          let iconColor = '#3b82f6' // blue for grocery
          let iconText = 'G'
          
          if (location.type === 'pharmacy') {
            iconColor = '#ef4444' // red for pharmacy
            iconText = 'P'
          } else if (location.type === 'grocery_pharmacy') {
            iconColor = '#10b981' // green for combined
            iconText = 'G+P'
          }

          const icon = L.default.divIcon({
            className: 'custom-location-icon',
            html: `
              <div style="
                position: relative; 
                width: 30px; 
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  background: ${iconColor}; 
                  width: 30px; 
                  height: 30px; 
                  border-radius: 50%; 
                  border: 3px solid white; 
                  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 1000;
                ">
                  <span style="
                    color: white; 
                    font-size: 14px; 
                    font-weight: bold;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                  ">${iconText}</span>
                </div>
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })

          const marker = L.default.marker([location.lat, location.lng], { icon })
          
          marker.bindPopup(`
            <div class="p-3">
              <h3 class="font-semibold text-lg mb-2">${location.name}</h3>
              <p class="mb-1"><strong>Type:</strong> ${location.type.replace('_', ' ').toUpperCase()}</p>
              <p class="mb-1"><strong>Population Served:</strong> ${location.population_served.toLocaleString()}</p>
              <p class="mb-1"><strong>Year:</strong> ${location.year}</p>
              ${location.transit_routes ? `
                <p class="mb-1"><strong>Transit Routes:</strong> ${location.transit_routes.join(', ')}</p>
              ` : ''}
              <button onclick="window.showTransitRoutes('${location.id}')" class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                Show Transit Routes
              </button>
            </div>
          `)

          marker.on('click', () => {
            setSelectedLocation(location)
            setShowTransit(true)
          })

          layerGroupRef.current.addLayer(marker)
        })

        // Add population density overlay
        const populationData = getPopulationData()
        console.log(`Population data for year ${currentYear}:`, populationData.features.map(f => ({
          area: f.properties.population > 10000 ? 'Large' : 'Small',
          has_grocery: f.properties.has_grocery,
          has_pharmacy: f.properties.has_pharmacy,
          distance_grocery: f.properties.distance_to_nearest_grocery,
          distance_pharmacy: f.properties.distance_to_nearest_pharmacy,
          underserved: f.properties.distance_to_nearest_grocery > 1 || f.properties.distance_to_nearest_pharmacy > 1
        })))
        
        const populationLayer = L.default.geoJSON(populationData, {
          style: (feature: any) => {
            const props = feature.properties
            const isUnderserved = props.distance_to_nearest_grocery > 1 || props.distance_to_nearest_pharmacy > 1
            
            let color = '#ef4444' // red default
            if (props.has_grocery && props.has_pharmacy) {
              color = '#22c55e' // green
            } else if (props.has_grocery || props.has_pharmacy) {
              color = '#f59e0b' // amber
            }
            
            console.log(`Area styling: underserved=${isUnderserved}, color=${color}, grocery=${props.has_grocery}, pharmacy=${props.has_pharmacy}`)
            
            return {
              fillColor: color,
              fillOpacity: 0.6,
              color: isUnderserved ? '#dc2626' : 'white',
              weight: 3,
              opacity: 1.0
            }
          },
          onEachFeature: (feature: any, layer: any) => {
            const props = feature.properties
            const isUnderserved = props.distance_to_nearest_grocery > 1 || props.distance_to_nearest_pharmacy > 1
            
            layer.bindPopup(`
              <div class="p-3">
                <h3 class="font-semibold text-lg mb-2">Housing Density Analysis</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm"><strong>Population:</strong></span>
                    <span class="text-sm">${props.population.toLocaleString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm"><strong>Density:</strong></span>
                    <span class="text-sm">${props.density_per_sq_mile.toLocaleString()} per sq mi</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm"><strong>Year:</strong></span>
                    <span class="text-sm">${currentYear}</span>
                  </div>
                  <div class="border-t pt-2 mt-2">
                    <p class="text-sm mb-1"><strong>Service Access:</strong></p>
                    <div class="flex justify-between text-sm">
                      <span>Grocery:</span>
                      <span class="${props.has_grocery ? 'text-green-600' : 'text-red-600'}">${props.has_grocery ? 'Yes' : 'No'} (${props.distance_to_nearest_grocery.toFixed(1)} mi)</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span>Pharmacy:</span>
                      <span class="${props.has_pharmacy ? 'text-green-600' : 'text-red-600'}">${props.has_pharmacy ? 'Yes' : 'No'} (${props.distance_to_nearest_pharmacy.toFixed(1)} mi)</span>
                    </div>
                  </div>
                  ${isUnderserved ? '<div class="mt-2 p-2 bg-red-50 rounded text-red-700 text-sm font-semibold">⚠️ Underserved Area - No services within 1 mile</div>' : ''}
                </div>
              </div>
            `)
          }
        })

        populationGroupRef.current.addLayer(populationLayer)

        // Add transit routes if location is selected
        if (selectedLocation && showTransit && selectedLocation.transit_routes) {
          selectedLocation.transit_routes.forEach((route, index) => {
            // Create more realistic transit route lines based on Seattle's actual transit patterns
            let routeCoordinates: [number, number][] = []
            
            // Different route patterns for different areas
            if (selectedLocation.lat > 47.6) { // North Seattle routes
              routeCoordinates = [
                [selectedLocation.lat, selectedLocation.lng],
                [selectedLocation.lat - 0.005, selectedLocation.lng + 0.01],
                [selectedLocation.lat - 0.01, selectedLocation.lng + 0.015],
                [selectedLocation.lat - 0.015, selectedLocation.lng + 0.01],
                [selectedLocation.lat - 0.02, selectedLocation.lng + 0.005]
              ]
            } else if (selectedLocation.lat < 47.55) { // South Seattle routes
              routeCoordinates = [
                [selectedLocation.lat, selectedLocation.lng],
                [selectedLocation.lat + 0.005, selectedLocation.lng - 0.01],
                [selectedLocation.lat + 0.01, selectedLocation.lng - 0.015],
                [selectedLocation.lat + 0.015, selectedLocation.lng - 0.01],
                [selectedLocation.lat + 0.02, selectedLocation.lng - 0.005]
              ]
            } else { // Central Seattle routes
              routeCoordinates = [
                [selectedLocation.lat, selectedLocation.lng],
                [selectedLocation.lat + 0.005, selectedLocation.lng + 0.005],
                [selectedLocation.lat + 0.01, selectedLocation.lng + 0.01],
                [selectedLocation.lat + 0.015, selectedLocation.lng + 0.008],
                [selectedLocation.lat + 0.02, selectedLocation.lng + 0.005]
              ]
            }
            
            const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
            const routeLine = L.default.polyline(routeCoordinates, {
              color: colors[index % colors.length],
              weight: 4,
              opacity: 0.7,
              dashArray: index % 2 === 0 ? '5, 5' : undefined
            })
            
            routeLine.bindPopup(`
              <div class="p-2">
                <h3 class="font-semibold">${route}</h3>
                <p>Transit route serving ${selectedLocation.name}</p>
                <p class="text-sm text-gray-600">Frequency: Every 15-20 minutes</p>
                <p class="text-sm text-gray-600">Service Hours: 5:00 AM - 1:00 AM</p>
                <p class="text-sm text-gray-600">Connects to: Downtown, University District, Airport</p>
              </div>
            `)
            
            transitGroupRef.current.addLayer(routeLine)
          })
        }

      } catch (err) {
        console.error('Map data update failed:', err)
      }
    }

    updateMapData()
  }, [mapReady, currentYear, selectedLocation, showTransit])

  // Add global function for transit routes
  useEffect(() => {
    (window as any).showTransitRoutes = (locationId: string) => {
      const location = mockLocations.find(loc => loc.id === locationId)
      if (location) {
        setSelectedLocation(location)
        setShowTransit(true)
      }
    }
  }, [])

  if (!isMounted) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline Slider */}
      <div className="absolute top-4 left-4 right-4 z-10 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Year:</label>
          <div className="flex-1 relative">
            <input
              type="range"
              min="2015"
              max="2025"
              step="1"
              value={currentYear}
              onChange={(e) => setCurrentYear(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((currentYear - 2015) / 10) * 100}%, #e5e7eb ${((currentYear - 2015) / 10) * 100}%, #e5e7eb 100%)`
              }}
            />
            {/* Custom slider thumb */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg cursor-pointer"
              style={{ left: `calc(${((currentYear - 2015) / 10) * 100}% - 12px)` }}
            />
          </div>
          <span className="text-2xl font-bold text-blue-600 min-w-[80px] text-center">{currentYear}</span>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <span className="font-medium">2015</span>
          <span className="font-medium">2020</span>
          <span className="font-medium">2025</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
          <div className="text-gray-600">
            <span className="font-medium">Locations:</span> {mockLocations.filter(loc => loc.year === currentYear).length}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Underserved:</span> {getPopulationData().features.filter(f => f.properties.distance_to_nearest_grocery > 1 || f.properties.distance_to_nearest_pharmacy > 1).length}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          Housing density: {Math.round((1 + ((currentYear - 2015) / 10) * 0.3) * 100)}% of 2015 baseline
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg">
        <h4 className="font-semibold text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Grocery Store</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Pharmacy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Grocery-Pharmacy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded opacity-50"></div>
            <span>Underserved (&gt;1 mi)</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div 
        ref={mapRef} 
        className={className}
        style={{ 
          minHeight: '500px',
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
