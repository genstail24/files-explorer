import { Elysia, t } from "elysia";
import * as folderService from "./services/folderService";
import * as fileService from "./services/fileService";

export default new Elysia()
  .group('/api/v1', (app) =>
    app
      // Folder Routes
      .get("/folders",
        async ({ query }) => {
          const { sortBy, order, search, parentId } = query;

          const sortField = sortBy || "name";
          const sortOrder = order === "desc" ? "desc" : "asc";
          const searchQuery = search ? search.toString() : null;
          const parent = parentId ? Number(parentId) : null;

          return await folderService.getAllFolders({
            sortBy: sortField,
            order: sortOrder,
            search: searchQuery,
            parentId: parent,
          });
        },
        {
          query: t.Object({
            sortBy: t.Optional(t.String()),
            order: t.Optional(t.String()),
            search: t.Optional(t.String()),
            parentId: t.Optional(t.Numeric()),
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
      .get("/files",
        async ({ query }) => {
          const { sortBy, order, search, folderId } = query;

          const sortField = sortBy || "name";
          const sortOrder = order === "desc" ? "desc" : "asc";
          const searchQuery = search ? search.toString() : null;
          const folder = folderId ? Number(folderId) : null;

          return await fileService.getAllFiles({
            sortBy: sortField,
            order: sortOrder,
            search: searchQuery,
            folderId: folder,
          });
        },
        {
          query: t.Object({
            sortBy: t.Optional(t.String()),
            order: t.Optional(t.String()),
            search: t.Optional(t.String()),
            folderId: t.Optional(t.Numeric()),
          }),
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
          type: t.String(),
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
          type: t.String(),
        }),
      })
      .delete("/files/:id", async ({ params }) => {
        return await fileService.deleteFile(params.id);
      }, {
        params: t.Object({
          id: t.Numeric(),
        }),
      })
  );
