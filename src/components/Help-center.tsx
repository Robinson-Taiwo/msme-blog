"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {  FileText, BookOpen, } from "lucide-react"
import { BlogSetupDialog } from "./BlogSetup"
import { CreatePostDialog } from "./CreatePostDialog"
import { SupportDialog } from "./Support-dialog"


interface HelpCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpCenter({ open, onOpenChange }: HelpCenterProps) {
  const [showBlogSetup, setShowBlogSetup] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showSupport, setShowSupport] = useState(false)


  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]  w-[90%] md:w-full ">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <DialogTitle className="text-xl font-semibold">Help Center</DialogTitle>
           
          </DialogHeader>

          <div className="py-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Recommend Resources</h3>

            <div className="space-y-3">
              <button
                onClick={() => {
                  onOpenChange(false)
                  setShowBlogSetup(true)
                }}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <BookOpen className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Set up your blog in 3 steps</span>
              </button>

              <button
                onClick={() => {
                  onOpenChange(false)
                  setShowCreatePost(true)
                }}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <FileText className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Create a Post</span>
              </button>

            
            </div>

            <div className="mt-6 pt-6 border-t">
            <button
                onClick={() => {
                  onOpenChange(false)
                  setShowSupport(true)
                }}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-900"
              >
                Still need help?
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BlogSetupDialog open={showBlogSetup} onOpenChange={setShowBlogSetup} />
      <CreatePostDialog open={showCreatePost} onOpenChange={setShowCreatePost} />
      <SupportDialog open={showSupport} onOpenChange={setShowSupport} />

    </>
  )
}

