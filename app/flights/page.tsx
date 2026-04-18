import { FlightBookingSection } from "@/components/home/FlightBookingSection";

export default function FlightsPage() {
  // The homepage already contains the flight search UI; this page exists so navigation
  // and `router.push("/flights")` never ends in a 404.
  return <FlightBookingSection />;
}

