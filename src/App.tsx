import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { CategoryFilter, SortOption } from "@/components/category-filter";
import { ExtensionCard } from "@/components/extension-card";
import { ExtensionDetailModal } from "@/components/extension-detail-modal";
import { Footer } from "@/components/footer";
import {
  GeometricGridBackdrop,
  CornerCrosshairs,
} from "@/components/geometric-decorations";
import { useExtensions } from "@/hooks/use-extensions";
import { Extension } from "@/types/extension";
import { Package, RotateCcw, Filter } from "lucide-react";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Languages", label: "Languages" },
  { id: "Tools", label: "Tools" },
  { id: "Formatters", label: "Formatters" },
  { id: "Themes", label: "Themes" },
  { id: "Git", label: "Git" },
  { id: "AI", label: "AI" },
  { id: "UI", label: "UI" },
];

export function App() {
  const { extensions } = useExtensions();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(
    null
  );

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: extensions.length,
      Themes: 0,
      Languages: 0,
      Tools: 0,
      Git: 0,
      Formatters: 0,
      AI: 0,
      UI: 0,
    };

    extensions.forEach((ext) => {
      if (counts[ext.category] !== undefined) {
        counts[ext.category]++;
      }
    });

    return CATEGORIES.map((cat) => ({
      id: cat.id,
      label: cat.label,
      count: counts[cat.id] || 0,
    }));
  }, [extensions]);

  // Filtering & Sorting
  const filteredAndSortedExtensions = useMemo(() => {
    let result = [...extensions];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((ext) => ext.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (ext) =>
          ext.name.toLowerCase().includes(q) ||
          ext.id.toLowerCase().includes(q) ||
          ext.description.toLowerCase().includes(q) ||
          ext.author.toLowerCase().includes(q) ||
          (ext.tags && ext.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "popular") {
        return (b.downloads || 0) - (a.downloads || 0);
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "recent") {
        return b.version.localeCompare(a.version);
      }
      return 0;
    });

    return result;
  }, [extensions, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("popular");
  };

  const getSummaryText = () => {
    if (searchQuery) {
      return `${filteredAndSortedExtensions.length} ${
        filteredAndSortedExtensions.length === 1 ? "package" : "packages"
      } matching "${searchQuery}"`;
    }
    if (selectedCategory !== "all") {
      return `${filteredAndSortedExtensions.length} packages in ${selectedCategory}`;
    }
    return `Showing all ${extensions.length} extensions`;
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-[#eceff4] font-sans flex flex-col selection:bg-amber-400/20 selection:text-white antialiased">
      {/* Background Geometric Line Grid */}
      <GeometricGridBackdrop />

      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalExtensions={extensions.length}
      />

      {/* Hero Spotlight Section */}
      <HeroSpotlight
        extensions={extensions}
        totalExtensions={extensions.length}
        onSelectExtension={setSelectedExtension}
      />

      {/* Main Extension Marketplace Catalog */}
      <main className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 max-w-7xl py-10">
        {/* Catalog Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-amber-400/80" />
            <span className="text-zinc-200 font-semibold tracking-wider uppercase text-[11px]">
              REGISTRY CATALOG
            </span>
          </div>
          <div className="text-[11px] text-zinc-500">
            INDEX // {filteredAndSortedExtensions.length} OF {extensions.length} LOADED
          </div>
        </div>

        {/* Category Filter and Sorting Bar */}
        <div className="relative rounded border border-[#1b202c] bg-[#0c0f16] mb-6 shadow-lg">
          <CornerCrosshairs className="text-zinc-700" />

          <CategoryFilter
            categories={categoryCounts}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSelectSort={setSortBy}
          />

          {/* Results summary bar */}
          <div className="flex items-center justify-between px-4 py-2.5 text-xs text-zinc-400 bg-[#080a0e] border-t border-[#161a24] font-mono">
            <span className="text-[11px] text-zinc-400">{getSummaryText()}</span>

            {(selectedCategory !== "all" || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-[11px]"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Extensions Grid */}
        {filteredAndSortedExtensions.length > 0 ? (
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedExtensions.map((extension) => (
              <ExtensionCard
                key={extension.id}
                extension={extension}
                onSelect={setSelectedExtension}
              />
            ))}
          </div>
        ) : (
          <div className="relative rounded border border-[#1b202c] bg-[#0c0f16] py-16 text-center font-mono">
            <CornerCrosshairs className="text-zinc-700" />
            <Package className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white mb-1">
              NO MATCHING EXTENSIONS FOUND
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4 font-sans leading-relaxed">
              We couldn't find any packages matching "{searchQuery}". Try a different keyword or reset your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#232938] bg-[#121622] text-xs text-zinc-300 hover:text-white transition-colors font-mono"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Interactive Extension Details Modal */}
      <ExtensionDetailModal
        extension={selectedExtension}
        isOpen={!!selectedExtension}
        onClose={() => setSelectedExtension(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
