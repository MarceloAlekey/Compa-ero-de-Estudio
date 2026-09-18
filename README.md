# 🚀 Proyecto de Sistemas Paralelos — Compañero de Estudio

**Integrantes del Grupo:**
- Marcelo Alejandro Cabero Flores - e123894

**Docente:** Ing. Elias Cassal Baldiviezo
**Materia:** Sistemas Paralelos
**Arquitectura Base:** SysLab 2.0

## 📌 1. Descripción del Proyecto

Sistema distribuido multi-contenedor diseñado bajo la arquitectura SysLab 2.0 para gestionar materias, temas y exámenes. Separa frontend, backend y base de datos en contenedores Docker, usa Prisma ORM sobre PostgreSQL e incorpora reglas y skills para agentes de IA de TasteSkill.

## 🛠️ 2. Arquitectura de Tecnologías

| Capa | Tecnología | Contenedor | Puerto |
|------|-----------|------------|--------|
| Frontend | Node.js | syslab_frontend | 3000 |
| Backend | Node.js (API) | syslab_backend | 4000 |
| Base de datos | PostgreSQL 15 + Prisma ORM | syslab_db | 5432 |
| Agente de IA | rules.md y skills (TasteSkill) | — | — |

## 🚀 3. Guía de Ejecución Rápida

```bash
git clone https://github.com/MarceloAlekey/Compa-ero-de-Estudio.git
cd Compa-ero-de-Estudio
docker compose up --build -d
docker compose ps
docker compose exec backend npx prisma migrate dev --name init
docker compose exec backend node prisma/seed.js
```

## 📁 4. Estructura del Repositorio

```
.
├── agente/                 # Skills e instrucciones del agente de IA
│   ├── skills/             # Skills de TasteSkill y custom SysLab 2.0
│   └── rules.md            # Reglas de comportamiento del agente
├── backend/
│   ├── prisma/
│   │   ├── migrations/     # Migraciones generadas por Prisma
│   │   ├── schema.prisma   # Modelo de datos (Usuario, Materia, Tema, Examen)
│   │   └── seed.js         # Script de datos iniciales
│   ├── .env
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── .env
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── docker-compose.yml      # Orquestación (Frontend, Backend, DB)
└── README.md
```
