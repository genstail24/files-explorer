import * as folderRepo from "../repositories/folderRepository";

export const getAllFolders = async ({
  sortBy = "name",
  order = "asc",
  search = null,
  parentId = null
}) => {
  return await folderRepo.getAll({ sortBy, order, search, parentId });
};

export const getFolderById = async (id: number) => {
  return await folderRepo.getById(id);
};

export const createFolder = async (folderData: { name: string; parentId?: number }) => {
  return await folderRepo.create(folderData);
};

export const updateFolder = async (id: number, folderData: { name: string; parentId?: number }) => {
  return await folderRepo.update(id, folderData);
};

export const deleteFolder = async (id: number) => {
  return await folderRepo.deleteById(id);
};
