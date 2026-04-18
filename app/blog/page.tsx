"use client";

/**
 * BlogPage — Editorial travel magazine style
 * Fetches posts from backend API
 * Typography: Cormorant Garamond (display) + DM Sans (body)
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { blogAPI } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date?: string;
  author: string;
  image: string;
  featured?: boolean;
  views?: number;
  publishedAt?: string;
}

// ─── Category colours ─────────────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  Culture:       "bg-amber-50 text-amber-700 border-amber-200",
  Luxury:        "bg-purple-50 text-purple-700 border-purple-200",
  Romance:       "bg-rose-50 text-rose-600 border-rose-200",
  Adventure:     "bg-orange-50 text-orange-700 border-orange-200",
  Photography:   "bg-sky-50 text-sky-700 border-sky-200",
  "City Guides": "bg-slate-50 text-slate-700 border-slate-200",
  Wildlife:      "bg-green-50 text-green-700 border-green-200",
  Nature:        "bg-teal-50 text-teal-700 border-teal-200",
  "Budget Travel": "bg-lime-50 text-lime-700 border-lime-200",
  "Food & Drink":  "bg-yellow-50 text-yellow-700 border-yellow-200",
  Festivals:     "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  "Road Trips":  "bg-indigo-50 text-indigo-700 border-indigo-200",
  Spiritual:     "bg-violet-50 text-violet-700 border-violet-200",
  "Rail Travel": "bg-cyan-50 text-cyan-700 border-cyan-200",
  Wellness:      "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// ─── Category Badge ───────────────────────────────────────────────────────────

function CategoryBadge({ cat }: { cat: string }) {
  const color = categoryColors[cat] ?? "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span
      className={`inline-block text-[9px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-[3px] rounded-sm ${color}`}
    >
      {cat}
    </span>
  );
}

// ─── Hero Card (featured) ─────────────────────────────────────────────────────

function HeroCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block relative overflow-hidden rounded-lg"
      style={{ height: 520 }}
    >
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <CategoryBadge cat={post.category} />
        <h2
          className="mt-3 text-white leading-[1.1] group-hover:opacity-80 transition-opacity duration-300"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(26px, 3.5vw, 44px)",
            fontWeight: 600,
          }}
        >
          {post.title}
        </h2>
        <p
          className="mt-3 text-white/70 leading-relaxed max-w-2xl line-clamp-3"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300 }}
        >
          {post.excerpt}
        </p>
        <div
          className="mt-5 flex items-center gap-4 text-white/50"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
        >
          <span>{post.author}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Standard Card ────────────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-black/[0.06] bg-white hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "grayscale(15%) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3">
          <CategoryBadge cat={post.category} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3
          className="text-[#0a0a0a] leading-snug group-hover:opacity-70 transition-opacity duration-200"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="mt-2.5 text-black/50 leading-relaxed flex-1 line-clamp-3"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 300 }}
        >
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-black/[0.06] my-4" />

        {/* Footer */}
        <div
          className="flex items-center justify-between"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
        >
          <div className="flex items-center gap-2 text-black/40">
            <span>{post.author}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-black/25" />
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
          </div>
          <span className="text-[#c9a84c] font-medium tracking-wide">{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Sidebar list card ────────────────────────────────────────────────────────

function SidebarCard({ post, rank }: { post: BlogPost; rank: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-4 items-start py-4 border-b border-black/[0.06] last:border-0">
      <span
        className="shrink-0 text-[#c9a84c] font-bold leading-none mt-0.5"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}
      >
        {String(rank).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <CategoryBadge cat={post.category} />
        <p
          className="mt-1.5 text-[#0a0a0a] leading-snug group-hover:opacity-60 transition-opacity line-clamp-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600 }}
        >
          {post.title}
        </p>
        <p
          className="mt-1 text-black/35"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
        >
          {post.readTime} · {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently'}
        </p>
      </div>
      <div className="shrink-0 w-16 h-16 rounded overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}

// ─── Main Blog Page ───────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params: any = {};
        if (activeCategory !== "All") params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        
        const response = await blogAPI.getPublicPosts(params);
        setAllPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [activeCategory, searchQuery]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await blogAPI.getPublicCategories();
        setCategories(["All", ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const featuredPosts = allPosts.filter((p) => p.featured);
  const regularPosts = allPosts.filter((p) => !p.featured);

  // Trending posts: sort by views or random, take first 5
  const trendingPosts = [...allPosts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a84c] mx-auto"></div>
          <p className="mt-4 text-black/50">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Google Fonts ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#fafaf8]">

        {/* ══════ MASTHEAD ══════ */}
        <header className="border-b border-black/[0.07] bg-white">
          <div className="max-w-[1280px] mx-auto px-6 py-5 flex items-center justify-between gap-6 flex-wrap">
            {/* Brand */}
            <div>
              <p
                className="text-[9px] font-medium tracking-[0.35em] uppercase text-[#c9a84c] mb-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Exoticca Travel
              </p>
              <h1
                className="text-[#0a0a0a] leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600 }}
              >
                The Journal
              </h1>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25"
                width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search destinations, topics…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-black/[0.04] border border-black/[0.08] rounded-full outline-none focus:border-[#c9a84c] transition-colors placeholder:text-black/30"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
              />
            </div>

            {/* Stats */}
            <div className="flex gap-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {[
                [allPosts.length.toString(), "Articles"],
                [new Set(allPosts.map(p => p.author)).size.toString(), "Authors"],
                [new Set(allPosts.map(p => p.category)).size.toString(), "Categories"]
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-[18px] font-medium text-[#0a0a0a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{n}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-black/35">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ══════ HERO FEATURED ══════ */}
        {!searchQuery && activeCategory === "All" && featuredPosts.length >= 2 && (
          <section className="max-w-[1280px] mx-auto px-6 pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Primary hero — takes 2 cols */}
              <div className="lg:col-span-2">
                <HeroCard post={featuredPosts[0]} />
              </div>
              {/* Secondary hero */}
              <div>
                <HeroCard post={featuredPosts[1]} />
              </div>
            </div>
          </section>
        )}

        {/* ══════ CATEGORY FILTER ══════ */}
        <section className="max-w-[1280px] mx-auto px-6 pt-10 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                    : "bg-white text-black/50 border-black/[0.1] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active filter indicator */}
          {(activeCategory !== "All" || searchQuery) && (
            <div
              className="mt-4 flex items-center gap-2 text-black/40"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
            >
              <span>
                Showing {regularPosts.length} article{regularPosts.length !== 1 ? "s" : ""}
                {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                {searchQuery ? ` matching "${searchQuery}"` : ""}
              </span>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="text-[#c9a84c] hover:opacity-60 transition-opacity"
              >
                Clear
              </button>
            </div>
          )}
        </section>

        {/* ══════ MAIN CONTENT + SIDEBAR ══════ */}
        <section className="max-w-[1280px] mx-auto px-6 pt-8 pb-20">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-10">

            {/* Articles grid */}
            <div>
              {regularPosts.length === 0 ? (
                <div className="py-20 text-center">
                  <p
                    className="text-black/25"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24 }}
                  >
                    No articles found.
                  </p>
                  <button
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                    className="mt-4 text-sm text-[#c9a84c] underline"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Browse all articles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {regularPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              )}
            </div>

            {/* ─ Sidebar ─ */}
            <aside className="space-y-10">

              {/* Trending Now */}
              {trendingPosts.length > 0 && (
                <div className="bg-white border border-black/[0.06] rounded-lg p-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3
                      className="text-[#0a0a0a]"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600 }}
                    >
                      Trending Now
                    </h3>
                    <div className="flex-1 h-px bg-black/[0.06]" />
                  </div>
                  {trendingPosts.map((post, i) => (
                    <SidebarCard key={post._id} post={post} rank={i + 1} />
                  ))}
                </div>
              )}

              {/* Newsletter CTA */}
              <div
                className="rounded-lg p-7 text-white relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1200 100%)" }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201,168,76,0.3) 20px, rgba(201,168,76,0.3) 21px)",
                  }}
                />
                <p
                  className="relative text-[9px] tracking-[0.3em] uppercase text-[#c9a84c] mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Weekly Dispatch
                </p>
                <h3
                  className="relative text-white leading-tight mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600 }}
                >
                  Travel stories, curated for you.
                </h3>
                <p
                  className="relative text-white/50 leading-relaxed mb-5"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 300 }}
                >
                  Every week, our editors pick the best destination guides, travel tips, and itineraries — straight to your inbox.
                </p>
                <div className="relative space-y-2.5">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2.5 rounded bg-white/10 border border-white/10 text-white placeholder:text-white/30 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
                  />
                  <button
                    className="w-full py-2.5 rounded font-medium text-[#0a0a0a] text-sm transition-opacity hover:opacity-80"
                    style={{ background: "#c9a84c", fontFamily: "'DM Sans', sans-serif" }}
                    onClick={async () => {
                      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                      if (emailInput?.value) {
                        try {
                          await fetch('/api/newsletter', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: emailInput.value })
                          });
                          alert('Thanks for subscribing!');
                          emailInput.value = '';
                        } catch (error) {
                          console.error('Newsletter subscription error:', error);
                        }
                      }
                    }}
                  >
                    Subscribe — It's Free
                  </button>
                </div>
              </div>

              {/* Categories cloud */}
              {categories.length > 1 && (
                <div className="bg-white border border-black/[0.06] rounded-lg p-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3
                      className="text-[#0a0a0a]"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600 }}
                    >
                      Topics
                    </h3>
                    <div className="flex-1 h-px bg-black/[0.06]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className="text-xs px-3 py-1.5 rounded border transition-all hover:border-[#c9a84c] hover:text-[#c9a84c]"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          borderColor: activeCategory === cat ? "#c9a84c" : "rgba(0,0,0,0.1)",
                          color: activeCategory === cat ? "#c9a84c" : "rgba(0,0,0,0.5)",
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </section>

      </div>
    </>
  );
}