import { useMemo } from 'react';

interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

interface InclusionFilters {
  centerBlack: string[];
  centerWhite: string[];
  sideBlack: string[];
  sideWhite: string[];
}

interface KeySymbolFilters {
  keyToSymbol: string[];
}

interface PriceLocationFilters {
  pricePerCarat: { from: string; to: string };
  discount: { from: string; to: string };
  totalPrice: { from: string; to: string };
  locations?: string[];
  labs?: string[];
}

interface MeasurementFilters {
  length?: { from: string; to: string };
  width?: { from: string; to: string };
  depth?: { from: string; to: string };
  table?: { from: string; to: string };
  depthPercent?: { from: string; to: string };
  pavAngle?: { from: string; to: string };
  pavHeight?: { from: string; to: string };
  crAngle?: { from: string; to: string };
  crHeight?: { from: string; to: string };
}

interface FilterInputs {
  shapes?: string[];
  colors?: string[];
  clarities?: string[];
  minCarats?: number;
  maxCarats?: number;
  fluors?: string[];
  cut?: string;
  polish?: string;
  symmetry?: string;
  inclusions?: InclusionFilters;
  keySymbols?: KeySymbolFilters;
  priceFilters?: PriceLocationFilters;
  locations?: string[];
  labs?: string[];
  measurements?: MeasurementFilters;
}

/**
 * Custom hook to build API filter parameters for inventory data
 * Converts user-selected filters into inventory API-compatible format
 * Uses uppercase field names matching the inventory API
 */
export const useInventoryFilters = (inputs: FilterInputs) => {
  // Destructure inputs for stable dependencies
  const {
    shapes,
    colors,
    clarities,
    minCarats,
    maxCarats,
    fluors,
    cut,
    polish,
    symmetry,
    locations,
    labs,
    inclusions,
    keySymbols,
    priceFilters,
    measurements
  } = inputs;

  const filters = useMemo(() => {
    const apiFilters: FilterParams = {};

    // Basic filters - using uppercase field names for inventory API
    if (shapes && shapes.length > 0) {
      apiFilters.SHAPE = shapes;
    }
    if (colors && colors.length > 0) {
      apiFilters.COLOR = colors;
    }
    if (clarities && clarities.length > 0) {
      apiFilters.CLARITY = clarities;
    }
    if (fluors && fluors.length > 0) {
      apiFilters.FLOUR = fluors;
    }
    
    // Carat range
    if (minCarats !== undefined) {
      apiFilters.CARATS_MIN = minCarats;
    }
    if (maxCarats !== undefined) {
      apiFilters.CARATS_MAX = maxCarats;
    }
    
    if (cut) apiFilters.CUT = cut;
    if (polish) apiFilters.POL = polish;
    if (symmetry) apiFilters.SYM = symmetry;
    
    // Location and Lab filters
    if (locations && locations.length > 0) {
      apiFilters.LOCATION = locations;
    }
    if (labs && labs.length > 0) {
      apiFilters.LAB = labs;
    }

    // Inclusion filters
    if (inclusions) {
      const { centerBlack, centerWhite, sideBlack, sideWhite } = inclusions;
      if (centerBlack && centerBlack.length > 0) apiFilters.CN = centerBlack;
      if (centerWhite && centerWhite.length > 0) apiFilters.CW = centerWhite;
      if (sideBlack && sideBlack.length > 0) apiFilters.SN = sideBlack;
      if (sideWhite && sideWhite.length > 0) apiFilters.SW = sideWhite;
    }

    // Key Symbol filters
    if (keySymbols && keySymbols.keyToSymbol && keySymbols.keyToSymbol.length > 0) {
      apiFilters.KEY_TO_SYMBOLS = keySymbols.keyToSymbol;
    }

    // Price filters
    if (priceFilters) {
      const { pricePerCarat, discount, totalPrice } = priceFilters;
      if (pricePerCarat?.from) apiFilters.NET_RATE_MIN = pricePerCarat.from;
      if (pricePerCarat?.to) apiFilters.NET_RATE_MAX = pricePerCarat.to;
      if (discount?.from) apiFilters.DISC_PER_MIN = discount.from;
      if (discount?.to) apiFilters.DISC_PER_MAX = discount.to;
      if (totalPrice?.from) apiFilters.NET_VALUE_MIN = totalPrice.from;
      if (totalPrice?.to) apiFilters.NET_VALUE_MAX = totalPrice.to;
    }

    // Measurement filters
    if (measurements) {
      const m = measurements;
      
      if (m.length?.from) apiFilters.LENGTH_MIN = m.length.from;
      if (m.length?.to) apiFilters.LENGTH_MAX = m.length.to;
      
      if (m.width?.from) apiFilters.WIDTH_MIN = m.width.from;
      if (m.width?.to) apiFilters.WIDTH_MAX = m.width.to;
      
      if (m.depth?.from) apiFilters.DEPTH_MIN = m.depth.from;
      if (m.depth?.to) apiFilters.DEPTH_MAX = m.depth.to;
      
      if (m.table?.from) apiFilters.TABLE_PER_MIN = m.table.from;
      if (m.table?.to) apiFilters.TABLE_PER_MAX = m.table.to;
      
      if (m.depthPercent?.from) apiFilters.DEPTH_PER_MIN = m.depthPercent.from;
      if (m.depthPercent?.to) apiFilters.DEPTH_PER_MAX = m.depthPercent.to;
      
      if (m.pavAngle?.from) apiFilters.PAVILLION_ANGLE_MIN = m.pavAngle.from;
      if (m.pavAngle?.to) apiFilters.PAVILLION_ANGLE_MAX = m.pavAngle.to;
      
      if (m.pavHeight?.from) apiFilters.PAVILLION_HEIGHT_MIN = m.pavHeight.from;
      if (m.pavHeight?.to) apiFilters.PAVILLION_HEIGHT_MAX = m.pavHeight.to;
      
      if (m.crAngle?.from) apiFilters.CROWN_ANGLE_MIN = m.crAngle.from;
      if (m.crAngle?.to) apiFilters.CROWN_ANGLE_MAX = m.crAngle.to;
      
      if (m.crHeight?.from) apiFilters.CROWN_HEIGHT_MIN = m.crHeight.from;
      if (m.crHeight?.to) apiFilters.CROWN_HEIGHT_MAX = m.crHeight.to;
    }

    return apiFilters;
  }, [
    shapes,
    colors,
    clarities,
    minCarats,
    maxCarats,
    fluors,
    cut,
    polish,
    symmetry,
    locations,
    labs,
    inclusions,
    keySymbols,
    priceFilters,
    measurements
  ]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).length > 0;
  }, [filters]);

  return {
    filters,
    hasActiveFilters
  };
};



