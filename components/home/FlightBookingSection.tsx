"use client";

import { useState } from "react";
import { Plane, Calendar, Users, Briefcase, Send, MapPin, ArrowRightLeft, ArrowRight } from "lucide-react";

const TRIP_TYPES = [
  { label: "Round Trip", value: "round-trip", icon: ArrowRightLeft },
  { label: "One Way", value: "one-way", icon: ArrowRight },
];

const CLASS_OPTIONS = [
  { label: "Economy", value: "economy" },
  { label: "Premium Economy", value: "premium-economy" },
  { label: "Business", value: "business" },
  { label: "First Class", value: "first" },
];

const WHATSAPP_NUMBER = "8237370045";

export const FlightBookingSection = () => {
  const [formData, setFormData] = useState({
    tripType: "round-trip",
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    travelClass: "economy",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.from.trim()) return "Please enter departure city or airport.";
    if (!formData.to.trim()) return "Please enter destination city or airport.";
    if (formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()) 
      return "Departure and destination cannot be the same.";
    if (!formData.departDate) return "Please select departure date.";
    if (formData.tripType === "round-trip" && !formData.returnDate)
      return "Please select return date for round trip.";
    if (formData.tripType === "round-trip" && formData.returnDate < formData.departDate)
      return "Return date cannot be earlier than departure date.";
    if (formData.passengers < 1) return "At least 1 passenger is required.";
    return "";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sendToWhatsApp = () => {
    const tripTypeLabel = TRIP_TYPES.find(t => t.value === formData.tripType)?.label || formData.tripType;
    const classLabel = CLASS_OPTIONS.find(c => c.value === formData.travelClass)?.label || formData.travelClass;
    
    const message = `*✈️ NEW FLIGHT BOOKING REQUEST*%0A%0A` +
      `*Trip Type:* ${tripTypeLabel}%0A` +
      `*From:* ${formData.from}%0A` +
      `*To:* ${formData.to}%0A` +
      `*Departure Date:* ${formatDate(formData.departDate)}%0A` +
      `${formData.tripType === "round-trip" ? `*Return Date:* ${formatDate(formData.returnDate)}%0A` : ''}` +
      `*Passengers:* ${formData.passengers}%0A` +
      `*Class:* ${classLabel}%0A` +
      `%0A*Booking Status:* Pending Confirmation%0A` +
      `%0A_Submitted via Travel Website_`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call or processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Send data to WhatsApp
      sendToWhatsApp();
      
      setSuccess("✓ Booking request sent! You will be redirected to WhatsApp to confirm your details.");
      
      // Optional: Reset form after successful submission
      // setFormData({
      //   tripType: "round-trip",
      //   from: "",
      //   to: "",
      //   departDate: "",
      //   returnDate: "",
      //   passengers: 1,
      //   travelClass: "economy",
      // });
      
    } catch (err) {
      setError("Unable to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Plane className="w-4 h-4" />
            <span>Book with Confidence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Next<span className="text-blue-600"> Adventure</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Compare fares from 400+ airlines and book flights easily with our trusted partners. 
            Best price guaranteed!
          </p>
        </div>

        {/* Booking Card */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-blue-100/50">
          {/* Trip Type & Travel Class Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Trip Type Toggle */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              {TRIP_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleChange("tripType", type.value)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      formData.tripType === type.value
                        ? "bg-white text-blue-600 shadow-md ring-2 ring-blue-500/20"
                        : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Travel Class */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.travelClass}
                onChange={(e) => handleChange("travelClass", e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none cursor-pointer"
              >
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls.value} value={cls.value}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Passengers */}
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                min={1}
                max={9}
                value={formData.passengers}
                onChange={(e) =>
                  handleChange("passengers", Math.min(9, Math.max(1, Number(e.target.value))))
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* Airports Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="From: City or Airport"
                value={formData.from}
                onChange={(e) => handleChange("from", e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                autoComplete="off"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="To: City or Airport"
                value={formData.to}
                onChange={(e) => handleChange("to", e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.departDate}
                onChange={(e) => handleChange("departDate", e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            {formData.tripType === "round-trip" && (
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleChange("returnDate", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
              <span className="text-lg">✓</span>
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold px-12 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Book Your Flight
                </>
              )}
            </button>
            <p className="mt-4 text-xs text-gray-400">
              By continuing, you agree to our Terms & Privacy Policy. Secure booking powered by WhatsApp.
            </p>
          </div>
        </form>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✓</span>
            <span className="text-sm">Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✓</span>
            <span className="text-sm">24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✓</span>
            <span className="text-sm">No Booking Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✓</span>
            <span className="text-sm">Secure Payments</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default FlightBookingSection;