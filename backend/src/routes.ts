import { Elysia, t } from "elysia";
import * as folderService from "./services/folderService";
import * as fileService from "./services/fileService";

export default new Elysia()
  // Folder Routes
  .get("/folders",
    async ({ query }) => {
      const { sortBy, order, search, parentId } = query;

      // Default values
      const sortField = sortBy || "name"; // Default sorting by "name"
      const sortOrder = order === "desc" ? "desc" : "asc"; // Default order is "asc"
      const searchQuery = search ? search.toString() : null; // Optional search query
      const parent = parentId ? Number(parentId) : null; // Optional parentId filter

      return await folderService.getAllFolders({
        sortBy: sortField,
        order: sortOrder,
        search: searchQuery,
        parentId: parent,
      });
    },
    {
      query: t.Object({
        sortBy: t.Optional(t.String()), // e.g., "name", "createdAt"
        order: t.Optional(t.String()), // Sorting order
        search: t.Optional(t.String()), // Search keyword
        parentId: t.Optional(t.Numeric()), // Filter by parentId
      }),
    })
  .get("/folders/:id", async ({ params }) => {
    return await folderService.getFolderById(params.id);
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/folders", async ({ body }) => {
    return await folderService.createFolder(body);
  }, {
    body: t.Object({
      name: t.String(),
      parentId: t.Optional(t.Numeric()),
    }),
  })
  .put("/folders/:id", async ({ params, body }) => {
    return await folderService.updateFolder(params.id, body);
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
      name: t.String(),
      parentId: t.Optional(t.Numeric()),
    }),
  })
  .delete("/folders/:id", async ({ params }) => {
    return await folderService.deleteFolder(params.id);
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })

  // File Routes
  .get("/files", async () => {
    return await fileService.getAllFiles();
  })
  .get("/files/:id", async ({ params }) => {
    return await fileService.getFileById(params.id);
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/files", async ({ body }) => {
    return await fileService.createFile(body);
  }, {
    body: t.Object({
      name: t.String(),
      folderId: t.Numeric(),
    }),
  })
  .put("/files/:id", async ({ params, body }) => {
    return await fileService.updateFile(params.id, body);
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
      name: t.String(),
      folderId: t.Numeric(),
    }),
  })
  .delete("/files/:id", async ({ params }) => {
    return await fileService.deleteFile(params.id);
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  });
