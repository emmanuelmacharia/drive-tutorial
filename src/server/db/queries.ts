import 'server-only';

import { eq } from "drizzle-orm";
import { db } from ".";
import { files_table as fileSchema, folders_table as foldersSchema } from "~/server/db/schema"

export const QUERIES = {
    getAllParentsForFolder: async function (folderId: number) {
        const parents = [];
        let currentId: number | null = folderId;
        while (currentId !== null && currentId !== 1) {
            const folder  =await db
                .selectDistinct()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentId));
    
            if (folder.length === 0) {
                throw new Error(`Folder with ID ${currentId} not found`);
            }
            parents.unshift(folder[0]);
            currentId = folder[0]?.parent ?? null;
        }
        return parents;
    },
    
    getFiles: async function (folderId: number) {
       const filePromise =  await db.select().from(fileSchema).where(eq(fileSchema.parent, folderId));
       return filePromise
    },
    
    getFolders: async function (folderId: number) {
        const foldersPromise = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, folderId));
        return foldersPromise
    }
}
