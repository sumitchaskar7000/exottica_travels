import { RequestQuoteForm } from "@/components/forms/RequestQuoteForm";

export default function MoreCategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-10 md:py-14">
        <h1 className="text-3xl font-semibold text-slate-900">
          More: {params.slug}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Share your needs and we will connect you with the right travel specialist.
        </p>
        <div className="mt-6 max-w-3xl">
          <RequestQuoteForm />
        </div>
      </div>
    </div>
  );
}

