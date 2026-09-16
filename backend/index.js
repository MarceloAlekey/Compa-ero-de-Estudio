const http = require('http');
const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'SysLab 2.0 Backend Online' }));
});

server.listen(port, () => {
  console.log(`Backend escuchando en el puerto ${port}`);
});
