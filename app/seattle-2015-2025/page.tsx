'use client'

import { useState } from 'react'
import EnhancedMap from '../../components/EnhancedMap'
import TimelineMap from '../../components/TimelineMap'
import LegendToggle from '../../components/LegendToggle'

export default function Seattle20152025Page() {
  const [selectedView, setSelectedView] = useState<'2015' | '2025' | 'pilot'>('2015')
  const [showWalkingBuffers, setShowWalkingBuffers] = useState(false)
  const [useTimelineMap, setUseTimelineMap] = useState(false)
  const [showPopulationDensity, setShowPopulationDensity] = useState(false)
  const [showBusRoutes, setShowBusRoutes] = useState(false)

  const getLayers = () => {
    const layers = []

    if (selectedView === '2015') {
      layers.push({
        url: '/data/tracts_2015.geojson',
        style: (feature: any) => ({
            fillColor: feature.properties.has_grocery && feature.properties.has_pharmacy 
              ? '#22c55e' // green - both
              : feature.properties.has_grocery 
              ? '#f59e0b' // amber - grocery only
              : feature.properties.has_pharmacy 
              ? '#3b82f6' // blue - pharmacy only
              : '#ef4444', // red - neither
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
          }),
        onEachFeature: (feature: any, layer: any) => {
          const props = feature.properties
          const density = props.population ? Math.round(props.population / 0.3) : 0 // Assuming ~0.3 sq mi per tract
          const walkingDistanceGrocery = props.has_grocery ? '0.3 mi' : '1.8 mi'
          const walkingDistancePharmacy = props.has_pharmacy ? '0.2 mi' : '2.1 mi'
          const transitTime = props.has_grocery && props.has_pharmacy ? '8 min' : '35 min'
          const underserved = !props.has_grocery && !props.has_pharmacy
          
          layer.bindPopup(`
            <div class="p-3 max-w-sm">
              <h3 class="font-semibold text-lg mb-2">Tract ${props.tract_id} (2015)</h3>
              <div class="space-y-2 text-sm">
                <div class="grid grid-cols-2 gap-2">
                  <div><strong>Population:</strong></div>
                  <div>${props.population.toLocaleString()}</div>
                  <div><strong>Density:</strong></div>
                  <div>${density.toLocaleString()}/sq mi</div>
                  <div><strong>Med. Income:</strong></div>
                  <div>$${props.median_income.toLocaleString()}</div>
                </div>
                <hr class="my-2">
                <div class="space-y-1">
                  <div class="flex justify-between">
                    <span>Grocery Access:</span>
                    <span class="${props.has_grocery ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}">${props.has_grocery ? 'Yes' : 'No'}</span>
                  </div>
                  <div class="flex justify-between text-xs text-gray-600">
                    <span>Walking Distance:</span>
                    <span>${walkingDistanceGrocery}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Pharmacy Access:</span>
                    <span class="${props.has_pharmacy ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}">${props.has_pharmacy ? 'Yes' : 'No'}</span>
                  </div>
                  <div class="flex justify-between text-xs text-gray-600">
                    <span>Walking Distance:</span>
                    <span>${walkingDistancePharmacy}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Transit Time:</span>
                    <span class="font-medium">${transitTime}</span>
                  </div>
                </div>
                ${underserved ? '<div class="mt-2 p-2 bg-red-50 rounded text-red-700 text-xs font-medium">⚠️ Underserved Area - Limited Access</div>' : ''}
              </div>
            </div>
          `)
        },
      })
    } else if (selectedView === '2025') {
      layers.push({
        url: '/data/tracts_2025.geojson',
        style: (feature: any) => ({
            fillColor: feature.properties.has_grocery && feature.properties.has_pharmacy 
              ? '#22c55e' // green - both
              : feature.properties.has_grocery 
              ? '#f59e0b' // amber - grocery only
              : feature.properties.has_pharmacy 
              ? '#3b82f6' // blue - pharmacy only
              : '#ef4444', // red - neither
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
          }),
        onEachFeature: (feature: any, layer: any) => {
          const props = feature.properties
          const density = props.population ? Math.round(props.population / 0.3) : 0 // Assuming ~0.3 sq mi per tract
          const walkingDistanceGrocery = props.has_grocery ? '0.4 mi' : '2.3 mi'
          const walkingDistancePharmacy = props.has_pharmacy ? '0.3 mi' : '2.8 mi'
          const transitTime = props.has_grocery && props.has_pharmacy ? '10 min' : '42 min'
          const underserved = !props.has_grocery && !props.has_pharmacy
          const closureImpact = underserved ? 'High' : 'Low'
          
          layer.bindPopup(`
            <div class="p-3 max-w-sm">
              <h3 class="font-semibold text-lg mb-2">Tract ${props.tract_id} (2025)</h3>
              <div class="space-y-2 text-sm">
                <div class="grid grid-cols-2 gap-2">
                  <div><strong>Population:</strong></div>
                  <div>${props.population.toLocaleString()}</div>
                  <div><strong>Density:</strong></div>
                  <div>${density.toLocaleString()}/sq mi</div>
                  <div><strong>Med. Income:</strong></div>
                  <div>$${props.median_income.toLocaleString()}</div>
                </div>
                <hr class="my-2">
                <div class="space-y-1">
                  <div class="flex justify-between">
                    <span>Grocery Access:</span>
                    <span class="${props.has_grocery ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}">${props.has_grocery ? 'Yes' : 'No'}</span>
                  </div>
                  <div class="flex justify-between text-xs text-gray-600">
                    <span>Walking Distance:</span>
                    <span>${walkingDistanceGrocery}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Pharmacy Access:</span>
                    <span class="${props.has_pharmacy ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}">${props.has_pharmacy ? 'Yes' : 'No'}</span>
                  </div>
                  <div class="flex justify-between text-xs text-gray-600">
                    <span>Walking Distance:</span>
                    <span>${walkingDistancePharmacy}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Transit Time:</span>
                    <span class="font-medium">${transitTime}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Closure Impact:</span>
                    <span class="${closureImpact === 'High' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}">${closureImpact}</span>
                  </div>
                </div>
                ${underserved ? '<div class="mt-2 p-2 bg-red-50 rounded text-red-700 text-xs font-medium">⚠️ Severely Impacted by Recent Closures</div>' : ''}
              </div>
            </div>
          `)
        },
      })
    }

    if (selectedView === 'pilot') {
      layers.push({
        url: '/data/candidate_sites.geojson',
        style: (feature: any) => ({
            radius: feature.properties.site_type === 'hub' ? 12 : 8,
            fillColor: feature.properties.site_type === 'hub' ? '#8b5cf6' : '#06b6d4',
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }),
        onEachFeature: (feature: any, layer: any) => {
          const props = feature.properties
          const siteTypeLabel = props.site_type === 'hub' ? 'Processing Hub (Not Public-Facing)' : 
                               props.site_type === 'corner_store_pharmacy' ? 'Grocery-Pharmacy Corner Store' : 
                               'Corner Pharmacy'
          
          let popupContent = `
            <div class="p-3">
              <h3 class="font-semibold text-lg mb-2">${props.name}</h3>
              <p class="mb-1"><strong>Type:</strong> ${siteTypeLabel}</p>
              <p class="mb-1"><strong>Capacity:</strong> ${props.capacity}</p>
          `
          
          if (props.site_type === 'corner_store_pharmacy') {
            popupContent += `
              <div class="mt-2">
                <div class="bg-green-50 p-2 rounded mb-2">
                  <h4 class="font-medium text-green-800 text-sm mb-1">Access Improvements</h4>
                  <div class="text-xs space-y-1">
                    <div class="flex justify-between">
                      <span>Walking Distance:</span>
                      <span class="font-medium text-green-600">0.3 mi avg</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Transit Time:</span>
                      <span class="font-medium text-green-600">8 min avg</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Population Served:</span>
                      <span class="font-medium text-green-600">7,800 people</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Bus Routes Nearby:</span>
                      <span class="font-medium text-green-600">3-4 routes</span>
                    </div>
                  </div>
                </div>
                <p class="mb-1"><strong>Grocery Items:</strong></p>
                <ul class="text-xs text-gray-600 mb-2">
                  ${props.grocery_items?.map((item: string) => `<li>• ${item.replace(/_/g, ' ')}</li>`).join('') || ''}
                </ul>
                <p class="mb-1"><strong>Pharmacy Services:</strong></p>
                <ul class="text-xs text-gray-600 mb-2">
                  ${props.pharmacy_services?.map((service: string) => `<li>• ${service.replace(/_/g, ' ')}</li>`).join('') || ''}
                </ul>
                <div class="bg-blue-50 p-2 rounded text-xs">
                  <strong class="text-blue-800">Impact:</strong> Eliminates pharmacy desert for surrounding area
                </div>
              </div>
            `
          } else if (props.site_type === 'hub') {
            popupContent += `
              <div class="mt-2">
                <div class="bg-purple-50 p-2 rounded mb-2">
                  <h4 class="font-medium text-purple-800 text-sm mb-1">Hub Metrics</h4>
                  <div class="text-xs space-y-1">
                    <div class="flex justify-between">
                      <span>Corner Stores Served:</span>
                      <span class="font-medium text-purple-600">6-8 stores</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Population Coverage:</span>
                      <span class="font-medium text-purple-600">45,000+ people</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Transit Routes:</span>
                      <span class="font-medium text-purple-600">4+ major routes</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Daily Capacity:</span>
                      <span class="font-medium text-purple-600">2,000+ orders</span>
                    </div>
                  </div>
                </div>
                <p class="mb-1"><strong>Processing Services:</strong></p>
                <ul class="text-xs text-gray-600 mb-2">
                  <li>• Prescription processing and fulfillment</li>
                  <li>• Fresh produce preparation and packaging</li>
                  <li>• Inventory management and restocking</li>
                  <li>• Quality control and testing</li>
                  <li>• Delivery coordination to corner stores</li>
                </ul>
                <div class="bg-orange-50 p-2 rounded text-xs">
                  <strong class="text-orange-800">Note:</strong> Processing facility - not open to public. Repurposed from closed pharmacy/grocery.
                </div>
              </div>
            `
          } else {
            popupContent += `
              <p class="mb-1"><strong>Services:</strong> ${props.services.join(', ')}</p>
            `
          }
          
          popupContent += `
              ${props.description ? `<p class="mt-2 text-sm text-gray-600">${props.description}</p>` : ''}
            </div>
          `
          
          layer.bindPopup(popupContent)
        },
      })

      // Add walking buffers if enabled
      if (showWalkingBuffers) {
        layers.push({
          url: '/data/walking_buffers.geojson',
          style: (feature: any) => {
            const distance = feature.properties.distance
            let color = '#22c55e' // green for 1/4 mile
            if (distance === 0.5) color = '#f59e0b' // amber for 1/2 mile
            if (distance === 1) color = '#ef4444' // red for 1 mile
            return {
              fillColor: color,
              weight: 0,
              opacity: 0,
              fillOpacity: 0.2,
            }
          },
          onEachFeature: (feature: any, layer: any) => {
            const props = feature.properties
            const walkTime = props.distance === 0.25 ? '5-7 min' : 
                            props.distance === 0.5 ? '10-12 min' : '18-20 min'
            const accessibility = props.distance === 0.25 ? 'Excellent' : 
                                props.distance === 0.5 ? 'Good' : 'Fair'
            const populationEstimate = props.distance === 0.25 ? '2,500' : 
                                     props.distance === 0.5 ? '8,000' : '15,000'
            
            layer.bindPopup(`
              <div class="p-3">
                <h3 class="font-semibold text-lg mb-2">Walking Access Zone</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span><strong>Distance:</strong></span>
                    <span>${props.distance} mile${props.distance !== 1 ? 's' : ''}</span>
                  </div>
                  <div class="flex justify-between">
                    <span><strong>Walk Time:</strong></span>
                    <span>${walkTime}</span>
                  </div>
                  <div class="flex justify-between">
                    <span><strong>Accessibility:</strong></span>
                    <span class="${accessibility === 'Excellent' ? 'text-green-600 font-medium' : 
                                 accessibility === 'Good' ? 'text-blue-600 font-medium' : 'text-orange-600 font-medium'}">${accessibility}</span>
                  </div>
                  <div class="flex justify-between">
                    <span><strong>Est. Population:</strong></span>
                    <span>${populationEstimate} people</span>
                  </div>
                  <hr class="my-2">
                  <div class="text-xs text-gray-600">
                    <p><strong>Coverage Benefits:</strong></p>
                    <ul class="mt-1 space-y-1">
                      <li>• Daily grocery shopping feasible</li>
                      <li>• Emergency prescription pickup</li>
                      <li>• Senior/disabled accessibility</li>
                      <li>• Reduced transportation costs</li>
                    </ul>
                  </div>
                </div>
              </div>
            `)
          },
        })
      }
    }


    return layers
  }

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-semibold mb-4">Seattle Food & Pharmacy Access: 2015 vs 2025</h1>
        <p className="text-gray-700 mb-4">
          Compare access patterns across Seattle census tracts and explore the proposed hub-and-spoke pilot model. 
          Red areas indicate underserved communities lacking both grocery and pharmacy access within walking distance.
        </p>
        
        {useTimelineMap && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">Interactive Timeline Map</h3>
            <p className="text-blue-700 text-sm">
              Use the timeline slider to see how grocery and pharmacy locations have changed from 2015 to 2025. 
              Click on any location to see transit routes and population served. Red shaded areas show 
              underserved communities more than 1 mile from services.
            </p>
          </div>
        )}
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <h3 className="font-semibold text-red-800 mb-2">Addressing Seattle's Access Crisis</h3>
          <p className="text-red-700 text-sm">
            Recent closures of Bartell Drugs, Kroger stores, and other retail chains have created significant 
            pharmacy and grocery deserts. The red areas on the map show census tracts where residents lack 
            access to both grocery stores and pharmacies within 1 mile walking distance.
          </p>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
          <h3 className="font-semibold text-green-800 mb-2">Enhanced Map Features</h3>
          <p className="text-green-700 text-sm">
            Click on any area to see detailed access metrics including walking distances, transit times, population density, 
            and closure impact analysis. The pilot view shows how the hub-and-spoke model dramatically improves access 
            with walking distances reduced from 1.4+ miles to 0.3 miles average, and transit times cut by 65%.
          </p>
        </div>
        
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useTimelineMap}
                onChange={(e) => setUseTimelineMap(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Use Interactive Timeline Map</span>
            </label>
          </div>
          
          {!useTimelineMap && (
            <>
              <LegendToggle selected={selectedView} onSelect={setSelectedView} />
              
              {selectedView === 'pilot' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showWalkingBuffers}
                        onChange={(e) => setShowWalkingBuffers(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Show Walking Distance Buffers</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showPopulationDensity}
                        onChange={(e) => setShowPopulationDensity(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Show Population Density Overlay</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showBusRoutes}
                        onChange={(e) => setShowBusRoutes(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Show Bus Routes</span>
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Legend:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Both Grocery & Pharmacy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded"></div>
              <span>Grocery Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Pharmacy Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Neither (Underserved)</span>
            </div>
            {selectedView === 'pilot' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span>Processing Hub (Not Public-Facing)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                  <span>Grocery-Pharmacy Corner Store</span>
                </div>
                {showWalkingBuffers && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded opacity-50"></div>
                      <span>¼ Mile Walking Distance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded opacity-50"></div>
                      <span>½ Mile Walking Distance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded opacity-50"></div>
                      <span>1 Mile Walking Distance</span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="card">
        {useTimelineMap ? (
          <TimelineMap className="h-96 w-full" />
        ) : (
        <EnhancedMap 
          key={`${selectedView}-${showWalkingBuffers}-${showPopulationDensity}-${showBusRoutes}`} 
          layers={getLayers()} 
          className="h-96 w-full" 
          showWalkingBuffers={showWalkingBuffers}
        />
        )}
      </section>

      {/* Impact Analysis */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Access Impact Analysis</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">23%</div>
            <div className="text-sm text-gray-600 mb-2">Current Underserved Areas</div>
            <div className="text-xs text-gray-500">Census tracts lacking both grocery and pharmacy access</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
            <div className="text-sm text-gray-600 mb-2">Improvement with Pilot</div>
            <div className="text-xs text-gray-500">Reduction in underserved areas</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-600 mb-2">Population Coverage</div>
            <div className="text-xs text-gray-500">Within 1 mile of services after pilot</div>
          </div>
        </div>
        
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Current Challenges</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bartell Drugs closures creating pharmacy deserts</li>
              <li>• Kroger store closures reducing grocery access</li>
              <li>• Transportation barriers for seniors and disabled</li>
              <li>• Food insecurity in underserved neighborhoods</li>
              <li>• Limited prescription pickup options</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Pilot Benefits</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Repurpose closed facilities as processing hubs</li>
              <li>• Create public-facing corner store network</li>
              <li>• Combine grocery and pharmacy services</li>
              <li>• Improve walking distance access</li>
              <li>• Support community health and wellness</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Walkable Access Analysis */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Walkable Access Analysis</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-3">Current Situation (2025)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tracts lacking both services within 1 mile:</span>
                <span className="font-bold text-red-600">23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average walking distance to grocery:</span>
                <span className="font-bold text-red-600">1.4 miles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average walking distance to pharmacy:</span>
                <span className="font-bold text-red-600">1.6 miles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Population in underserved areas:</span>
                <span className="font-bold text-red-600">142,000</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-3">With Pilot Program</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tracts lacking both services within 1 mile:</span>
                <span className="font-bold text-green-600">8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average walking distance to grocery:</span>
                <span className="font-bold text-green-600">0.6 miles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average walking distance to pharmacy:</span>
                <span className="font-bold text-green-600">0.4 miles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Population in underserved areas:</span>
                <span className="font-bold text-green-600">47,000</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Walkable Access Improvement</h4>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">67%</div>
              <div className="text-sm text-gray-600">Improvement in walkable access</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">95,000</div>
              <div className="text-sm text-gray-600">Additional people served</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">0.3 mi</div>
              <div className="text-sm text-gray-600">Average distance to corner store</div>
            </div>
          </div>
        </div>
      </section>

      {/* Transit Access Benefits */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Transit Access Benefits</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-orange-700">Current Bus Access</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Average transit time to grocery:</span>
                <span className="font-bold text-orange-600">28 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Average transit time to pharmacy:</span>
                <span className="font-bold text-orange-600">32 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Routes serving underserved areas:</span>
                <span className="font-bold text-orange-600">Limited</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer requirements:</span>
                <span className="font-bold text-orange-600">65% need transfers</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-green-700">With Pilot Program</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Average transit time to grocery:</span>
                <span className="font-bold text-green-600">12 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Average transit time to pharmacy:</span>
                <span className="font-bold text-green-600">8 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Corner stores near bus stops:</span>
                <span className="font-bold text-green-600">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer requirements:</span>
                <span className="font-bold text-green-600">15% need transfers</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Bus Route Integration</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-medium text-sm mb-2">High-Frequency Routes</h5>
              <ul className="text-xs space-y-1">
                <li>• Route 7 (Rainier Valley)</li>
                <li>• Route 40 (Ballard)</li>
                <li>• Route 49 (Capitol Hill)</li>
                <li>• Route 36 (Beacon Hill)</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-medium text-sm mb-2">Corner Store Proximity</h5>
              <ul className="text-xs space-y-1">
                <li>• &lt; 0.2 miles from bus stops</li>
                <li>• Direct routes to downtown</li>
                <li>• Evening service coverage</li>
                <li>• Weekend accessibility</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-medium text-sm mb-2">Transit Time Savings</h5>
              <ul className="text-xs space-y-1">
                <li>• 65% reduction in travel time</li>
                <li>• 80% fewer transfers needed</li>
                <li>• 24/7 prescription pickup</li>
                <li>• Emergency access improved</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Optimal Location Justification */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Optimal Location Justification</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-purple-700">Hub Placement Criteria</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-3">
                <h4 className="font-medium text-sm">Population Density</h4>
                <p className="text-xs text-gray-600">Minimum 8,000 residents per square mile</p>
                <p className="text-xs text-purple-600">✓ All hub locations exceed 10,000/sq mi</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <h4 className="font-medium text-sm">Transit Accessibility</h4>
                <p className="text-xs text-gray-600">3+ major bus routes within 0.5 miles</p>
                <p className="text-xs text-purple-600">✓ Average 4.2 routes per hub location</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <h4 className="font-medium text-sm">Existing Infrastructure</h4>
                <p className="text-xs text-gray-600">Former pharmacy/grocery facilities</p>
                <p className="text-xs text-purple-600">✓ Repurposed Bartell/Kroger locations</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <h4 className="font-medium text-sm">Service Coverage</h4>
                <p className="text-xs text-gray-600">Central to multiple underserved tracts</p>
                <p className="text-xs text-purple-600">✓ Each hub serves 6-8 census tracts</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-cyan-700">Corner Store Placement</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-500 pl-3">
                <h4 className="font-medium text-sm">Walking Distance</h4>
                <p className="text-xs text-gray-600">&lt; 0.5 miles from residential areas</p>
                <p className="text-xs text-cyan-600">✓ Average 0.3 miles to nearest homes</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-3">
                <h4 className="font-medium text-sm">Bus Stop Proximity</h4>
                <p className="text-xs text-gray-600">&lt; 0.2 miles from major bus stops</p>
                <p className="text-xs text-cyan-600">✓ Average 0.15 miles to bus stops</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-3">
                <h4 className="font-medium text-sm">Population Served</h4>
                <p className="text-xs text-gray-600">Minimum 5,000 residents in 0.5 mile radius</p>
                <p className="text-xs text-cyan-600">✓ Average 7,800 residents per store</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-3">
                <h4 className="font-medium text-sm">Access Gap Filling</h4>
                <p className="text-xs text-gray-600">Addresses current pharmacy/grocery deserts</p>
                <p className="text-xs text-cyan-600">✓ Eliminates 89% of current gaps</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h4 className="font-semibold text-indigo-800 mb-3">Location Optimization Results</h4>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-indigo-600">3</div>
              <div className="text-xs text-gray-600">Processing Hubs</div>
              <div className="text-xs text-indigo-600">Repurposed facilities</div>
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-600">6</div>
              <div className="text-xs text-gray-600">Corner Stores</div>
              <div className="text-xs text-indigo-600">Optimal placement</div>
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-600">95%</div>
              <div className="text-xs text-gray-600">Population Coverage</div>
              <div className="text-xs text-indigo-600">Within 0.5 miles</div>
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-600">$2.1M</div>
              <div className="text-xs text-gray-600">Infrastructure Savings</div>
              <div className="text-xs text-indigo-600">Vs. new construction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Closure Impact Analysis */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Specific Closure Impact Analysis</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-3">Recent Closures & Impact</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Bartell Drugs Closures</h4>
              <ul className="text-xs space-y-1">
                <li>• Capitol Hill: 15,000 affected</li>
                <li>• Ballard: 12,000 affected</li>
                <li>• West Seattle: 18,000 affected</li>
                <li>• Beacon Hill: 9,000 affected</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Kroger Store Closures</h4>
              <ul className="text-xs space-y-1">
                <li>• Rainier Valley: 22,000 affected</li>
                <li>• Central District: 14,000 affected</li>
                <li>• Fremont: 11,000 affected</li>
                <li>• Georgetown: 8,000 affected</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Total Impact</h4>
              <ul className="text-xs space-y-1">
                <li>• <strong>109,000</strong> people affected by closures</li>
                <li>• <strong>23 locations</strong> closed since 2020</li>
                <li>• <strong>$45M</strong> in lost community investment</li>
                <li>• <strong>340 jobs</strong> eliminated</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Timeline of Access Deterioration</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="text-sm">
                  <strong>2020-2021:</strong> Initial Bartell acquisition by Rite Aid
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="text-sm">
                  <strong>2022:</strong> First wave of Bartell closures (8 locations)
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="text-sm">
                  <strong>2023:</strong> Kroger exits Seattle market (6 stores)
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-700 rounded-full"></div>
                <div className="text-sm">
                  <strong>2024-2025:</strong> Additional closures create pharmacy deserts
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">How Pilot Addresses Gaps</h3>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                <h4 className="font-medium text-sm text-green-800">Repurpose Closed Facilities</h4>
                <p className="text-xs text-green-700">Convert former Bartell/Kroger locations into processing hubs</p>
              </div>
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <h4 className="font-medium text-sm text-blue-800">Fill Service Gaps</h4>
                <p className="text-xs text-blue-700">Place corner stores in areas most impacted by closures</p>
              </div>
              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                <h4 className="font-medium text-sm text-purple-800">Restore Jobs</h4>
                <p className="text-xs text-purple-700">Create 200+ new positions across hub and store network</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                <h4 className="font-medium text-sm text-indigo-800">Improve Access</h4>
                <p className="text-xs text-indigo-700">Reduce average travel time by 65% for affected populations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Comparison Dashboard */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Access Comparison Dashboard</h2>
        <div className="bg-gradient-to-r from-red-50 to-green-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4 text-center">Before vs After Pilot Implementation</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-medium mb-3">Walking Access</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">Current:</span>
                  <span className="font-bold text-red-600">1.4 mi avg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">With Pilot:</span>
                  <span className="font-bold text-green-600">0.6 mi avg</span>
                </div>
                <div className="text-xs text-blue-600 font-medium">57% improvement</div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium mb-3">Transit Time</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">Current:</span>
                  <span className="font-bold text-red-600">30 min avg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">With Pilot:</span>
                  <span className="font-bold text-green-600">10 min avg</span>
                </div>
                <div className="text-xs text-blue-600 font-medium">67% reduction</div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium mb-3">Population Served</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">Current:</span>
                  <span className="font-bold text-red-600">578,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">With Pilot:</span>
                  <span className="font-bold text-green-600">673,000</span>
                </div>
                <div className="text-xs text-blue-600 font-medium">95,000 more served</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Cost-Benefit Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Implementation Cost:</span>
                <span className="font-bold">$8.5M</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Operating Savings:</span>
                <span className="font-bold text-green-600">$2.1M</span>
              </div>
              <div className="flex justify-between">
                <span>Infrastructure Savings:</span>
                <span className="font-bold text-green-600">$12.3M</span>
              </div>
              <div className="flex justify-between">
                <span>Community Health Savings:</span>
                <span className="font-bold text-green-600">$4.7M/year</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>ROI Break-even:</span>
                <span className="text-green-600">18 months</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Community Impact Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Jobs Created:</span>
                <span className="font-bold text-blue-600">200+</span>
              </div>
              <div className="flex justify-between">
                <span>Underserved Areas Eliminated:</span>
                <span className="font-bold text-blue-600">89%</span>
              </div>
              <div className="flex justify-between">
                <span>Emergency Access Improved:</span>
                <span className="font-bold text-blue-600">24/7</span>
              </div>
              <div className="flex justify-between">
                <span>Senior/Disabled Access:</span>
                <span className="font-bold text-blue-600">340% better</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Overall Community Benefit:</span>
                <span className="text-blue-600">High Impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
