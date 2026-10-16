import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { CategoryFilter, SortOption } from "@/components/category-filter";
import { ExtensionCard } from "@/components/extension-card";
import { ExtensionDetailModal } from "@/components/extension-detail-modal";
import { Footer } from "@/components/footer";
import { useExtensions } from "@/hooks/use-extensions";
import { Extension } from "@/types/extension";
import { Package, RotateCcw } from "lucide-react";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Themes", label: "Themes" },
  { id: "Languages", label: "Languages" },
  { id: "Tools", label: "Tools" },
  { id: "Git", label: "Git" },
  { id: "Formatters", label: "Formatters" },
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
        filteredAndSortedExtensions.length === 1 ? "result" : "results"
      } for "${searchQuery}"`;
    }
    if (selectedCategory !== "all") {
      return `${filteredAndSortedExtensions.length} packages in ${selectedCategory}`;
    }
    return `${extensions.length} packages available`;
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e6ebf2] font-sans flex flex-col selection:bg-amber-400/20 selection:text-white">
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
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-7xl py-8">
        {/* Category Filter and Sorting Bar */}
        <div className="rounded-lg border border-[#1e232e] bg-[#11131a] mb-6 overflow-hidden">
          <CategoryFilter
            categories={categoryCounts}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSelectSort={setSortBy}
          />

          {/* Results summary bar */}
          <div className="flex items-center justify-between px-4 py-2.5 text-xs text-zinc-400 bg-[#0c0e13]">
            <span>{getSummaryText()}</span>

            {(selectedCategory !== "all" || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
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
          <div className="rounded-lg border border-[#1e232e] bg-[#11131a] py-16 text-center">
            <Package className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-white mb-1">
              No matching extensions found
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4 leading-relaxed">
              We couldn't find any packages matching "{searchQuery}". Try a different keyword or reset your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#232834] bg-[#141720] text-xs text-zinc-300 hover:text-white transition-colors"
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
