import { FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function FolderNameInput(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (folderName: string) => void;
}) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit(folderName);
    setFolderName("");
    props.onOpenChange(false);
  };
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a folder</DialogTitle>
            <DialogDescription>
              Create a folder in this directory
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Folder Name
              </Label>
              <Input
                id="name"
                type="text"
                onChange={(e) => setFolderName(e.target.value)}
                value={folderName}
                placeholder="Enter the name of the folder you want to create"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              className="mb-1 bg-gray-800"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
