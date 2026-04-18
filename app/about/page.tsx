export default function AboutPage() {
  return (
    <div className="container-page py-12 md:py-20">
      <header className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Exottica Travels Private Limited
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-700 max-w-3xl">
          Based in Pune, India, Exottica Travels is a full-service travel
          management company delivering seamless, transparent and premium
          travel experiences for individuals, families, corporates and
          institutions. We specialise in curated holiday packages, medical
          tourism, visa assistance, MICE services, charter flights and global
          flight ticketing.
        </p>
      </header>

      <main className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
          <p className="text-lg text-slate-700">
            To make global travel easy, reliable, and accessible — while
            delivering personalized service with professional excellence.
          </p>

          <h3 className="text-xl font-medium text-slate-900">Our Vision</h3>
          <p className="text-lg text-slate-700">
            To become one of India’s most trusted and innovative travel
            solution providers, recognized for reliability, service quality,
            and client satisfaction.
          </p>

          <div className="rounded-lg bg-white p-6 shadow-card border">
            <h4 className="text-lg font-semibold text-slate-900">Why Choose Exottica</h4>
            <ul className="mt-3 space-y-2 text-lg text-slate-700 list-disc pl-5">
              <li>Complete travel solutions under one roof: flights, hotels, charters, MICE.</li>
              <li>Personalized travel planning tailored to your needs.</li>
              <li>Strong global network of partners and vetted suppliers.</li>
              <li>Transparent pricing with no hidden charges.</li>
              <li>24/7 support and dedicated account managers for corporates.</li>
              <li>Specialized medical tourism and emergency evacuation services.</li>
            </ul>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-card border">
            <h3 className="text-xl font-semibold text-slate-900">Core Services</h3>
            <ul className="mt-3 space-y-2 text-lg text-slate-700 pl-5 list-decimal">
              <li>Domestic & international flight booking</li>
              <li>Curated holiday packages (family, couples, adventure, luxury)</li>
              <li>Medical tourism coordination and air ambulance services</li>
              <li>MICE planning: conferences, incentives, exhibitions</li>
              <li>Charter flight and private jet bookings</li>
              <li>Visa assistance and documentation services</li>
              <li>Airport transfers, cruise bookings and travel insurance</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-card border">
            <h3 className="text-xl font-semibold text-slate-900">Service Highlights</h3>
            <p className="text-lg text-slate-700">
              Personalized itineraries, transparent costing, global partnerships,
              and 24/7 traveler support—ideal for families, students, corporates
              and VIP clients.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-card border">
            <h3 className="text-xl font-semibold text-slate-900">Contact & Next Steps</h3>
            <p className="text-lg text-slate-700">
              Ready to plan your trip? Reach out to our team for a consultation
              and a tailored proposal. For corporate registrations and MICE
              partnerships, request a callback and a dedicated account manager
              will be assigned.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

