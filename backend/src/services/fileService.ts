import * as fileRepo from "../repositories/fileRepository";

export const getAllFiles = async ({
  sortBy = "name",
  order = "asc",
  search = null,
  folderId = null
}) => {
  return await fileRepo.getAll({ sortBy, order, search, folderId });
};

export const getFileById = async (id: number) => {
  return await fileRepo.getById(id);
};

export const createFile = async (fileData: { name: string; folderId: number; type?: string }) => {
  return await fileRepo.create(fileData);
};

export const updateFile = async (id: number, fileData: { name: string; folderId: number; type?: string }) => {
  return await fileRepo.update(id, fileData);
};

export const deleteFile = async (id: number) => {
  return await fileRepo.deleteById(id);
};
