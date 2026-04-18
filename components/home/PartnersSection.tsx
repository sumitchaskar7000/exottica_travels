"use client";

import { motion } from "framer-motion";

const partners = ["Global Airlines", "Oceanic Cruises", "City Hotels", "Safari Lodges"];

export const PartnersSection = () => {
  return (
    <section className="py-10 bg-slate-50 border-y border-slate-200">
      <div className="container-page">
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-500 mb-4">
          Trusted travel partners
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          {partners.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs md:text-sm text-slate-700"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

