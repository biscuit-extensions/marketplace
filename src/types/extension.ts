export type ExtensionCategory =
  | "Themes"
  | "Languages"
  | "Tools"
  | "Git"
  | "Formatters"
  | "AI"
  | "UI";

export interface Extension {
  id: string;
  name: string;
  author: string;
  description: string;
  version: string;
  submodule?: string;
  repoUrl?: string;
  category: ExtensionCategory;
  tags?: string[];
  downloads?: number;
  rating?: number;
  featured?: boolean;
}
