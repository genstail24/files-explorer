import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create root folder
  const rootFolder = await prisma.folder.create({
    data: {
      name: 'Root',
      children: {
        create: Array.from({ length: 10 }, (_, i) => ({
          name: `Folder_${i + 1}`,
          children: {
            create: Array.from({ length: 10 }, (_, j) => ({
              name: `Subfolder_${i + 1}_${j + 1}`,
            })),
          },
        })),
      },
    },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
  });

  console.log('Root folder and subfolders created.');

  // Add files to each main folder (Folder_1, Folder_2, ..., Folder_10)
  const mainFolders = await prisma.folder.findMany({
    where: {
      parentId: rootFolder.id,
    },
  });

  for (const folder of mainFolders) {
    await prisma.file.createMany({
      data: Array.from({ length: 10 }, (_, k) => ({
        name: `File_${folder.name}_${k + 1}.txt`,
        folderId: folder.id,
        size: Math.floor(Math.random() * 5000) + 1000, // Random size between 1KB and 5KB
        type: 'text/plain',
      })),
    });
    console.log(`Files added to ${folder.name}`);
  }

  // Add files to each subfolder (Subfolder_1_1, Subfolder_1_2, ...)
  const subFolders = await prisma.folder.findMany({
    where: {
      parentId: {
        not: null, // Ensure it's not the root folder
      },
    },
  });

  for (const subFolder of subFolders) {
    await prisma.file.createMany({
      data: Array.from({ length: 10 }, (_, l) => ({
        name: `File_${subFolder.name}_${l + 1}.png`,
        folderId: subFolder.id,
        size: Math.floor(Math.random() * 5000) + 1000, // Random size between 1KB and 5KB
        type: 'image/png',
      })),
    });
    console.log(`Files added to ${subFolder.name}`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
