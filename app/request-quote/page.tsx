import { RequestQuoteForm } from "@/components/forms/RequestQuoteForm";

export default function RequestQuotePage() {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-slate-900">
          Request a travel quote
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Share a few details about where and when you&apos;d like to travel.
          We&apos;ll send back tailored options and pricing.
        </p>
      </div>
      <div className="mt-6 max-w-3xl">
        <RequestQuoteForm />
      </div>
    </div>
  );
}

