import { Elysia, t } from "elysia";
import * as folderService from "./services/folderService";
import * as fileService from "./services/fileService";

// Utility function for formatting response
const formatResponse = (status: String, message: String, data:object | unknown = []) => ({
  status,
  message,
  data,
});

export default new Elysia({ prefix: 'api/v1' })
  // Folder Routes
  .get("/folders",
    async ({ query }) => {
      try {
        const { sortBy, order, search, parentId } = query;

        const sortField = sortBy || "name";
        const sortOrder = order === "desc" ? "desc" : "asc";
        const searchQuery = search ? search.toString() : null;
        const parent = parentId ? Number(parentId) : null;

        const folders = await folderService.getAllFolders({
          sortBy: sortField,
          order: sortOrder,
          search: search,
          parentId: parent,
        });

        return formatResponse("success", "Folders retrieved successfully", folders);
      } catch (error) {
        return formatResponse("error", "Failed to retrieve folders", error);
      }
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
    try {
      const folder = await folderService.getFolderById(params.id);
      return formatResponse("success", "Folder retrieved successfully", folder);
    } catch (error) {
      return formatResponse("error", "Failed to retrieve folder", error);
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/folders", async ({ body }) => {
    try {
      const folder = await folderService.createFolder(body);
      return formatResponse("success", "Folder created successfully", folder);
    } catch (error) {
      return formatResponse("error", "Failed to create folder", error);
    }
  }, {
    body: t.Object({
      name: t.String(),
      parentId: t.Optional(t.Numeric()),
    }),
  })
  .put("/folders/:id", async ({ params, body }) => {
    try {
      const folder = await folderService.updateFolder(params.id, body);
      return formatResponse("success", "Folder updated successfully", folder);
    } catch (error) {
      return formatResponse("error", "Failed to update folder", error);
    }
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
    try {
      await folderService.deleteFolder(params.id);
      return formatResponse("success", "Folder deleted successfully");
    } catch (error) {
      return formatResponse("error", "Failed to delete folder", error);
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })

  // File Routes
  .get("/files",
    async ({ query }) => {
      try {
        const { sortBy, order, search, folderId } = query;

        const sortField = sortBy || "name";
        const sortOrder = order === "desc" ? "desc" : "asc";
        const searchQuery = search ? search.toString() : null;
        const folder = folderId ? Number(folderId) : null;

        const files = await fileService.getAllFiles({
          sortBy: sortField,
          order: sortOrder,
          search: searchQuery,
          folderId: folder,
        });

        return formatResponse("success", "Files retrieved successfully", files);
      } catch (error) {
        return formatResponse("error", "Failed to retrieve files", error);
      }
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
    try {
      const file = await fileService.getFileById(params.id);
      return formatResponse("success", "File retrieved successfully", file);
    } catch (error) {
      return formatResponse("error", "Failed to retrieve file", error);
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/files", async ({ body }) => {
    try {
      const file = await fileService.createFile(body);
      return formatResponse("success", "File created successfully", file);
    } catch (error) {
      return formatResponse("error", "Failed to create file", error);
    }
  }, {
    body: t.Object({
      name: t.String(),
      folderId: t.Numeric(),
      type: t.String(),
    }),
  })
  .put("/files/:id", async ({ params, body }) => {
    try {
      const file = await fileService.updateFile(params.id, body);
      return formatResponse("success", "File updated successfully", file);
    } catch (error) {
      return formatResponse("error", "Failed to update file", error);
    }
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
    try {
      await fileService.deleteFile(params.id);
      return formatResponse("success", "File deleted successfully");
    } catch (error) {
      return formatResponse("error", "Failed to delete file", error);
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

  