"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { PACKAGES } from "@/lib/packages-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface DestinationPageProps {
  params: {
    slug: string;
  };
}

interface Package {
  slug: string;
  title: string;
  description: string;
  // This component is also reused for destination routing.
  // The real site data uses `priceFrom` (string) instead of `price` (number).
  // Keeping `price` optional prevents type errors during build.
  price?: number;
  duration: string;
  destination: string;
  image: string;
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destinationName: string = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());

  const destinationPackages: Package[] = useMemo(() => {
    return PACKAGES.filter((pkg: Package) =>
      pkg.destination.toLowerCase().includes(destinationName.toLowerCase()) ||
      pkg.title.toLowerCase().includes(destinationName.toLowerCase()) ||
      pkg.description.toLowerCase().includes(destinationName.toLowerCase())
    );
  }, [destinationName]);

  if (destinationPackages.length === 0) {
    notFound();
  }

  const destinationImage: string =
    destinationPackages[0]?.image ||
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${destinationImage})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {destinationName}
            </h1>
            <p className="text-xl md:text-2xl font-light">
              {destinationPackages.length} Amazing Packages Available
            </p>
          </motion.div>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Available Packages for {destinationName}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinationPackages.map((pkg: Package, index: number) => (
            <motion.div
              key={pkg.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
              <p className="text-gray-600 mb-3">{pkg.description}</p>

              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold text-primary">
                  ₹{pkg.price}
                </span>
                <span className="text-sm text-gray-500">{pkg.duration}</span>
              </div>

              <Link href={`/packages/${pkg.slug}`}>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  View Package
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Generate static params for all destinations
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const destinationSlugs = new Set<string>();

  PACKAGES.forEach((pkg: Package) => {
    const destinations: string[] = pkg.destination.split("•").map((d: string) => d.trim());

    destinations.forEach((dest: string) => {
      if (dest) {
        const slug: string = dest
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/--+/g, "-")
          .trim();

        destinationSlugs.add(slug);
      }
    });
  });

  return Array.from(destinationSlugs).map((slug: string) => ({
    slug,
  }));
}

// Add generateMetadata for better SEO
export async function generateMetadata({ params }: DestinationPageProps): Promise<{
  title: string;
  description: string;
}> {
  const destinationName: string = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());

  const destinationPackages: Package[] = PACKAGES.filter((pkg: Package) =>
    pkg.destination.toLowerCase().includes(destinationName.toLowerCase())
  );

  return {
    title: `${destinationName} Tour Packages | Your Company Name`,
    description: `Explore amazing ${destinationName} tour packages. ${destinationPackages.length} packages available with best prices.`,
  };
}

// ---------------------------------------------------------------------------
// Homepage section export (used by `app/page.tsx`)
// ---------------------------------------------------------------------------
export const DestinationHighlightsSection = () => {
  const destinations = useMemo(() => {
    const seen = new Set<string>();
    const items: Array<{ name: string; slug: string; image: string }> = [];

    const slugify = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim();

    for (const pkg of PACKAGES) {
      const parts = pkg.destination.split("•").map((d) => d.trim()).filter(Boolean);
      for (const name of parts) {
        const slug = slugify(name);
        if (seen.has(slug)) continue;
        seen.add(slug);
        items.push({
          name,
          slug,
          image: pkg.image,
        });
      }
    }

    return items.slice(0, 6);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="inline-block text-sm md:text-base font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              TOP DESTINATIONS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Explore by Destination
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Choose a destination to discover tour packages and tailor-made itineraries.
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap text-base md:text-lg"
          >
            View All Destinations
          </Link>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, index) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56 bg-slate-100">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{d.name}</h3>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  See packages <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};