'use client'

import React from 'react';
import { GeoJSON, CircleMarker } from 'react-leaflet';
import type { FC, POICategory } from './types';

/**
 * POILayer Component
 * 
 * This component renders Points of Interest (POIs) on the map as colored circle markers.
 * It supports three categories: grocery stores, pharmacies, and farmers markets.
 * 
 * Features:
 * - Color-coded markers by category (green=groceries, red=pharmacies, amber=markets)
 * - Consistent styling with small circles and popups
 * - Uses CircleMarker to avoid Leaflet icon bundling issues
 * - Shows feature names in popups
 * 
 * Props:
 * - data: GeoJSON FeatureCollection containing POI data
 * - category: Type of POI ('grocery', 'pharmacy', or 'market')
 */

/**
 * Color mapping for different POI categories
 * 
 * @param category The type of POI
 * @returns Hex color code for the category
 */
const pointColor = (category: POICategory): string => {
  const colorMap = {
    grocery: '#1f9d55',   // Green for grocery stores
    pharmacy: '#e3342f',  // Red for pharmacies  
    market: '#f59e0b'     // Amber for farmers markets
  };
  return colorMap[category];
};

/**
 * POILayer Component
 * 
 * Renders a layer of Points of Interest as colored circle markers.
 * Each marker shows a popup with the feature name when clicked.
 */
export const POILayer: React.FC<{ 
  data?: FC; 
  category: POICategory 
}> = ({ data, category }) => {
  // Don't render if no data
  if (!data) return null;
  
  return (
    <GeoJSON
      data={data as any}
      pointToLayer={(feature: any, latlng: any) => {
        // @ts-ignore
        return L.circleMarker(latlng, {
          radius: 5,
          color: pointColor(category),
          weight: 1,
          fillOpacity: 0.9
        });
      }}
      onEachFeature={(feature: any, layer: any) => {
        // Extract name from properties, fallback to category if not available
        const name = feature.properties?.name || category;
        
        // Bind popup with the feature name
        layer.bindPopup(`<b>${name}</b>`);
      }}
    />
  );
};
