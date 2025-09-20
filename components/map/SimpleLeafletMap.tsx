'use client'

import React, { useEffect, useRef } from 'react';
import type { DataBundle } from './types';

/**
 * SimpleLeafletMap Component
 * 
 * A simplified map component that uses direct Leaflet API instead of react-leaflet
 * to avoid dynamic import and SSR issues. This should be more reliable.
 */

interface SimpleLeafletMapProps {
  data: DataBundle;
  year: number;
  showGroceries: boolean;
  showPharmacies: boolean;
  showMarkets: boolean;
  radiusMeters: number;
}

export default function SimpleLeafletMap({
  data,
  year,
  showGroceries,
  showPharmacies,
  showMarkets,
  radiusMeters
}: SimpleLeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map first
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Dynamically import Leaflet only on client side
    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;
        
        // Import Leaflet CSS only once
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(cssLink);
        }

        // Create map instance
        const map = L.map(mapRef.current!, {
          center: [47.6062, -122.3321], // Seattle coordinates
          zoom: 12, // Increased zoom to focus on Seattle
          scrollWheelZoom: true,
          maxZoom: 18,
          minZoom: 10 // Prevent zooming out too far
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        mapInstanceRef.current = map;

        // Add data layers
        addDataLayers(map, L);

        // Force map to render properly
        setTimeout(() => {
          map.invalidateSize();
        }, 100);

      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [data, year, showGroceries, showPharmacies, showMarkets, radiusMeters]);

  const addDataLayers = (map: any, L: any) => {
    // Clear existing layers
    map.eachLayer((layer: any) => {
      if (layer._url) return; // Keep tile layer
      map.removeLayer(layer);
    });

    // Get data for selected year
    const popData = data.populationPolys[year as keyof typeof data.populationPolys];
    const groceryData = data.groceries[year as keyof typeof data.groceries];
    const pharmacyData = data.pharmacies[year as keyof typeof data.pharmacies];
    const marketData = data.markets?.[year as keyof typeof data.markets];

    console.log('DEBUG - Adding layers for year:', year);
    console.log('DEBUG - Population data:', popData);
    console.log('DEBUG - Grocery data:', groceryData);
    console.log('DEBUG - Pharmacy data:', pharmacyData);
    console.log('DEBUG - Market data:', marketData);

    // Add city boundary layer
    if (data.cityBoundary) {
      const cityLayer = L.geoJSON(data.cityBoundary, {
        style: {
          color: '#dc2626', // Red border
          weight: 2,
          fillColor: 'transparent',
          fillOpacity: 0
        },
        onEachFeature: (feature: any, layer: any) => {
          layer.bindPopup(`<b>${feature.properties.name || 'City Boundary'}</b>`);
        }
      }).addTo(map);
      console.log('DEBUG - Added city boundary layer');
    }

    // Add population density layer (constrained to city boundary)
    if (popData) {
      try {
        const turf = require('@turf/turf');
        
        // Process each population polygon and constrain to city boundary
        const constrainedFeatures = popData.features.map((feature: any) => {
          if (data.cityBoundary) {
            try {
              // Intersect each population polygon with city boundary
              const constrained = turf.intersect(feature, data.cityBoundary);
              if (constrained) {
                return {
                  ...constrained,
                  properties: feature.properties // Preserve original properties
                };
              }
            } catch (error) {
              console.warn('Failed to constrain population polygon:', error);
            }
          }
          return feature; // Fallback to original if intersection fails
        }).filter(Boolean); // Remove any null/undefined results

        const constrainedPopData = {
          type: 'FeatureCollection',
          features: constrainedFeatures
        };

        const popLayer = L.geoJSON(constrainedPopData, {
          style: (feature: any) => ({
            fillColor: getDensityColor(feature.properties.density),
            weight: 1,
            color: '#2563eb', // Blue border
            fillOpacity: 0.3 // Reduced opacity
          }),
          onEachFeature: (feature: any, layer: any) => {
            const density = feature.properties.density || 0;
            layer.bindPopup(`<b>Population Density</b><br/>${density.toLocaleString()} people/sq mi`);
          }
        }).addTo(map);
        
        console.log('DEBUG - Added constrained population density layer with', constrainedFeatures.length, 'polygons');
      } catch (error) {
        console.warn('Failed to process population density:', error);
        // Fallback to original rendering
        const popLayer = L.geoJSON(popData, {
          style: (feature: any) => ({
            fillColor: getDensityColor(feature.properties.density),
            weight: 1,
            color: '#2563eb',
            fillOpacity: 0.3
          }),
          onEachFeature: (feature: any, layer: any) => {
            const density = feature.properties.density || 0;
            layer.bindPopup(`<b>Population Density</b><br/>${density.toLocaleString()} people/sq mi`);
          }
        }).addTo(map);
      }
    }

    // Add access coverage buffers first (so POIs appear on top)
    addAccessBuffers(map, L, groceryData, pharmacyData, marketData);

    // Add POI layers
    if (showGroceries && groceryData) {
      const groceryLayer = L.geoJSON(groceryData, {
        pointToLayer: (feature: any, latlng: any) => {
          return L.circleMarker(latlng, {
            radius: 5,
            color: '#1f9d55',
            weight: 1,
            fillOpacity: 0.9
          });
        },
        onEachFeature: (feature: any, layer: any) => {
          const name = feature.properties?.name || 'Grocery Store';
          layer.bindPopup(`<b>${name}</b>`);
        }
      }).addTo(map);
    }

    if (showPharmacies && pharmacyData) {
      const pharmacyLayer = L.geoJSON(pharmacyData, {
        pointToLayer: (feature: any, latlng: any) => {
          return L.circleMarker(latlng, {
            radius: 5,
            color: '#e3342f',
            weight: 1,
            fillOpacity: 0.9
          });
        },
        onEachFeature: (feature: any, layer: any) => {
          const name = feature.properties?.name || 'Pharmacy';
          layer.bindPopup(`<b>${name}</b>`);
        }
      }).addTo(map);
    }

    if (showMarkets && marketData) {
      const marketLayer = L.geoJSON(marketData, {
        pointToLayer: (feature: any, latlng: any) => {
          return L.circleMarker(latlng, {
            radius: 5,
            color: '#f59e0b',
            weight: 1,
            fillOpacity: 0.9
          });
        },
        onEachFeature: (feature: any, layer: any) => {
          const name = feature.properties?.name || 'Farmers Market';
          layer.bindPopup(`<b>${name}</b>`);
        }
      }).addTo(map);
    }
  };

  const addAccessBuffers = (map: any, L: any, groceryData: any, pharmacyData: any, marketData: any) => {
    try {
      // Use require for turf to avoid TypeScript issues
      const turf = require('@turf/turf');
      const buffers: any[] = [];
      
      // Create buffers around enabled POIs
      if (showGroceries && groceryData) {
        groceryData.features.forEach((feature: any) => {
          if (feature.geometry?.type === 'Point') {
            const buffer = turf.buffer(feature, radiusMeters, { units: 'meters' });
            buffers.push(buffer);
          }
        });
      }
      
      if (showPharmacies && pharmacyData) {
        pharmacyData.features.forEach((feature: any) => {
          if (feature.geometry?.type === 'Point') {
            const buffer = turf.buffer(feature, radiusMeters, { units: 'meters' });
            buffers.push(buffer);
          }
        });
      }
      
      if (showMarkets && marketData) {
        marketData.features.forEach((feature: any) => {
          if (feature.geometry?.type === 'Point') {
            const buffer = turf.buffer(feature, radiusMeters, { units: 'meters' });
            buffers.push(buffer);
          }
        });
      }
      
      // Union all buffers to create coverage area
      if (buffers.length > 0) {
        let coverage = buffers[0];
        for (let i = 1; i < buffers.length; i++) {
          coverage = turf.union(coverage, buffers[i]);
        }
        
        // Constrain coverage to city boundary to prevent water coverage
        if (data.cityBoundary) {
          try {
            coverage = turf.intersect(coverage, data.cityBoundary);
          } catch (error) {
            console.warn('Failed to intersect with city boundary:', error);
          }
        }
        
        // Add coverage layer (green)
        const coverageLayer = L.geoJSON(coverage, {
          style: {
            color: '#16a34a',
            weight: 1,
            fillColor: '#22c55e',
            fillOpacity: 0.15
          }
        }).addTo(map);
        
        // Add food desert areas (areas outside coverage but within city)
        if (data.cityBoundary && coverage) {
          try {
            const desert = turf.difference(data.cityBoundary, coverage);
            const desertLayer = L.geoJSON(desert, {
              style: {
                color: '#111827',
                weight: 0.6,
                fillColor: '#111827',
                fillOpacity: 0.08
              }
            }).addTo(map);
            console.log('DEBUG - Added food desert areas');
          } catch (error) {
            console.warn('Failed to create food desert areas:', error);
          }
        }
        
        console.log('DEBUG - Added access coverage buffers');
      }
    } catch (error) {
      console.warn('Failed to create access buffers:', error);
    }
  };

  const getDensityColor = (density: number) => {
    if (!density || isNaN(density)) return '#eee';
    
    if (density <= 5000) return '#f1eef6';
    if (density <= 8000) return '#d0d1e6';
    if (density <= 10000) return '#a6bddb';
    if (density <= 12000) return '#74a9cf';
    if (density <= 15000) return '#2b8cbe';
    return '#045a8d';
  };

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ height: '85vh', minHeight: '500px' }}
    />
  );
}
