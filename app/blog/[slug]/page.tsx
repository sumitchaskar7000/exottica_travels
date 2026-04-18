"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogAPI } from "@/lib/api";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date?: string;
  publishedAt?: string;
  author: string;
  image: string;
  featured?: boolean;
  views?: number;
}

function buildArticleParagraphs(post: BlogPost): string[] {
  // Split content by newlines or create paragraphs from the content
  if (post.content) {
    const paragraphs = post.content.split('\n\n').filter(p => p.trim());
    if (paragraphs.length > 0) return paragraphs;
  }
  
  // Fallback paragraphs
  return [
    `${post.excerpt} This guide is designed for travelers who want both practical tips and local perspective before they plan the trip.`,
    `Start by aligning your travel dates with weather, crowd levels, and local events. A small timing change can improve your experience and reduce overall cost.`,
    `Use this article as a baseline itinerary, then personalize it around your budget, comfort level, and interests. If you travel slowly, you will usually discover the most memorable moments.`,
    `Before you leave, confirm local transport options, key bookings, and backup plans. Smart preparation gives you more freedom once your journey begins.`,
  ];
}

export default function BlogDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogAPI.getPublicPostBySlug(params.slug);
        setPost(response.data);
        
        // Fetch related posts from same category
        if (response.data.category) {
          const relatedResponse = await blogAPI.getPublicPosts({ 
            category: response.data.category 
          });
          // Filter out current post and limit to 6
          const filtered = relatedResponse.data
            .filter((p: BlogPost) => p.slug !== params.slug)
            .slice(0, 6);
          setRelatedPosts(filtered);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a84c] mx-auto"></div>
          <p className="mt-4 text-black/50">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const articleParagraphs = buildArticleParagraphs(post);

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="max-w-[1240px] mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/blog" className="text-sm text-[#c9a84c] hover:opacity-70 transition-opacity">
            ← Back to all blogs
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-10">
          <article className="bg-white border border-black/[0.06] rounded-lg overflow-hidden">
            <div className="relative h-[300px] md:h-[460px]">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#f3d389]">{post.category}</p>
                <h1
                  className="text-white mt-2 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}
                >
                  {post.title}
                </h1>
                <p className="text-white/80 mt-3 text-sm">
                  {post.author} · {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'} · {post.readTime}
                </p>
              </div>
            </div>

            <div className="px-6 md:px-10 py-8 md:py-10">
              <p className="text-lg text-black/70 leading-relaxed mb-6 italic border-l-4 border-[#c9a84c] pl-4">
                {post.excerpt}
              </p>
              {articleParagraphs.map((paragraph, index) => (
                <p key={index} className="text-black/70 leading-8 mb-5">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="bg-white border border-black/[0.06] rounded-lg p-6 h-fit">
            <h2
              className="text-[#0a0a0a] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600 }}
            >
              More from {post.category}
            </h2>
            <div className="space-y-4">
              {relatedPosts.length === 0 ? (
                <p className="text-black/50 text-sm">No related articles found.</p>
              ) : (
                relatedPosts.map((item) => (
                  <Link key={item._id} href={`/blog/${item.slug}`} className="group block border-b border-black/[0.06] pb-4 last:border-0">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.title} className="w-20 h-20 rounded object-cover shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#c9a84c]">{item.category}</p>
                        <p className="text-sm text-[#0a0a0a] leading-snug mt-1 group-hover:opacity-70 transition-opacity line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-black/45 mt-1">{item.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}