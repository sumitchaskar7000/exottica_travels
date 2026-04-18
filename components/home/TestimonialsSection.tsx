"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Lerato M.",
    text: "Our Mauritius trip was seamless from flights to transfers. The consultant listened and suggested options we hadn’t considered.",
    rating: 5
  },
  {
    name: "Daniel K.",
    text: "They helped our team coordinate a complex conference trip with multiple arrivals — everything ran on time.",
    rating: 5
  },
  {
    name: "Ahmed S.",
    text: "Loved having one point of contact from planning to after we got home. We’ll book again.",
    rating: 4
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-page">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            What our travellers say.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Real feedback from clients who booked holidays and business trips
            through TravelWebsitePro.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-slate-50 p-4 shadow-card h-full flex flex-col"
            >
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
              <blockquote className="text-sm text-slate-700 flex-1">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-slate-900">
                {t.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

