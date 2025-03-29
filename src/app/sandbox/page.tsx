import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
    return <div className="flex flex-col gap-4">
        Seed function

        <form className="flex gap-4" action={
            async () => {
               "use server";
                const folderInsert = await db.insert(folders).values(
                    mockFolders.map(
                    (folder, index) => ({
                    id: index + 1,
                    name: folder.name,
                    parent: index !== 0 ? 1 : null
                })));
                const fileInsert = await db.insert(files).values(
                    mockFiles.map((file, index) => ({
                    id: index + 1,
                    name: file.name,
                    parent: (index % 3) + 1, // modify if you need to
                    size: file.size,
                    url: file.url
                })));
                console.log("Inserted folders:", folderInsert);
                console.log("Inserted files:", fileInsert);
            }
        }>
            <button type="submit" className="btn">Seed</button>

        </form>

    </div>
}