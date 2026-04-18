import { RequestQuoteForm } from "@/components/forms/RequestQuoteForm";

export default function CruiseTypePage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-10 md:py-14">
        <h1 className="text-3xl font-semibold text-slate-900">
          Cruises: {params.slug}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Tell us what you are looking for and we will send tailored cruise options.
        </p>
        <div className="mt-6 max-w-3xl">
          <RequestQuoteForm />
        </div>
      </div>
    </div>
  );
}

