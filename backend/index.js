const http = require('http');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    if (req.url === '/api/materias') {
      const materias = await prisma.materia.findMany({
        include: { temas: true, examenes: true },
      });
      res.writeHead(200);
      return res.end(JSON.stringify(materias));
    }
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'SysLab 2.0 Backend Online' }));
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: e.message }));
  }
});

server.listen(port, () => {
  console.log(`Backend escuchando en el puerto ${port}`);
});
