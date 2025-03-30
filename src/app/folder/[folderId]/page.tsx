import DriveContents from "~/app/drive-contents";
import {QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone( props: { params: Promise<{ folderId: string }>}) {
    const params = await props.params;
    console.log(params.folderId, typeof params.folderId);

    const parsedFolderId = parseInt(params.folderId);
    console.log("Parsed folder ID:", parsedFolderId, typeof parsedFolderId);
    if (isNaN(parsedFolderId)) {
        console.log("Invalid folder ID:", params.folderId);
        return <div>Invalid folder ID</div>;
    } 

    const folderPromise = QUERIES.getFolders(parsedFolderId);
    const filePromise = QUERIES.getFiles(parsedFolderId);
    const parentPromise = QUERIES.getAllParentsForFolder(parsedFolderId);
    
    const [folders, files, parents] = await Promise.all([
            folderPromise, 
            filePromise, 
            parentPromise
        ]);
    return <DriveContents files={files} folders={folders}  parents={parents}/>;
}