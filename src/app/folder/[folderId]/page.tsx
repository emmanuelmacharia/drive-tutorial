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

    async function getAllParent(folderId: number) {
        const parents = [];
        let currentId: number | null = folderId;
        console.log(folderId)
        while (currentId !== null && currentId !== 1) {
            const folder  =await db
                .selectDistinct()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentId));

            if (folder.length === 0) {
                throw new Error(`Folder with ID ${currentId} not found`);
            }
            parents.push(folder[0]);
            currentId = folder[0]?.parent ?? null;
        }
        return parents;
    }

    const filesPormise = await db.select().from(fileSchema).where(eq(fileSchema.parent, parsedFolderId));
    const foldersPromise = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, parsedFolderId));
    const parentsPromise = getAllParent(parsedFolderId);

    const [folders, files, parents] = await Promise.all([foldersPromise, filesPormise, parentsPromise]);
    return <DriveContents files={files} folders={folders}  parents={parents}/>;
}