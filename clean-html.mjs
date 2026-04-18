import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// remove onclick="toggleMenu()"
html = html.replace(/ onclick="toggleMenu\(\)"/g, '');

// remove onsubmit="handleSubmit(event)"
html = html.replace(/ onsubmit="handleSubmit\(event\)"/g, '');

fs.writeFileSync('index.html', html);
console.log('Cleaned index.html');
