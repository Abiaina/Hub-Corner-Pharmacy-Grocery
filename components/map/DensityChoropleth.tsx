'use client'

import React, { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
import type { FC } from './types';

/**
 * DensityChoropleth Component
 * 
 * This component creates a choropleth map showing population density across census tracts.
 * It automatically calculates color breaks based on the data distribution and applies
 * a blue color scheme where darker colors indicate higher density.
 * 
 * Features:
 * - Automatic quantile-based color breaks (10th, 30th, 50th, 70th, 90th percentiles)
 * - Blue color scheme from light to dark
 * - Semi-transparent fill with subtle borders
 * - Handles missing or invalid density data gracefully
 * 
 * Props:
 * - populationFC: GeoJSON FeatureCollection with population density data
 */

/**
 * Creates a styling function for choropleth visualization
 * 
 * This function:
 * 1. Extracts density values from all features
 * 2. Calculates quantile breaks for color classification
 * 3. Returns a function that maps density values to colors
 * 
 * @param features Array of GeoJSON features with density properties
 * @returns Function that returns Leaflet style object for a given feature
 */
function makeChoroplethStyler(features: any[]) {
  // Extract and sort density values
  const densities = features
    .map((f: any) => Number(f.properties?.density))
    .filter((n: number) => !isNaN(n))
    .sort((a: number, b: number) => a - b);
  
  // Calculate quantile breaks for color classification
  const q = (p: number) => densities[Math.floor(p * (densities.length - 1))] ?? 0;
  const breaks = [q(0.1), q(0.3), q(0.5), q(0.7), q(0.9)];
  
  // Color mapping function - blue color scheme
  const colorFor = (d: number) => {
    if (isNaN(d)) return '#eee'; // Light gray for missing data
    
    if (d <= breaks[0]) return '#f1eef6';      // Very light purple-blue
    if (d <= breaks[1]) return '#d0d1e6';      // Light purple-blue
    if (d <= breaks[2]) return '#a6bddb';      // Medium purple-blue
    if (d <= breaks[3]) return '#74a9cf';      // Medium blue
    if (d <= breaks[4]) return '#2b8cbe';      // Dark blue
    return '#045a8d';                           // Very dark blue
  };
  
  // Return styling function
  return (feature: any) => ({
    fillColor: colorFor(Number(feature.properties?.density)),
    weight: 0.5,
    color: '#666',
    fillOpacity: 0.55
  });
}

/**
 * DensityChoropleth Component
 * 
 * Renders population density as a choropleth overlay on the map.
 * Only renders if population data is available.
 */
export const DensityChoropleth: React.FC<{ populationFC?: FC }> = ({ populationFC }) => {
  // Memoize the styling function to avoid recalculating on every render
  const style = useMemo(() => 
    populationFC ? makeChoroplethStyler(populationFC.features as any[]) : undefined, 
    [populationFC]
  );
  
  // Don't render if no data or style function
  if (!populationFC || !style) return null;
  
  return (
    <GeoJSON 
      data={populationFC as any} 
      style={style as any} 
    />
  );
};
