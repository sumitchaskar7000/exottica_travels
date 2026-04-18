import Link from "next/link";
import { SERVICES } from "@/lib/services-data";

export const metadata = {
  title: "Travel Services | Exottica Travels",
  description: "Flight ticketing, medical evacuation, corporate travel, leisure packages, group tours, and custom itineraries."
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Comprehensive Travel Solutions
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
            Exottica Travels offers a complete range of travel services tailored to meet every need — 
            from simple flight bookings to complex multi-destination expeditions, emergency medical evacuations to luxury custom packages.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <article
              key={service.slug}
              className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 w-full bg-slate-200 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${service.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                {/* Icon Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-3xl md:text-4xl bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    {service.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 flex flex-col grow">
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 line-clamp-2">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-600 mb-6 flex-grow">
                  {service.description}
                </p>

                {/* CTA */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center px-6 py-3 md:py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold text-base rounded-lg hover:from-brand-700 hover:to-brand-800 transition-all duration-300 transform hover:scale-105"
                >
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-16 md:py-20 border-t border-slate-200">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-center">
          Why Choose Exottica Travels?
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Expert Team", desc: "20+ years of travel industry experience", icon: "👥" },
            { title: "24/7 Support", desc: "Round-the-clock customer assistance", icon: "📞" },
            { title: "Best Prices", desc: "Competitive rates on all services", icon: "💰" },
            { title: "Personalized", desc: "Custom solutions for your needs", icon: "⭐" }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 transition-colors"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Ready to Book Your Travel?
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Contact our travel experts today to plan your next adventure, business trip, or medical evacuation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-700 text-white font-bold text-lg rounded-lg hover:bg-brand-800 transition-colors"
          >
            Get In Touch
          </Link>
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-700 text-brand-700 font-bold text-lg rounded-lg hover:bg-brand-50 transition-colors"
          >
            Request Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

