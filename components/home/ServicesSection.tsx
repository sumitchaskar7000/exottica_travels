"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/services-data";

export const ServicesSection = () => {
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 leading-tight">
              Travel Services for Every Journey
            </h2>
            <p className="mt-4 text-base md:text-lg text-blue-500 max-w-2xl leading-relaxed">
              From flight bookings to medical evacuations, corporate travel management to custom packages — 
              Exottica Travels offers comprehensive solutions for all your travel needs.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap text-base md:text-lg"
          >
            All Services
          </Link>
        </div>
        {/* Services Grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-6 md:p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-blue-100 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="text-4xl md:text-5xl mb-4">{service.icon}</div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3 line-clamp-2">
                {service.shortTitle}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-blue-500 mb-6 flex-grow">
                {service.shortDescription}
              </p>

              {/* CTA */}
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center justify-center px-4 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-base rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
              >
                Learn More →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

