import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db"
import { files as fileSchema, folders as foldersSchema } from "~/server/db/schema"

export default async function GoogleDriveClone( props: { params: Promise<{ folderId: string }>}) {
    const params = await props.params;
    console.log(params.folderId, typeof params.folderId);

    const parsedFolderId = parseInt(params.folderId);
    console.log("Parsed folder ID:", parsedFolderId, typeof parsedFolderId);
    if (isNaN(parsedFolderId)) {
        console.log("Invalid folder ID:", params.folderId);
        return <div>Invalid folder ID</div>;
    } 

    const files = await db.select().from(fileSchema).where(eq(fileSchema.parent, parsedFolderId));
    const folders = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, parsedFolderId));
    return <DriveContents files={files} folders={folders} />;
}