import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/db/actions";
import type { files_table, folders_table } from "~/server/db/schema";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;

  const getFileSizes = (size: number) => {
    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;
    const TB = GB * 1024;

    if (size < 1024) return `${size} B`;
    if (size > KB && size < MB) return `${(size / KB).toFixed(2)} KB`;
    if (size > MB && size < GB) return `${(size / MB).toFixed(2)} MB`;
    if (size > GB && size < TB) return `${(size / GB).toFixed(2)} GB`;
    if (size > TB) return `${(size / TB).toFixed(2)} TB`;
  };

  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400"> File </div>{" "}
        {/* TODO: add file type */}
        <div className="col-span-3 text-gray-400">
          {getFileSizes(file.size)}
        </div>
        <div className="col-span-1 text-gray-400">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteFile(file.id)}
            aria-label="Delete file"
          >
            <Trash2Icon size={16} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/folder/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400"> Folder </div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
