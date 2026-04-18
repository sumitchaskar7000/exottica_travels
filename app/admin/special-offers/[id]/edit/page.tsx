// frontend/app/admin/special-offers/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { specialOffersAPI, uploadImage, fetchDestinations, fetchPackages, type SpecialOffer } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default function EditSpecialOfferPage() {
  const router = useRouter();
  const params = useParams();
  const offerId = params.id as string;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Partial<SpecialOffer>>({
    title: "",
    slug: "",
    description: "",
    discount: 0,
    discountType: "percentage",
    code: "",
    validFrom: "",
    validUntil: "",
    image: "",
    destinations: [],
    packages: [],
    terms: "",
    status: "draft",
    featured: false,
  });

  const [destinationsSearch, setDestinationsSearch] = useState("");
  const [destinationsList, setDestinationsList] = useState<any[]>([]);
  const [packagesSearch, setPackagesSearch] = useState("");
  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch offer data
  const { data: offer, isLoading: offerLoading } = useQuery({
    queryKey: ["special-offer", offerId],
    queryFn: async () => {
      const response = await specialOffersAPI.getOfferById(offerId);
      return response.data;
    },
    enabled: !!offerId,
  });

  // Update form when offer data is loaded
  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || "",
        slug: offer.slug || "",
        description: offer.description || "",
        discount: offer.discount || 0,
        discountType: offer.discountType || "percentage",
        code: offer.code || "",
        validFrom: offer.validFrom ? new Date(offer.validFrom).toISOString().split("T")[0] : "",
        validUntil: offer.validUntil ? new Date(offer.validUntil).toISOString().split("T")[0] : "",
        image: offer.image || "",
        destinations: offer.destinations || [],
        packages: offer.packages || [],
        terms: offer.terms || "",
        status: offer.status || "draft",
        featured: offer.featured || false,
      });
      if (offer.image) {
        setImagePreview(offer.image);
      }
    }
  }, [offer]);

  // Fetch destinations on search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (destinationsSearch.length >= 2) {
        const results = await fetchDestinations(destinationsSearch);
        setDestinationsList(results);
      } else {
        setDestinationsList([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [destinationsSearch]);

  // Fetch packages on search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (packagesSearch.length >= 2) {
        const results = await fetchPackages(packagesSearch);
        setPackagesList(results);
      } else {
        setPackagesList([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [packagesSearch]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<SpecialOffer>) => {
      return await specialOffersAPI.updateOffer(offerId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["special-offers"] });
      queryClient.invalidateQueries({ queryKey: ["special-offer", offerId] });
      setSuccess("Offer updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Failed to update offer");
      setTimeout(() => setError(""), 3000);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleDiscountTypeChange = (type: "percentage" | "fixed") => {
    setFormData((prev) => ({ ...prev, discountType: type }));
  };

  const handleAddDestination = (destination: string) => {
    if (!formData.destinations?.includes(destination)) {
      setFormData((prev) => ({
        ...prev,
        destinations: [...(prev.destinations || []), destination],
      }));
    }
    setDestinationsSearch("");
  };

  const handleRemoveDestination = (destination: string) => {
    setFormData((prev) => ({
      ...prev,
      destinations: prev.destinations?.filter((d) => d !== destination) || [],
    }));
  };

  const handleAddPackage = (pkg: string) => {
    if (!formData.packages?.includes(pkg)) {
      setFormData((prev) => ({
        ...prev,
        packages: [...(prev.packages || []), pkg],
      }));
    }
    setPackagesSearch("");
  };

  const handleRemovePackage = (pkg: string) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages?.filter((p) => p !== pkg) || [],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const imageUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title) throw new Error("Title is required");
      if (!formData.slug) throw new Error("Slug is required");
      if (!formData.code) throw new Error("Promo code is required");
      if (!formData.discount || formData.discount <= 0) throw new Error("Valid discount amount is required");
      if (!formData.validFrom) throw new Error("Valid from date is required");
      if (!formData.validUntil) throw new Error("Valid until date is required");
      
      // Validate dates
      if (new Date(formData.validUntil) < new Date(formData.validFrom)) {
        throw new Error("Valid until date must be after valid from date");
      }

      await updateMutation.mutateAsync(formData);
      setFormData((prev) => ({ ...prev }));
    } catch (error: any) {
      setError(error.message || "Failed to save offer");
    } finally {
      setSaving(false);
    }
  };

  if (offerLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading offer details...</p>
        </div>
      </div>
    );
  }

  if (!offer && !offerLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Offer Not Found</h2>
            <p className="text-gray-600 mb-6">The special offer you're looking for doesn't exist.</p>
            <Link
              href="/admin/special-offers"
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Back to Offers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Special Offer</h1>
              <p className="mt-1 text-sm text-gray-600">
                Update your special offer details and settings
              </p>
            </div>
            <Link
              href="/admin/special-offers"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back to Offers
            </Link>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            {/* Basic Information */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    onBlur={generateSlug}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Discount Information */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Discount Details</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type *
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleDiscountTypeChange("percentage")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.discountType === "percentage"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Percentage
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDiscountTypeChange("fixed")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.discountType === "fixed"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Fixed Amount
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Amount *
                  </label>
                  <div className="relative">
                    {formData.discountType === "fixed" && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    )}
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      min="0"
                      step={formData.discountType === "percentage" ? "1" : "0.01"}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                        formData.discountType === "fixed" ? "pl-7" : ""
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono uppercase"
                    placeholder="SUMMER30"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Validity Period */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Validity Period</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid From *
                  </label>
                  <input
                    type="date"
                    name="validFrom"
                    value={formData.validFrom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Until *
                  </label>
                  <input
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Offer Image</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, image: "" }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploading && (
                  <div className="text-center text-sm text-blue-600">
                    Uploading image...
                  </div>
                )}
              </div>
            </div>

            {/* Destinations */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Destinations</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search and Add Destinations
                  </label>
                  <input
                    type="text"
                    value={destinationsSearch}
                    onChange={(e) => setDestinationsSearch(e.target.value)}
                    placeholder="Type to search destinations..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  {destinationsList.length > 0 && (
                    <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                      {destinationsList.map((dest) => (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => handleAddDestination(dest.name)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium">{dest.name}</div>
                          {dest.country && (
                            <div className="text-xs text-gray-500">{dest.country}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {formData.destinations && formData.destinations.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.destinations.map((dest) => (
                      <span
                        key={dest}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {dest}
                        <button
                          type="button"
                          onClick={() => handleRemoveDestination(dest)}
                          className="hover:text-blue-900"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Packages */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Packages</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search and Add Packages
                  </label>
                  <input
                    type="text"
                    value={packagesSearch}
                    onChange={(e) => setPackagesSearch(e.target.value)}
                    placeholder="Type to search packages..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  {packagesList.length > 0 && (
                    <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                      {packagesList.map((pkg) => (
                        <button
                          key={pkg.slug}
                          type="button"
                          onClick={() => handleAddPackage(pkg.title)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium">{pkg.title}</div>
                          <div className="text-xs text-gray-500">
                            {pkg.destination} • {pkg.duration} • From ${pkg.priceFrom}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {formData.packages && formData.packages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.packages.map((pkg) => (
                      <span
                        key={pkg}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {pkg}
                        <button
                          type="button"
                          onClick={() => handleRemovePackage(pkg)}
                          className="hover:text-green-900"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter terms and conditions for this offer..."
              />
            </div>

            {/* Status and Settings */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status & Settings</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Offer</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Featured offers will be highlighted on the special offers page
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Link
              href="/admin/special-offers"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}