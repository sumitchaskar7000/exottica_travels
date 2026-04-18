"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDestinations, type DestinationOption } from "@/lib/api";

const SLIDES = [
  {
    image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
    title: "Explore the World",
    subtitle: "Discover breathtaking destinations across the globe.",
  },
  {
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    title: "Find Your Paradise",
    subtitle: "Experience luxury and comfort like never before.",
  },
  {
    image: "https://images.pexels.com/photos/21014/pexels-photo.jpg",
    title: "Plan Your Dream Journey",
    subtitle: "Tailor-made packages crafted just for you.",
  },
];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Hero booking panel state
  const [destinationQuery, setDestinationQuery] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    DestinationOption[]
  >([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [heroError, setHeroError] = useState<string | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? SLIDES.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Destination suggestions (debounced)
  useEffect(() => {
    const q = destinationQuery.trim();
    if (q.length < 2) {
      setDestinationSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSuggestionsLoading(true);
        const results = await fetchDestinations(q);
        setDestinationSuggestions(results);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [destinationQuery]);

  const whatsappNumber = "737846020";

  const handleHeroSearch = () => {
    const dest = destinationQuery.trim();
    if (!dest) {
      setHeroError("Please choose a destination.");
      return;
    }

    setHeroError(null);

    const msg = `Hi Exottica Travels, I would like to travel to ${dest}${
      travelDate ? ` on ${travelDate}` : ""
    }. Please help me with availability and a quote.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const showSuggestionDropdown =
    destinationQuery.trim().length >= 2 &&
    (suggestionsLoading || destinationSuggestions.length > 0);

  return (
    <section className="relative min-h-[95vh] overflow-hidden">

      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${SLIDES[current].image})`,
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-20">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-3"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Destination"
              value={destinationQuery}
              onChange={(e) => setDestinationQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/30 text-white placeholder:text-white/80 rounded-xl focus:outline-none"
            />

            {showSuggestionDropdown && (
              <div className="absolute left-0 right-0 mt-2 rounded-xl bg-white text-slate-900 shadow-lg border border-slate-200 overflow-hidden z-30">
                {suggestionsLoading ? (
                  <div className="px-4 py-3 text-sm text-slate-600">
                    Loading...
                  </div>
                ) : destinationSuggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-slate-600">
                    No suggestions found
                  </div>
                ) : (
                  <div className="max-h-60 overflow-auto">
                    {destinationSuggestions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex justify-between gap-3"
                        onMouseDown={() => {
                          setDestinationQuery(opt.name);
                          setDestinationSuggestions([]);
                        }}
                      >
                        <span className="font-medium">{opt.name}</span>
                        {opt.country ? (
                          <span className="text-slate-500 text-xs">
                            {opt.country}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/30 text-white placeholder:text-white/80 rounded-xl focus:outline-none"
          />

          <button
            type="button"
            onClick={handleHeroSearch}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition shadow-lg"
          >
            Search
          </button>
        </motion.div>
      </div>

      {heroError ? (
        <div className="absolute top-[240px] left-1/2 -translate-x-1/2 z-20 max-w-5xl px-4">
          <div className="rounded-xl bg-red-600/90 text-white px-4 py-2 text-sm">
            {heroError}
          </div>
        </div>
      ) : null}

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[95vh] px-4">

        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[current].title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              {SLIDES[current].title}
            </h1>

            <p className="mt-5 text-lg text-slate-200 max-w-2xl mx-auto">
              {SLIDES[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <Link
          href="/destinations"
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-medium transition shadow-xl hover:scale-105 transform"
        >
          Discover Now
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-blue-600/40 backdrop-blur-lg text-white hover:bg-blue-600 transition"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-blue-600/40 backdrop-blur-lg text-white hover:bg-blue-600 transition"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 cursor-pointer rounded-full transition-all duration-300 ${
              current === index
                ? "w-10 bg-blue-500"
                : "w-3 bg-blue-300/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};