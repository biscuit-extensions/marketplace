import { Extension } from "@/types/extension"

// This data is parsed from the extensions.toml file
export const extensions: Extension[] = [
  {
    id: "rust",
    name: "Rust",
    author: "tomlin7",
    description: "Rust language support with syntax highlighting, code completion, and debugging capabilities",
    version: "0.1.0",
    submodule: "rust"
  },
  {
    id: "clangd",
    name: "clangd",
    author: "tomlin7", 
    description: "clangd extension for Biscuit providing C/C++ language server protocol support",
    version: "0.1.0",
    submodule: "clangd"
  },
  // Commented out extensions from the TOML file
  {
    id: "ollama",
    name: "Ollama",
    author: "tomlin7",
    description: "Ollama integration for AI-powered code assistance and completion",
    version: "0.1.0",
    submodule: "ollama"
  },
  {
    id: "typescript",
    name: "TypeScript",
    author: "tomlin7",
    description: "TypeScript language support with IntelliSense, refactoring, and type checking",
    version: "0.1.0",
    submodule: "typescript"
  },
  {
    id: "tkinter",
    name: "Tkinter",
    author: "tomlin7",
    description: "Tkinter development tools for Python GUI applications",
    version: "0.1.0",
    submodule: "tkinter"
  }
]