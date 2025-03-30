import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed function
      <form
        className="flex gap-4"
        action={async () => {
          "use server";
          const user = await auth();

          if (!user.userId) {
            throw new Error("User not authenticated");
          }

          //   const rootFolder = await db
          //     .insert(folders_table)
          //     .values({
          //       id: 1,
          //       name: "root",
          //       parent: null,
          //       ownerId: user.userId,
          //     })
          //     .$returningId();

          //   const folderInsert = await db.insert(folders_table).values(
          //     mockFolders.map((folder, index) => ({
          //       id: index + 2, // root folder id is 1
          //       name: folder.name,
          //       parent: rootFolder[0]!.id, // use the root folder id as parent
          //       ownerId: user.userId,
          //     })),
          //   );
          //   const fileInsert = await db.insert(files_table).values(
          //     mockFiles.map((file, index) => ({
          //       id: index + 1,
          //       name: file.name,
          //       parent: (index % 3) + 1, // modify if you need to
          //       size: file.size,
          //       url: file.url,
          //       ownerId: user.userId,
          //     })),
          //   //   );
          //   console.log("Inserted folders:", folderInsert);
          //   console.log("Inserted files:", fileInsert);
        }}
      >
        <button type="submit" className="btn">
          Seed
        </button>
      </form>
    </div>
  );
}
