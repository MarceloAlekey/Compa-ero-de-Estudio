const http = require('http');
const API = process.env.API_INTERNAL_URL || 'http://backend:4000';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  try {
    const r = await fetch(`${API}/api/materias`);
    const materias = await r.json();
    const cuerpo = materias.map((m) => `
      <section>
        <h2>${esc(m.nombre)} <small>${esc(m.docente || '')}</small></h2>
        <h3>Temas</h3>
        <ul>${m.temas.map((t) => `<li>${esc(t.titulo)} — ${esc(t.dificultad)} · ${esc(t.estado)}</li>`).join('')}</ul>
        <h3>Exámenes</h3>
        <ul>${m.examenes.map((e) => `<li>${esc(e.titulo)} — ${new Date(e.fecha).toLocaleDateString('es-BO')}</li>`).join('')}</ul>
      </section>`).join('');
    res.end(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Compañero de Estudio</title>
      <style>body{font-family:system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 1rem}
      section{border:1px solid #ddd;border-radius:8px;padding:1rem;margin:1rem 0}small{color:#666;font-weight:400}</style></head>
      <body><h1>Compañero de Estudio</h1>${cuerpo || '<p>Sin datos. Ejecuta el seed.</p>'}</body></html>`);
  } catch (e) {
    res.end(`<h1>Error al conectar con el backend</h1><p>${esc(e.message)}</p>`);
  }
});

server.listen(3000, () => console.log('Frontend escuchando en el puerto 3000'));
