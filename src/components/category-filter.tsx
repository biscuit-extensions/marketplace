export type SortOption = "popular" | "rating" | "name" | "recent";

interface CategoryFilterProps {
  categories: { id: string; label: string; count: number }[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  sortBy: SortOption;
  onSelectSort: (sort: SortOption) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 border-b border-[#1b1f27] bg-[#0f1117] rounded-t-md">
      {/* Category Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[11px] text-zinc-500">{cat.count}</span>
            </button>
          );
        })}
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 shrink-0 text-xs text-zinc-400">
        <span>Sort:</span>
        <select
          value={sortBy}
          aria-label="Sort extensions"
          onChange={(e) => onSelectSort(e.target.value as SortOption)}
          className="rounded-md border border-[#232834] bg-[#12151c] px-2.5 py-1 text-xs text-zinc-200 focus:border-zinc-500 focus:outline-none cursor-pointer"
        >
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="name">Name (A-Z)</option>
          <option value="recent">Recently updated</option>
        </select>
      </div>
    </div>
  );
}
