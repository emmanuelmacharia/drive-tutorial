"use client";

import { useMemo, useState } from "react";
import { Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
}) {
  const { files, folders, parents } = props;

  console.log(
    parents,
    parents.map((folder) => ({ name: folder.name, id: folder.id })),
  );

  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/folder/1"} className="mr-2 text-gray-300">
              My Drive
            </Link>
            {parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link href={`/folder/${folder.id}`} className="text-gray-300">
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          {/* <Button onClick={handleUpload} className="bg-blue-600 text-white hover:bg-blue-700">
            <Upload className="mr-2" size={20} />
            Upload
          </Button> */}
          <SignedOut>
            <SignInButton />
            {/* <SignUpButton /> */}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
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
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={() => navigate.refresh()}
        />
      </div>
    </div>
  );
}
