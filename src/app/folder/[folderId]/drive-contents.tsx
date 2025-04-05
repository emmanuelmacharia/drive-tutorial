"use client";

import { ChevronRight, FolderPlus } from "lucide-react";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { FileRow, FolderRow } from "./file-row";
import { Button } from "~/components/ui/button";
import { createFolder } from "~/server/db/actions";
import { useState } from "react";
import { FolderNameInput } from "../folder-name-input";
import { toast } from "sonner";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
  rootFolderId: number;
}) {
  const navigate = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateFolder = async (folderName: string) => {
    const created = await createFolder({
      name: folderName,
      parentId: props.currentFolderId,
    });
    if (created.error) {
      toast.error(created.error);
      return;
    }
    toast.success("Folder created successfully");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/folder/${props.rootFolderId}`}
              className="mr-2 text-gray-300"
            >
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link href={`/folder/${folder.id}`} className="text-gray-300">
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="mb-5 flex flex-row gap-5">
          <div className="">
            <Button
              variant="outline"
              className="mb-1 bg-gray-800"
              onClick={() => {
                setDialogOpen(true);
                console.log("clicked");
              }}
            >
              <span>
                <FolderPlus />
              </span>
              Create Folder
            </Button>
            <p className="text-xs text-gray-400 opacity-20">
              Organize your files
            </p>
          </div>
          <FolderNameInput
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSubmit={handleCreateFolder}
          />

          <UploadButton
            endpoint="driveUploader"
            input={{ folderId: props.currentFolderId }}
            onClientUploadComplete={() => navigate.refresh()}
          />
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
