"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { specialOffersAPI } from "@/lib/api";
import { format } from "date-fns";
import {
  TagIcon,
  ClockIcon,
  CalendarIcon,
  ArrowLeftIcon,
  GiftIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  MapPinIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

interface SpecialOffer {
  _id: string;
  title: string;
  slug: string;
  description: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  validFrom: string;
  validUntil: string;
  status: "active" | "expired" | "draft";
  featured: boolean;
  image: string;
  usesCount: number;
  destinations?: string[];
  packages?: string[];
  terms?: string;
  originalPrice?: number;
  discountedPrice?: number;
  remainingUses?: number;
}

export default function SpecialOfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    fetchOfferDetails();
  }, [slug]);

  const fetchOfferDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await specialOffersAPI.getPublicOfferBySlug(slug);
      setOffer(response.data);
    } catch (error: any) {
      console.error("Error fetching offer details:", error);
      if (error.response?.status === 404) {
        setError("Offer not found");
      } else {
        setError("Failed to load offer details");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getDiscountText = (offer: SpecialOffer) => {
    if (offer.discountType === "percentage") {
      return `${offer.discount}% OFF`;
    } else {
      return `$${offer.discount} OFF`;
    }
  };

  const getDiscountValue = (offer: SpecialOffer) => {
    if (offer.discountType === "percentage") {
      return `${offer.discount}%`;
    } else {
      return `$${offer.discount}`;
    }
  };

  const getDaysRemaining = (validUntil: string) => {
    const today = new Date();
    const endDate = new Date(validUntil);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "Expired";
    if (diffDays === 1) return "Last day!";
    if (diffDays <= 3) return `${diffDays} days left`;
    return `${diffDays} days remaining`;
  };

  const getDaysRemainingColor = (validUntil: string) => {
    const today = new Date();
    const endDate = new Date(validUntil);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return "text-red-600 bg-red-50";
    if (diffDays <= 3) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const isOfferValid = () => {
    if (!offer) return false;
    if (offer.status !== "active") return false;
    if (new Date(offer.validUntil) < new Date()) return false;
    return true;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading offer details...</p>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <TagIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error || "Offer Not Found"}
            </h1>
            <p className="text-gray-600 mb-8">
              {error === "Offer not found" 
                ? "The special offer you're looking for doesn't exist or has been removed."
                : "Unable to load the offer details. Please try again later."}
            </p>
            <Link
              href="/special-offers"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to All Offers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isValid = isOfferValid();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/special-offers"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to All Offers
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image Section */}
          <div className="relative h-64 md:h-96">
            {offer.image ? (
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center">
                <GiftIcon className="h-24 w-24 text-gray-500" />
              </div>
            )}
            {offer.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured Offer
                </span>
              </div>
            )}
            {!isValid && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-red-600 text-white px-6 py-2 rounded-full text-lg font-bold">
                  {offer.status === "expired" || new Date(offer.validUntil) < new Date() 
                    ? "Offer Expired" 
                    : "Not Available"}
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {offer.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    {offer.description}
                  </p>
                </div>

                {/* Destinations Section */}
                {offer.destinations && offer.destinations.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-gray-600" />
                      Eligible Destinations
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {offer.destinations.map((dest, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packages Section */}
                {offer.packages && offer.packages.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <CubeIcon className="h-5 w-5 mr-2 text-gray-600" />
                      Applicable Packages
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {offer.packages.map((pkg, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {pkg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                {offer.terms && (
                  <div className="mb-6">
                    <button
                      onClick={() => setShowTerms(!showTerms)}
                      className="flex items-center text-gray-900 font-semibold mb-3 hover:text-gray-700 transition-colors"
                    >
                      <DocumentTextIcon className="h-5 w-5 mr-2" />
                      Terms & Conditions
                      <span className="ml-2">{showTerms ? "▼" : "▶"}</span>
                    </button>
                    {showTerms && (
                      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                        {offer.terms.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-2">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar - Offer Details */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-4">
                      <GiftIcon className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {getDiscountText(offer)}
                    </h2>
                    {offer.originalPrice && offer.discountedPrice && (
                      <div className="text-sm text-gray-500 mb-4">
                        <span className="line-through mr-2">
                          ₹{offer.originalPrice}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          ₹{offer.discountedPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm text-gray-600">Discount Code</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {offer.code}
                        </code>
                        <button
                          onClick={() => copyToClipboard(offer.code)}
                          className="text-xs bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm text-gray-600">Discount Value</span>
                      <span className="text-lg font-bold text-gray-900">
                        {getDiscountValue(offer)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm text-gray-600">Valid From</span>
                      <span className="text-sm text-gray-900">
                        {formatDate(offer.validFrom)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm text-gray-600">Valid Until</span>
                      <span className="text-sm text-gray-900">
                        {formatDate(offer.validUntil)}
                      </span>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-lg ${getDaysRemainingColor(offer.validUntil)}`}>
                      <span className="text-sm font-medium">Status</span>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {getDaysRemaining(offer.validUntil)}
                        </span>
                      </div>
                    </div>

                    {offer.usesCount > 0 && (
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-600">Times Used</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {offer.usesCount} {offer.usesCount === 1 ? "time" : "times"}
                        </span>
                      </div>
                    )}
                  </div>

                  {isValid ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => copyToClipboard(offer.code)}
                        className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center"
                      >
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Copy Code & Apply
                      </button>
                      <p className="text-xs text-gray-500 text-center">
                        Copy the code and use it at checkout to get {getDiscountValue(offer)} off
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-red-600 font-medium">
                        This offer is no longer available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}