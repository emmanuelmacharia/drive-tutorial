import { QUERIES } from "~/server/db/queries";
import DriveContents from "./drive-contents";
import { auth } from "@clerk/nextjs/server";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    console.log("Invalid folder ID:", params.folderId);
    return <div>Invalid folder ID</div>;
  }

  const folderPromise = QUERIES.getFolders(parsedFolderId);
  const filePromise = QUERIES.getFiles(parsedFolderId);
  const parentPromise = QUERIES.getAllParentsForFolder(parsedFolderId);

  const rootFolderPromise = await QUERIES.getRootFolderForUser(session.userId);

  const [folders, files, parents, rootFolder] = await Promise.all([
    folderPromise,
    filePromise,
    parentPromise,
    rootFolderPromise,
  ]);

  if (!rootFolder) {
    return <div>{`User has no root folder`}</div>; // should never happen unless they delete it
  }

  if ("error" in rootFolder) {
    return <div>{rootFolder.error}</div>;
  }

  const currentFolder = folders.find(
    (folder) => folder.parent === parsedFolderId,
  );
  if (currentFolder?.ownerId !== session.userId) {
    return <div>{`You do not have access to this folder!`}</div>; // should not have access to the folder
  }

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      rootFolderId={rootFolder.id}
      currentFolderId={parsedFolderId}
    />
  );
}
