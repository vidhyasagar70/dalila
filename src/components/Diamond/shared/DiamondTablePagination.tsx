import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPageNumbers } from '@/utils/helpers';
import { Maven_Pro } from 'next/font/google';

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

interface DiamondTablePaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  paginationInfo: {
    start: number;
    end: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  disabled?: boolean;
}

export const DiamondTablePagination: React.FC<DiamondTablePaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  paginationInfo,
  onPageChange,
  onRowsPerPageChange,
  disabled = false
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div
      className={`px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-shrink-0 ${mavenPro.className}`}
      style={{
        background: "linear-gradient(to right, #faf6eb 0%, #faf6eb 100%)",
      }}
    >
      <div className="text-sm text-gray-700 font-medium">
        Showing {paginationInfo.start} to {paginationInfo.end} of{" "}
        {paginationInfo.total.toLocaleString()} diamonds
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 font-medium">
            Rows per page
          </span>
          <select
            className="border border-gray-300 rounded-none px-3 py-1.5 text-sm text-gray-800 bg-white cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#070b3a] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            value={rowsPerPage}
            disabled={disabled}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#070b3a] transition-colors"
            title="Previous page"
          >
            <ChevronLeft size={16} className="text-[#070b3a]" />
          </button>

          <span className="text-sm text-gray-700 font-medium px-2">
            Page {currentPage} of {totalPages}
          </span>

          {pageNumbers.map((page, idx) => {
            if (page === "start-ellipsis") {
              return (
                <button
                  key="start-ellipsis"
                  onClick={() => onPageChange(Math.max(1, currentPage - 5))}
                  className="w-7 h-7 rounded-none text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Jump back 5 pages"
                  disabled={disabled}
                >
                  ...
                </button>
              );
            }
            if (page === "end-ellipsis") {
              return (
                <button
                  key="end-ellipsis"
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 5))}
                  className="w-7 h-7 rounded-none text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Jump forward 5 pages"
                  disabled={disabled}
                >
                  ...
                </button>
              );
            }
            return (
              <button
                key={`page-${page}-${idx}`}
                onClick={() => onPageChange(page as number)}
                className={`w-7 h-7 rounded-none text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#070b3a] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={`Go to page ${page}`}
                disabled={disabled}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#070b3a] transition-colors"
            title="Next page"
          >
            <ChevronRight size={16} className="text-[#070b3a]" />
          </button>
        </div>
      </div>
    </div>
  );
};


