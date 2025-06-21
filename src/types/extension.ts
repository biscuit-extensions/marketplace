export interface Extension {
  id: string;
  name: string;
  author: string;
  description: string;
  version: string;
  submodule?: string;
  repoUrl?: string;
}
