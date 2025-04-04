import "server-only";

import { eq, and, isNull } from "drizzle-orm";
import { db } from ".";
import {
  DB_FileType,
  files_table as fileSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null && currentId !== 1) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error(`Folder with ID ${currentId} not found`);
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent ?? null;
    }
    return parents;
  },

  getFiles: async function (folderId: number) {
    const filePromise = await db
      .select()
      .from(fileSchema)
      .where(eq(fileSchema.parent, folderId))
      .orderBy(fileSchema.createdAt);
    return filePromise;
  },

  getFolders: async function (folderId: number) {
    const foldersPromise = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(foldersSchema.createdAt);
    return foldersPromise;
  },
  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    if (!folder[0]) {
      throw new Error(`Folder with ID ${folderId} not found`);
    }
    return folder[0];
  },

  getRootFolderForUser: async function (userId: string) {
    // get the root folder for the user
    if (!userId) {
      return { error: "Unauthorized" };
    }
    const rootFolder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
      );
    return rootFolder[0];
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
      ownerId: string;
    };
    userId: string;
  }) {
    if (!input.userId) throw new Error("Unauthorized");
    return await db.insert(fileSchema).values(input.file);
  },

  createFolder: async function (input: {
    name: string;
    parentId: number | null;
    userId: string;
  }) {
    const { name, parentId, userId } = input;
    if (!userId) throw new Error("Unauthorized");
    return await db.insert(foldersSchema).values({
      name,
      parent: parentId,
      ownerId: userId,
    });
  },

  onboardUser: async function (userId: string) {
    const isExistingUser = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.ownerId, userId))
      .limit(1);
    if (isExistingUser[0]) {
      return { error: "User already exists" };
    }
    const rootFolder = await db
      .insert(foldersSchema)
      .values({
        name: "Root",
        parent: null,
        ownerId: userId,
      })
      .$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(foldersSchema).values([
      {
        name: "Shared",
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: "Favourites",
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: "Documents",
        parent: rootFolderId,
        ownerId: userId,
      },
    ]);

    return rootFolderId;
  },
};
