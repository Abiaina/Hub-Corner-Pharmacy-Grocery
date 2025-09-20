'use client'

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { FC as GFC } from './types';

// Component to ensure map renders properly after dynamic import
const MapInitializer = () => {
  const map = useMap();
  
  useEffect(() => {
    // Force map to invalidate size and render properly
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  
  return null;
};

/**
 * BaseMap Component
 * 
 * This component provides the foundational map container with:
 * - OpenStreetMap tiles
 * - Configurable center point (defaults to Seattle)
 * - Automatic fitting to GeoJSON bounds
 * - Scroll wheel zoom enabled
 * 
 * Props:
 * - center: Map center coordinates [lat, lng]
 * - children: React components to render inside the map
 * - fit: GeoJSON data to automatically fit the map bounds to
 */
export const BaseMap: React.FC<{ 
  center?: [number, number]; 
  children?: React.ReactNode; 
  fit?: GFC | null 
}> = ({ 
  center = [47.6062, -122.3321], // Seattle coordinates
  children, 
  fit = null 
}) => {
  return (
    <MapContainer 
      className="w-full h-full" 
      center={center} 
      zoom={11} 
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapInitializer />
      {fit && <FitToGeoJSON data={fit as any} />}
      {children}
    </MapContainer>
  );
};

/**
 * FitToGeoJSON Component
 * 
 * A utility component that automatically fits the map bounds to a GeoJSON object.
 * This is useful for ensuring the entire dataset is visible when the map loads.
 * 
 * Props:
 * - data: GeoJSON object to fit bounds to
 */
export const FitToGeoJSON: React.FC<{ data: GeoJSON.GeoJsonObject | null }> = ({ data }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!data) return;
    
    try {
      // Create a temporary GeoJSON layer to get bounds
      // @ts-ignore - L is available globally from Leaflet
      const layer = (L as any).geoJSON(data);
      const bounds = layer.getBounds();
      
      // Only fit bounds if they are valid
      if (bounds && bounds.isValid()) {
        map.fitBounds(bounds, { 
          padding: [20, 20],
          maxZoom: 15 // Prevent zooming out too far
        });
      }
    } catch (error) {
      console.warn('Failed to fit bounds to GeoJSON:', error);
    }
  }, [data, map]);
  
  return null;
};
