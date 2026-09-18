const http = require('http');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const DIFICULTADES = ['BAJA', 'MEDIA', 'ALTA'];
const ESTADOS = ['PENDIENTE', 'EN_PROGRESO', 'DOMINADO'];

function enviar(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...CORS });
  res.end(data === undefined ? '' : JSON.stringify(data));
}

function leerCuerpo(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        const err = new Error('El cuerpo de la petición no es JSON válido');
        err.status = 400;
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const texto = (v) => (typeof v === 'string' ? v.trim() : '');

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    return res.end();
  }

  const url = new URL(req.url, 'http://localhost');
  const partes = url.pathname.split('/').filter(Boolean);

  try {
    if (partes[0] !== 'api') return enviar(res, 200, { status: 'SysLab 2.0 Backend Online' });

    const [, recurso, id, sub] = partes;
    const num = Number(id);
    if (id && Number.isNaN(num)) return enviar(res, 400, { error: 'Id inválido' });

    // Materias
    if (recurso === 'materias' && !id) {
      if (req.method === 'GET') {
        const materias = await prisma.materia.findMany({
          include: {
            temas: { orderBy: { id: 'asc' } },
            examenes: { orderBy: { fecha: 'asc' } },
          },
          orderBy: { id: 'asc' },
        });
        return enviar(res, 200, materias);
      }
      if (req.method === 'POST') {
        const b = await leerCuerpo(req);
        const nombre = texto(b.nombre);
        if (!nombre) return enviar(res, 400, { error: 'El nombre de la materia es obligatorio' });
        const usuario = await prisma.usuario.findFirst();
        if (!usuario) return enviar(res, 400, { error: 'No hay usuario. Ejecuta el seed.' });
        const materia = await prisma.materia.create({
          data: { nombre, docente: texto(b.docente) || null, usuarioId: usuario.id },
        });
        return enviar(res, 201, materia);
      }
    }

    if (recurso === 'materias' && id) {
      if (!sub && req.method === 'DELETE') {
        await prisma.materia.delete({ where: { id: num } });
        return enviar(res, 204);
      }
      if (sub === 'temas' && req.method === 'POST') {
        const b = await leerCuerpo(req);
        const titulo = texto(b.titulo);
        if (!titulo) return enviar(res, 400, { error: 'El título del tema es obligatorio' });
        const dificultad = DIFICULTADES.includes(b.dificultad) ? b.dificultad : 'MEDIA';
        const tema = await prisma.tema.create({ data: { titulo, dificultad, materiaId: num } });
        return enviar(res, 201, tema);
      }
      if (sub === 'examenes' && req.method === 'POST') {
        const b = await leerCuerpo(req);
        const titulo = texto(b.titulo);
        const fecha = new Date(b.fecha);
        if (!titulo || Number.isNaN(fecha.getTime())) {
          return enviar(res, 400, { error: 'Escribe el título y elige una fecha válida' });
        }
        const examen = await prisma.examen.create({ data: { titulo, fecha, materiaId: num } });
        return enviar(res, 201, examen);
      }
    }

    // Temas
    if (recurso === 'temas' && id) {
      if (req.method === 'PATCH') {
        const b = await leerCuerpo(req);
        if (!ESTADOS.includes(b.estado)) return enviar(res, 400, { error: 'Estado inválido' });
        const tema = await prisma.tema.update({ where: { id: num }, data: { estado: b.estado } });
        return enviar(res, 200, tema);
      }
      if (req.method === 'DELETE') {
        await prisma.tema.delete({ where: { id: num } });
        return enviar(res, 204);
      }
    }

    // Exámenes
    if (recurso === 'examenes' && id && req.method === 'DELETE') {
      await prisma.examen.delete({ where: { id: num } });
      return enviar(res, 204);
    }

    return enviar(res, 404, { error: 'Ruta no encontrada' });
  } catch (e) {
    if (e.status) return enviar(res, e.status, { error: e.message });
    if (e.code === 'P2025' || e.code === 'P2003') {
      return enviar(res, 404, { error: 'No existe ese registro' });
    }
    console.error(e);
    return enviar(res, 500, { error: 'Error interno del servidor' });
  }
});

server.listen(port, () => {
  console.log(`Backend escuchando en el puerto ${port}`);
});
