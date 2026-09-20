import { ExternalLink, Terminal, GitFork, ShieldCheck } from "lucide-react";
import { Crosshair } from "./geometric-decorations";

export function Footer() {
  return (
    <footer className="relative border-t border-[#1b202c] bg-[#07090e] py-12 text-xs text-zinc-500 font-mono">
      {/* Decorative tick mark crosshairs */}
      <div className="absolute top-0 left-8 pointer-events-none -translate-y-1/2">
        <Crosshair className="text-zinc-700" size={9} />
      </div>
      <div className="absolute top-0 right-8 pointer-events-none -translate-y-1/2">
        <Crosshair className="text-zinc-700" size={9} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Biscuit" className="h-4 w-4" />
            <span className="font-semibold text-zinc-200 tracking-tight font-sans">
              Biscuit Extensions Registry
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-[10px] text-amber-400/90 font-mono">v1.0.0</span>
          </div>
          <p className="text-zinc-500 text-[11px] font-sans max-w-md leading-relaxed">
            Fast, lightweight extension ecosystem for Biscuit code editor. Fully open source, zero telemetry, and native performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px]">
          <a
            href="https://github.com/tomlin7/biscuit-extensions?tab=readme-ov-file#-creating-a-new-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
          >
            <Terminal className="h-3 w-3 text-zinc-500" />
            <span>Developer Guide</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>

          <a
            href="https://github.com/tomlin7/biscuit-extensions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
          >
            <GitFork className="h-3 w-3 text-zinc-500" />
            <span>Extensions Repo</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>

          <a
            href="https://github.com/tomlin7/biscuit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="h-3 w-3 text-zinc-500" />
            <span>Biscuit Core</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>
        </div>
      </div>
    </footer>
  );
}
