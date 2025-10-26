import React from "react";
import Image from "next/image";
import { X, ArrowLeft } from "lucide-react";

interface DiamondData {
  _id: string;
  REAL_IMAGE?: string;
  STONE_NO: string;
  STAGE?: string;
  LOCATION?: string;
  REPORT_NO?: string;
  LAB?: string;
  SHAPE?: string;
  CARATS?: string | number;
  COLOR?: string;
  CLARITY?: string;
  CUT?: string;
  POL?: string;
  SYM?: string;
  FLOUR?: string;
  RAP_PRICE?: string | number;
  MEASUREMENTS?: string;
  TABLE_PER?: string | number;
  DEPTH_PER?: string | number;
  CROWN_ANGLE?: string | number;
  CROWN_HEIGHT?: string | number;
  PAVILLION_ANGLE?: string | number;
  PAVILLION_HEIGHT?: string | number;
  DISC_PER?: string | number;
  NET_RATE?: string | number;
  NET_VALUE?: string | number;
  KEY_TO_SYMBOLS?: string;
  REPORT_COMMENTS?: string;
  COMMENTS_1?: string;
  HA?: string;
  REPORT_DATE?: string;
}

interface DiamondComparisonPageProps {
  diamonds: DiamondData[];
  onClose: () => void;
}

const DiamondComparisonPage: React.FC<DiamondComparisonPageProps> = ({
  diamonds,
  onClose,
}) => {
  const removeDiamond = (id: string) => {
    console.log("Remove diamond:", id);
  };

  // Helper function to get row styling based on index
  const getRowStyle = (index: number) => {
    if (index === 0) {
      return { bg: "#060c3c", color: "#ffffff" }; // Stage row - dark blue
    }
    return index % 2 === 1 
      ? { bg: "#faf6eb", color: "#060c3c" } // Light cream/beige
      : { bg: "#ffffff", color: "#060c3c" }; // White
  };

  // Define all table rows
  const tableRows = [
    { label: "Stage", key: "STAGE", index: 0 },
    { label: "Packet No", key: "STONE_NO", index: 1 },
    { label: "Location", key: "LOCATION", index: 2 },
    { label: "Report No", key: "REPORT_NO", index: 3 },
    { label: "Lab", key: "LAB", index: 4 },
    { label: "Shape", key: "SHAPE", index: 5 },
    { label: "Wgt", key: "CARATS", index: 6 },
    { label: "Col", key: "COLOR", index: 7 },
    { label: "Clarity", key: "CLARITY", index: 8 },
    { label: "Cut", key: "CUT", index: 9 },
    { label: "Pol", key: "POL", index: 10 },
    { label: "Sym", key: "SYM", index: 11 },
    { label: "Fls", key: "FLOUR", index: 12 },
    { label: "Rap.($)", key: "RAP_PRICE", index: 13 },
    { label: "Length", key: "MEASUREMENTS", index: 14, transform: (val: string) => val?.split("x")[0]?.trim() },
    { label: "Width", key: "MEASUREMENTS", index: 15, transform: (val: string) => val?.split("x")[1]?.trim() },
    { label: "Depth", key: "MEASUREMENTS", index: 16, transform: (val: string) => val?.split("x")[2]?.trim() },
    { label: "Depth %", key: "DEPTH_PER", index: 17 },
    { label: "Table %", key: "TABLE_PER", index: 18 },
    { label: "Disc %", key: "DISC_PER", index: 19 },
    { label: "Net Rate", key: "NET_RATE", index: 20 },
    { label: "Net Value", key: "NET_VALUE", index: 21 },
    { label: "C/A", key: "CROWN_ANGLE", index: 22 },
    { label: "C/H", key: "CROWN_HEIGHT", index: 23 },
    { label: "P/A", key: "PAVILLION_ANGLE", index: 24 },
    { label: "P/H", key: "PAVILLION_HEIGHT", index: 25 },
    { label: "Key To Symbols", key: "KEY_TO_SYMBOLS", index: 26 },
    { label: "Report Comments", key: "REPORT_COMMENTS", index: 27 },
    { label: "Comments 1", key: "COMMENTS_1", index: 28 },
    { label: "Heart & Arrow", key: "HA", index: 29 },
  ];

  return (
    <div 
      className="fixed inset-0 top-35 bg-white z-50 overflow-auto scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Header */}
      <div
        className="bg-[#060c3c] text-white px-6 py-4 sticky top-0 z-50"
        style={{ borderBottom: "1px solid #F9E8CD" }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-medium">Back to List</span>
          </button>
          <h1 className="text-xl font-semibold">Diamond Comparison</h1>
          <div className="w-32"></div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto p-6">
        <div
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          style={{ border: "1px solid #F9E8CD" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-[73px] z-40">
                <tr>
                  <th
                    className="p-4 text-left text-sm font-semibold sticky left-0 z-50 min-w-[150px]"
                    style={{
                      borderRight: "1px solid #F9E8CD",
                      borderBottom: "1px solid #F9E8CD",
                      backgroundColor: "#ffffff",
                      color: "#060c3c",
                    }}
                  >
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-4 text-center relative min-w-[220px]"
                      style={{
                        borderRight: index < diamonds.length - 1 ? "1px solid #F9E8CD" : "none",
                        borderBottom: "1px solid #F9E8CD",
                        backgroundColor: "#ffffff",
                        color: "#060c3c",
                      }}
                    >
                      <button
                        onClick={() => removeDiamond(diamond._id)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                        style={{
                          border: "1px solid #F9E8CD",
                        }}
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                      <div className="flex flex-col items-center gap-3 mt-6">
                        <div
                          className="relative w-32 h-32 bg-white rounded-lg overflow-hidden"
                          style={{
                            border: "1px solid #F9E8CD",
                          }}
                        >
                          {diamond.REAL_IMAGE ? (
                            <Image
                              src={diamond.REAL_IMAGE}
                              alt={diamond.STONE_NO}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              No Image
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => {
                  const style = getRowStyle(row.index);
                  return (
                    <tr key={row.label}>
                      <th
                        className="p-3 text-left text-sm font-medium sticky left-0 z-10"
                        style={{
                          borderRight: "1px solid #F9E8CD",
                          borderBottom: "1px solid #F9E8CD",
                          backgroundColor: style.bg,
                          color: style.color,
                        }}
                      >
                        {row.label}
                      </th>
                      {diamonds.map((diamond, index) => {
                        let value = diamond[row.key as keyof DiamondData] || "N/A";
                        if (row.transform && typeof value === 'string') {
                          value = row.transform(value) || "N/A";
                        }
                        
                        return (
                          <td
                            key={diamond._id}
                            className="p-3 text-center text-sm"
                            style={{
                              borderRight:
                                index < diamonds.length - 1
                                  ? "1px solid #F9E8CD"
                                  : "none",
                              borderBottom: "1px solid #F9E8CD",
                              backgroundColor: style.bg,
                              color: style.color,
                            }}
                          >
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondComparisonPage;