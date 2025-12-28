import React from 'react';

interface DiamondTableHeaderProps {
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  stickyOffsets: {
    checkbox: number;
    stockId: number;
    loc: number;
    status: number;
    shape: number;
    carat: number;
    color: number;
    clarity: number;
  };
}

/**
 * DiamondTableHeader Component
 * Renders the table header with sticky positioning
 * Includes select-all checkbox
 */
export const DiamondTableHeader: React.FC<DiamondTableHeaderProps> = ({
  selectAll,
  onSelectAll,
  stickyOffsets
}) => {
  /**
   * Base styles for horizontally sticky header cells (Checkbox to Clarity)
   */
  const horizontalStickyHeaderStyle = {
    position: 'sticky' as const,
    top: 0,
    zIndex: 31,
    backgroundColor: '#050C3A',
    whiteSpace: 'nowrap' as const,
    border: 'none',
    borderBottom: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    margin: 0,
    padding: '8px 8px',
  };

  /**
   * Base styles for regular header cells (only sticky at top)
   */
  const regularHeaderStyle = {
    position: 'sticky' as const,
    top: 0,
    zIndex: 30,
    backgroundColor: '#050C3A',
    whiteSpace: 'nowrap' as const,
    border: 'none',
    borderBottom: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    margin: 0,
    padding: '8px 8px',
  };

  return (
    <thead style={{ border: 'none' }}>
      <tr style={{ border: 'none' }}>
        {/* Checkbox Column - Sticky */}
        <th
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.checkbox,
            width: '48px',
            minWidth: '48px',
            maxWidth: '48px',
          }}
        >
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-4 h-4 cursor-pointer [accent-color:#FAF6EB]"
          />
        </th>

        {/* Stock ID Column - Sticky */}
        <th
          className="text-white text-[14px] font-semibold text-left"
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.stockId,
            width: '100px',
            minWidth: '100px',
            maxWidth: '100px',
          }}
        >
          S. ID
        </th>

        {/* Location Column - Sticky */}
        <th
          className="text-white text-[14px] font-semibold"
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.loc,
            width: '50px',
            minWidth: '50px',
            maxWidth: '50px',
          }}
        >
          Loc.
        </th>

        {/* Status Column - Sticky */}
        <th
          className="text-white text-[14px] font-semibold text-left"
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.status,
            width: '60px',
            minWidth: '60px',
            maxWidth: '60px',
          }}
        >
          Status
        </th>

        {/* Shape Column - Sticky */}
        <th
          className="text-white text-[14px] font-semibold text-left"
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.shape,
            width: '75px',
            minWidth: '75px',
            maxWidth: '75px',
          }}
        >
          Shape
        </th>

        {/* Carat Column - Sticky */}
        <th
          className="text-white text-[14px] font-semibold text-left"
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.carat,
            width: '64px',
            minWidth: '64px',
            maxWidth: '64px',
          }}
        >
          Carat
        </th>

        {/* Color Column - Sticky */}
        <th
          className="text-white text-[14px] font-semibold text-left"
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.color,
            width: '64px',
            minWidth: '64px',
            maxWidth: '64px',
          }}
        >
          Color
        </th>

        {/* Clarity Column - Sticky */}
        <th
          className="text-white text-[14px] font-semibold text-left"
          style={{
            ...horizontalStickyHeaderStyle,
            left: stickyOffsets.clarity,
            width: '100px',
            minWidth: '100px',
            maxWidth: '100px',
          }}
        >
          Clarity
        </th>

        {/* Regular Columns (Non-sticky horizontally) */}
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '60px', minWidth: '60px', maxWidth: '60px' }}>
          Cut
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>
          Polish
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '60px', minWidth: '60px', maxWidth: '60px' }}>
          Sym.
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '60px', minWidth: '60px', maxWidth: '60px' }}>
          Fluor
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '60px', minWidth: '60px', maxWidth: '60px' }}>
          Lab
        </th>

        {/* Price Columns */}
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '90px', minWidth: '90px', maxWidth: '90px' }}>
          Rap
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '75px', minWidth: '75px', maxWidth: '75px' }}>
          Disc%
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '90px', minWidth: '90px', maxWidth: '90px' }}>
          Net Rate
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>
          Net Value
        </th>

        {/* Additional Details Columns */}
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '200px', minWidth: '200px', maxWidth: '200px' }}>Comments</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>
          Depth%
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>
          Table%
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>
          Length
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>
          Width
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>
          Depth
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '140px', minWidth: '140px', maxWidth: '140px' }}>Key to Symbols</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '200px', minWidth: '200px', maxWidth: '200px' }}>Report Comments</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '110px', minWidth: '110px', maxWidth: '110px' }}>
          Crown Angle
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '120px', minWidth: '120px', maxWidth: '120px' }}>
          Crown Height
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '130px', minWidth: '130px', maxWidth: '130px' }}>
          Pavillion Angle
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '140px', minWidth: '140px', maxWidth: '140px' }}>
          Pavillion Height
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>CN</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>CW</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>SN</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '100px', minWidth: '100px', maxWidth: '100px' }}>SW</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '160px', minWidth: '160px', maxWidth: '160px' }}>Report No</th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '110px', minWidth: '110px', maxWidth: '110px' }}>
          Report Date
        </th>
        <th className="text-white text-[14px] font-semibold text-left" style={{ ...regularHeaderStyle, width: '110px', minWidth: '110px', maxWidth: '110px' }}>
          Tinge
        </th>
      </tr>
    </thead>
  );
};
