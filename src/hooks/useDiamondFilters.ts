import { useMemo } from 'react';
import { getLocationApiValues, getLabApiValues } from '@/components/Filters/PriceAndLocationFilter';

interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

interface FilterInputs {
  searchTerm?: string;
  selectedShape?: string[];
  selectedColor?: string[];
  selectedMinCarat?: string;
  selectedMaxCarat?: string;
  selectedFluor?: string[];
  selectedClarity?: string[];
  selectedCut?: string;
  selectedPolish?: string;
  selectedSymmetry?: string;
  selectedLocations?: string[];
  selectedLabs?: string[];
  keySymbolFilters?: { keyToSymbol: string[] };
  inclusionFilters?: {
    centerBlack: string[];
    centerWhite: string[];
    sideBlack: string[];
    sideWhite: string[];
  };
  priceFilters?: {
    pricePerCarat: { from: string; to: string };
    discount: { from: string; to: string };
    totalPrice: { from: string; to: string };
  };
  measurementFilters?: {
    length?: { from: string; to: string };
    width?: { from: string; to: string };
    depth?: { from: string; to: string };
    table?: { from: string; to: string };
    depthPercent?: { from: string; to: string };
    pavAngle?: { from: string; to: string };
    pavHeight?: { from: string; to: string };
    crAngle?: { from: string; to: string };
    crHeight?: { from: string; to: string };
  };
}

/**
 * Custom hook to build API filter parameters from UI filter inputs
 * Converts user-selected filters into API-compatible format
 * Only includes filters that have values
 */
export const useDiamondFilters = (inputs: FilterInputs) => {
  // Destructure inputs for stable dependencies
  const {
    searchTerm,
    selectedShape,
    selectedColor,
    selectedMinCarat,
    selectedMaxCarat,
    selectedFluor,
    selectedClarity,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedLocations,
    selectedLabs,
    keySymbolFilters,
    inclusionFilters,
    priceFilters,
    measurementFilters
  } = inputs;

  const filters = useMemo(() => {
    const apiFilters: FilterParams = {};

    // Check which filters have values
    const hasSearchTerm = searchTerm && searchTerm.trim();
    const hasShapeFilter = Array.isArray(selectedShape) && selectedShape.length > 0;
    const hasColorFilter = Array.isArray(selectedColor) && selectedColor.length > 0;
    const hasCaratFilter = 
      (selectedMinCarat && selectedMinCarat.trim()) ||
      (selectedMaxCarat && selectedMaxCarat.trim());
    const hasFluorFilter = Array.isArray(selectedFluor) && selectedFluor.length > 0;
    const hasClarityFilter = selectedClarity && selectedClarity.length > 0;
    const hasCutFilter = selectedCut && selectedCut.trim();
    const hasPolishFilter = selectedPolish && selectedPolish.trim();
    const hasSymmetryFilter = selectedSymmetry && selectedSymmetry.trim();
    const hasLocationFilter = Array.isArray(selectedLocations) && selectedLocations.length > 0;
    const hasLabFilter = Array.isArray(selectedLabs) && selectedLabs.length > 0;
    
    // Basic filters
    if (hasSearchTerm) apiFilters.searchTerm = searchTerm!.trim();
    if (hasShapeFilter) apiFilters.shape = selectedShape!.join(',');
    if (hasColorFilter) apiFilters.color = selectedColor!.join(',');
    
    // Carat range filter
    if (hasCaratFilter) {
      if (selectedMinCarat && selectedMinCarat.trim()) {
        apiFilters.minCarats = parseFloat(selectedMinCarat);
      }
      if (selectedMaxCarat && selectedMaxCarat.trim()) {
        apiFilters.maxCarats = parseFloat(selectedMaxCarat);
      }
    }
    
    if (hasFluorFilter) apiFilters.fluorescence = selectedFluor!.join(',');
    if (hasClarityFilter) apiFilters.clarity = selectedClarity!.join(',');
    if (hasCutFilter) apiFilters.cut = selectedCut!.trim();
    if (hasPolishFilter) apiFilters.polish = selectedPolish!.trim();
    if (hasSymmetryFilter) apiFilters.symmetry = selectedSymmetry!.trim();
    
    // Location and Lab filters
    if (hasLocationFilter) {
      const apiLocationValues = getLocationApiValues(selectedLocations!);
      apiFilters.location = apiLocationValues.join(',');
    }
    if (hasLabFilter) {
      const apiLabValues = getLabApiValues(selectedLabs!);
      apiFilters.lab = apiLabValues.join(',');
    }

    // Inclusion filters
    if (inclusionFilters) {
      const { centerBlack, centerWhite, sideBlack, sideWhite } = inclusionFilters;
      if (centerBlack.length > 0) apiFilters.CN = centerBlack.join(',');
      if (centerWhite.length > 0) apiFilters.CW = centerWhite.join(',');
      if (sideBlack.length > 0) apiFilters.SN = sideBlack.join(',');
      if (sideWhite.length > 0) apiFilters.SW = sideWhite.join(',');
    }

    // Key Symbol filters
    if (keySymbolFilters && keySymbolFilters.keyToSymbol.length > 0) {
      apiFilters.keyToSymbols = keySymbolFilters.keyToSymbol.join(',');
    }

    // Price filters
    if (priceFilters) {
      const { pricePerCarat, discount, totalPrice } = priceFilters;
      if (pricePerCarat.from && pricePerCarat.from.trim()) {
        apiFilters.netRateMin = parseFloat(pricePerCarat.from);
      }
      if (pricePerCarat.to && pricePerCarat.to.trim()) {
        apiFilters.netRateMax = parseFloat(pricePerCarat.to);
      }
      if (discount.from && discount.from.trim()) {
        apiFilters.discPerMin = parseFloat(discount.from);
      }
      if (discount.to && discount.to.trim()) {
        apiFilters.discPerMax = parseFloat(discount.to);
      }
      if (totalPrice.from && totalPrice.from.trim()) {
        apiFilters.netValueMin = parseFloat(totalPrice.from);
      }
      if (totalPrice.to && totalPrice.to.trim()) {
        apiFilters.netValueMax = parseFloat(totalPrice.to);
      }
    }

    // Measurement filters
    if (measurementFilters) {
      const m = measurementFilters;
      
      if (m.length?.from && m.length.from.trim()) apiFilters.lengthMin = parseFloat(m.length.from);
      if (m.length?.to && m.length.to.trim()) apiFilters.lengthMax = parseFloat(m.length.to);
      
      if (m.width?.from && m.width.from.trim()) apiFilters.widthMin = parseFloat(m.width.from);
      if (m.width?.to && m.width.to.trim()) apiFilters.widthMax = parseFloat(m.width.to);
      
      if (m.depth?.from && m.depth.from.trim()) apiFilters.depthMin = parseFloat(m.depth.from);
      if (m.depth?.to && m.depth.to.trim()) apiFilters.depthMax = parseFloat(m.depth.to);
      
      if (m.table?.from && m.table.from.trim()) apiFilters.tablePerMin = parseFloat(m.table.from);
      if (m.table?.to && m.table.to.trim()) apiFilters.tablePerMax = parseFloat(m.table.to);
      
      if (m.depthPercent?.from && m.depthPercent.from.trim()) apiFilters.depthPerMin = parseFloat(m.depthPercent.from);
      if (m.depthPercent?.to && m.depthPercent.to.trim()) apiFilters.depthPerMax = parseFloat(m.depthPercent.to);
      
      if (m.pavAngle?.from && m.pavAngle.from.trim()) apiFilters.pavillionAngleMin = parseFloat(m.pavAngle.from);
      if (m.pavAngle?.to && m.pavAngle.to.trim()) apiFilters.pavillionAngleMax = parseFloat(m.pavAngle.to);
      
      if (m.pavHeight?.from && m.pavHeight.from.trim()) apiFilters.pavillionHeightMin = parseFloat(m.pavHeight.from);
      if (m.pavHeight?.to && m.pavHeight.to.trim()) apiFilters.pavillionHeightMax = parseFloat(m.pavHeight.to);
      
      if (m.crAngle?.from && m.crAngle.from.trim()) apiFilters.crownAngleMin = parseFloat(m.crAngle.from);
      if (m.crAngle?.to && m.crAngle.to.trim()) apiFilters.crownAngleMax = parseFloat(m.crAngle.to);
      
      if (m.crHeight?.from && m.crHeight.from.trim()) apiFilters.crownHeightMin = parseFloat(m.crHeight.from);
      if (m.crHeight?.to && m.crHeight.to.trim()) apiFilters.crownHeightMax = parseFloat(m.crHeight.to);
    }

    return apiFilters;
  }, [
    searchTerm,
    selectedShape,
    selectedColor,
    selectedMinCarat,
    selectedMaxCarat,
    selectedFluor,
    selectedClarity,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedLocations,
    selectedLabs,
    keySymbolFilters,
    inclusionFilters,
    priceFilters,
    measurementFilters
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

