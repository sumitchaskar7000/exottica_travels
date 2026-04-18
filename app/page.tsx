import { HeroSection } from "@/components/home/HeroSection";
import { HolidaySpecialsSection } from "@/components/home/HolidaySpecialsSection";
import { FlightBookingSection } from "@/components/home/FlightBookingSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedPackagesSection } from "@/components/home/FeaturedPackagesSection";
import { DestinationHighlightsSection } from "@/components/home/DestinationHighlightsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HolidaySpecialsSection />
      <FlightBookingSection />
      <PartnersSection />
      <ServicesSection />
      <FeaturedPackagesSection />
      <DestinationHighlightsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}

