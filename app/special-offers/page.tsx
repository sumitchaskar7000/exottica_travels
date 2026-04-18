// frontend/app/special-offers/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { specialOffersAPI } from "@/lib/api";
import { format } from "date-fns";
import { 
  Tag, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Gift, 
  Sparkles,
  TrendingUp,
  Copy,
  Check,
  Percent,
  DollarSign,
  MapPin,
  Package,
  Award,
  Shield,
  Zap,
  Star
} from "lucide-react";

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
}

export default function SpecialOffersPage() {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [featuredOffers, setFeaturedOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCopyTooltip, setShowCopyTooltip] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await specialOffersAPI.getPublicOffers();
      const allOffers = response.data;
      
      const activeOffers = allOffers.filter(
        (offer: SpecialOffer) => 
          offer.status === "active" && 
          new Date(offer.validUntil) >= new Date()
      );
      
      setOffers(activeOffers);
      setFeaturedOffers(activeOffers.filter((offer: SpecialOffer) => offer.featured));
    } catch (error) {
      console.error("Error fetching special offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setShowCopyTooltip(code);
      setTimeout(() => setShowCopyTooltip(null), 2000);
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

  const getDiscountIcon = (offer: SpecialOffer) => {
    if (offer.discountType === "percentage") {
      return <Percent className="h-4 w-4" />;
    } else {
      return <DollarSign className="h-4 w-4" />;
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
    
    if (diffDays <= 1) return "text-red-600 bg-red-50 border-red-200";
    if (diffDays <= 3) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const filteredOffers = selectedCategory === "all" 
    ? offers 
    : offers.filter(offer => 
        offer.destinations?.some(dest => dest.toLowerCase().includes(selectedCategory.toLowerCase()))
      );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe email:", email);
    setEmail("");
    alert("Thank you for subscribing! You'll receive the latest deals in your inbox.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
            <Zap className="h-6 w-6 text-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading amazing deals...</p>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-2xl mb-6">
              <Tag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Special Offers
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              No active offers available at the moment
            </p>
            <p className="text-gray-500">
              Check back soon for exclusive deals and discounts!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-gray-900 text-white rounded-full px-4 py-2 mb-6 shadow-sm">
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Limited Time Offers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Special Offers & Deals
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exclusive discounts and limited-time offers for your next adventure
            </p>
            {featuredOffers.length > 0 && (
              <div className="mt-8 inline-flex items-center bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
                <TrendingUp className="h-5 w-5 text-amber-600 mr-2" />
                <span className="text-sm text-amber-700 font-medium">
                  {featuredOffers.length} Featured {featuredOffers.length === 1 ? "Deal" : "Deals"} Available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Offers Section */}
        {featuredOffers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Featured Deals</h2>
                </div>
                <p className="text-gray-600">Our most popular and exclusive offers</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredOffers.slice(0, 2).map((offer) => (
                <div
                  key={offer._id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-64 flex-shrink-0 overflow-hidden">
                    {offer.image ? (
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <Tag className="h-16 w-16 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
                        {getDiscountIcon(offer)}
                        {getDiscountText(offer)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[56px]">
                        {offer.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 min-h-[72px]">
                        {offer.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold">
                          {offer.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(offer.code)}
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Copy code"
                        >
                          {showCopyTooltip === offer.code ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getDaysRemainingColor(offer.validUntil)}`}>
                          <Clock className="h-3.5 w-3.5" />
                          <span>{getDaysRemaining(offer.validUntil)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Until {formatDate(offer.validUntil)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button
                          onClick={() => copyToClipboard(offer.code)}
                          className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          <Copy className="h-4 w-4" />
                          Copy Code: {offer.code}
                        </button>
                        <Link
                          href={`/special-offers/${offer.slug || offer._id}`}
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium gap-2"
                        >
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      
                      {showCopyTooltip === offer.code && (
                        <div className="mt-2 text-center text-sm text-green-600 font-medium">
                          ✓ Copied to clipboard!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Offers Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-900">All Special Offers</h2>
              </div>
              <p className="text-gray-600">
                {filteredOffers.length} active {filteredOffers.length === 1 ? "deal" : "deals"} available
              </p>
            </div>
            {offers.some(offer => offer.destinations?.length) && (
              <div className="mt-4 sm:mt-0 flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === "all"
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  All Deals
                </button>
                {Array.from(new Set(offers.flatMap(o => o.destinations || []))).map(dest => (
                  <button
                    key={dest}
                    onClick={() => setSelectedCategory(dest)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      selectedCategory === dest
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {dest}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <div
                key={offer._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden"
              >
                <div className="relative h-48 flex-shrink-0 overflow-hidden">
                  {offer.image ? (
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Tag className="h-12 w-12 text-gray-600" />
                    </div>
                  )}
                  {offer.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-amber-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/95 backdrop-blur-sm shadow-sm text-gray-900 px-2.5 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                      {getDiscountIcon(offer)}
                      {getDiscountText(offer)}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[56px]">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3 min-h-[60px]">
                      {offer.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold">
                        {offer.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(offer.code)}
                        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy code"
                      >
                        {showCopyTooltip === offer.code ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${getDaysRemainingColor(offer.validUntil)}`}>
                        <Clock className="h-3 w-3" />
                        <span>{getDaysRemaining(offer.validUntil)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Until {formatDate(offer.validUntil)}</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/special-offers/${offer.slug || offer._id}`}
                      className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium group"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    
                    {showCopyTooltip === offer.code && (
                      <div className="mt-2 text-center text-xs text-green-600 font-medium">
                        ✓ Code copied!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
       
      </div>
    </div>
  );
}