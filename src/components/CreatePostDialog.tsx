"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HelpfulFeedback } from "./HelpfulFeedback"

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[90%] md:w-full ">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle className="text-xl font-semibold">Create a Post</DialogTitle>
        
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-600">
            Clicking that Publish button is a proud moment — you&apos;ve finessed a piece of content and are ready to share
            it with the world! Before the post goes live, you will have one more chance to double-check your settings
            before publishing.
          </p>

          <HelpfulFeedback className="mt-6 pt-6 border-t" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

