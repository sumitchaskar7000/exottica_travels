import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Exottica Travels",
    };
  }

  return {
    title: `${service.title} | Exottica Travels`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 md:h-80 lg:h-96 w-full bg-slate-200 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${service.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-end px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto w-full pb-8">
            <div className="flex items-center gap-4">
              <div className="text-5xl md:text-6xl">{service.icon}</div>
              <div>
                <p className="text-sm md:text-base font-semibold text-brand-300 uppercase tracking-wide">
                  Service
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  {service.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Overview
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </section>

            {/* What We Offer */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                What We Offer
              </h2>
              <div className="grid gap-4">
                {service.offerings.map((offering, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                  >
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {offering.title}
                    </h3>
                    <p className="text-slate-600">{offering.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Why Choose This Service?
              </h2>
              <div className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center mt-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-slate-700 text-base md:text-lg flex-grow pt-0.5">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ideal For */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Ideal For
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.idealFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-900 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="lg:sticky lg:top-6 h-fit">
            {/* CTA Card */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                {service.cta}
              </h3>
              <p className="text-brand-100 mb-6">
                Contact our team to learn more about this service and get a personalized quote.
              </p>
              <Link
                href="/contact"
                className="block text-center px-6 py-3 bg-white text-brand-700 font-bold rounded-lg hover:bg-brand-50 transition-colors mb-3"
              >
                Contact Us
              </Link>
              <Link
                href="/request-quote"
                className="block text-center px-6 py-3 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors border border-brand-400"
              >
                Request a Quote
              </Link>
            </div>

            {/* Service Info Card */}
            <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4 text-lg">Service Info</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase font-semibold text-slate-600 mb-1">
                    Category
                  </p>
                  <p className="text-slate-900 font-bold capitalize">
                    {service.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Services */}
            <div className="mt-8">
              <h4 className="font-bold text-slate-900 mb-4 text-lg">
                Other Services
              </h4>
              <div className="space-y-2">
                {SERVICES.filter(s => s.slug !== service.slug)
                  .slice(0, 3)
                  .map((relatedService) => (
                    <Link
                      key={relatedService.slug}
                      href={`/services/${relatedService.slug}`}
                      className="block p-3 rounded-lg border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-1">{relatedService.icon}</span>
                        <div className="flex-grow">
                          <p className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors text-sm">
                            {relatedService.shortTitle}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-8 bg-gradient-to-r from-brand-600 to-brand-700 py-12 md:py-16 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Book?
          </h2>
          <p className="text-brand-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Our travel experts are ready to help you with {service.shortTitle}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-700 font-bold text-lg rounded-lg hover:bg-slate-100 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
