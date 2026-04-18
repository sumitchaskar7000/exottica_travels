"use client";

import { useState } from "react";

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  status: "draft" | "published";
  featured: boolean;
}

interface BlogFormProps {
  initialData?: BlogFormData;
  onSubmit: (data: BlogFormData) => Promise<void>;
  onCancel: () => void;
}

const categories = [
  "Culture", "Luxury", "Romance", "Adventure", "Photography", 
  "City Guides", "Wildlife", "Nature", "Budget Travel", "Food & Drink",
  "Festivals", "Road Trips", "Spiritual", "Rail Travel", "Wellness"
];

export default function BlogForm({ initialData, onSubmit, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || categories[0],
    image: initialData?.image || "",
    author: initialData?.author || "",
    readTime: initialData?.readTime || "5 min read",
    status: initialData?.status || "draft",
    featured: initialData?.featured || false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black/70 mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black/70 mb-2">Excerpt *</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={3}
            maxLength={200}
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c]"
          />
          <p className="text-xs text-black/40 mt-1">{formData.excerpt.length}/200 characters</p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black/70 mb-2">Content *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={10}
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c] font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black/70 mb-2">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black/70 mb-2">Image URL *</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black/70 mb-2">Author *</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black/70 mb-2">Read Time</label>
          <input
            type="text"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            placeholder="5 min read"
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black/70 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
            className="w-full px-4 py-2 border border-black/[0.1] rounded-lg focus:outline-none focus:border-[#c9a84c]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm text-black/70">Feature this post</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#c9a84c] text-white rounded-lg font-medium hover:bg-[#b8943a] transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-black/[0.1] rounded-lg hover:bg-black/[0.05] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}