import { useState } from "react";
import { Extension } from "@/types/extension";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Check,
  Copy,
  ExternalLink,
  GitBranch,
  Star,
  Download,
  Terminal,
  Code2,
  Wrench,
  FileCode,
  Palette,
  Cpu,
  Layout,
  FileText,
  Sliders,
} from "lucide-react";
import { CornerCrosshairs } from "./geometric-decorations";

interface ExtensionDetailModalProps {
  extension: Extension | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExtensionDetailModal({
  extension,
  isOpen,
  onClose,
}: ExtensionDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [activeTab, setActiveTab] = useState<"readme" | "quickstart" | "config">("readme");

  if (!extension) return null;

  const installCmd = `biscuit ext install ${extension.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleConfig = `[extensions.${extension.id}]
enabled = true
auto_update = true
# Additional extension-specific options
`;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(sampleConfig);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl border border-[#202534] bg-[#0b0e14] p-0 text-zinc-100 overflow-hidden shadow-2xl rounded relative">
        <CornerCrosshairs className="text-zinc-600" />

        {/* Header content */}
        <div className="border-b border-[#1a1f2b] p-6 pb-5 bg-[#090b10]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <DialogTitle className="text-xl font-bold text-white tracking-tight">
                  {extension.name}
                </DialogTitle>
                <span className="font-mono text-xs text-zinc-400 bg-[#141822] border border-[#212736] px-2 py-0.5 rounded">
                  v{extension.version}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-300 bg-[#141822] border border-[#212736] px-2 py-0.5 rounded font-mono">
                  {getCategoryIcon(extension.category)}
                  {extension.category}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                <span className="font-mono">author: @{extension.author}</span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {extension.downloads?.toLocaleString() || "1,200"} installs
                </span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="h-3 w-3 fill-amber-400" />
                  {extension.rating || "4.8"}
                </span>
              </div>
            </div>

            {extension.repoUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 border-[#242b3a] bg-[#121620] text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                <a
                  href={extension.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
                  Source
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-60" />
                </a>
              </Button>
            )}
          </div>

          <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {extension.description}
          </p>

          {/* Quick Install Command Box */}
          <div className="mt-4 flex items-center justify-between rounded border border-[#212736] bg-[#07080c] px-3.5 py-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-amber-400/80 select-none">$</span>
              <span className="select-all">{installCmd}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-2 font-sans"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center border-b border-[#1a1f2b] bg-[#080a0e] px-6 text-xs font-mono">
          <button
            onClick={() => setActiveTab("readme")}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 font-medium transition-colors ${
              activeTab === "readme"
                ? "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileText className="h-3 w-3" />
            <span>OVERVIEW</span>
          </button>
          <button
            onClick={() => setActiveTab("quickstart")}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 font-medium transition-colors ${
              activeTab === "quickstart"
                ? "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Terminal className="h-3 w-3" />
            <span>INSTALLATION</span>
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 font-medium transition-colors ${
              activeTab === "config"
                ? "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sliders className="h-3 w-3" />
            <span>CONFIG</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-xs sm:text-sm text-zinc-300 max-h-[360px] overflow-y-auto leading-relaxed">
          {activeTab === "readme" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                  Package Overview
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {extension.description}. Developed specifically for Biscuit to provide seamless integration with the core editor workflow.
                </p>
              </div>

              {extension.tags && extension.tags.length > 0 && (
                <div>
                  <h5 className="text-xs uppercase tracking-wider font-mono text-zinc-400 mb-2">
                    Metadata Tags
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {extension.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono rounded border border-[#212736] bg-[#121622] px-2 py-0.5 text-xs text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded border border-[#1d2332] bg-[#080a0e] p-3 text-xs font-mono space-y-1.5 text-zinc-400">
                <div className="flex justify-between">
                  <span>IDENTIFIER:</span>
                  <span className="text-zinc-200">{extension.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>CATEGORY:</span>
                  <span className="text-zinc-200">{extension.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>COMPATIBILITY:</span>
                  <span className="text-emerald-400">Biscuit v0.1.0+</span>
                </div>
                <div className="flex justify-between">
                  <span>LICENSE:</span>
                  <span className="text-zinc-200">MIT / Open Source</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "quickstart" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                  CLI Installation
                </h4>
                <p className="text-xs text-zinc-400 mb-2">
                  Execute this command in your terminal where Biscuit is installed:
                </p>
                <div className="rounded border border-[#212736] bg-[#07080c] p-3 font-mono text-xs text-zinc-200">
                  biscuit ext install {extension.id}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                  In-Editor Command Palette
                </h4>
                <p className="text-xs text-zinc-400">
                  Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded font-mono text-[11px]">Ctrl+Shift+P</kbd> (or <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded font-mono text-[11px]">⌘Shift+P</kbd> on macOS) and type:
                </p>
                <div className="mt-1.5 rounded border border-[#212736] bg-[#07080c] p-2.5 font-mono text-xs text-amber-300">
                  Extensions: Install {extension.name}
                </div>
              </div>
            </div>
          )}

          {activeTab === "config" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400">
                  Workspace biscuit.toml
                </h4>
                <button
                  onClick={handleCopyConfig}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  {copiedConfig ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="rounded border border-[#212736] bg-[#07080c] p-3 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                {sampleConfig}
              </pre>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between border-t border-[#1a1f2b] bg-[#080a0e] px-6 py-3 text-xs">
          <span className="text-zinc-500 font-mono text-[11px]">
            PKG: {extension.id}
          </span>
          <Button
            size="sm"
            onClick={handleCopy}
            className="h-8 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-medium text-xs rounded"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Terminal className="h-3.5 w-3.5 mr-1" />
                biscuit ext install
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
