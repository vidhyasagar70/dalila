import React, { useMemo } from 'react';
import { DiamondTableHeader } from './DiamondTableHeader';
import { DiamondTableRow } from './DiamondTableRow';
import type { DiamondData } from '@/types/diamond.types';

interface DiamondTableProps {
  diamonds: DiamondData[];
  selectedRows: Set<string>;
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onRowSelect: (id: string, checked: boolean) => void;
  onStockIdClick: (e: React.MouseEvent, diamond: DiamondData) => void;
}

/**
 * DiamondTable Component
 * Main table wrapper that assembles header and rows
 * Handles all table display logic including sticky columns
 */
export const DiamondTable: React.FC<DiamondTableProps> = ({
  diamonds,
  selectedRows,
  selectAll,
  onSelectAll,
  onRowSelect,
  onStockIdClick
}) => {
  // Calculate sticky column offsets
  const stickyOffsets = useMemo(() => {
    let currentOffset = 0;
    const offsets = {
      checkbox: 0,
      stockId: 0,
      loc: 0,
      status: 0,
      shape: 0,
      carat: 0,
      color: 0,
      clarity: 0,
    };

    // Checkbox column: 48px
    offsets.checkbox = currentOffset;
    currentOffset += 48;

    // Stock ID column: 100px
    offsets.stockId = currentOffset;
    currentOffset += 100;

    // Location column: 50px
    offsets.loc = currentOffset;
    currentOffset += 50;

    // Status column: 60px
    offsets.status = currentOffset;
    currentOffset += 60;

    // Shape column: 75px
    offsets.shape = currentOffset;
    currentOffset += 75;

    // Carat column: 64px
    offsets.carat = currentOffset;
    currentOffset += 64;

    // Color column: 64px
    offsets.color = currentOffset;
    currentOffset += 64;

    // Clarity column: 80px
    offsets.clarity = currentOffset;

    return offsets;
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full [&_th]:!border-none [&_td]:!border-none [&_th]:!outline-none [&_td]:!outline-none [&_th]:!shadow-none [&_td]:!shadow-none" style={{ tableLayout: 'auto', borderSpacing: 0, borderCollapse: 'collapse', border: 'none' }}>
        <DiamondTableHeader
          selectAll={selectAll}
          onSelectAll={onSelectAll}
          stickyOffsets={stickyOffsets}
        />
        <tbody style={{ borderTop: 'none' }}>
          {diamonds.map((diamond, index) => (
            <DiamondTableRow
              key={diamond._id}
              diamond={diamond}
              index={index}
              isSelected={selectedRows.has(diamond._id)}
              stickyOffsets={stickyOffsets}
              onCheckboxChange={onRowSelect}
              onStockIdClick={onStockIdClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

