# SysLab 2.0 — Reglas Operativas y Persistencia del Agente

1. **Persistencia Exclusiva:** Toda manipulación y lectura de datos relacionales debe realizarse estrictamente a través de Prisma ORM.
2. **Parametrización Segura:** Prohibido escribir credenciales fijas en código; utilizar las variables de entorno definidas en `.env`.
3. **Manejo de Errores y Logs:** El agente debe capturar fallos de conexión a la base de datos sin exponer datos confidenciales en entornos de producción.
4. **Respaldo de Migraciones:** Toda mutación del modelo relacional debe acompañarse de su migración formal generada mediante Prisma Migrate.
