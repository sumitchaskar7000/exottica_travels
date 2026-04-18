"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PACKAGES } from "@/lib/packages-data";

export const FeaturedPackagesSection = () => {
  // Get featured packages: first 3 packages
  const featuredPackages = PACKAGES.slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="inline-block text-sm md:text-base font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              HOT DEALS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Explore Our Featured Packages
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Discover handpicked travel experiences designed by Exottica Travels. 
              All packages can be fully customized to match your dates and preferences.
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap text-base md:text-lg"
          >
            View All Packages
          </Link>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg, index) => (
            <motion.article
              key={pkg.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-56 lg:h-64 w-full bg-slate-200 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${pkg.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-xs md:text-sm font-bold text-white bg-blue-700 px-3 py-1 rounded-full capitalize">
                    {pkg.destination.split('•')[1]?.trim() || 'Tour'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 flex flex-col grow">
                {/* Title */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {pkg.title}
                </h3>

                {/* Tour Info */}
                <p className="text-sm md:text-base text-slate-600 font-medium mb-3">
                  {pkg.bestSeason} • {pkg.groupSize}
                </p>

                {/* Destination & Duration */}
                <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    <span className="text-slate-600">📍</span> {pkg.destination}
                  </p>
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    <span className="text-slate-600">📅</span> {pkg.duration}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <p className="text-xs md:text-sm font-semibold text-slate-600 mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {pkg.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx} className="text-sm md:text-base text-slate-700 flex items-start">
                          <span className="text-blue-600 mr-2">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="mt-auto space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs md:text-sm font-semibold text-slate-600">Starting from</span>
                    <p className="text-2xl md:text-3xl font-bold text-blue-700">
                      ₹{pkg.price}
                    </p>
                  </div>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="block w-full text-center px-4 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-base md:text-lg rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Package
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-base md:text-lg text-slate-600 mb-4">
            Need a custom itinerary? Let our travel experts help you plan your perfect getaway.
          </p>
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-700 text-blue-700 font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </section>
  );
};

