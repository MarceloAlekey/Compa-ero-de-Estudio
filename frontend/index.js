const http = require('http');
const fs = require('fs');
const path = require('path');

// URL del backend tal como la ve el navegador
const API = process.env.VITE_API_URL || 'http://localhost:4000';
const pagina = fs
  .readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8')
  .replace('__API_URL__', API);

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(pagina);
  })
  .listen(3000, () => console.log('Frontend escuchando en el puerto 3000'));
