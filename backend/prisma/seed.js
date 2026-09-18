const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Limpia los datos previos (las relaciones se borran en cascada)
  await prisma.usuario.deleteMany();

  await prisma.usuario.create({
    data: {
      nombre: 'Marcelo Cabero',
      email: 'marcelo@example.com',
      materias: {
        create: [
          {
            nombre: 'Sistemas Paralelos',
            docente: 'Ing. Elias Cassal Baldiviezo',
            temas: {
              create: [
                { titulo: 'Docker y contenedores', dificultad: 'MEDIA' },
                { titulo: 'Prisma ORM', dificultad: 'ALTA', estado: 'EN_PROGRESO' }
              ]
            },
            examenes: {
              create: [{ titulo: 'Parcial 1', fecha: new Date('2026-10-15') }]
            }
          }
        ]
      }
    }
  });

  console.log('Seed ejecutado exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
