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

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div
        className="bg-[#050C3A] text-white px-6 py-4 sticky top-0 z-50 border-b"
        style={{ borderColor: "#F1E9DC" }}
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
          style={{ border: "1px solid #F1E9DC" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-[73px] z-40">
                <tr>
                  <th
                    className="p-4 text-left text-sm font-semibold text-gray-800 sticky left-0 z-50 min-w-[150px]"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {/* Empty header cell */}
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="bg-gray-50 p-4 text-center relative min-w-[220px]"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      <button
                        onClick={() => removeDiamond(diamond._id)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                        style={{ border: "1px solid #F1E9DC" }}
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                      <div className="flex flex-col items-center gap-3 mt-6">
                        <div
                          className="relative w-32 h-32 bg-white rounded-lg overflow-hidden"
                          style={{ border: "1px solid #F1E9DC" }}
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
                {/* Stage Row */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Stage
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      <span className="inline-block bg-[#050C3A] text-white px-4 py-1.5 rounded text-sm font-semibold">
                        {diamond.STAGE || "N/A"}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Packet No */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Packet No
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.STONE_NO || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Location
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.LOCATION || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Report No */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Report No
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.REPORT_NO || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Lab */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Lab
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.LAB || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Shape */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Shape
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.SHAPE || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Wgt (Carat) */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Wgt
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.CARATS || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Col (Color) */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Col
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.COLOR || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Clarity */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Clarity
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.CLARITY || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Cut */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Cut
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.CUT || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Pol (Polish) */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Pol
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.POL || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Sym (Symmetry) */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Sym
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.SYM || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Fls (Fluorescence) */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Fls
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.FLOUR || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Rap ($) */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Rap.($)
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.RAP_PRICE || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Length */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Length
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.MEASUREMENTS?.split("x")[0]?.trim() || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Width */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Width
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.MEASUREMENTS?.split("x")[1]?.trim() || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Depth */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Depth
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.MEASUREMENTS?.split("x")[2]?.trim() || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Depth % */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Depth %
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.DEPTH_PER || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Table % */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Table %
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.TABLE_PER || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Disc % */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Disc %
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.DISC_PER || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Net Rate */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Net Rate
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.NET_RATE || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Net Value */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Net Value
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.NET_VALUE || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* C/A */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    C/A
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.CROWN_ANGLE || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* C/H */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    C/H
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.CROWN_HEIGHT || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* P/A */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    P/A
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.PAVILLION_ANGLE || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* P/H */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    P/H
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.PAVILLION_HEIGHT || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Key To Symbols */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Key To Symbols
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.KEY_TO_SYMBOLS || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Report Comments */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Report Comments
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.REPORT_COMMENTS || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Comments 1 */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Comments 1
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-gray-50"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.COMMENTS_1 || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Heart & Arrow */}
                <tr>
                  <th
                    className="p-3 text-left text-xs font-semibold text-gray-800 sticky left-0 z-10"
                    style={{
                      borderRight: "1px solid #F1E9DC",
                      borderBottom: "1px solid #F1E9DC",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Heart & Arrow
                  </th>
                  {diamonds.map((diamond, index) => (
                    <td
                      key={diamond._id}
                      className="p-3 text-center text-sm bg-white"
                      style={{
                        borderRight:
                          index < diamonds.length - 1
                            ? "1px solid #F1E9DC"
                            : "none",
                        borderBottom: "1px solid #F1E9DC",
                      }}
                    >
                      {diamond.HA || "N/A"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondComparisonPage;
