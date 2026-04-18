"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { specialOffersAPI } from "@/lib/api";
import { format } from "date-fns";
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";

interface SpecialOffer {
  _id: string;
  title: string;
  slug: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  validFrom: string;
  validUntil: string;
  status: "active" | "expired" | "draft";
  featured: boolean;
  usesCount: number;
  image: string;
  description: string;
}

export default function SpecialOffersList() {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "expired" | "draft">("all");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await specialOffersAPI.getAllOffers();
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setOfferToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!offerToDelete) return;
    
    try {
      await specialOffersAPI.deleteOffer(offerToDelete);
      setOffers(offers.filter(offer => offer._id !== offerToDelete));
      setShowDeleteModal(false);
      setOfferToDelete(null);
    } catch (error) {
      console.error("Error deleting offer:", error);
      alert("Failed to delete offer. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setOfferToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDiscountText = (offer: SpecialOffer) => {
    if (offer.discountType === "percentage") {
      return `${offer.discount}% OFF`;
    } else {
      return `$${offer.discount} OFF`;
    }
  };

  const isOfferValid = (validUntil: string) => {
    return new Date(validUntil) >= new Date();
  };

  const filteredOffers = offers.filter(offer => {
    if (filter !== "all" && offer.status !== filter) return false;
    if (search && !offer.title.toLowerCase().includes(search.toLowerCase()) && 
        !offer.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-500">Loading special offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Special Offers</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your promotional offers, discounts, and seasonal deals
            </p>
          </div>
          <Link
            href="/admin/special-offers/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Offer
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title or promo code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All ({offers.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "active"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Active ({offers.filter(o => o.status === "active").length})
            </button>
            <button
              onClick={() => setFilter("expired")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "expired"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Expired ({offers.filter(o => o.status === "expired").length})
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "draft"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Draft ({offers.filter(o => o.status === "draft").length})
            </button>
          </div>
        </div>

        {/* Offers Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12 min-h-[400px] flex items-center justify-center">
              <div>
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No special offers found</h3>
                <p className="text-gray-500 mb-4">
                  {search ? "Try adjusting your search or filter" : "Get started by creating your first special offer"}
                </p>
                {!search && filter === "all" && (
                  <Link
                    href="/admin/special-offers/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New Offer
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Offer Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promo Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valid Until
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uses
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOffers.map((offer) => (
                    <tr key={offer._id} className="hover:bg-gray-50 transition-colors h-[88px]">
                      <td className="px-6 py-4 align-middle">
                        <div className="flex items-center">
                          {offer.image ? (
                            <img
                              src={offer.image}
                              alt={offer.title}
                              className="h-10 w-10 rounded object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">
                                {offer.title.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="ml-4 min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {offer.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {offer.description?.substring(0, 60) || ""}
                              {offer.description?.length > 60 ? "..." : ""}
                            </div>
                            {offer.featured && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap align-middle">
                        <div className="text-sm font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded inline-block">
                          {offer.code}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap align-middle">
                        <div className="text-sm font-bold text-green-600">
                          {getDiscountText(offer)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap align-middle">
                        <div className="text-sm text-gray-900">
                          {format(new Date(offer.validUntil), "MMM dd, yyyy")}
                        </div>
                        {!isOfferValid(offer.validUntil) && offer.status === "active" && (
                          <div className="text-xs text-red-600">Expired</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap align-middle">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(offer.status)}`}
                        >
                          {offer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap align-middle text-sm text-gray-500">
                        {offer.usesCount} {offer.usesCount === 1 ? "use" : "uses"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-middle">
                        <Link
                          href={`/special-offers/${offer.slug || offer._id}`}
                          target="_blank"
                          className="text-gray-600 hover:text-gray-900 mr-3 inline-flex items-center"
                          title="View"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/special-offers/${offer._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 mr-3 inline-flex items-center"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(offer._id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Delete Special Offer
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Are you sure you want to delete this special offer? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}