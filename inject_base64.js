const fs = require('fs');
const lines = fs.readFileSync('base64.txt', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const newHtml = html.replace('<img src="./renata.jpg"', '<img src="data:image/png;base64,' + lines + '"');
fs.writeFileSync('index.html', newHtml);
console.log('Base64 injected.');
