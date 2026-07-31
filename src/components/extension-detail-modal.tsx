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
} from "lucide-react";

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
`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl border border-[#212530] bg-[#101218] p-0 text-zinc-100 overflow-hidden shadow-2xl rounded-lg">
        {/* Header content */}
        <div className="border-b border-[#1b1f28] p-6 pb-5 bg-[#0e1015]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <DialogTitle className="text-xl font-semibold text-white tracking-tight">
                  {extension.name}
                </DialogTitle>
                <span className="font-mono text-xs text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
                  v{extension.version}
                </span>
                <span className="text-xs text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
                  {extension.category}
                </span>
              </div>

              <div className="mt-1.5 flex items-center gap-3 text-xs text-zinc-400">
                <span>by @{extension.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {extension.downloads?.toLocaleString() || "1,200"} installs
                </span>
                <span>•</span>
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
                className="h-8 border-[#262b38] bg-[#141720] text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                <a href={extension.repoUrl} target="_blank" rel="noopener noreferrer">
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

          {/* Install Command */}
          <div className="mt-4 flex items-center justify-between rounded-md border border-[#232835] bg-[#090b0e] px-3 py-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-zinc-500 select-none">$</span>
              <span className="select-all">{installCmd}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-2"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-sans">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="font-sans">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center border-b border-[#1b1f28] bg-[#0c0e13] px-6 text-xs">
          <button
            onClick={() => setActiveTab("readme")}
            className={`border-b-2 px-3 py-2.5 font-medium transition-colors ${
              activeTab === "readme"
                ? "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("quickstart")}
            className={`border-b-2 px-3 py-2.5 font-medium transition-colors ${
              activeTab === "quickstart"
                ? "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Installation
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`border-b-2 px-3 py-2.5 font-medium transition-colors ${
              activeTab === "config"
                ? "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Configuration
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-xs sm:text-sm text-zinc-300 max-h-[360px] overflow-y-auto leading-relaxed">
          {activeTab === "readme" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  About this package
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {extension.description}. Designed for Biscuit code editor to provide smooth development workflows.
                </p>
              </div>

              {extension.tags && extension.tags.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-zinc-400 mb-2">
                    Tags
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {extension.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "quickstart" && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Using the Biscuit CLI</h4>
              <p className="text-xs text-zinc-400">
                Run the following command in your terminal to install this package:
              </p>

              <div className="rounded-md border border-zinc-800 bg-[#090b0e] p-3 font-mono text-xs text-zinc-300 space-y-1">
                <div>biscuit ext install {extension.id}</div>
              </div>

              <p className="text-xs text-zinc-400 pt-2">
                Inside the editor, open the command palette and run <em>Install Extension: {extension.name}</em>.
              </p>
            </div>
          )}

          {activeTab === "config" && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Settings</h4>
              <p className="text-xs text-zinc-400">
                You can configure this extension in your workspace <code>biscuit.toml</code>:
              </p>
              <pre className="rounded-md border border-zinc-800 bg-[#090b0e] p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                {sampleConfig}
              </pre>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between border-t border-[#1b1f28] bg-[#0c0e12] px-6 py-3 text-xs">
          <span className="text-zinc-500 font-mono">id: {extension.id}</span>
          <Button
            size="sm"
            onClick={handleCopy}
            className="h-8 bg-zinc-100 hover:bg-white text-zinc-900 font-medium text-xs rounded-md"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                Copied
              </>
            ) : (
              <>
                <Terminal className="h-3.5 w-3.5 mr-1 text-zinc-700" />
                Install
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
