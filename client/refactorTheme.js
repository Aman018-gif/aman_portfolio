import fs from 'fs';

const cssPath = './src/App.css';
let css = fs.readFileSync(cssPath, 'utf8');

const replacements = [
  { match: /hsl\(0 0 5\)/g, replacement: 'var(--bg-app)' },
  { match: /#020617/g, replacement: 'var(--bg-surface)' },
  { match: /#0d1b2e/g, replacement: 'var(--bg-profile)' },
  { match: /rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*([0-9.]+)\s*\)/g, replacement: 'rgba(var(--bg-rgb-card), $1)' },
  { match: /#1f2937/g, replacement: 'var(--border-main)' },
  { match: /rgba\(\s*31\s*,\s*41\s*,\s*55\s*,\s*([0-9.]+)\s*\)/g, replacement: 'rgba(var(--border-rgb-main), $1)' },
  { match: /rgba\(\s*55\s*,\s*65\s*,\s*81\s*,\s*([0-9.]+)\s*\)/g, replacement: 'rgba(var(--border-rgb-dark), $1)' },
  { match: /rgba\(\s*148\s*,\s*163\s*,\s*184\s*,\s*([0-9.]+)\s*\)/g, replacement: 'rgba(var(--border-rgb-light), $1)' },
  { match: /#f9fafb/gi, replacement: 'var(--text-bright)' },
  { match: /#e5e7eb/gi, replacement: 'var(--text-primary)' },
  { match: /#d1d5db/gi, replacement: 'var(--text-secondary)' },
  { match: /#9ca3af/gi, replacement: 'var(--text-tertiary)' },
  { match: /#6b7280/gi, replacement: 'var(--text-muted)' },
  { match: /#c5d1d9/gi, replacement: 'var(--text-primary)' },
  { match: /#818cf8/gi, replacement: 'var(--text-role)' },
  { match: /#a5b4fc/gi, replacement: 'var(--text-role)' },
  { match: /#051622/g, replacement: 'var(--bg-status)' },
  { match: /#0a3d31/g, replacement: 'var(--border-status)' },
  { match: /background: #000000;/g, replacement: 'background: var(--bg-app);' },
  { match: /backdrop-filter: blur\(5px\);/g, replacement: 'backdrop-filter: blur(5px);\n  color: var(--text-primary);' },
  { match: /background: transparent;/g, replacement: 'background: transparent;\n  color: var(--text-primary); /* For text inputs/buttons */' }
];

for (const r of replacements) {
  css = css.replace(r.match, r.replacement);
}

const variables = `
:root {
  --bg-app: hsl(0 0 5);
  --bg-surface: #020617;
  --bg-profile: #0d1b2e;
  --bg-rgb-card: 15, 23, 42;
  --border-main: #1f2937;
  --border-rgb-main: 31, 41, 55;
  --border-rgb-dark: 55, 65, 81;
  --border-rgb-light: 148, 163, 184;
  --text-bright: #f9fafb;
  --text-primary: #e5e7eb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --text-muted: #6b7280;
  --text-role: #a5b4fc;
  --bg-status: #051622;
  --border-status: #0a3d31;
}

[data-theme="light"] {
  --bg-app: #f8fafc;
  --bg-surface: #ffffff;
  --bg-profile: #ffffff;
  --bg-rgb-card: 241, 245, 249;
  --border-main: #e2e8f0;
  --border-rgb-main: 203, 213, 225;
  --border-rgb-dark: 148, 163, 184;
  --border-rgb-light: 100, 116, 139;
  --text-bright: #0f172a;
  --text-primary: #1e293b;
  --text-secondary: #334155;
  --text-tertiary: #475569;
  --text-muted: #64748b;
  --text-role: #4f46e5;
  --bg-status: #e2e8f0;
  --border-status: #cbd5e1;
}

`;

// Add media queries for mobile responsiveness at the end
const mobileCss = `
/* Mobile Responsiveness Enforcement */
@media (max-width: 650px) {
  .nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
  }
  .nav-left {
    align-items: center;
  }
  .nav-links {
    justify-content: center;
  }
  .main {
    padding: 1rem 0.5rem;
  }
  .split {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .hero-actions {
    justify-content: center;
  }
  .terminal-prompt-row {
    flex-wrap: wrap;
  }
  .terminal-path {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .project-actions {
    flex-direction: column;
  }
}
`;

fs.writeFileSync(cssPath, variables + css + mobileCss);
console.log('CSS updated successfully!');
