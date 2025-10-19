import React from "react";
import Image from "next/image";
import { X, ExternalLink, FileText, Play, Download } from "lucide-react";
import type { DiamondData } from "@/types/Diamondtable";

interface DiamondDetailViewProps {
  diamond: DiamondData;
  onClose: () => void;
}

const DiamondDetailView: React.FC<DiamondDetailViewProps> = ({
  diamond,
  onClose,
}) => {
  const formatCurrency = (value: string | number) => {
    const num = parseFloat(String(value));
    return isNaN(num)
      ? "N/A"
      : `$${num.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
  };

  const formatPercentage = (value: string | number) => {
    const num = parseFloat(String(value));
    return isNaN(num) ? "N/A" : `${num.toFixed(2)}%`;
  };

const formatDate = (date: string | undefined) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#050c3a] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Diamond Details</h2>
            <p className="text-sm text-gray-300 mt-1">
              Stock ID: {diamond.STONE_NO}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(95vh-80px)]">
          {/* LEFT SIDE - Images and Media */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gradient-to-b from-gray-100 to-white rounded-lg border border-gray-200 p-8">
              {diamond.REAL_IMAGE ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={diamond.REAL_IMAGE}
                    alt={diamond.STONE_NO}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'%3ENo Image Available%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              ) : (
                <div className="w-full aspect-square flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Additional Images */}
            {(diamond.ARROW_IMAGE || diamond.HEART_IMAGE) && (
              <div className="grid grid-cols-2 gap-4">
                {diamond.ARROW_IMAGE && (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      Arrow Image
                    </p>
                    <a
                      href={diamond.ARROW_IMAGE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#050c3a] hover:opacity-80 text-sm"
                    >
                      <ExternalLink size={16} />
                      View Image
                    </a>
                  </div>
                )}
                {diamond.HEART_IMAGE && (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      Heart Image
                    </p>
                    <a
                      href={diamond.HEART_IMAGE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#050c3a] hover:opacity-80 text-sm"
                    >
                      <ExternalLink size={16} />
                      View Image
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Media Links */}
            <div className="bg-[#faf6eb] rounded-lg border border-gray-200 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Documents & Media
              </h3>
              {diamond.CERTI_PDF && (
                <a
                  href={diamond.CERTI_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#050c3a] hover:opacity-80 p-2 bg-white rounded border border-gray-200"
                >
                  <FileText size={20} />
                  <span className="text-sm font-medium">
                    View Certificate PDF
                  </span>
                </a>
              )}
              {diamond.MP4 && (
                <a
                  href={diamond.MP4}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#050c3a] hover:opacity-80 p-2 bg-white rounded border border-gray-200"
                >
                  <Play size={20} />
                  <span className="text-sm font-medium">Watch Video</span>
                </a>
              )}
              {diamond.DNA && (
                <a
                  href={diamond.DNA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#050c3a] hover:opacity-80 p-2 bg-white rounded border border-gray-200"
                >
                  <ExternalLink size={20} />
                  <span className="text-sm font-medium">View DNA Report</span>
                </a>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Details */}
          <div className="space-y-4">
            {/* Price Section */}
            <div className="bg-[#faf6eb] rounded-lg border border-gray-200 p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatCurrency(diamond.NET_VALUE)}
                </span>
                {diamond.DISC_PER && (
                  <span className="text-lg font-semibold text-red-600">
                    {formatPercentage(diamond.DISC_PER)} OFF
                  </span>
                )}
              </div>
              {diamond.RAP_PRICE && (
                <p className="text-sm text-gray-600">
                  Rap Price:{" "}
                  <span className="line-through">
                    {formatCurrency(diamond.RAP_PRICE)}
                  </span>
                </p>
              )}
              {diamond.NET_RATE && (
                <p className="text-sm text-gray-600 mt-1">
                  Net Rate: {formatCurrency(diamond.NET_RATE)} per carat
                </p>
              )}
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Shape</p>
                  <p className="font-semibold text-gray-900">{diamond.SHAPE}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Carat Weight</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.CARATS}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Color</p>
                  <p className="font-semibold text-gray-900">{diamond.COLOR}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Clarity</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.CLARITY}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Cut</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.CUT || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Polish</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.POL || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Symmetry</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.SYM || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fluorescence</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.FLOUR || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Certificate Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Lab</p>
                  <p className="font-semibold text-gray-900">{diamond.LAB}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Report Number</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.REPORT_NO}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Report Date</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(diamond.REPORT_DATE)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.LOCATION}
                  </p>
                </div>
              </div>
            </div>

            {/* Measurements & Proportions */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Measurements & Proportions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Measurements</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.MEASUREMENTS || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Table %</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.TABLE_PER || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Depth %</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.DEPTH_PER || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Crown Angle</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.CROWN_ANGLE || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Crown Height</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.CROWN_HEIGHT || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pavilion Angle</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.PAVILLION_ANGLE || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pavilion Height</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.PAVILLION_HEIGHT || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stage</p>
                  <p className="font-semibold text-gray-900">
                    {diamond.STAGE || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Additional Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {diamond.TINGE && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tinge</p>
                    <p className="font-semibold text-gray-900">
                      {diamond.TINGE}
                    </p>
                  </div>
                )}
                {diamond.CN && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CN</p>
                    <p className="font-semibold text-gray-900">{diamond.CN}</p>
                  </div>
                )}
                {diamond.CW && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CW</p>
                    <p className="font-semibold text-gray-900">{diamond.CW}</p>
                  </div>
                )}
                {diamond.SN && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">SN</p>
                    <p className="font-semibold text-gray-900">{diamond.SN}</p>
                  </div>
                )}
                {diamond.SW && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">SW</p>
                    <p className="font-semibold text-gray-900">{diamond.SW}</p>
                  </div>
                )}
                {diamond.HA && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">H&A</p>
                    <p className="font-semibold text-gray-900">{diamond.HA}</p>
                  </div>
                )}
                {diamond.BRANCH && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Branch</p>
                    <p className="font-semibold text-gray-900">
                      {diamond.BRANCH}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Characteristics */}
            {(diamond.KEY_TO_SYMBOLS ||
              diamond.CLARITY_CHARACTERISTICS ||
              diamond.COMMENTS_1 ||
              diamond.REPORT_COMMENTS) && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Characteristics & Comments
                </h3>
                <div className="space-y-3">
                  {diamond.KEY_TO_SYMBOLS && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Key to Symbols
                      </p>
                      <p className="text-sm text-gray-900">
                        {diamond.KEY_TO_SYMBOLS}
                      </p>
                    </div>
                  )}
                  {diamond.CLARITY_CHARACTERISTICS && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Clarity Characteristics
                      </p>
                      <p className="text-sm text-gray-900">
                        {diamond.CLARITY_CHARACTERISTICS}
                      </p>
                    </div>
                  )}
                  {diamond.COMMENTS_1 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Comments</p>
                      <p className="text-sm text-gray-900">
                        {diamond.COMMENTS_1}
                      </p>
                    </div>
                  )}
                  {diamond.REPORT_COMMENTS && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Report Comments
                      </p>
                      <p className="text-sm text-gray-900">
                        {diamond.REPORT_COMMENTS}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondDetailView;