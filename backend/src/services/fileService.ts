import * as fileRepo from "../repositories/fileRepository";

export const getAllFiles = async () => {
  return await fileRepo.getAll();
};

export const getFileById = async (id: number) => {
  return await fileRepo.getById(id);
};

export const createFile = async (fileData: { name: string; folderId: number }) => {
  return await fileRepo.create(fileData);
};

export const updateFile = async (id: number, fileData: { name: string; folderId: number }) => {
  return await fileRepo.update(id, fileData);
};

export const deleteFile = async (id: number) => {
  return await fileRepo.deleteById(id);
};
