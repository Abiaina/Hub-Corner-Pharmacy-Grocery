'use client'

import React from 'react';
import type { ControlsState, YearKey } from './types';

/**
 * Controls Component
 * 
 * This component provides the user interface for controlling the map visualization.
 * It includes:
 * - Year selection buttons (2015, 2020, 2025)
 * - Layer visibility toggles for different POI types
 * - Option to include markets in access calculations
 * - Radius slider for access buffer calculations
 * 
 * Features:
 * - Clean, modern UI with backdrop blur and rounded corners
 * - Responsive button states
 * - Real-time radius conversion to miles
 * - Organized sections with visual separators
 * 
 * Props:
 * - state: Current controls state
 * - setState: Function to update controls state
 */

// Available years for the map
const YEARS: YearKey[] = [2015, 2020, 2025];

/**
 * Controls Component
 * 
 * Renders the control panel for the map with year selection, layer toggles,
 * and radius adjustment. Positioned absolutely in the top-left corner.
 */
export const Controls: React.FC<{ 
  state: ControlsState; 
  setState: React.Dispatch<React.SetStateAction<ControlsState>>
}> = ({ state, setState }) => {
  
  return (
    <div className="absolute z-[1000] top-4 left-4 bg-white/90 backdrop-blur rounded-2xl shadow p-4 space-y-3 w-80">
      
      {/* Year Selection Section */}
      <div>
        <div className="text-sm font-semibold mb-1">Year</div>
        <div className="grid grid-cols-3 gap-2">
          {YEARS.map(year => (
            <button 
              key={year} 
              className={`text-xs py-1.5 rounded-xl border transition-colors ${
                state.year === year 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`} 
              onClick={() => setState(prev => ({ ...prev, year }))}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Visibility Section */}
      <div className="border-t pt-3">
        <div className="text-sm font-semibold mb-2">Layers</div>
        
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input 
            type="checkbox" 
            checked={state.showGroceries} 
            onChange={e => setState(prev => ({ ...prev, showGroceries: e.target.checked }))} 
            className="rounded"
          />
          <span>Groceries (full service, longer hours)</span>
        </label>
        
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input 
            type="checkbox" 
            checked={state.showPharmacies} 
            onChange={e => setState(prev => ({ ...prev, showPharmacies: e.target.checked }))} 
            className="rounded"
          />
          <span>Pharmacies</span>
        </label>
        
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input 
            type="checkbox" 
            checked={state.showMarkets} 
            onChange={e => setState(prev => ({ ...prev, showMarkets: e.target.checked }))} 
            className="rounded"
          />
          <span>Farmers markets (seasonal/limited hours)</span>
        </label>
        
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input 
            type="checkbox" 
            checked={state.includeMarkets} 
            onChange={e => setState(prev => ({ ...prev, includeMarkets: e.target.checked }))} 
            className="rounded"
          />
          <span>Include markets in access calculation</span>
        </label>
      </div>

      {/* Radius Control Section */}
      <div className="border-t pt-3">
        <div className="text-sm font-semibold mb-1">Access radius (meters)</div>
        <input 
          type="range" 
          min={200} 
          max={2000} 
          step={50} 
          value={state.radiusMeters} 
          onChange={e => setState(prev => ({ ...prev, radiusMeters: Number(e.target.value) }))} 
          className="w-full"
        />
        <div className="text-xs text-gray-600">
          ~{(state.radiusMeters / 1609.34).toFixed(2)} miles
        </div>
      </div>
    </div>
  );
};
