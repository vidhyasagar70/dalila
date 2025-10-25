"use client";
import { useState, ChangeEvent } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const goldColor = "#B58900";
  const goldGradient = "linear-gradient(to right, #B58900 0%, #B58900 100%)";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  return (
    <div className="bg-gray-50">
      {/* Contact Form Section */}
      <section className="pt-16 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <AnimatedContainer direction="left">
              <div className="bg-white rounded-lg p-8 lg:p-12">
                <h2
                  className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-2 ${
                    marcellus.className
                  }`}
                >
                  Get in Touch
                </h2>
                <div
                  className="w-20 h-1 mb-8"
                  style={{ background: goldGradient }}
                ></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column - Form Fields */}
                  <div className="space-y-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400"
                        onFocus={(e) =>
                          (e.target.style.borderColor = goldColor)
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400"
                        onFocus={(e) =>
                          (e.target.style.borderColor = goldColor)
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400"
                        onFocus={(e) =>
                          (e.target.style.borderColor = goldColor)
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                      />
                    </div>

                    <div>
                      <div className="flex justify-center items-center h-full ml-10">
                        <button
                          onClick={handleSubmit}
                          className="px-10 py-3 text-white font-semibold transition-all duration-300 rounded uppercase tracking-wide text-sm"
                          style={{
                            background: goldGradient,
                            boxShadow: "0 2px 4px rgba(181, 137, 0, 0.2)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(to right, #9d7400 0%, #9d7400 100%)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 8px rgba(181, 137, 0, 0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = goldGradient;
                            e.currentTarget.style.boxShadow =
                              "0 2px 4px rgba(181, 137, 0, 0.2)";
                          }}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Message Field */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={7}
                      className="w-full  px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none transition-colors resize-none text-gray-700 placeholder:text-gray-400"
                      onFocus={(e) => (e.target.style.borderColor = goldColor)}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>
                </div>
              </div>
            </AnimatedContainer>

            {/* Right Column - Contact Information */}
            <AnimatedContainer direction="right">
              <div className="bg-white rounded-lg p-8 lg:p-12 shadow-sm">
                <h2
                  className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-8 ${marcellus.className}`}
                >
                  Contact Information
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: goldGradient }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-gray-600 text-base ${jost.className}`}
                      >
                        123 Diamond Street, Jewelry District, XYZ City
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: goldGradient }}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-gray-600 text-base ${jost.className}`}
                      >
                        +1 234 567 890
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: goldGradient }}
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-gray-600 text-base ${jost.className}`}
                      >
                        contact@dalila.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: goldGradient }}
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-gray-600 text-base ${jost.className}`}
                      >
                        Mon - Fri: 9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531654!3d-37.817209979751645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1589529723331!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
                title="Location Map"
              />
              <button className="absolute top-4 left-4 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded shadow-md hover:bg-gray-50 transition-colors">
                View larger map
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
