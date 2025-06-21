import { useEffect, useState } from "react";
import { Extension } from "@/types/extension";
import * as toml from "toml";

interface UseExtensionsResult {
  extensions: Extension[] | null;
  loading: boolean;
  error: Error | null;
}

const EXTENSIONS_TOML_URL =
  "https://raw.githubusercontent.com/tomlin7/biscuit-extensions/refs/heads/main/extensions.toml";

export function useExtensions(): UseExtensionsResult {
  const [extensions, setExtensions] = useState<Extension[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchExtensions() {
      try {
        const response = await fetch(EXTENSIONS_TOML_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch extensions: ${response.statusText}`);
        }

        const tomlText = await response.text();
        const parsed = toml.parse(tomlText) as Record<string, any>;

        // Fetch .gitmodules to determine repository URLs for submodules
        const gitmodulesResp = await fetch(
          "https://raw.githubusercontent.com/tomlin7/biscuit-extensions/refs/heads/main/.gitmodules"
        );

        let submoduleRepoMap: Record<string, string> = {};
        if (gitmodulesResp.ok) {
          const gitmodulesText = await gitmodulesResp.text();

          // Split into blocks for each submodule
          const blockRegex = /\[submodule \"([^\"]+)\"\]([\s\S]*?)(?=\n\[|$)/g;
          let blockMatch: RegExpExecArray | null;
          while ((blockMatch = blockRegex.exec(gitmodulesText)) !== null) {
            // blockMatch[1] contains the full submodule name (e.g. "extensions/rust").
            const body = blockMatch[2];

            const pathMatch = body.match(/path\s*=\s*(.+)/);
            const urlMatch = body.match(/url\s*=\s*(.+)/);
            if (!pathMatch || !urlMatch) continue;

            const path = pathMatch[1].trim(); // e.g., "extensions/rust"
            const url = urlMatch[1].trim();

            // Derive key as the last segment (rust, clangd, ...)
            const segments = path.split("/");
            const key = segments[segments.length - 1];

            submoduleRepoMap[key] = url;
          }
        }

        const parsedExtensions: Extension[] = Object.entries(parsed).map(
          ([id, data]) => {
            const submodule = data.submodule as string | undefined;
            return {
              id,
              name: data.name,
              author: data.author,
              description: data.description,
              version: data.version,
              submodule,
              repoUrl: submodule ? submoduleRepoMap[submodule] : undefined,
            };
          }
        );

        setExtensions(parsedExtensions);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchExtensions();
  }, []);

  return { extensions, loading, error };
}
