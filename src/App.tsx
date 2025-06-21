import { useState, useMemo } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import { ExtensionCard } from "@/components/extension-card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Package, Code2, Zap } from "lucide-react";
import { Fire } from "@/components/fire";
import { useExtensions } from "@/hooks/use-extensions";
import { GooeyButton } from "@/components/gooey-button";

function App() {
  const { extensions, loading, error } = useExtensions();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExtensions = useMemo(() => {
    if (!extensions) return [];
    if (!searchQuery.trim()) return extensions;

    const query = searchQuery.toLowerCase();
    return extensions.filter(
      (ext) =>
        ext.name.toLowerCase().includes(query) ||
        ext.description.toLowerCase().includes(query) ||
        ext.author.toLowerCase().includes(query)
    );
  }, [searchQuery, extensions]);

  const activeExtensions = extensions?.filter((ext) => ext.submodule) ?? [];
  const totalExtensions = extensions?.length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Biscuit Extensions</h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {totalExtensions} extensions
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search extensions..."
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container flex flex-col md:flex-row items-center justify-between py-12 gap-8">
          <div className="max-w-3xl md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Extend Your Coding Experience
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Discover and install extensions to enhance your Biscuit editor
              with new languages, themes, debuggers, and powerful development
              tools.
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-sky-500" />
                <span>{activeExtensions.length} Active Extensions</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Hot Reload Support</span>
              </div>
            </div>

            {/* Call-to-action */}
            <div className="mt-6">
              <GooeyButton href="https://github.com/tomlin7/biscuit-extensions?tab=readme-ov-file#-creating-a-new-extension">
                Build Your Own Extension
              </GooeyButton>
            </div>
          </div>
          {/* Fire animation */}
          <div className="md:w-1/2 flex justify-center">
            <Fire />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredExtensions.length} extension
              {filteredExtensions.length !== 1 ? "s" : ""} found for "
              {searchQuery}"
            </p>
            <Separator className="mt-2" />
          </div>
        )}

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-12">Loading extensions...</div>
        )}
        {error && (
          <div className="text-center py-12 text-destructive">
            Failed to load extensions: {error.message}
          </div>
        )}

        {/* Extensions Grid */}
        {!loading && !error ? (
          filteredExtensions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredExtensions.map((extension) => (
                <ExtensionCard key={extension.id} extension={extension} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No extensions found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available
                extensions.
              </p>
            </div>
          )
        ) : null}

        {/* Footer Info */}
        <footer className="mt-16 pt-8 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              Want to create your own extension? Check out the{" "}
              <a
                href="https://github.com/tomlin7/biscuit-extensions"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                developer guide
              </a>
            </p>
            <p>
              Use{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                biscuit ext
              </code>{" "}
              CLI to install extensions directly from your terminal.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
