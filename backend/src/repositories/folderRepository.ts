import { db } from "../utils/db";

export const getAll = async ({
  sortBy,
  order,
  search,
  parentId,
}: {
  sortBy: string;
  order: "asc" | "desc";
  search: string | null;
  parentId?: number | null;
}) => {
  const query = `
    WITH RECURSIVE folder_tree AS (
      -- Bagian pertama query untuk mengambil folder yang sesuai
      SELECT id, name, parentId
      FROM folders
      WHERE parentId ${parentId ? `= ${parentId}` : "IS NULL"}
      ${search ? `AND name LIKE '%${search}%'` : ""}
      
      UNION ALL

      -- Bagian kedua query untuk mengambil subfolder yang terkait
      SELECT f.id, f.name, f.parentId
      FROM folders f
      INNER JOIN folder_tree ft ON ft.id = f.parentId
    )
    
    SELECT id, name, parentId
    FROM folder_tree
    ORDER BY ${sortBy} ${order};
  `;

  const result = await db.$queryRawUnsafe(query);

  // Membangun struktur subfolder
  const buildHierarchy:any = (folders: any[], parentId: number | null) => {
    return folders
      .filter(folder => folder.parentId === parentId)
      .map(folder => ({
        ...folder,
        subFolders: buildHierarchy(folders, folder.id),
      }));
  };

  const formattedResult = buildHierarchy(result, parentId);

  return formattedResult;
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
