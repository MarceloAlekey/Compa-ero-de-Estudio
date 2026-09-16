const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'Inicializar SysLab 2.0', description: 'Configuracion base de contenedores' },
      { title: 'Conectar Agente TasteSkill', description: 'Cargar reglas operativas' }
    ]
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
