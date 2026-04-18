"use client";

import { useEffect } from "react";
import { TourPackage } from "@/lib/packages-data";
import { RequestQuoteForm } from "@/components/forms/RequestQuoteForm";

export function BookingForm({
  package: pkg,
  onClose
}: {
  package: TourPackage;
  onClose: () => void;
}) {
  useEffect(() => {
    // Prevent background scroll while modal is open.
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Request a quote for {pkg.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {pkg.destination} • {pkg.duration}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <div className="p-6">
          <RequestQuoteForm />
        </div>
      </div>
    </div>
  );
}

