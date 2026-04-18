"use client";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  featured: boolean;
  createdAt: string;
}

interface BlogListProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export default function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-black/[0.1]">
          <tr className="text-left text-sm text-black/50">
            <th className="pb-3 font-medium">Title</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Featured</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-b border-black/[0.05]">
              <td className="py-3">
                <div className="font-medium text-[#0a0a0a]">{blog.title}</div>
                <div className="text-xs text-black/40 mt-1">/{blog.slug}</div>
              </td>
              <td className="py-3">
                <span className="text-sm text-black/60">{blog.category}</span>
              </td>
              <td className="py-3">
                <span className={`inline-block px-2 py-1 text-xs rounded ${
                  blog.status === "published" 
                    ? "bg-green-50 text-green-700" 
                    : "bg-gray-50 text-gray-600"
                }`}>
                  {blog.status}
                </span>
               </td>
              <td className="py-3">
                {blog.featured && (
                  <span className="text-[#c9a84c]">★</span>
                )}
               </td>
              <td className="py-3 text-sm text-black/50">
                {formatDate(blog.createdAt)}
               </td>
              <td className="py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className="px-3 py-1 text-sm border border-black/[0.1] rounded hover:bg-black/[0.05] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog._id)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
               </td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}