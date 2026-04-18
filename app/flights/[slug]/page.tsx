import { FlightBookingSection } from "@/components/home/FlightBookingSection";

export default function FlightTypePage({ params }: { params: { slug: string } }) {
  // `slug` is used only for display; flight search integration is currently stubbed.
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-10 md:py-14">
        <h1 className="text-3xl font-semibold text-slate-900">
          Flights: {params.slug}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Use the search tool below to book flights.
        </p>
        <div className="mt-6">
          <FlightBookingSection />
        </div>
      </div>
    </div>
  );
}

