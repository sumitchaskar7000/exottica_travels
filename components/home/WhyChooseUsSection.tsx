"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Consultants with real travel experience",
    description:
      "Talk to people who have actually stayed in the hotels and done the tours they recommend."
  },
  {
    title: "End‑to‑end trip management",
    description:
      "From flights and accommodation to visas and insurance, we help manage the moving parts."
  },
  {
    title: "Negotiated deals & extras",
    description:
      "Preferred rates, added value and special offers from trusted global partners."
  },
  {
    title: "Flexible support when plans change",
    description:
      "Help before, during and after travel if you need to adjust dates or routes."
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container-page">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Why travellers choose TravelWebsitePro.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            We combine digital tools with one‑to‑one human advice so you get the
            best of both worlds — great online convenience and real‑world
            backup.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-5 shadow-card"
            >
              <h3 className="font-semibold text-slate-900">{reason.title}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

