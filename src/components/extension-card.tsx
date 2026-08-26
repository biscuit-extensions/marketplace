import React, { useState } from "react";
import {
  Download,
  ExternalLink,
  Check,
  Star,
  Terminal,
  Code2,
  Wrench,
  FileCode,
  Palette,
  GitBranch,
  Cpu,
  Layout,
} from "lucide-react";
import { Extension } from "@/types/extension";
import { CornerCrosshairs } from "./geometric-decorations";

interface ExtensionCardProps {
  extension: Extension;
  onSelect: (extension: Extension) => void;
}

export function ExtensionCard({ extension, onSelect }: ExtensionCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = (e: React.MouseEvent) => {
    e.stopPropagation();
    const command = `biscuit ext install ${extension.id}`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 className="h-3 w-3 text-sky-400" />;
      case "Tools":
        return <Wrench className="h-3 w-3 text-emerald-400" />;
      case "Formatters":
        return <FileCode className="h-3 w-3 text-purple-400" />;
      case "Themes":
        return <Palette className="h-3 w-3 text-pink-400" />;
      case "Git":
        return <GitBranch className="h-3 w-3 text-amber-400" />;
      case "AI":
        return <Cpu className="h-3 w-3 text-cyan-400" />;
      case "UI":
        return <Layout className="h-3 w-3 text-indigo-400" />;
      default:
        return <Code2 className="h-3 w-3 text-zinc-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(extension)}
      className="group relative flex flex-col justify-between rounded border border-[#1b202c] bg-[#0c0f16] p-4 transition-all duration-150 hover:border-zinc-600 hover:bg-[#10141e] cursor-pointer"
    >
      <CornerCrosshairs className="text-zinc-800 group-hover:text-amber-400/80 transition-colors" />

      <div>
        {/* Top metadata row with Category icon and Version */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-zinc-300">
            {getCategoryIcon(extension.category)}
            <span className="text-[11px]">{extension.category}</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500 bg-[#141822] px-1.5 py-0.5 rounded border border-[#1e2432]">
            v{extension.version}
          </span>
        </div>

        {/* Title and Author */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-amber-300 transition-colors">
            {extension.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
            <span>@{extension.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {extension.downloads?.toLocaleString() || "1,000"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400/90">
              <Star className="h-3 w-3 fill-amber-400/90" />
              {extension.rating || "4.8"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
          {extension.description}
        </p>

        {/* Extension Tags */}
        {extension.tags && extension.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {extension.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-zinc-400 bg-[#131720] border border-[#1f2534] px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="pt-3 border-t border-[#161a25] flex items-center justify-between gap-2 text-xs">
        {/* Copy CLI install command */}
        <button
          onClick={handleCopyInstall}
          title={`Copy "biscuit ext install ${extension.id}"`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#212634] bg-[#090b0f] hover:border-zinc-600 hover:bg-[#151922] text-zinc-300 font-mono text-xs transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Terminal className="h-3 w-3 text-amber-400/80" />
              <span className="text-zinc-300 text-[11px]">Install</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5">
          {extension.repoUrl && (
            <a
              href={extension.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="View repository on GitHub"
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={() => onSelect(extension)}
            className="text-xs font-medium text-zinc-400 hover:text-white px-2 py-1 transition-colors"
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}
