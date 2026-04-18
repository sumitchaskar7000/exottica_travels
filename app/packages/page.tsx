"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { PACKAGES, searchPackages } from "@/lib/packages-data";

function PackagesContent() {
  const [destination, setDestination] = useState("");
  const [dateInput, setDateInput] = useState("");
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category") || undefined;

  const results = useMemo(() => {
    return searchPackages({
      destination: destination.trim() || undefined,
      date: dateInput.trim() || undefined,
      category: categoryParam,
    });
  }, [destination, dateInput, categoryParam]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-8 md:py-12">
        <h1 className="text-3xl font-bold text-slate-900">Travel packages</h1>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Search by destination or browse all packages. Click &quot;Read more&quot; to
          see full details.
        </p>

        {/* Search bar - clear and interactive */}
        <div className="mt-8 p-4 md:p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Search tours & packages
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex-1">
              <span className="block text-xs text-slate-500 mb-1">
                Destination
              </span>
              <input
                type="text"
                placeholder="e.g. Mauritius, Zanzibar, Sun City"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                aria-label="Search by destination"
              />
            </label>
            <label className="sm:w-48">
              <span className="block text-xs text-slate-500 mb-1">
                Travel date (optional)
              </span>
              <input
                type="text"
                placeholder="e.g. Dec 2025"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                aria-label="Filter by date"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setDestination("");
                setDateInput("");
              }}
              className="self-end sm:self-auto px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results - always show */}
        <div className="mt-8">
          <p className="text-sm text-slate-600 mb-4">
            {results.length} {results.length === 1 ? "package" : "packages"} found
          </p>
          {results.length === 0 ? (
            <div className="rounded-xl bg-white border border-slate-200 p-8 text-center text-slate-600">
              <p>
                No packages match your search. Try a different destination or
                clear the filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDestination("");
                  setDateInput("");
                }}
                className="mt-3 text-brand-600 font-medium hover:underline"
              >
                Show all packages
              </button>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((pkg) => (
                <li key={pkg.slug}>
                  <article className="h-full flex flex-col rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3] bg-slate-200">
                      <Image
                        src={pkg.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {pkg.originalPrice && pkg.price < pkg.originalPrice && (
                        <span className="absolute bottom-2 right-2 bg-brand-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h2 className="font-semibold text-slate-900">{pkg.title}</h2>
                      <p className="text-xs text-slate-500 mt-1">
                        {pkg.destination} • {pkg.duration}
                      </p>
                      <p className="text-sm text-slate-700 mt-2 line-clamp-2">
                        {pkg.description}
                      </p>
                      <p className="mt-2 text-brand-700 font-semibold">
                        From ₹{pkg.price} pp
                      </p>
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                      >
                        Read more
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PackagesContent />
    </Suspense>
  );
}
