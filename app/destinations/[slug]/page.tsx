"use client";

import { useState, useMemo } from "react";
import { PACKAGES, TourPackage } from "@/lib/packages-data";
import { BookingForm } from "@/components/BookingForm";
import { PackageCard } from "@/components/PackageCard";
import { notFound } from "next/navigation";

function prettyDestinationFromSlug(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(
    null
  );

  const destinationName = prettyDestinationFromSlug(params.slug);

  const destinationPackages = useMemo(() => {
    return PACKAGES.filter(
      (pkg) =>
        pkg.destination.toLowerCase().includes(destinationName.toLowerCase()) ||
        pkg.title.toLowerCase().includes(destinationName.toLowerCase())
    );
  }, [destinationName]);

  if (destinationPackages.length === 0) {
    notFound();
  }

  const handleBookNow = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setShowBookingForm(true);
  };

  const destinationImage = destinationPackages[0]?.image;
  const region = destinationPackages[0]?.destination.split('•')[1]?.trim();

  // Region color mapping for badge
  const regionColors: Record<string, string> = {
    'Asia': 'bg-orange-100 text-orange-800',
    'Indian Ocean': 'bg-blue-100 text-blue-800',
    'Middle East': 'bg-yellow-100 text-yellow-800',
    'Africa': 'bg-green-100 text-green-800',
    'Europe': 'bg-purple-100 text-purple-800',
    'Americas': 'bg-red-100 text-red-800'
  };

  const regionColor = region ? regionColors[region] || 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800';

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-[60vh] bg-cover bg-center bg-gray-900"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${destinationImage})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            {region && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${regionColor}`}>
                {region}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {destinationName}
            </h1>
            <p className="text-xl md:text-2xl font-light">
              {destinationPackages.length} amazing {destinationPackages.length === 1 ? 'package' : 'packages'} available
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Available Packages for {destinationName}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinationPackages.map((pkg, index) => (
              <div key={pkg.slug}>
                <PackageCard
                  package={pkg}
                  onBookNow={() => handleBookNow(pkg)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBookingForm && selectedPackage && (
        <BookingForm
          package={selectedPackage}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
}