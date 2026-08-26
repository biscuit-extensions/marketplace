import {
  Code2,
  Wrench,
  FileCode,
  Palette,
  GitBranch,
  Cpu,
  Layout,
  Layers,
} from "lucide-react";

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
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "all":
        return <Layers className="h-3 w-3" />;
      case "Languages":
        return <Code2 className="h-3 w-3" />;
      case "Tools":
        return <Wrench className="h-3 w-3" />;
      case "Formatters":
        return <FileCode className="h-3 w-3" />;
      case "Themes":
        return <Palette className="h-3 w-3" />;
      case "Git":
        return <GitBranch className="h-3 w-3" />;
      case "AI":
        return <Cpu className="h-3 w-3" />;
      case "UI":
        return <Layout className="h-3 w-3" />;
      default:
        return <Layers className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 border-b border-[#1b202c] bg-[#0c0f16]">
      {/* Category Pills with Icons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded font-mono text-xs transition-all ${
                isActive
                  ? "bg-amber-400/10 text-amber-300 border border-amber-400/30 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141824] border border-transparent"
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  isActive
                    ? "bg-amber-400/20 text-amber-200"
                    : "text-zinc-500 bg-[#141822]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-zinc-400">
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
          SORT:
        </span>
        <select
          value={sortBy}
          aria-label="Sort extensions"
          onChange={(e) => onSelectSort(e.target.value as SortOption)}
          className="rounded border border-[#212635] bg-[#0e1118] px-2.5 py-1 text-xs text-zinc-200 focus:border-amber-400/50 focus:outline-none cursor-pointer font-mono"
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
