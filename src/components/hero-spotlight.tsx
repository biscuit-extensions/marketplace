import { useState } from "react";
import { Extension } from "@/types/extension";
import { Copy, Check, ArrowRight } from "lucide-react";

interface HeroSpotlightProps {
  extensions: Extension[];
  totalExtensions: number;
  onSelectExtension: (extension: Extension) => void;
}

export function HeroSpotlight({
  extensions,
  totalExtensions,
  onSelectExtension,
}: HeroSpotlightProps) {
  const [copiedCli, setCopiedCli] = useState(false);

  // Pick top featured extensions
  const featured = extensions.filter((e) => e.featured).slice(0, 4);

  const handleCopyCli = () => {
    navigator.clipboard.writeText("biscuit ext list");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section className="border-b border-[#1b1f27] bg-[#0c0e12] pt-12 pb-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Hero header */}
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            Extensions for Biscuit
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Discover community-built packages, language servers, tools, and formatters
            for the Biscuit code editor. Install any extension directly using the CLI or browse the registry.
          </p>

          {/* Quick CLI command */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2.5 rounded-md border border-[#232834] bg-[#12151c] px-3.5 py-2 font-mono text-zinc-300">
              <span className="text-zinc-500 select-none">$</span>
              <span>biscuit ext list</span>
              <button
                onClick={handleCopyCli}
                className="ml-2 text-zinc-400 hover:text-white transition-colors"
                title="Copy command"
              >
                {copiedCli ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <a
              href="https://github.com/tomlin7/biscuit-extensions?tab=readme-ov-file#-creating-a-new-extension"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors px-3 py-2 rounded-md border border-[#232834] bg-[#12151c]"
            >
              <span>Build an extension</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Featured Extensions Spotlight */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs text-zinc-400 font-medium">
            <span>Featured extensions</span>
            <span className="text-zinc-500">{totalExtensions} packages registered</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((ext) => (
              <div
                key={ext.id}
                onClick={() => onSelectExtension(ext)}
                className="group rounded-md border border-[#1e232e] bg-[#12151d] p-4 transition-all duration-150 hover:border-zinc-600 hover:bg-[#151922] cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-zinc-400">
                    {ext.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    v{ext.version}
                  </span>
                </div>

                <h3 className="font-medium text-white group-hover:text-amber-300 transition-colors text-sm">
                  {ext.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {ext.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#1a1f29] flex items-center justify-between text-xs text-zinc-500">
                  <span>@{ext.author}</span>
                  <span className="text-zinc-400 group-hover:text-white transition-colors">
                    Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
