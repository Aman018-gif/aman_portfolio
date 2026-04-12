import fs from 'fs';

const cssPath = './src/App.css';
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/--border-status: #0a3d31;\n\s*--bg-pattern: [^\n]+/g, '--border-status: #0a3d31;');
css = css.replace(/--border-status: #cbd5e1;\n\s*--bg-pattern: [^\n]+/g, '--border-status: #cbd5e1;');

css = css.replace(/color: var\(--text-primary\);\n\s*background-image: var\(--bg-pattern\);\n\s*background-color: var\(--bg-app\);\n\s*background-size: 40px 40px;\n\s*background-position: center top;\n\s*background-attachment: fixed;/g, 'color: var(--text-primary);');

fs.writeFileSync(cssPath, css);
console.log('App.css variables undone');
