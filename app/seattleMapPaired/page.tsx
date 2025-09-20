'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { DataBundle } from '../../components/map/types';

// Dynamically import the simple map component to avoid SSR issues
const SimpleLeafletMap = dynamic(() => import('../../components/map/SimpleLeafletMap'), {
  ssr: false,
  loading: () => <div className="h-[85vh] flex items-center justify-center bg-gray-100 rounded-lg">Loading map...</div>
});

/**
 * Seattle Map Paired Page
 * 
 * This page demonstrates the modular map component system for visualizing
 * food and pharmacy access across Seattle. It uses the new component architecture
 * with clear separation of concerns and maintainable code structure.
 * 
 * Features:
 * - Modular component architecture
 * - Type-safe data handling
 * - Interactive controls
 * - Population density visualization
 * - Access coverage and food desert analysis
 * - Points of interest display
 */

// Demo data bundle - replace with real data sources
const data: DataBundle = {
  cityBoundary: {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-122.44, 47.74],
              [-122.22, 47.74],
              [-122.22, 47.49],
              [-122.44, 47.49],
              [-122.44, 47.74]
            ]
          ]
        }
      }
    ]
  },
  populationPolys: {
    2025: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": { "density": 8000 },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-122.35, 47.62],
                [-122.30, 47.62],
                [-122.30, 47.60],
                [-122.35, 47.60],
                [-122.35, 47.62]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": { "density": 12000 },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-122.40, 47.65],
                [-122.35, 47.65],
                [-122.35, 47.62],
                [-122.40, 47.62],
                [-122.40, 47.65]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": { "density": 6000 },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-122.30, 47.60],
                [-122.25, 47.60],
                [-122.25, 47.57],
                [-122.30, 47.57],
                [-122.30, 47.60]
              ]
            ]
          }
        }
      ]
    }
  },
  groceries: {
    2025: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": { "name": "Demo Grocery Store" },
          "geometry": {
            "type": "Point",
            "coordinates": [-122.319, 47.619]
          }
        },
        {
          "type": "Feature",
          "properties": { "name": "Another Grocery Store" },
          "geometry": {
            "type": "Point",
            "coordinates": [-122.340, 47.615]
          }
        }
      ]
    }
  },
  pharmacies: {
    2025: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": { "name": "Demo Pharmacy" },
          "geometry": {
            "type": "Point",
            "coordinates": [-122.335, 47.608]
          }
        },
        {
          "type": "Feature",
          "properties": { "name": "Community Pharmacy" },
          "geometry": {
            "type": "Point",
            "coordinates": [-122.310, 47.605]
          }
        }
      ]
    }
  },
  markets: {
    2025: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": { "name": "Demo Farmers Market" },
          "geometry": {
            "type": "Point",
            "coordinates": [-122.325, 47.602]
          }
        }
      ]
    }
  }
};

/**
 * Seattle Map Paired Page Component
 * 
 * Renders the interactive map with all controls and visualizations.
 * The map component is self-contained and doesn't affect other parts of the app.
 */
export default function SeattleMapPairedPage() {
  const [year, setYear] = useState<2015 | 2020 | 2025>(2025);
  const [showGroceries, setShowGroceries] = useState(true);
  const [showPharmacies, setShowPharmacies] = useState(true);
  const [showMarkets, setShowMarkets] = useState(true);
  const [radiusMeters, setRadiusMeters] = useState(800);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="card">
        <h1 className="text-3xl font-semibold mb-4">Seattle Access Map - Simple Leaflet</h1>
        <p className="text-lg text-gray-700 mb-6">
          Interactive map showing food and pharmacy access patterns across Seattle using a simplified Leaflet implementation.
          This version avoids react-leaflet compatibility issues with Next.js 14.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-blue-800">Component Architecture</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>BaseMap:</strong> Foundation with OpenStreetMap tiles and auto-fitting</li>
              <li><strong>DensityChoropleth:</strong> Population density visualization with automatic color breaks</li>
              <li><strong>POILayer:</strong> Points of interest with color-coded markers</li>
              <li><strong>AccessOverlay:</strong> Coverage buffers and food desert identification</li>
              <li><strong>Controls:</strong> User interface for year selection and layer toggles</li>
              <li><strong>SeattleAccessMap:</strong> Main container orchestrating all components</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3 text-green-800">Features</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>Year Selection:</strong> Compare data across 2015, 2020, and 2025</li>
              <li><strong>Layer Controls:</strong> Toggle groceries, pharmacies, and farmers markets</li>
              <li><strong>Access Analysis:</strong> Visualize coverage areas and food deserts</li>
              <li><strong>Population Density:</strong> Choropleth map with automatic color classification</li>
              <li><strong>Interactive Elements:</strong> Click markers for details, adjust buffer radius</li>
              <li><strong>Responsive Design:</strong> Works on desktop and mobile devices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Interactive Access Map</h2>
        <p className="text-gray-700 mb-4">
          Use the controls below to change years, toggle layers, and adjust the access radius.
        </p>
        
        {/* Controls */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Year Selection</h3>
              <div className="flex gap-2">
                {[2015, 2020, 2025].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y as 2015 | 2020 | 2025)}
                    className={`px-3 py-1 rounded border text-sm ${
                      year === y 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Layer Controls</h3>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showGroceries}
                    onChange={(e) => setShowGroceries(e.target.checked)}
                    className="rounded"
                  />
                  Groceries
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showPharmacies}
                    onChange={(e) => setShowPharmacies(e.target.checked)}
                    className="rounded"
                  />
                  Pharmacies
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showMarkets}
                    onChange={(e) => setShowMarkets(e.target.checked)}
                    className="rounded"
                  />
                  Farmers Markets
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Access Radius: {radiusMeters}m (~{(radiusMeters/1609.34).toFixed(2)} miles)</h3>
            <input
              type="range"
              min={200}
              max={2000}
              step={50}
              value={radiusMeters}
              onChange={(e) => setRadiusMeters(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="h-[85vh] rounded-lg overflow-hidden border relative">
          <SimpleLeafletMap
            data={data}
            year={year}
            showGroceries={showGroceries}
            showPharmacies={showPharmacies}
            showMarkets={showMarkets}
            radiusMeters={radiusMeters}
          />
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl shadow p-3 text-xs z-10">
            <div className="font-semibold mb-1">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-red-600 bg-transparent rounded"></div>
                <span>Seattle city boundary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Population density (darker = higher)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Access coverage ({radiusMeters}m radius)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-800 rounded"></div>
                <span>Food desert areas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Grocery stores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Pharmacies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Farmers markets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Technical Implementation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-purple-800">Component Structure</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>Types:</strong> TypeScript interfaces for type safety</li>
              <li><strong>Modular Design:</strong> Each component has a single responsibility</li>
              <li><strong>Self-Contained:</strong> No global state or context dependencies</li>
              <li><strong>Reusable:</strong> Components can be used in other projects</li>
              <li><strong>Maintainable:</strong> Clear documentation and separation of concerns</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-orange-800">Data Requirements</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>City Boundary:</strong> GeoJSON polygon defining city limits</li>
              <li><strong>Population Data:</strong> Census tracts with density properties</li>
              <li><strong>POI Data:</strong> Grocery stores, pharmacies, and markets as points</li>
              <li><strong>Temporal Data:</strong> Separate datasets for each year</li>
              <li><strong>GeoJSON Format:</strong> Standard format for all geographic data</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}