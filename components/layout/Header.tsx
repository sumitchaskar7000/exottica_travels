"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Type definitions
type NavItem = {
  href: string;
  label: string;
  children?: Record<string, string[]>;
  bookNow?: boolean;
  icon?: string;
  highlight?: boolean;
  simpleDropdown?: boolean;
};

// Helper function to create safe slugs
const slugify = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

// Destinations data structure - SIMPLE DROPDOWN
const destinationsSimple = [
  "Africa",
  "Asia", 
  "Europe",
  "Indian Ocean",
  "Middle East",
  "Americas"
];

// Book Online data structure
const bookOnlineData = {
  "Holiday Favourites": [
    "Beachcomber Mauritius", "Mauritius All-Inclusive", "Seychelles Packages",
    "Bali Packages", "Thailand Packages", "European Tours",
    "African Safaris", "Family Holidays", "Honeymoon Packages", "Luxury Getaways"
  ],
  "Travel Essentials": [
    "Flights", "Cruises", "Car Rental", "Travel Insurance",
    "Visas & Documentation", "Airport Transfers", "Travel Money",
    "SIM Cards", "Travel Vaccinations", "Luggage Services"
  ],
  "Quick Book": [
    "Last Minute Deals", "All-Inclusive Specials", "Flight + Hotel Bundles",
    "Weekend Getaways", "Group Bookings", "Corporate Travel",
    "Wedding Packages", "Golf Holidays", "Adventure Travel", "Cultural Tours"
  ]
};

// Navigation items - REMOVED CONTACT SECTION
const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Book Online", children: bookOnlineData, bookNow: true },
  { href: "/destinations", label: "Destinations", simpleDropdown: true, children: { "Destinations": destinationsSimple } },
  { href: "/packages", label: "Holidays" },
  { href: "/special-offers", label: "Specials" },
  {
    href: "/packages",
    label: "Flights",
    icon: "key",
    children: {
      "Flight Types": [
        "Domestic Flights", "International Flights", "Regional Flights", "Charter Flights",
        "Multi-City Flights", "Round the World", "Business Class", "Economy Class", "First Class", "Premium Economy"
      ],
      "Popular Routes": [
        "Johannesburg to Cape Town", "Cape Town to Durban", "Johannesburg to Mauritius",
        "Cape Town to London", "Johannesburg to Dubai", "Durban to Mumbai",
        "Cape Town to Sydney", "Johannesburg to New York", "Pretoria to Bangkok", "Port Elizabeth to Perth"
      ]
    }
  },
  {
    href: "/packages",
    label: "Cruises",
    children: {
      "Cruise Lines": [
        "MSC Cruises", "Royal Caribbean", "Norwegian Cruise Line", "Carnival Cruise Line",
        "Princess Cruises", "Celebrity Cruises", "Disney Cruise Line", "Cunard Line",
        "Holland America Line", "Virgin Voyages"
      ],
      "Cruise Types": [
        "Caribbean Cruises", "Mediterranean Cruises", "Alaska Cruises", "European River Cruises",
        "Asian Cruises", "World Cruises", "Expedition Cruises", "Luxury Cruises", "Family Cruises", "Theme Cruises"
      ]
    }
  },
  { href: "/branches", label: "Branches" },
  { href: "/blog", label: "Blog" },
];

// Simple Dropdown Component
const SimpleDropdown = ({ 
  items, 
  baseHref, 
  onClose 
}: { 
  items: string[], 
  baseHref: string, 
  onClose: () => void 
}) => {
  return (
    <div className="py-2 min-w-[200px]">
      {items.map((item) => (
        <Link
          key={item}
          href={`${baseHref}/${slugify(item)}`}
          className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          onClick={onClose}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

// Main Header
export const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"main" | "submenu" | "items">("main");
  const [mobileActiveItem, setMobileActiveItem] = useState<string | null>(null);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const navRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const resetMobile = () => {
    setOpen(false);
    setMobileView("main");
    setMobileActiveItem(null);
    setActiveCategory(null);
  };

  useEffect(() => {
    if (activeNavItem || clickedItem) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        let shouldClose = true;
        navRefs.current.forEach((ref) => {
          if (ref && ref.contains(target)) shouldClose = false;
        });
        if (shouldClose) {
          setActiveNavItem(null);
          setActiveCategory(null);
          setClickedItem(null);
        }
      };
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [activeNavItem, clickedItem]);

  const activeMobileItem = useMemo(
    () => navItems.find((item) => item.label === mobileActiveItem),
    [mobileActiveItem]
  );

  const handleDesktopNavClick = (e: React.MouseEvent, itemLabel: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (clickedItem === itemLabel) {
      setClickedItem(null);
      setActiveNavItem(null);
      setActiveCategory(null);
    } else {
      setClickedItem(itemLabel);
      setActiveNavItem(itemLabel);
      setActiveCategory(null);
    }
  };

  const handleMouseEnter = (itemLabel: string) => {
    if (!clickedItem && navItems.find((item) => item.label === itemLabel)?.children) {
      setActiveNavItem(itemLabel);
    }
  };

  const handleMouseLeave = () => {
    if (!clickedItem) {
      setActiveNavItem(null);
      setActiveCategory(null);
    }
  };

  const handleMobileNavClick = (item: NavItem) => {
    if (item.children) {
      setMobileActiveItem(item.label);
      setMobileView("submenu");
    } else {
      resetMobile();
    }
  };

  const getSubItemHref = (mainItem: NavItem, subItem: string) => {
    if (mainItem.bookNow) return `/book-online/${slugify(subItem)}`;
    if (mainItem.label === "Destinations") return `/destinations/${slugify(subItem)}`;
    if (mainItem.label === "Flights") return `/flights/${slugify(subItem)}`;
    if (mainItem.label === "Cruises") return `/cruises/${slugify(subItem)}`;
    return `/packages/${slugify(subItem)}`;
  };

  const shouldShowDropdown = (itemLabel: string) => {
    const item = navItems.find((item) => item.label === itemLabel);
    return item?.children && (activeNavItem === itemLabel || clickedItem === itemLabel);
  };

  const setNavItemRef = (label: string, el: HTMLDivElement | null) => {
    if (el) navRefs.current.set(label, el);
    else navRefs.current.delete(label);
  };

  const getDropdownPosition = (label: string) => {
    const element = navRefs.current.get(label);
    if (!element) return "center";
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const dropdownWidth = 800;
    if (rect.left + dropdownWidth > viewportWidth - 20) return "right";
    if (rect.left - dropdownWidth / 2 < 20) return "left";
    return "center";
  };

  const closeAll = () => {
    setActiveNavItem(null);
    setClickedItem(null);
  };

  const isSimpleDropdown = (item: NavItem) => {
    return item.simpleDropdown === true;
  };

  const getSimpleDropdownItems = (item: NavItem) => {
    if (!item.children) return [];
    const firstKey = Object.keys(item.children)[0];
    return item.children[firstKey] || [];
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-[72px] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Mobile: hamburger + logo */}
          <div className="flex items-center gap-3 md:hidden flex-1">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center" onClick={closeAll}>
              <Image
                src="/images/logo/ExotticaLogo.png"
                alt="Exottica Travels"
                width={120}
                height={40}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop logo - LEFT */}
          <Link href="/" className="hidden md:flex items-center shrink-0" onClick={closeAll}>
            <Image
              src="/images/logo/ExotticaLogo.png"
              alt="Exottica Travels"
              width={140}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - CENTER */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <nav className="flex items-center space-x-0.5 xl:space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  ref={(el) => setNavItemRef(item.label, el)}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {item.children ? (
                    <>
                      <button
                        onClick={(e) => handleDesktopNavClick(e, item.label)}
                        className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all duration-200 flex items-center gap-1 whitespace-nowrap text-sm xl:text-base
                          ${activeNavItem === item.label || clickedItem === item.label
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"}`}
                        aria-expanded={activeNavItem === item.label || clickedItem === item.label}
                        type="button"
                      >
                        {item.icon === "key" && (
                          <svg className="w-3.5 h-3.5 text-blue-600 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.65 10A5.99 5.99 0 007 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.52 0 4.65-1.56 5.53-3.77L18 16.47V19h-2v-1.53l-3.35-3.35zM17 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                          </svg>
                        )}
                        <span className="font-medium">{item.label}</span>
                        <svg
                          className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${activeNavItem === item.label || clickedItem === item.label ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown panel */}
                      {shouldShowDropdown(item.label) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full mt-1 bg-white shadow-xl border border-slate-200 rounded-lg z-50
                            ${isSimpleDropdown(item) 
                              ? "min-w-[200px]" 
                              : "w-[90vw] max-w-[280px] sm:max-w-[400px] lg:max-w-[700px] xl:max-w-[800px]"}
                            ${getDropdownPosition(item.label) === "right"
                              ? "right-0"
                              : getDropdownPosition(item.label) === "left"
                                ? "left-0"
                                : "left-1/2 -translate-x-1/2"}`}
                          onMouseEnter={() => setActiveNavItem(item.label)}
                          onMouseLeave={() => {
                            if (!clickedItem) {
                              setActiveNavItem(null);
                              setActiveCategory(null);
                            }
                          }}
                        >
                          {isSimpleDropdown(item) ? (
                            <div className="py-2">
                              {getSimpleDropdownItems(item).map((subItem) => (
                                <Link
                                  key={subItem}
                                  href={getSubItemHref(item, subItem)}
                                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                  onClick={() => {
                                    setActiveNavItem(null);
                                    setActiveCategory(null);
                                    setClickedItem(null);
                                  }}
                                >
                                  {subItem}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 lg:p-6">
                              {/* Book Online banner */}
                              {item.bookNow && (
                                <div className="mb-4 lg:mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                      <h3 className="text-lg lg:text-xl font-bold">Book it now</h3>
                                      <p className="text-blue-100 text-xs lg:text-sm mt-1">Your holiday favourites</p>
                                    </div>
                                    <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap">
                                      Sign In with Facebook
                                    </button>
                                  </div>
                                  <p className="text-blue-100 text-xs mt-2 hidden sm:block">
                                    Sign in with Facebook to keep your holiday favourites catalogued and readily available for the next time you visit.
                                  </p>
                                </div>
                              )}

                              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                                {/* Categories column */}
                                <div className="lg:w-48 xl:w-64">
                                  <h3 className="font-semibold text-slate-900 mb-3 lg:mb-4 text-base lg:text-lg">
                                    {item.bookNow ? "Browse Categories" : "Explore Options"}
                                  </h3>
                                  <div className="space-y-1">
                                    {Object.keys(item.children || {}).map((category) => (
                                      <button
                                        key={category}
                                        onMouseEnter={() => setActiveCategory(category)}
                                        className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors flex items-center justify-between
                                          ${activeCategory === category
                                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                                            : "text-slate-700 hover:bg-slate-50"}`}
                                      >
                                        <span className="font-medium text-sm lg:text-base">{category}</span>
                                        <svg
                                          className={`w-4 h-4 transition-transform ${activeCategory === category ? "rotate-180" : ""}`}
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Items column */}
                                <div className="flex-1">
                                  {activeCategory ? (
                                    <div>
                                      <h3 className="font-semibold text-slate-900 mb-3 lg:mb-4 text-base lg:text-lg">{activeCategory}</h3>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                                        {item.children?.[activeCategory]?.map((subItem) => (
                                          <Link
                                            key={subItem}
                                            href={getSubItemHref(item, subItem)}
                                            className="group flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg hover:bg-blue-50 transition-colors"
                                            onClick={() => {
                                              setActiveNavItem(null);
                                              setActiveCategory(null);
                                              setClickedItem(null);
                                            }}
                                          >
                                            <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shrink-0
                                              ${item.bookNow ? "bg-blue-100"
                                                : item.label === "Destinations" ? "bg-green-100"
                                                  : item.label === "Flights" ? "bg-purple-100"
                                                    : item.label === "Cruises" ? "bg-red-100"
                                                      : "bg-slate-100"}`}>
                                              <span className={`text-xs font-semibold
                                                ${item.bookNow ? "text-blue-600"
                                                  : item.label === "Destinations" ? "text-green-600"
                                                    : item.label === "Flights" ? "text-purple-600"
                                                      : item.label === "Cruises" ? "text-red-600"
                                                        : "text-slate-600"}`}>
                                                {subItem.substring(0, 2).toUpperCase()}
                                              </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <span className="text-slate-700 group-hover:text-blue-600 transition-colors text-sm lg:text-base truncate block">
                                                {subItem}
                                              </span>
                                              {item.bookNow && subItem.includes("Book") && (
                                                <div className="text-xs text-green-600 font-medium mt-0.5">Book Now →</div>
                                              )}
                                            </div>
                                          </Link>
                                        ))}
                                      </div>
                                      <div className="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t">
                                        <Link
                                          href={item.href}
                                          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 text-sm lg:text-base"
                                          onClick={() => {
                                            setActiveNavItem(null);
                                            setActiveCategory(null);
                                            setClickedItem(null);
                                          }}
                                        >
                                          View all {activeCategory.toLowerCase()} options
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                          </svg>
                                        </Link>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-4 lg:p-8">
                                      <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 lg:mb-4
                                        ${item.bookNow ? "bg-blue-50"
                                          : item.label === "Destinations" ? "bg-green-50"
                                            : item.label === "Flights" ? "bg-purple-50"
                                              : item.label === "Cruises" ? "bg-red-50"
                                                : "bg-slate-50"}`}>
                                        <svg
                                          className={`w-6 h-6 lg:w-8 lg:h-8
                                            ${item.bookNow ? "text-blue-400"
                                              : item.label === "Destinations" ? "text-green-400"
                                                : item.label === "Flights" ? "text-purple-400"
                                                  : item.label === "Cruises" ? "text-red-400"
                                                    : "text-slate-400"}`}
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                      </div>
                                      <p className="text-slate-500 text-sm lg:text-base">
                                        {item.bookNow
                                          ? "Select a category to book your perfect holiday"
                                          : "Select a category to explore options"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors whitespace-nowrap text-sm xl:text-base font-medium"
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Tablet Navigation (md to lg) - Only hamburger menu */}
          <div className="hidden md:flex lg:hidden items-center justify-end flex-1">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={resetMobile}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-xl md:hidden flex flex-col overflow-hidden"
            >
              {mobileView === "main" && (
                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                  <div className="p-4 flex items-center justify-between border-b border-slate-200">
                    <button onClick={resetMobile} className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <Image src="/images/logo/ExotticaLogo.png" alt="Exottica Travels" width={100} height={30} className="h-6 w-auto" />
                    <div className="w-10" />
                  </div>

                  <div className="mx-4 mt-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-4">
                    <h3 className="font-bold text-sm">Book it now</h3>
                    <p className="text-blue-100 text-xs mt-0.5">Your holiday favourites</p>
                    <p className="text-blue-100 text-xs mt-2">Sign in with Facebook to keep your holiday favourites catalogued.</p>
                    <button className="w-full mt-3 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                      🔗 Sign In with Facebook
                    </button>
                  </div>

                  <nav className="flex-1 overflow-auto py-4 px-4">
                    <ul className="space-y-1">
                      {navItems.map((item) => (
                        <li key={item.label}>
                          {item.children ? (
                            <button
                              onClick={() => handleMobileNavClick(item)}
                              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                            >
                              <div className="flex items-center gap-2">
                                {item.icon === "key" && (
                                  <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.65 10A5.99 5.99 0 007 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.52 0 4.65-1.56 5.53-3.77L18 16.47V19h-2v-1.53l-3.35-3.35zM17 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                                  </svg>
                                )}
                                <span className="font-medium">{item.label}</span>
                              </div>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm"
                              onClick={resetMobile}
                            >
                              <span className="font-medium">{item.label}</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="p-4 border-t border-slate-200">
                    <a
                      href="tel:+7378460207"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Call us</p>
                        <p className="text-sm font-semibold text-slate-800">+91 73 784 6020</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}

              {mobileView === "submenu" && mobileActiveItem && activeMobileItem && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-full">
                  <div className="p-4 flex items-center border-b border-slate-200">
                    <button
                      onClick={() => { setMobileView("main"); setMobileActiveItem(null); }}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded mr-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-base font-bold text-slate-900 truncate">{mobileActiveItem}</h2>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    {activeMobileItem.bookNow && (
                      <div className="mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-3">
                        <h3 className="font-bold text-sm">Book your favourites</h3>
                        <p className="text-blue-100 text-xs mt-0.5">Quick access to popular bookings</p>
                      </div>
                    )}
                    
                    {isSimpleDropdown(activeMobileItem) ? (
                      <div className="space-y-1">
                        {getSimpleDropdownItems(activeMobileItem).map((item) => (
                          <Link
                            key={item}
                            href={getSubItemHref(activeMobileItem, item)}
                            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            onClick={resetMobile}
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-600">
                                {item.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium text-slate-900 text-sm">{item}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {activeMobileItem.children && Object.keys(activeMobileItem.children).map((category) => (
                          <button
                            key={category}
                            onClick={() => { setActiveCategory(category); setMobileView("items"); }}
                            className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-blue-600">{category.substring(0, 2).toUpperCase()}</span>
                              </div>
                              <span className="font-medium text-slate-900 text-sm">{category}</span>
                            </div>
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {mobileView === "items" && mobileActiveItem && activeCategory && activeMobileItem && activeMobileItem.children && !isSimpleDropdown(activeMobileItem) && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-full">
                  <div className="p-4 flex items-center border-b border-slate-200">
                    <button
                      onClick={() => { setMobileView("submenu"); setActiveCategory(null); }}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded mr-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-slate-900 truncate">{activeCategory}</h2>
                      <p className="text-xs text-slate-500 truncate">{mobileActiveItem}</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <div className="space-y-2">
                      {activeMobileItem.children[activeCategory]?.map((item) => (
                        <Link
                          key={item}
                          href={getSubItemHref(activeMobileItem, item)}
                          className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          onClick={resetMobile}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            ${activeMobileItem.bookNow ? "bg-blue-100"
                              : activeMobileItem.label === "Destinations" ? "bg-green-100"
                                : activeMobileItem.label === "Flights" ? "bg-purple-100"
                                  : activeMobileItem.label === "Cruises" ? "bg-red-100"
                                    : "bg-slate-100"}`}>
                            <span className={`text-xs font-semibold
                              ${activeMobileItem.bookNow ? "text-blue-600"
                                : activeMobileItem.label === "Destinations" ? "text-green-600"
                                  : activeMobileItem.label === "Flights" ? "text-purple-600"
                                    : activeMobileItem.label === "Cruises" ? "text-red-600"
                                      : "text-slate-600"}`}>
                              {item.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-slate-900 text-sm truncate block">{item}</span>
                            {activeMobileItem.bookNow && item.includes("Book") && (
                              <div className="text-xs text-green-600 font-medium mt-0.5">Book Now →</div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link
                        href={activeMobileItem.href}
                        className="block w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition-colors text-sm"
                        onClick={resetMobile}
                      >
                        View all {activeCategory.toLowerCase()} options
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};