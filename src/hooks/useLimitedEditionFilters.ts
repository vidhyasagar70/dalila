import { useMemo } from "react";
import type { FilterParams } from "@/types/diamond.types";

interface CaratRangeValue {
  min: string;
  max: string;
}

interface UseLimitedEditionFiltersProps {
  searchTerm?: string;
  selectedShape?: string[];
  selectedColor?: string[];
  selectedCaratRanges?: CaratRangeValue[];
  selectedFluor?: string[];
  selectedClarity?: string[];
  selectedCut?: string;
  selectedPolish?: string;
  selectedSymmetry?: string;
  selectedLabs?: string[];
}

export const useLimitedEditionFilters = ({
  searchTerm = "",
  selectedShape = [],
  selectedColor = [],
  selectedCaratRanges = [],
  selectedFluor = [],
  selectedClarity = [],
  selectedCut = "",
  selectedPolish = "",
  selectedSymmetry = "",
  selectedLabs = [],
}: UseLimitedEditionFiltersProps) => {
  const filters: FilterParams = useMemo(() => {
    const result: FilterParams = {};

    if (searchTerm && searchTerm.trim()) {
      result.searchTerm = searchTerm.trim();
    }

    if (Array.isArray(selectedShape) && selectedShape.length > 0) {
      result.shape = selectedShape.join(",");
    }

    if (Array.isArray(selectedColor) && selectedColor.length > 0) {
      result.color = selectedColor.join(",");
    }

    if (Array.isArray(selectedCaratRanges) && selectedCaratRanges.length > 0) {
      // Use min of all mins and max of all maxes for API filter
      const minVals = selectedCaratRanges.map((r) => parseFloat(r.min)).filter((v) => !isNaN(v));
      const maxVals = selectedCaratRanges.map((r) => parseFloat(r.max)).filter((v) => !isNaN(v));
      if (minVals.length > 0) result.minCarats = Math.min(...minVals);
      if (maxVals.length > 0) result.maxCarats = Math.max(...maxVals);
    }

    if (Array.isArray(selectedFluor) && selectedFluor.length > 0) {
      result.fluorescence = selectedFluor.join(",");
    }

    if (Array.isArray(selectedClarity) && selectedClarity.length > 0) {
      result.clarity = selectedClarity.join(",");
    }

    if (selectedCut && selectedCut.trim()) {
      result.cut = selectedCut.trim();
    }

    if (selectedPolish && selectedPolish.trim()) {
      result.polish = selectedPolish.trim();
    }

    if (selectedSymmetry && selectedSymmetry.trim()) {
      result.symmetry = selectedSymmetry.trim();
    }

    if (Array.isArray(selectedLabs) && selectedLabs.length > 0) {
      result.lab = selectedLabs.join(",");
    }

    return result;
  }, [
    searchTerm,
    selectedShape,
    selectedColor,
    selectedCaratRanges,
    selectedFluor,
    selectedClarity,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedLabs,
  ]);

  return { filters };
};

