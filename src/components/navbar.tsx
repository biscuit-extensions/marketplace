import { SearchBar } from "@/components/search-bar";
import { Github, ExternalLink } from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalExtensions: number;
}

export function Navbar({
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1b1f27] bg-[#0c0e12]/90 backdrop-blur-md">
      <div className="container mx-auto flex h-[50px] items-center justify-between gap-6 px-4 sm:px-6 max-w-7xl">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2.5 text-sm tracking-tight group"
          >
            <img
              src="/logo.svg"
              alt="Biscuit"
              className="h-5 w-5 rounded-sm transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-white">biscuit</span>
            <span className="text-zinc-500 text-xs">extensions</span>
          </a>
        </div>

        {/* Center Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Right Navigation */}
        <nav className="flex items-center gap-5 text-xs text-zinc-400">
          <a
            href="https://github.com/billyeatcookies/biscuit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>Editor</span>
            <ExternalLink className="h-3 w-3 text-zinc-500" />
          </a>

          <a
            href="https://github.com/tomlin7/biscuit-extensions"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>Docs</span>
            <ExternalLink className="h-3 w-3 text-zinc-500" />
          </a>

          <a
            href="https://github.com/biscuit-extensions/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors py-1 px-2.5 rounded-md border border-[#232834] bg-[#12151c] hover:border-zinc-700"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>

      {/* Mobile search row */}
      <div className="md:hidden border-t border-[#1b1f27] px-4 py-2 bg-[#0c0e12]">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </header>
  );
}
