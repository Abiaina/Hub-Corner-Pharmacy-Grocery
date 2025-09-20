'use client'

import React, { Fragment, useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
// @ts-ignore
const turf = require('@turf/turf');
import type { FC, LayerVisibility } from './types';

/**
 * AccessOverlay Component
 * 
 * This component visualizes access to food and pharmacy services by:
 * 1. Creating buffer zones around enabled POI locations
 * 2. Unioning all buffers to show total coverage area
 * 3. Calculating "deserts" (areas outside coverage) by subtracting coverage from city boundary
 * 
 * Features:
 * - Configurable buffer radius in meters
 * - Selective inclusion of different POI types
 * - Optional inclusion of farmers markets (limited hours)
 * - Green overlay for covered areas, dark overlay for deserts
 * - Uses Turf.js for geometric calculations
 * 
 * Props:
 * - cityBoundary: City limits polygon
 * - groceries/pharmacies/markets: POI data for each category
 * - includeMarkets: Whether to include markets in access calculations
 * - radiusMeters: Buffer radius in meters (800m ≈ 0.5 mile)
 * - enabled: Which POI categories to include in calculations
 */

/**
 * AccessOverlay Component
 * 
 * Calculates and renders access coverage and food deserts based on POI locations.
 * Uses Turf.js for geometric operations like buffering and unioning.
 */
export const AccessOverlay: React.FC<{
  cityBoundary: FC;
  groceries?: FC;
  pharmacies?: FC;
  markets?: FC;
  includeMarkets?: boolean;
  radiusMeters: number;
  enabled: LayerVisibility;
}> = ({ 
  cityBoundary, 
  groceries, 
  pharmacies, 
  markets, 
  includeMarkets = false, 
  radiusMeters, 
  enabled 
}) => {
  
  // Memoize the access calculation to avoid expensive recomputation
  const result = useMemo(() => {
    try {
      const buffers: any[] = [];
      
      /**
       * Helper function to create buffers around POI locations
       * 
       * @param fc FeatureCollection containing POI data
       * @param on Whether this POI type is enabled
       */
      const createBuffers = (fc?: FC, on: boolean = false) => {
        if (!on || !fc) return;
        
        // Create buffer around each POI point
        for (const feature of fc.features) {
          if (feature.geometry?.type === 'Point') {
            buffers.push(
              turf.buffer(feature as any, radiusMeters, { units: 'meters' })
            );
          }
        }
      };
      
      // Create buffers for each enabled POI type
      createBuffers(groceries, enabled.groceries);
      createBuffers(pharmacies, enabled.pharmacies);
      if (includeMarkets) {
        createBuffers(markets, enabled.markets);
      }
      
      // Union all buffers to create total coverage area
      let accessUnion: any = null;
      if (buffers.length > 0) {
        accessUnion = buffers.reduce((acc, cur) => 
          acc ? turf.union(acc, cur) : cur, 
          null as any
        );
      }
      
      // Calculate deserts by subtracting coverage from city boundary
      const desert = accessUnion 
        ? turf.difference(cityBoundary as any, accessUnion) 
        : (cityBoundary as any);
      
      return { accessUnion, desert };
      
    } catch (error) {
      console.warn('Access overlay calculation failed:', error);
      return { accessUnion: null, desert: null };
    }
  }, [cityBoundary, groceries, pharmacies, markets, includeMarkets, radiusMeters, enabled]);

  return (
    <Fragment>
      {/* Coverage area overlay - green with transparency */}
      {result.accessUnion && (
        <GeoJSON 
          data={result.accessUnion as any} 
          style={{ 
            color: '#16a34a', 
            weight: 1, 
            fillColor: '#22c55e', 
            fillOpacity: 0.15 
          }} 
        />
      )}
      
      {/* Food desert overlay - dark with transparency */}
      {result.desert && (
        <GeoJSON 
          data={result.desert as any} 
          style={{ 
            color: '#111827', 
            weight: 0.6, 
            fillColor: '#111827', 
            fillOpacity: 0.08 
          }} 
        />
      )}
    </Fragment>
  );
};
