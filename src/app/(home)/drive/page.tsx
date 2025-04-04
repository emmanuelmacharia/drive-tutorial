import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (typeof rootFolder === "object" && "error" in rootFolder) {
    // Handle error case, e.g., show a message to the user
    console.error("Error fetching root folder:", rootFolder.error);
    return (
      <>
        <div>Error fetching root folder</div>
      </>
    );
  }

  if (!rootFolder) {
    // create the root folder for the user
    return (
      <>
        <form
          action={async () => {
            "use server";
            const session = await auth();
            if (!session.userId) {
              return redirect("/sign-in");
            }

            const rootFolderId = await MUTATIONS.onboardUser(session.userId);
            if (typeof rootFolderId === "object" && "error" in rootFolderId) {
              // Handle error case, e.g., show a message to the user
              console.error("Error creating root folder:", rootFolderId.error);
              return;
            }
            return redirect(`/folder/${rootFolderId}`);
          }}
        >
          <Button> Create New Drive</Button>
        </form>
      </>
    );
  }

  return redirect(`/folder/${rootFolder.id}`);
}
