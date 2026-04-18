import fs from 'fs';

const htmlContent = fs.readFileSync('index.html', 'utf8');

const styleRegex = /<style>([\s\S]*?)<\/style>/i;
const scriptRegex = /<script>([\s\S]*?)<\/script>/i;

const styleMatch = htmlContent.match(styleRegex);
if (styleMatch) {
  fs.writeFileSync('src/style.css', styleMatch[1].trim());
}

const scriptMatch = htmlContent.match(scriptRegex);
if (scriptMatch) {
  let tsCode = `import './style.css';\n\n` + scriptMatch[1].trim();
  fs.writeFileSync('src/main.ts', tsCode);
}

// Remove style and script blocks, and update index.html
let newHtml = htmlContent.replace(styleRegex, '<link rel="stylesheet" href="/src/style.css" />');
newHtml = newHtml.replace(scriptRegex, '<script type="module" src="/src/main.ts"></script>');

fs.writeFileSync('index.html', newHtml);

console.log('Split successful');
