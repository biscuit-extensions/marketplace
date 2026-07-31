import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1b1f27] bg-[#090b0e] py-10 text-xs text-zinc-500">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Biscuit" className="h-4 w-4" />
            <span className="font-medium text-zinc-300">Biscuit Extensions</span>
          </div>
          <p className="text-zinc-500">
            Official extension registry for the Biscuit code editor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/tomlin7/biscuit-extensions?tab=readme-ov-file#-creating-a-new-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
          >
            <span>Developer Guide</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <a
            href="https://github.com/tomlin7/biscuit-extensions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
          >
            <span>Extensions Repo</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <a
            href="https://github.com/billyeatcookies/biscuit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
          >
            <span>Biscuit Editor</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>
    </footer>
  );
}
