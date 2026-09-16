# 🚀 Proyecto de Sistemas Paralelos — Compañero de Estudio

> **Integrantes del Grupo:**
> * Marcelo Alejandro Cabero Flores - e123894
>
> **Docente:** Ing. Elias Cassal Baldiviezo  
> **Materia:** Sistemas Paralelos  
> **Arquitectura Base:** SysLab 2.0  

---

## 📌 1. Descripción del Proyecto

Sistema distribuido multi-contenedor diseñado bajo la arquitectura **SysLab 2.0** orientado a la gestión colaborativa y persistente de tareas académicas. La plataforma desacopla la lógica de presentación, la capa de servicios REST y el almacenamiento transaccional en contenedores independientes, asegurando concurrencia eficiente, aislamiento de entornos mediante Docker, control de esquemas relacionales con Prisma ORM sobre PostgreSQL, e incorporación de directrices y habilidades operativas para agentes de IA integradas desde TasteSkill.

---

## 🛠️ 2. Arquitectura de Tecnologías (SysLab 2.0)

El proyecto está diseñado sobre la arquitectura **SysLab 2.0**, distribuyendo responsabilidades en tres capas principales orquestadas mediante contenedores Docker:

* **Frontend:** Servidor web Node.js — Interfaz de usuario responsiva en el puerto 3000.
* **Backend:** API REST Node.js — Servidor de aplicaciones y procesamiento concurrente en el puerto 4000.
* **Persistencia / Base de Datos:** PostgreSQL 15 con **Prisma ORM** como motor relacional en el puerto 5432.
* **Agente de IA:** Reglas operativas (`rules.md`) y habilidades personalizadas (`skills`) integradas desde [TasteSkill](https://www.tasteskill.dev/).

---

## 📁 3. Estructura del Repositorio

```text
.
├── agente/                 # Skills e instrucciones del agente de IA
│   ├── skills/             # Skills importadas de TasteSkill y custom SysLab 2.0
│   └── rules.md            # Reglas de comportamiento del agente
├── backend/                # Código fuente del Backend
│   ├── prisma/             # Configuración de persistencia
│   │   ├── migrations/     # Migraciones generadas por Prisma
│   │   ├── schema.prisma   # Modelo de datos Prisma
│   │   └── seed.js         # Script de datos iniciales
│   ├── .env                # Variables de entorno del Backend
│   ├── Dockerfile          # Imagen Docker del Backend
│   └── package.json
├── frontend/               # Código fuente del Frontend
│   ├── .env                # Variables de entorno del Frontend
│   ├── Dockerfile          # Imagen Docker del Frontend
│   └── package.json
├── docker-compose.yml      # Orquestación de contenedores (Frontend, Backend, DB)
└── README.md               # Documentación general del proyecto

🚀 4. Guía de Ejecución Rápida

    Clonar el repositorio y acceder a la carpeta:

Bash

git clone [https://github.com/MarceloAlekey/Compa-ero-de-Estudio.git](https://github.com/MarceloAlekey/Compa-ero-de-Estudio.git)
cd Compa-ero-de-Estudio

    Construir y levantar el entorno multi-contenedor:

Bash

docker compose up --build -d

    Verificar el estado de los contenedores:

Bash

docker compose ps

    Aplicar las migraciones de Prisma en PostgreSQL:

Bash

docker compose exec backend npx prisma migrate dev --name init

    Ejecutar el script de poblado inicial (Seed):

Bash

docker compose exec backend node prisma/prisma/seed.js

