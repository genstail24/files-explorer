import { db } from "../utils/db";

export const getAll = async ({ sortBy, order, search, parentId }: {
  sortBy: string;
  order: "asc" | "desc";
  search: string | null;
  parentId?: number | null;
}) => {
  return await db.folder.findMany({
    where: {
      name: search ? { contains: search } : undefined,
      ...(parentId !== undefined ? { parentId } : {}),
    },
    orderBy: {
      [sortBy]: order, // Sorting by field and order
    },
  });
};

export const getById = async (id: number) => {
  return await db.folder.findUnique({
    where: { id }, include: {
      files: true,
      subFolders: true,
    }
  });
};

export const create = async (folderData: { name: string; parentId?: number }) => {
  return await db.folder.create({ data: folderData });
};

export const update = async (id: number, folderData: { name: string; parentId?: number }) => {
  return await db.folder.update({ where: { id }, data: folderData });
};

export const deleteById = async (id: number) => {
  return await db.folder.delete({ where: { id } });
};
