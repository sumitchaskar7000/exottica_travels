"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllPosts, specialOffersAPI, type SpecialOffer } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<SpecialOffer | null>(null);

  // Fetch blog posts
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: getAllPosts,
  });

  // Fetch special offers
  const { data: offers, isLoading: offersLoading, error: offersError } = useQuery({
    queryKey: ["special-offers"],
    queryFn: async () => {
      const response = await specialOffersAPI.getAllOffers();
      return response.data;
    },
  });

  // Delete mutation for special offers
  const deleteOfferMutation = useMutation({
    mutationFn: async (id: string) => {
      await specialOffersAPI.deleteOffer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["special-offers"] });
      setShowDeleteModal(false);
      setSelectedOffer(null);
    },
    onError: (error) => {
      console.error("Error deleting offer:", error);
      alert("Failed to delete offer. Please try again.");
    },
  });

  if (postsError) {
    console.error("Error loading dashboard:", postsError);
  }
  if (offersError) {
    console.error("Error loading special offers:", offersError);
  }

  const publishedCount = posts?.filter((p) => p.status === "published").length || 0;
  const draftCount = posts?.filter((p) => p.status === "draft").length || 0;
  const featuredCount = posts?.filter((p) => p.featured).length || 0;
  
  const activeOffers = offers?.filter((o: SpecialOffer) => o.status === "active").length || 0;
  const totalOffers = offers?.length || 0;

  const handleDeleteClick = (offer: SpecialOffer) => {
    setSelectedOffer(offer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedOffer?._id) {
      deleteOfferMutation.mutate(selectedOffer._id);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome back to your admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{posts?.length || 0}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Published</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">{publishedCount}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Drafts</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-600">{draftCount}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Featured</dt>
            <dd className="mt-1 text-3xl font-semibold text-[#c9a84c]">{featuredCount}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Special Offers</dt>
            <dd className="mt-1 text-3xl font-semibold text-blue-600">{totalOffers}</dd>
            <dd className="text-xs text-gray-500 mt-1">{activeOffers} active</dd>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Blog Posts</h3>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#c9a84c] hover:bg-[#b8933c]"
          >
            Create New Post
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {postsLoading ? (
            <div className="text-center py-8">Loading posts...</div>
          ) : posts?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No posts yet. Create your first post!</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {posts?.slice(0, 5).map((post) => (
                <li key={post._id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/admin/posts/${post._id}/edit`}
                        className="text-lg font-medium text-[#c9a84c] hover:underline"
                      >
                        {post.title}
                      </Link>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                        <span>•</span>
                        <span className={post.status === "published" ? "text-green-600" : "text-yellow-600"}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/admin/posts/${post._id}/edit`}
                        className="text-sm text-gray-500 hover:text-gray-700 mr-3"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
          <Link href="/admin/posts" className="text-sm text-[#c9a84c] hover:underline">
            View all posts →
          </Link>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Special Offers</h3>
          <Link
            href="/admin/special-offers/new"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Create New Offer
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {offersLoading ? (
            <div className="text-center py-8">Loading offers...</div>
          ) : offers?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No special offers yet. Create your first offer!</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {offers?.slice(0, 5).map((offer: SpecialOffer) => (
                <li key={offer._id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/special-offers/${offer._id}/edit`}
                          className="text-lg font-medium text-blue-600 hover:underline"
                        >
                          {offer.title}
                        </Link>
                        {offer.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-mono">{offer.code}</span>
                        <span>•</span>
                        <span>
                          {offer.discountType === "percentage" 
                            ? `${offer.discount}% OFF` 
                            : `$${offer.discount} OFF`}
                        </span>
                        <span>•</span>
                        <span className={offer.status === "active" ? "text-green-600" : offer.status === "expired" ? "text-red-600" : "text-yellow-600"}>
                          {offer.status}
                        </span>
                        {offer.usesCount > 0 && (
                          <>
                            <span>•</span>
                            <span>{offer.usesCount} used</span>
                          </>
                        )}
                      </div>
                      {offer.destinations && offer.destinations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {offer.destinations.slice(0, 3).map((dest) => (
                            <span key={dest} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {dest}
                            </span>
                          ))}
                          {offer.destinations.length > 3 && (
                            <span className="text-xs text-gray-500">+{offer.destinations.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/special-offers/${offer._id}/edit`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(offer)}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                      <Link
                        href={`/special-offers/${offer.slug || offer._id}`}
                        target="_blank"
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between items-center">
          <Link href="/admin/special-offers" className="text-sm text-blue-600 hover:underline">
            View all offers →
          </Link>
          {offers && offers.length > 5 && (
            <span className="text-xs text-gray-500">
              Showing 5 of {offers.length} offers
            </span>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOffer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowDeleteModal(false)}></div>

            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Delete Special Offer</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete <span className="font-semibold text-gray-700">"{selectedOffer.title}"</span>? 
                        This action cannot be undone and will remove this offer from the website.
                      </p>
                      {selectedOffer.usesCount > 0 && (
                        <p className="mt-2 text-sm text-amber-600">
                          ⚠️ This offer has been used {selectedOffer.usesCount} times. Deleting it may affect existing bookings.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleteOfferMutation.isPending}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteOfferMutation.isPending ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}