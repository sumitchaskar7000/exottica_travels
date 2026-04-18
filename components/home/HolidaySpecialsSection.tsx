"use client";

/**
 * HolidaySpecialsSection
 * ✅ No custom keyframe needed — works out of the box with Tailwind
 * ✅ No <style> tag — zero hydration error
 * ✅ Cards visible immediately — no opacity:0 stuck state
 *
 * Add Cormorant Garamond to your layout.tsx:
 * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />
 */

import { useState, useEffect } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const specials = [
  {
    title: "Sun City Cabanas",
    subtitle: "3 Star Retreat",
    nights: "2 nights",
    dates: "01 Dec 25 – 30 Nov 26",
    price: "R2,145",
    tag: "Hot Deal",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
    icons: ["bed"],
    description: "Escape to the iconic Sun City resort with a luxurious 2-night stay at the Cabanas. Enjoy world-class amenities, pools, and entertainment in the heart of the Pilanesberg.",
    highlights: ["Resort pool access", "Entertainment included", "Buffet breakfast daily"],
    category: "RESORT",
    href: "/packages/sun-city-cabanas",
  },
  {
    title: "Mozambique Cruise",
    subtitle: "MSC Opera · Pomene",
    nights: "4 nights",
    dates: "16 Feb 26 – 20 Feb 26",
    price: "R3,600",
    extraPrice: "+R1,898 pp port charges",
    tag: "Waves of Love",
    image: "https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&w=800",
    icons: ["ship"],
    description: "Sail to the pristine shores of Pomene aboard the magnificent MSC Opera. Four nights of ocean bliss with all meals, world-class entertainment, and stunning coastal views.",
    highlights: ["All meals onboard", "Entertainment included", "*Terms & conditions apply"],
    category: "CRUISE",
    href: "/packages/mozambique-cruise",
  },
  {
    title: "Paradise Beach Resort",
    subtitle: "Zanzibar · All-Inclusive",
    nights: "7 nights",
    dates: "19 Mar 26 – 15 May 26",
    price: "R15,585",
    tag: "All-Inclusive",
    image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
    icons: ["plane", "bed"],
    description: "Seven nights of pure paradise on the spice island of Zanzibar. Turquoise waters, white sands, and an all-inclusive experience that takes care of every detail.",
    highlights: ["Return flights included", "All meals & drinks", "Thursday departures only"],
    category: "ISLAND",
    href: "/packages/zanzibar",
  },
  {
    title: "Mauricia Beachcomber",
    subtitle: "Resort & Spa · Mauritius",
    nights: "5 nights",
    dates: "01 Jun 26 – 15 Jun 26",
    price: "R18,990",
    tag: "1 Child U6 Free",
    badge: "DOUBLE POINTS",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
    icons: ["plane", "bed"],
    description: "Indulge in five nights at the legendary Mauricia Beachcomber Resort & Spa. Children under 6 share and eat free — the perfect family luxury escape to paradise.",
    highlights: ["Return flights included", "1 child U6 shares free", "Double penperks points"],
    category: "LUXURY",
    href: "/packages/mauricia-beachcomber",
  },
];

type SpecialItem = (typeof specials)[number];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBed() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
    </svg>
  );
}
function IconShip() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.05 1.29 7.57 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78-.12-.24-.32-.42-.57-.5L20 10.62V6h-8V4h8c1.1 0 2 .9 2 2v4.62l-1.27.42c-.25.08-.45.26-.57.5-.12.24-.14.52-.06.78L20.05 19H20c-1.6 0-3.02-.88-4-2-.98 1.12-2.4 2-4 2h-.05l-1.9-6.68c-.08-.26-.06-.54.06-.78.12-.24.32-.42.57-.5L14 10.62V6H6v4.62l-1.27.42c-.25.08-.45.26-.57.5-.12.24-.14.52-.06.78L3.95 19z" />
    </svg>
  );
}
function IconPlane() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

// ─── FlipCard ─────────────────────────────────────────────────────────────────

function FlipCard({ item, index }: { item: SpecialItem; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);

  // Staggered reveal — runs only on client, no SSR mismatch
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <article
      className="group relative h-[490px] [perspective:1200px] transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(1.75rem)",
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* ── Rotating inner ── */}
      <div
        className="relative w-full h-full cursor-pointer [transform-style:preserve-3d] transition-transform duration-700"
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* ══════════════════════ FRONT ══════════════════════ */}
        <div
          className="absolute inset-0 rounded overflow-hidden bg-white border border-black/[0.08] shadow-md flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Photo */}
          <div className="relative h-[230px] shrink-0 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              style={{ filter: "grayscale(25%) contrast(1.08)" }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = "grayscale(0%) contrast(1.02)";
                e.currentTarget.style.transform = "scale(1.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = "grayscale(25%) contrast(1.08)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/55 pointer-events-none" />

            {/* Category */}
            <span className="absolute top-4 left-4 text-[8.5px] font-medium tracking-[0.22em] uppercase text-[#c9a84c] border border-[#c9a84c]/60 px-2.5 py-[3px] bg-white/85 backdrop-blur-sm">
              {item.category}
            </span>

            {/* Badge */}
            {item.badge && (
              <span className="absolute top-4 right-4 text-[8px] font-semibold tracking-[0.13em] uppercase text-white bg-black px-2.5 py-[3px]">
                {item.badge}
              </span>
            )}

            {/* Icons */}
            <div className="absolute bottom-3.5 left-4 flex gap-1.5 text-white/75">
              {item.icons.includes("bed")   && <IconBed />}
              {item.icons.includes("plane") && <IconPlane />}
              {item.icons.includes("ship")  && <IconShip />}
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 px-[22px] pt-5 pb-[22px]">
            <p className="text-[8.5px] font-medium tracking-[0.2em] uppercase text-[#c9a84c]/70 mb-2">
              {item.tag}
            </p>
            <h3
              className="text-[20px] font-bold leading-tight text-black mb-0.5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {item.title}
            </h3>
            <p className="text-[11px] font-light text-black/45 tracking-[0.04em]">
              {item.subtitle}
            </p>
            <div className="w-7 h-px bg-[#c9a84c]/35 my-3.5" />
            <p className="flex items-center gap-1.5 text-[11px] text-black/45 flex-1">
              <span className="font-medium text-black/80">{item.nights}</span>
              <span className="opacity-25">·</span>
              <span>{item.dates}</span>
            </p>
            <div className="flex items-end justify-between mt-3">
              <div>
                <span className="block text-[9px] tracking-[0.1em] text-black/35 mb-0.5">From</span>
                <span
                  className="text-[24px] font-bold text-black"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.price}
                </span>
                <span className="text-[11px] text-black/40 ml-1">pps</span>
              </div>
              <span className="flex items-center gap-1 text-[9.5px] font-medium tracking-[0.13em] uppercase text-black/20 group-hover:text-[#c9a84c] transition-colors duration-300">
                Details
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════ BACK ══════════════════════ */}
        <div
          className="absolute inset-0 rounded overflow-hidden bg-[#f7f4ef] shadow-md flex flex-col px-[26px] py-7"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="block text-[9px] font-medium tracking-[0.25em] uppercase text-[#c9a84c] mb-2.5">
            {item.category}
          </span>
          <h3
            className="text-[21px] font-bold leading-tight text-[#0a0a0a] mb-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item.title}
          </h3>
          <p className="text-[11px] font-light text-black/45 tracking-[0.04em]">
            {item.subtitle}
          </p>
          <div className="w-full h-px bg-black/10 my-4" />
          <p className="text-[12px] font-light leading-[1.75] text-black/60 flex-1">
            {item.description}
          </p>
          <ul className="mt-3.5 flex flex-col gap-[7px] list-none p-0">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-baseline gap-2.5 text-[11px] text-[#0a0a0a]">
                <span className="text-[10px] text-[#c9a84c] shrink-0">—</span>
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-black/10 flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] tracking-[0.1em] uppercase text-black/35 mb-0.5">From</p>
              <p>
                <span
                  className="text-[24px] font-bold text-[#0a0a0a]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.price}
                </span>
                <span className="text-[11px] font-light text-black/40 ml-1">pps</span>
              </p>
              {item.extraPrice && (
                <p className="text-[9px] text-black/40 mt-0.5">{item.extraPrice}</p>
              )}
            </div>
            <a
              href={item.href}
              className="inline-flex items-center gap-1.5 shrink-0 text-[10.5px] font-medium tracking-[0.12em] uppercase text-[#0a0a0a] border-b border-[#c9a84c] pb-0.5 hover:opacity-50 transition-opacity duration-200"
            >
              View Package
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HolidaySpecialsSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <div>
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#c9a84c] mb-3">
              Curated Escapes
            </p>
            <h2
              className="font-bold text-[#0a0a0a] leading-[1.12]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(26px, 4vw, 46px)",
              }}
            >
              Holiday specials
              <br />
              <em className="italic text-black/35">to be experienced.</em>
            </h2>
          </div>
          <p className="hidden sm:block text-[12px] font-light text-black/45 leading-relaxed max-w-[240px] text-right">
            Hover over each card to reveal the full details of your next unforgettable journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specials.map((item, i) => (
            <FlipCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HolidaySpecialsSection;
