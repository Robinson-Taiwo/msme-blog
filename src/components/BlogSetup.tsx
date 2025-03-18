"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HelpfulFeedback } from "./HelpfulFeedback"

interface BlogSetupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BlogSetupDialog({ open, onOpenChange }: BlogSetupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[90%] md:w-full h-[95%] ">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle className="text-xl font-semibold">Set up your blog in 3 steps</DialogTitle>
         
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Step 1: Choose your Identity</h3>
              <p className="text-sm text-gray-600">
                Visit icanwrite.com and click on{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Get Started
                </a>{" "}
                to create your new account in a few quick steps.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Step 2: Write Your First Post</h3>
              <p className="text-sm text-gray-600">
                Now it&apos;s time to flex those writing muscles! From your dashboard, click on start to write and start
                drafting your first introduction to the world. In your post, tell people who you are and what your blog
                will be about, and ask them to join you on this new journey.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Step 3: Display Your Posts</h3>
              <p className="text-sm text-gray-600">
                Now that you have published your first post, it&lsquo;s time to think about how to present your writing on
                your blog. You can choose to add designs to your post from your computer and then change, add, or remove
                any elements.
              </p>
            </div>
          </div>

          <HelpfulFeedback className="mt-6 pt-6 border-t" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

