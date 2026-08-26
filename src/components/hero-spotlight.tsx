import { useState } from "react";
import { Extension } from "@/types/extension";
import {
  Copy,
  Check,
  ArrowRight,
  Code2,
  Wrench,
  FileCode,
  Palette,
  GitBranch,
  Cpu,
  Layout,
  Terminal,
  Download,
  Star,
} from "lucide-react";
import { CornerCrosshairs, Crosshair } from "./geometric-decorations";

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
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  // Pick top featured extensions
  const featured = extensions.filter((e) => e.featured).slice(0, 4);

  const handleCopyCli = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyInstall = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`biscuit ext install ${id}`);
    setCopiedCardId(id);
    setTimeout(() => setCopiedCardId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 className="h-3.5 w-3.5 text-sky-400" />;
      case "Tools":
        return <Wrench className="h-3.5 w-3.5 text-emerald-400" />;
      case "Formatters":
        return <FileCode className="h-3.5 w-3.5 text-purple-400" />;
      case "Themes":
        return <Palette className="h-3.5 w-3.5 text-pink-400" />;
      case "Git":
        return <GitBranch className="h-3.5 w-3.5 text-amber-400" />;
      case "AI":
        return <Cpu className="h-3.5 w-3.5 text-cyan-400" />;
      case "UI":
        return <Layout className="h-3.5 w-3.5 text-indigo-400" />;
      default:
        return <Code2 className="h-3.5 w-3.5 text-zinc-400" />;
    }
  };

  // Stats
  const lspCount = extensions.filter((e) => e.category === "Languages").length;
  const toolsCount = extensions.filter((e) => e.category === "Tools").length;
  const formattersCount = extensions.filter((e) => e.category === "Formatters").length;

  return (
    <section className="relative border-b border-[#1b202c] bg-[#090b10] pt-14 pb-12 overflow-hidden">
      {/* Decorative coordinate crosshairs along top border */}
      <div className="absolute top-0 left-8 sm:left-16 pointer-events-none -translate-y-1/2">
        <Crosshair className="text-zinc-700" />
      </div>
      <div className="absolute top-0 right-8 sm:right-16 pointer-events-none -translate-y-1/2">
        <Crosshair className="text-zinc-700" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Top coordinate bar */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500 mb-6 tracking-wider">
          <span className="flex items-center gap-1.5 text-amber-400/90 font-medium">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            REGISTRY // v1.0
          </span>
          <span className="text-zinc-700">|</span>
          <span className="hidden sm:inline">COORD // 41.8781° N, 87.6298° W</span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span>INDEX // {totalExtensions} EXTENSIONS</span>
        </div>

        {/* Hero headline & copy command */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Extensions for{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Biscuit
              </span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              High-performance plugins, language servers, formatters, and developer tools
              built for the Biscuit code editor. Install instantly with zero configuration.
            </p>

            {/* Quick CLI actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2.5 rounded border border-[#222838] bg-[#0e1118] px-3.5 py-2 font-mono text-zinc-300 shadow-sm">
                <span className="text-amber-400/80 select-none">$</span>
                <span className="font-mono">biscuit ext list</span>
                <button
                  onClick={() => handleCopyCli("biscuit ext list")}
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
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors px-3 py-2 rounded border border-[#222838] bg-[#0e1118] hover:border-zinc-700"
              >
                <span>Publish Extension</span>
                <ArrowRight className="h-3 w-3 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Technical Stats Counters Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded border border-[#1e2433] bg-[#0c0f16]/90 p-5 font-mono shadow-xl backdrop-blur-sm">
              <CornerCrosshairs className="text-zinc-600" />
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-3 flex items-center justify-between">
                <span>SYSTEM REGISTRY METRICS</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  LIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-2 border-amber-400/80 pl-3 py-1">
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {totalExtensions}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Total Packages</div>
                </div>

                <div className="border-l-2 border-sky-400/80 pl-3 py-1">
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {lspCount}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Language Servers</div>
                </div>

                <div className="border-l-2 border-emerald-400/80 pl-3 py-1">
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {toolsCount}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Developer Tools</div>
                </div>

                <div className="border-l-2 border-purple-400/80 pl-3 py-1">
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {formattersCount}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Code Formatters</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#181e2b] flex items-center justify-between text-[11px] text-zinc-500">
                <span>RUNTIME: NATIVE</span>
                <span>OPEN SOURCE: 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Extensions Spotlight Bar */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-sm bg-amber-400" />
              <span className="font-mono text-zinc-300 font-medium uppercase tracking-wider text-[11px]">
                FEATURED SPOTLIGHT
              </span>
            </div>
            <span className="font-mono text-zinc-500 text-[11px]">
              SHOWING 4 OF {totalExtensions}
            </span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((ext) => (
              <div
                key={ext.id}
                onClick={() => onSelectExtension(ext)}
                className="group relative rounded border border-[#1e2433] bg-[#0c0f16] p-4 transition-all duration-150 hover:border-zinc-600 hover:bg-[#10141e] cursor-pointer flex flex-col justify-between"
              >
                <CornerCrosshairs className="text-zinc-700 group-hover:text-amber-400/80 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-300">
                      {getCategoryIcon(ext.category)}
                      <span>{ext.category}</span>
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      v{ext.version}
                    </span>
                  </div>

                  <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors text-sm tracking-tight">
                    {ext.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {ext.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#171c26] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {ext.downloads?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400/90">
                      <Star className="h-3 w-3 fill-amber-400/90" />
                      {ext.rating}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleCopyInstall(e, ext.id)}
                    className="flex items-center gap-1 font-mono text-[10px] text-zinc-400 hover:text-white bg-[#151922] border border-[#232938] px-2 py-0.5 rounded transition-colors"
                    title={`Copy "biscuit ext install ${ext.id}"`}
                  >
                    {copiedCardId === ext.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="h-3 w-3 text-zinc-500" />
                        <span>Install</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
