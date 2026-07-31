import { useEffect, useState, useCallback } from "react";
import { Extension, ExtensionCategory } from "@/types/extension";
import rawBundledExtensions from "@/data/extensions.json";
import * as toml from "toml";

interface UseExtensionsResult {
  extensions: Extension[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const EXTENSIONS_TOML_URL =
  "https://raw.githubusercontent.com/tomlin7/biscuit-extensions/main/extensions.toml";
const GITMODULES_URL =
  "https://raw.githubusercontent.com/tomlin7/biscuit-extensions/main/.gitmodules";

const initialExtensions: Extension[] = rawBundledExtensions as Extension[];

export function useExtensions(): UseExtensionsResult {
  const [extensions, setExtensions] = useState<Extension[]>(initialExtensions);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRemoteExtensions = useCallback(async () => {
    try {
      setLoading(true);
      const tomlResp = await fetch(EXTENSIONS_TOML_URL, {
        cache: "no-cache",
      });
      if (!tomlResp.ok) {
        throw new Error(`Failed to fetch extensions.toml (${tomlResp.status})`);
      }

      const tomlText = await tomlResp.text();
      const parsed = toml.parse(tomlText) as Record<string, Record<string, any>>;

      // Parse .gitmodules
      let submoduleRepoMap: Record<string, string> = {};
      try {
        const gitmodulesResp = await fetch(GITMODULES_URL, {
          cache: "no-cache",
        });
        if (gitmodulesResp.ok) {
          const gitmodulesText = await gitmodulesResp.text();
          const blockRegex = /\[submodule \"([^\"]+)\"\]([\s\S]*?)(?=\n\[|$)/g;
          let blockMatch: RegExpExecArray | null;
          while ((blockMatch = blockRegex.exec(gitmodulesText)) !== null) {
            const body = blockMatch[2];
            const pathMatch = body.match(/path\s*=\s*(.+)/);
            const urlMatch = body.match(/url\s*=\s*(.+)/);
            if (!pathMatch || !urlMatch) continue;

            const path = pathMatch[1].trim();
            const url = urlMatch[1].trim();
            const segments = path.split("/");
            const key = segments[segments.length - 1];
            submoduleRepoMap[key] = url;
          }
        }
      } catch {
        // Fallback to existing repo URLs from bundled dataset
      }

      // Merge remote with bundled metadata
      const bundledMap = new Map(initialExtensions.map((e) => [e.id, e]));

      const updatedExtensions: Extension[] = Object.entries(parsed).map(
        ([id, data]) => {
          const submodule = data.submodule as string | undefined;
          const existing = bundledMap.get(id);

          return {
            id,
            name: data.name || existing?.name || id,
            author: data.author || existing?.author || "biscuit",
            description: data.description || existing?.description || "",
            version: data.version || existing?.version || "0.1.0",
            submodule,
            repoUrl:
              (submodule && submoduleRepoMap[submodule]) ||
              existing?.repoUrl ||
              (submodule ? `https://github.com/biscuit-extensions/${submodule}` : undefined),
            category: (existing?.category || "Tools") as ExtensionCategory,
            tags: existing?.tags || ["tools", id.replace(/_/g, "-")],
            downloads: existing?.downloads || 450,
            rating: existing?.rating || 4.5,
            featured: existing?.featured || false,
          };
        }
      );

      if (updatedExtensions.length > 0) {
        setExtensions(updatedExtensions);
        setError(null);
      }
    } catch (err) {
      console.warn("Could not refresh extensions from GitHub, using static bundle:", err);
      // We do NOT break the UI with error; static bundle remains active
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Attempt remote update silently in background
    fetchRemoteExtensions();
  }, [fetchRemoteExtensions]);

  return { extensions, loading, error, refresh: fetchRemoteExtensions };
}
