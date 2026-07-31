import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search packages...",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full rounded border border-[#20242e] bg-[#0c0e12] pl-8 pr-16 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-[#101217] focus:outline-none font-sans transition-all"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
        {value ? (
          <button
            onClick={() => onChange("")}
            className="p-0.5 rounded text-zinc-400 hover:text-white transition-colors"
            title="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 select-none">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        )}
      </div>
    </div>
  );
}