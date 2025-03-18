"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
 
  onConfirm: () => void;
}

export function ConfirmDialog({ open, onOpenChange, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]  w-[90%] md:w-full  p-0">
        <div className="p-6">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-0">
            <DialogTitle className="text-xl font-semibold">Move to trash</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 hover:bg-transparent"
              onClick={() => onOpenChange(false)}
            >
            </Button>
          </DialogHeader>
          <p className="text-sm text-gray-500 mt-4">Are you sure you want to move to trash?</p>
          <div className="mt-6">
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}