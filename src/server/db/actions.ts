"use server";

import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import {
  files_table as fileSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { MUTATIONS } from "./queries";
const utApi = new UTApi();

const forceRefesh = async () => {
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));
};

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const [file] = await db
    .select()
    .from(fileSchema)
    .where(
      and(eq(fileSchema.id, fileId), eq(fileSchema.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found" };
  }

  const utApiResult = await utApi.deleteFiles([
    file.url.replace("https://utfs.io/f/", ""),
  ]);

  if (!utApiResult.success) {
    return { error: "Failed deleting file from Uploadthing" };
  }

  await db.delete(fileSchema).where(eq(fileSchema.id, fileId));

  await forceRefesh();

  return { success: true };
}

export async function createFolder(input: { name: string; parentId: number }) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const newFolder = await MUTATIONS.createFolder({
    name: input.name,
    parentId: input.parentId,
    userId: session.userId,
  });

  if (!newFolder) {
    return { error: "Failed to create folder" };
  }

  await forceRefesh();
}
