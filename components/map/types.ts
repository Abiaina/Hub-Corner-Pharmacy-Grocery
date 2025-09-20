/**
 * TypeScript types for the Seattle Access Map components
 * 
 * This file defines the core data structures and interfaces used throughout
 * the map system. It provides type safety and clear contracts between components.
 */

// Year keys for temporal data
export type YearKey = 2015 | 2020 | 2025;

// GeoJSON FeatureCollection shorthand
export type FC = GeoJSON.FeatureCollection;

// Map of years to FeatureCollections for temporal data
export type YearMap = { 
  2015?: FC; 
  2020?: FC; 
  2025?: FC; 
};

/**
 * Main data bundle interface - contains all the data needed for the map
 * 
 * This interface defines the structure of data that the main map component expects.
 * Each property represents a different type of geographic data:
 * - cityBoundary: The city limits polygon
 * - populationPolys: Census tracts with population density data
 * - groceries: Grocery store locations
 * - pharmacies: Pharmacy locations  
 * - markets: Farmers market locations (optional)
 */
export interface DataBundle {
  cityBoundary: FC;              // polygon/multipolygon defining city limits
  populationPolys: YearMap;      // polygons with properties.density (number)
  groceries: YearMap;            // points with properties.name
  pharmacies: YearMap;           // points with properties.name
  markets?: YearMap;             // points with properties.name (optional)
}

/**
 * Controls state interface - manages all user interface state
 * 
 * This interface defines the state that controls the map visualization:
 * - year: Which year's data to display
 * - showGroceries/showPharmacies/showMarkets: Layer visibility toggles
 * - includeMarkets: Whether to include markets in access calculations
 * - radiusMeters: Buffer radius for access calculations (800m ≈ 0.5 mile)
 */
export interface ControlsState {
  year: YearKey;
  showGroceries: boolean;
  showPharmacies: boolean;
  showMarkets: boolean;
  includeMarkets: boolean; // markets often limited hours → optional access
  radiusMeters: number;    // 800 ≈ 0.5 mile
}

/**
 * Access overlay result interface
 * 
 * Used internally by AccessOverlay component to structure the results
 * of buffer calculations and desert identification.
 */
export interface AccessResult {
  accessUnion: GeoJSON.FeatureCollection | null;
  desert: GeoJSON.FeatureCollection | null;
}

/**
 * POI category type
 * 
 * Defines the types of points of interest that can be displayed on the map.
 */
export type POICategory = 'grocery' | 'pharmacy' | 'market';

/**
 * Layer visibility state
 * 
 * Used by AccessOverlay to determine which layers to include in access calculations.
 */
export interface LayerVisibility {
  groceries: boolean;
  pharmacies: boolean;
  markets: boolean;
}
