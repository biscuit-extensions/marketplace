const fs = require('fs');
const path = require('path');
const toml = require('toml');

const tomlPath = 'c:/Users/BIT/Documents/github/biscuit-extensions/extensions.toml';
const gitmodulesPath = 'c:/Users/BIT/Documents/github/biscuit-extensions/.gitmodules';

const tomlContent = fs.readFileSync(tomlPath, 'utf8');
const parsed = toml.parse(tomlContent);

let submoduleRepoMap = {};
if (fs.existsSync(gitmodulesPath)) {
  const gitmodulesText = fs.readFileSync(gitmodulesPath, 'utf8');
  const blockRegex = /\[submodule "([^"]+)"\]([\s\S]*?)(?=\n\[|$)/g;
  let blockMatch;
  while ((blockMatch = blockRegex.exec(gitmodulesText)) !== null) {
    const body = blockMatch[2];
    const pathMatch = body.match(/path\s*=\s*(.+)/);
    const urlMatch = body.match(/url\s*=\s*(.+)/);
    if (pathMatch && urlMatch) {
      const p = pathMatch[1].trim();
      const u = urlMatch[1].trim();
      const segs = p.split('/');
      const key = segs[segs.length - 1];
      submoduleRepoMap[key] = u;
    }
  }
}

// Categories: Themes, Languages, Tools, Git, Formatters, AI, UI
const categoryMap = {
  // Themes
  material_icon_theme: { category: 'Themes', tags: ['themes', 'icons', 'material', 'customization'] },
  peacock: { category: 'Themes', tags: ['themes', 'accent-colors', 'workspace', 'visual'] },
  color_highlighter: { category: 'Themes', tags: ['themes', 'colors', 'css-hex', 'decorator'] },
  color_picker: { category: 'Themes', tags: ['themes', 'color-picker', 'palette', 'designer'] },

  // Languages
  rust: { category: 'Languages', tags: ['languages', 'rust', 'systems', 'lsp'] },
  clangd: { category: 'Languages', tags: ['languages', 'c++', 'c', 'clang', 'lsp'] },
  python: { category: 'Languages', tags: ['languages', 'python', 'venv', 'scripting'] },
  go: { category: 'Languages', tags: ['languages', 'go', 'golang', 'lsp', 'backend'] },
  csharp: { category: 'Languages', tags: ['languages', 'c#', 'dotnet', 'microsoft', 'lsp'] },
  jupyter: { category: 'Languages', tags: ['languages', 'jupyter', 'notebooks', 'data-science'] },
  dockerfile_helper: { category: 'Languages', tags: ['languages', 'docker', 'devops', 'syntax'] },
  html_css_support: { category: 'Languages', tags: ['languages', 'html', 'css', 'intellisense'] },
  live_sass: { category: 'Languages', tags: ['languages', 'sass', 'scss', 'compiler'] },
  tailwind_css: { category: 'Languages', tags: ['languages', 'tailwind', 'css', 'utility'] },
  emmet_biscuit: { category: 'Languages', tags: ['languages', 'emmet', 'html', 'snippets'] },
  css_peek: { category: 'Languages', tags: ['languages', 'css', 'navigation', 'classes'] },

  // Git
  gitlens: { category: 'Git', tags: ['git', 'blame', 'history', 'vcs'] },
  git_graph: { category: 'Git', tags: ['git', 'graph', 'dag', 'branches'] },
  github_pull_requests: { category: 'Git', tags: ['git', 'github', 'pull-requests', 'reviews'] },
  git_status_bar: { category: 'Git', tags: ['git', 'statusbar', 'branch', 'vcs'] },
  git_changelog_generator: { category: 'Git', tags: ['git', 'changelog', 'commits', 'releases'] },
  diff_viewer: { category: 'Git', tags: ['git', 'diff', 'compare', 'inspection'] },

  // Formatters
  prettier: { category: 'Formatters', tags: ['formatters', 'prettier', 'code-style', 'multi-lang'] },
  eslint: { category: 'Formatters', tags: ['formatters', 'eslint', 'linter', 'javascript'] },
  editorconfig: { category: 'Formatters', tags: ['formatters', 'editorconfig', 'whitespace', 'rules'] },
  whitespace_cleaner: { category: 'Formatters', tags: ['formatters', 'cleaner', 'eol', 'trim'] },
  xml_formatter: { category: 'Formatters', tags: ['formatters', 'xml', 'beautify', 'syntax'] },
  sql_formatter: { category: 'Formatters', tags: ['formatters', 'sql', 'database', 'queries'] },
  minifier: { category: 'Formatters', tags: ['formatters', 'minify', 'compression', 'bundle'] },
  sort_lines: { category: 'Formatters', tags: ['formatters', 'sort', 'lines', 'dedupe'] },
  case_converter: { category: 'Formatters', tags: ['formatters', 'casing', 'camelCase', 'snake_case'] },
  env_linter: { category: 'Formatters', tags: ['formatters', 'dotenv', 'linter', 'security'] },
  auto_rename_tag: { category: 'Formatters', tags: ['formatters', 'html', 'xml', 'sync'] },
  auto_close_tag: { category: 'Formatters', tags: ['formatters', 'html', 'xml', 'auto-complete'] },

  // AI
  turbo_console_log: { category: 'AI', tags: ['ai', 'smart-logging', 'debugging', 'automation'] },
  quokka: { category: 'AI', tags: ['ai', 'interactive-eval', 'scratchpad', 'smart-runner'] },
  sonarlint: { category: 'AI', tags: ['ai', 'code-smells', 'security-scan', 'smart-lint'] },

  // UI
  line_numbers_toggle: { category: 'UI', tags: ['ui', 'editor', 'gutter', 'line-numbers'] },
  bracket_pair_colorizer: { category: 'UI', tags: ['ui', 'brackets', 'rainbow', 'visualization'] },
  editor_clock: { category: 'UI', tags: ['ui', 'statusbar', 'clock', 'productivity'] },
  zen_mode: { category: 'UI', tags: ['ui', 'focus', 'minimal', 'distraction-free'] },
  indent_guide_pro: { category: 'UI', tags: ['ui', 'indentation', 'guides', 'scope'] },
  bookmarks: { category: 'UI', tags: ['ui', 'navigation', 'bookmarks', 'jump'] },
  ascii_art: { category: 'UI', tags: ['ui', 'ascii', 'banners', 'creative'] },
  code_snapshot: { category: 'UI', tags: ['ui', 'export', 'cards', 'share'] },
  project_dashboard: { category: 'UI', tags: ['ui', 'dashboard', 'overview', 'metrics'] },
  better_comments: { category: 'UI', tags: ['ui', 'comments', 'annotations', 'todos'] },
  error_lens: { category: 'UI', tags: ['ui', 'inline-errors', 'diagnostics', 'developer-experience'] },
  drawio: { category: 'UI', tags: ['ui', 'diagrams', 'flowcharts', 'visual-editor'] }
};

const extensions = Object.entries(parsed).map(([id, data]) => {
  const submodule = data.submodule;
  const name = data.name || id;
  const author = data.author || 'biscuit';
  const description = data.description || '';
  const version = data.version || '0.1.0';
  
  let category = 'Tools';
  let tags = ['tools', 'utility'];
  
  if (categoryMap[id]) {
    category = categoryMap[id].category;
    tags = categoryMap[id].tags;
  } else {
    // Fallback detection
    const text = `${id} ${name} ${description}`.toLowerCase();
    if (text.includes('theme') || text.includes('colorscheme')) {
      category = 'Themes';
      tags = ['themes', 'styling'];
    } else if (text.includes('lsp') || text.includes('language') || text.includes('syntax')) {
      category = 'Languages';
      tags = ['languages', 'syntax'];
    } else if (text.includes('git') || text.includes('vcs')) {
      category = 'Git';
      tags = ['git', 'version-control'];
    } else if (text.includes('format') || text.includes('cleaner')) {
      category = 'Formatters';
      tags = ['formatters', 'formatting'];
    } else if (text.includes('ai') || text.includes('smart') || text.includes('intelligence')) {
      category = 'AI';
      tags = ['ai', 'productivity'];
    } else if (text.includes('viewer') || text.includes('ui') || text.includes('guide')) {
      category = 'UI';
      tags = ['ui', 'interface'];
    } else {
      tags = ['tools', id.replace(/_/g, '-')];
    }
  }

  const repoUrl = submodule ? submoduleRepoMap[submodule] : undefined;

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const downloads = (positiveHash % 8900) + 320;
  const rating = (4.2 + ((positiveHash % 8) / 10)).toFixed(1);
  const featured = ['rust', 'clangd', 'browser', 'markdown_tools', 'gitlens', 'prettier', 'json_viewer', 'tailwind_css', 'drawio', 'material_icon_theme'].includes(id);

  return {
    id,
    name,
    author,
    description,
    version,
    submodule,
    repoUrl,
    category,
    tags,
    downloads,
    rating: parseFloat(rating),
    featured
  };
});

console.log('Total extensions parsed:', extensions.length);
const categoryCounts = {};
extensions.forEach(e => {
  categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
});
console.log('Category distribution:', categoryCounts);

const outputPath = path.resolve(__dirname, '../src/data/extensions.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(extensions, null, 2), 'utf8');
console.log('Saved extensions to:', outputPath);
