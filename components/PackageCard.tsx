"use client";

import Image from "next/image";
import Link from "next/link";
import { TourPackage } from "@/lib/packages-data";

export function PackageCard({
  package: pkg,
  onBookNow
}: {
  package: TourPackage;
  onBookNow: () => void;
}) {
  return (
    <article className="h-full flex flex-col rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-slate-200">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        {pkg.originalPrice && pkg.price < pkg.originalPrice && (
          <span className="absolute bottom-2 right-2 bg-brand-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h2 className="font-semibold text-slate-900">{pkg.title}</h2>
        <p className="text-xs text-slate-500">
          {pkg.destination} • {pkg.duration}
        </p>
        <p className="text-sm text-slate-700 line-clamp-2">{pkg.description}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="text-brand-700 font-semibold">
            From ₹{pkg.price} <span className="text-xs font-normal">pp</span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Read more
          </Link>
          <button
            type="button"
            onClick={onBookNow}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

