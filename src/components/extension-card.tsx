import React, { useState } from "react";
import {
  Download,
  ExternalLink,
  Check,
  Copy,
  Star,
} from "lucide-react";
import { Extension } from "@/types/extension";

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

  return (
    <div
      onClick={() => onSelect(extension)}
      className="group relative flex flex-col justify-between rounded-md border border-[#1c202a] bg-[#11131a] p-4 transition-colors hover:border-[#2b3140] hover:bg-[#13161f] cursor-pointer"
    >
      <div>
        {/* Top metadata row */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <span className="font-medium text-zinc-400">
            {extension.category}
          </span>
          <span className="font-mono text-[11px] text-zinc-500">
            v{extension.version}
          </span>
        </div>

        {/* Title and Author */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-amber-300 transition-colors">
            {extension.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
            <span>by {extension.author}</span>
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
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
          {extension.description}
        </p>
      </div>

      {/* Bottom action bar */}
      <div className="pt-3 border-t border-[#181c25] flex items-center justify-between gap-2 text-xs">
        {/* Copy CLI install command */}
        <button
          onClick={handleCopyInstall}
          title={`Copy "biscuit ext install ${extension.id}"`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#232834] bg-[#0c0e13] hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-300 font-mono text-xs transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-zinc-500" />
              <span className="text-zinc-300 text-[11px]">Install</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {extension.repoUrl && (
            <a
              href={extension.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="View repository on GitHub"
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={() => onSelect(extension)}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
