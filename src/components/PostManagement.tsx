"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog"; // Adjust the path as needed

interface PostSettingsProps {
  open: boolean;
  delete?: boolean; // Optional since it's not used directly as a prop condition
  onOpenChange: (open: boolean) => void;
  post: {
    title: string;
    lastEdited: Date;
    status: "Draft" | "Published";
    publishDate: "Immediately" | Date;
    author: string;
    slug: string;
    template: string;
    discussionEnabled: boolean;
  };
  onDelete: () => void;
}

export function PostSettingsSheet({ open, onOpenChange, post, onDelete }: PostSettingsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // State to toggle ConfirmDialog

  const handleDeleteClick = () => {
    setShowConfirmDialog(true); // Show ConfirmDialog when "Move to trash" is clicked
  };

  const handleConfirmDelete = () => {
    onDelete(); // Trigger the onDelete callback from parent
    setShowConfirmDialog(false); // Close ConfirmDialog
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle  className="hidden" ></DialogTitle>

        <DialogContent className="md:w-full w-[80%]  sm:max-w-md h-[80vh] max-h-[80vh] mx-auto my-auto flex flex-col justify-center items-center p-0 overflow-y-auto">
          <div className="w-full  h-full p-6 bg-white rounded-lg shadow-lg">
            <DialogHeader className="flex flex-row items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-md"
                onClick={() => onOpenChange(false)}
              >
                {/* Close icon should be added here if desired, but preserving your design */}
              </Button>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Title Section */}
              <div className="space-y-1 flex-col w-full justify-between">
                <h3 className="text-base mb-6 font-medium">Title</h3>
                <p className="text-sm text-muted-foreground">
                  Last edited: {format(post.lastEdited, "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>

              {/* Status Section */}
              <div className="space-y-1 xl:mt-[74px] flex flex-row w-full justify-between">
                <h3 className="text-base font-medium">Status</h3>
                <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                  {post.status}
                </p>
              </div>
              <Separator className="text-[#B3B3B3] bg-[#B3B3B3]" />

              {/* Publish Section */}
              <div className="space-y-1 flex flex-row w-full justify-between">
                <h3 className="text-base font-medium">Publish</h3>
                <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                  {post.publishDate === "Immediately"
                    ? "Immediately"
                    : format(post.publishDate, "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              <Separator className="text-[#B3B3B3] bg-[#B3B3B3]" />

              {/* Author Section */}
              <div className="space-y-1 flex flex-row w-full justify-between">
                <h3 className="text-base font-medium">Author</h3>
                <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                  {post.author}
                </p>
              </div>
              <Separator className="text-[#B3B3B3] bg-[#B3B3B3]" />

              {/* Slug Section */}
              <div className="space-y-1 flex flex-row w-full justify-between">
                <h3 className="text-base font-medium">Slug</h3>
                <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                  {post.slug}
                </p>
              </div>
              <Separator className="text-[#B3B3B3] bg-[#B3B3B3]" />

              {/* Template Section */}
              <div className="space-y-1 flex flex-row w-full justify-between">
                <h3 className="text-base font-medium">Template</h3>
                <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                  {post.template}
                </p>
              </div>
              <Separator className="text-[#B3B3B3] bg-[#B3B3B3]" />

              {/* Discussion Section */}
              <div className="space-y-1 flex flex-row w-full justify-between">
                <h3 className="text-base font-medium">Discussion</h3>
                <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                  {post.discussionEnabled ? "Open" : "Closed"}
                </p>
              </div>
              <Separator className="text-[#B3B3B3] bg-[#B3B3B3]" />

              {/* Delete Button */}
              <Button variant="outline" className="w-full text-[red] hover:text-[red] mt-6" onClick={handleDeleteClick}>
                Move to trash
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Render ConfirmDialog when showConfirmDialog is true */}
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmDelete}

      />
    </>
  );
}