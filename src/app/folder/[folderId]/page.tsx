import DriveContents from "~/app/drive-contents";
import { getAllParentsForFolder, getFiles, getFolders } from "~/server/db/queries";

export default async function GoogleDriveClone( props: { params: Promise<{ folderId: string }>}) {
    const params = await props.params;
    console.log(params.folderId, typeof params.folderId);

    const parsedFolderId = parseInt(params.folderId);
    console.log("Parsed folder ID:", parsedFolderId, typeof parsedFolderId);
    if (isNaN(parsedFolderId)) {
        console.log("Invalid folder ID:", params.folderId);
        return <div>Invalid folder ID</div>;
    } 

    const folderPromise = getFolders(parsedFolderId);
    const filePromise = getFiles(parsedFolderId);
    const parentPromise = getAllParentsForFolder(parsedFolderId);

    const [folders, files, parents] = await Promise.all([folderPromise, filePromise, parentPromise]);
    return <DriveContents files={files} folders={folders}  parents={parents}/>;
}