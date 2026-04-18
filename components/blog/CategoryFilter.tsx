"use client";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`shrink-0 px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
            selected === cat
              ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
              : "bg-white text-black/50 border-black/[0.1] hover:border-[#c9a84c] hover:text-[#c9a84c]"
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}