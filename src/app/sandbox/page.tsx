import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
    return <div className="flex flex-col gap-4">
        Seed function

        <form className="flex gap-4" action={
            async () => {
               "use server";
                const folderValues = mockFolders.map((folder, index) => ({
                    id: index + 1,
                    name: folder.name,
                    parent: index !== 0 ? 1 : null
                }));
                const fileValues = mockFiles.map((file, index) => ({
                    id: index + 1,
                    name: file.name,
                    parent: (index % 3) + 1, // modify if you need to
                    size: file.size,
                    url: file.url
                }));

                console.log("Folder Insert Values:", folderValues);
                console.log("File Insert Values:", fileValues);

                const folderInsert =  db.insert(folders).values(folderValues).toSQL();
                const fileInsert = db.insert(files).values(fileValues).toSQL();
                console.log(folderInsert, fileInsert);

            }
        }>
            <button type="submit" className="btn">Seed</button>

        </form>

    </div>
}