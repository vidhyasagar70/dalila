import { useState, useCallback } from 'react';

interface SelectableItem {
  _id: string;
}

interface UseDiamondSelectionProps<T extends SelectableItem = SelectableItem> {
  onSelectionChange?: (ids: string[], diamonds: T[]) => void;
}

export const useDiamondSelection = <T extends SelectableItem = SelectableItem>({ 
  onSelectionChange 
}: UseDiamondSelectionProps<T> = {}) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = useCallback((checked: boolean, data: T[]) => {
    if (checked) {
      const allIds = new Set(data.map((row) => row._id));
      setSelectedRows(allIds);
      setSelectAll(true);
      if (onSelectionChange) {
        onSelectionChange(Array.from(allIds), data);
      }
    } else {
      setSelectedRows(new Set());
      setSelectAll(false);
      if (onSelectionChange) {
        onSelectionChange([], []);
      }
    }
  }, [onSelectionChange]);

  const handleRowSelect = useCallback((id: string, checked: boolean, allData: T[]) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
      setSelectAll(false);
    }
    setSelectedRows(newSelected);

    const selected = allData.filter((d) => newSelected.has(d._id));
    if (onSelectionChange) {
      onSelectionChange(Array.from(newSelected), selected);
    }
  }, [selectedRows, onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelectedRows(new Set());
    setSelectAll(false);
    if (onSelectionChange) {
      onSelectionChange([], []);
    }
  }, [onSelectionChange]);

  return {
    selectedRows,
    selectAll,
    handleSelectAll,
    handleRowSelect,
    clearSelection
  };
};


