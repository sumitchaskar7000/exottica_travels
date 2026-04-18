import Link from "next/link";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  variant?: "featured" | "standard";
}

export default function BlogCard({ post, variant = "standard" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block relative overflow-hidden rounded-lg h-[520px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <span className="inline-block text-[9px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-[3px] rounded-sm bg-amber-50 text-amber-700 border-amber-200">
            {post.category}
          </span>
          <h2 className="mt-3 text-white leading-[1.1] group-hover:opacity-80 transition-opacity duration-300 font-cormorant text-[clamp(26px,3.5vw,44px)] font-semibold">
            {post.title}
          </h2>
          <p className="mt-3 text-white/70 leading-relaxed max-w-2xl font-dm-sans text-sm font-light">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center gap-4 text-white/50 font-dm-sans text-xs">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-black/[0.06] bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden h-[200px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block text-[9px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-[3px] rounded-sm bg-amber-50 text-amber-700 border-amber-200">
            {post.category}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[#0a0a0a] leading-snug group-hover:opacity-70 transition-opacity duration-200 font-cormorant text-xl font-semibold">
          {post.title}
        </h3>
        <p className="mt-2.5 text-black/50 leading-relaxed flex-1 line-clamp-3 font-dm-sans text-xs font-light">
          {post.excerpt}
        </p>
        <div className="w-full h-px bg-black/[0.06] my-4" />
        <div className="flex items-center justify-between font-dm-sans text-xs">
          <div className="flex items-center gap-2 text-black/40">
            <span>{post.author}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-black/25" />
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"}</span>
          </div>
          <span className="text-[#c9a84c] font-medium tracking-wide">{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}