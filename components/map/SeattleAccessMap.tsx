'use client'

import React, { useState } from 'react';
import { BaseMap } from './BaseMap';
import { DensityChoropleth } from './DensityChoropleth';
import { POILayer } from './POILayer';
import { AccessOverlay } from './AccessOverlay';
import { Controls } from './Controls';
import type { DataBundle, ControlsState } from './types';

/**
 * SeattleAccessMap Component
 * 
 * This is the main container component that orchestrates all the map functionality.
 * It provides:
 * - State management for all user controls
 * - Data filtering by year
 * - Layer composition and rendering
 * - User interface controls
 * - Legend for map interpretation
 * 
 * Features:
 * - Modular component architecture
 * - Self-contained state management
 * - Responsive design
 * - Clean separation of concerns
 * - Easy to integrate into any page
 * 
 * Props:
 * - DataBundle containing all geographic data for the map
 */

/**
 * SeattleAccessMap Component
 * 
 * Main container that brings together all map components and manages state.
 * This component can be dropped into any page without affecting other components.
 */
export default function SeattleAccessMap({ 
  cityBoundary, 
  populationPolys, 
  groceries, 
  pharmacies, 
  markets = {} 
}: DataBundle) {
  
  // Initialize controls state with sensible defaults
  const [ui, setUi] = useState<ControlsState>({
    year: 2025,
    showGroceries: true,
    showPharmacies: true,
    showMarkets: true,
    includeMarkets: false, // Markets off by default in access calculations
    radiusMeters: 800,    // ~0.5 mile default radius
  });

  // Filter data by selected year
  const popFC = populationPolys[ui.year];
  const groceryData = groceries[ui.year];
  const pharmacyData = pharmacies[ui.year];
  const marketData = markets[ui.year];

  // DEBUG: Log data to console
  console.log('DEBUG - Selected year:', ui.year);
  console.log('DEBUG - Population data:', popFC);
  console.log('DEBUG - Grocery data:', groceryData);
  console.log('DEBUG - Pharmacy data:', pharmacyData);
  console.log('DEBUG - Market data:', marketData);
  console.log('DEBUG - City boundary:', cityBoundary);

  return (
    <div className="relative w-full h-[80vh]">
      
      {/* User Controls Panel */}
      <Controls state={ui} setState={setUi} />

      {/* Map Legend */}
      <div className="absolute z-[1000] bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl shadow p-3 text-xs">
        <div className="font-semibold mb-1">Legend</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <span>Population density (darker = higher)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <span>Coverage buffers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span>Food deserts (outside coverage)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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

      {/* Main Map Container - DEBUG: Disabled auto-fitting */}
      <BaseMap fit={null}>
        {/* DEBUG: All layers commented out for debugging */}
        
        {/* Population density choropleth - DEBUG: Testing Density Layer */}
        <DensityChoropleth populationFC={popFC} />
        
        {/* Access coverage and deserts overlay - DEBUG: Testing Access Overlay */}
        <AccessOverlay 
          cityBoundary={cityBoundary} 
          groceries={groceryData} 
          pharmacies={pharmacyData} 
          markets={marketData} 
          includeMarkets={ui.includeMarkets} 
          radiusMeters={ui.radiusMeters} 
          enabled={{
            groceries: ui.showGroceries, 
            pharmacies: ui.showPharmacies, 
            markets: ui.showMarkets
          }} 
        />
        
        {/* Points of Interest Layers - DEBUG: Testing POI Layer */}
        {ui.showGroceries && <POILayer data={groceryData} category="grocery" />} 
        {ui.showPharmacies && <POILayer data={pharmacyData} category="pharmacy" />} 
        {ui.showMarkets && <POILayer data={marketData} category="market" />}
      </BaseMap>
    </div>
  );
}
