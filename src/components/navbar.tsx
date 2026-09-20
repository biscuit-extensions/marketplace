import { SearchBar } from "@/components/search-bar";
import { Github, ExternalLink, BookOpen, Code } from "lucide-react";
import { Crosshair } from "./geometric-decorations";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalExtensions: number;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  totalExtensions,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1b202c] bg-[#080a0e]/95 backdrop-blur-md">
      {/* Decorative tick mark crosshair at top left / right */}
      <div className="absolute bottom-0 left-6 pointer-events-none translate-y-1/2">
        <Crosshair className="text-zinc-700" size={9} />
      </div>
      <div className="absolute bottom-0 right-6 pointer-events-none translate-y-1/2">
        <Crosshair className="text-zinc-700" size={9} />
      </div>

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
            <span className="font-semibold text-white tracking-tight">biscuit</span>
            <span className="font-mono text-zinc-500 text-xs">/</span>
            <span className="text-zinc-400 text-xs font-mono">marketplace</span>
          </a>

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 bg-[#121620] border border-[#1e2434] px-2 py-0.5 rounded">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{totalExtensions} PACKAGES</span>
          </div>
        </div>

        {/* Center Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Right Navigation */}
        <nav className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <a
            href="https://github.com/tomlin7/biscuit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Code className="h-3 w-3 text-zinc-500" />
            <span>Editor</span>
            <ExternalLink className="h-2.5 w-2.5 text-zinc-600" />
          </a>

          <a
            href="https://github.com/tomlin7/biscuit-extensions"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <BookOpen className="h-3 w-3 text-zinc-500" />
            <span>Docs</span>
            <ExternalLink className="h-2.5 w-2.5 text-zinc-600" />
          </a>

          <a
            href="https://github.com/biscuit-extensions/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors py-1 px-2.5 rounded border border-[#232938] bg-[#0f121a] hover:border-zinc-600"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="font-sans text-xs">GitHub</span>
          </a>
        </nav>
      </div>

      {/* Mobile search row */}
      <div className="md:hidden border-t border-[#1b202c] px-4 py-2 bg-[#080a0e]">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </header>
  );
}
