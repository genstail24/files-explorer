import { db } from "../utils/db";

export const getAll = async () => {
  return await db.file.findMany();
};

export const getById = async (id: number) => {
  return await db.file.findUnique({ where: { id } });
};

export const create = async (fileData: { name: string; parentId?: number }) => {
  return await db.file.create({ data: fileData });
};

export const update = async (id: number, fileData: { name: string; parentId?: number }) => {
  return await db.file.update({ where: { id }, data: fileData });
};

export const deleteById = async (id: number) => {
  return await db.file.delete({ where: { id } });
};
