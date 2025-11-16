"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

const marcellusStyle = {
  fontFamily: "Marcellus, serif",
};

const jostStyle = {
  fontFamily: "Jost, sans-serif",
};

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  carat: string;
  condition: string;
  material: string;
  description: string;
  fullAddress: string;
  pickupDate: string;
  pickupTime: string;
  images: File[];
}

export default function SellDiamondsForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    carat: "",
    condition: "",
    material: "",
    description: "",
    fullAddress: "",
    pickupDate: "",
    pickupTime: "",
    images: [],
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      const isValid = ["image/png", "image/jpeg", "image/gif"].includes(
        file.type,
      );
      const isUnder10MB = file.size <= 10 * 1024 * 1024;
      return isValid && isUnder10MB;
    });
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-gray-900 mb-2"
            style={marcellusStyle}
          >
            Sell Your Diamonds
          </h1>
          <p className="text-gray-600" style={jostStyle}>
            Complete the form below to get a free valuation for your diamonds.
            Our process is secure, confidential, and designed to get you the
            best possible price.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" style={jostStyle}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Carat (optional) */}
          <div>
            <label
              htmlFor="carat"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Carat (optional)
            </label>
            <input
              type="text"
              id="carat"
              name="carat"
              value={formData.carat}
              onChange={handleInputChange}
              placeholder="Carat (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Condition */}
          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition text-gray-900"
              style={{
                colorScheme: "light",
                color: formData.condition ? "#111827" : "#6b7280",
              }}
            >
              <option value="" style={{ color: "#6b7280" }}>
                Select Condition
              </option>
              <option value="excellent" style={{ color: "#111827" }}>
                Excellent
              </option>
              <option value="good" style={{ color: "#111827" }}>
                Good
              </option>
              <option value="fair" style={{ color: "#111827" }}>
                Fair
              </option>
            </select>
          </div>

          {/* Material (optional) */}
          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Material (optional)
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="Material (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter Description"
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-none p-8 text-center transition hover:border-[#F2DB7F] ${
                dragActive
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/png,image/jpeg,image/gif"
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-yellow-600" />
                </div>
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-gray-700 hover:text-yellow-600 transition"
                >
                  <span className="font-medium border border-gray-300 px-4 py-2 inline-block">
                    Choose File
                  </span>
                  <span className="text-gray-500 ml-2">No file chosen</span>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Upload file or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {formData.images.length} file(s) selected
              </div>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label
              htmlFor="fullAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Address
            </label>
            <textarea
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleInputChange}
              placeholder="Full Address"
              rows={3}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition placeholder:text-gray-500"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Preferred Pickup Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pickupDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Preferred Pickup Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition"
                  style={{
                    colorScheme: "light",
                    color: formData.pickupDate ? "#111827" : "#6b7280",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pickupTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Preferred Time (Optional)
              </label>
              <div className="relative">
                <select
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#E6C878] focus:border-transparent outline-none transition text-gray-900"
                  style={{
                    colorScheme: "light",
                    color: formData.pickupTime ? "#111827" : "#6b7280",
                  }}
                >
                  <option value="" style={{ color: "#6b7280" }}>
                    Select Time
                  </option>
                  <option value="morning" style={{ color: "#111827" }}>
                    Morning (9AM - 12PM)
                  </option>
                  <option value="afternoon" style={{ color: "#111827" }}>
                    Afternoon (12PM - 5PM)
                  </option>
                  <option value="evening" style={{ color: "#111827" }}>
                    Evening (5PM - 8PM)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#D4A017] hover:bg-[#B58900] text-white cursor-pointer font-semibold py-3 px-6 rounded-none transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
