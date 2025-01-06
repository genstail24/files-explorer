import { db } from "../utils/db";

export const getAll = async ({
  sortBy,
  order,
  search,
  folderId,
}: {
  sortBy: string;
  order: "asc" | "desc";
  search: string | null;
  folderId?: number | null;
}) => {
  return await db.file.findMany({
    where: {
      ...(search !== undefined && search !== null ? { name: {
        contains: search,
      } } : {}),
      ...(folderId !== undefined && folderId !== null ? { folderId } : {}),
    }
  })
};


export const getById = async (id: number) => {
  return await db.file.findUnique({ where: { id } });
};

export const create = async (fileData: { name: string; folderId?: number; type?: string }) => {
  return await db.file.create({ data: fileData });
};

export const update = async (id: number, fileData: { name: string; folderId?: number; type?: string }) => {
  return await db.file.update({ where: { id }, data: fileData });
};

export const deleteById = async (id: number) => {
  return await db.file.delete({ where: { id } });
};
