"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface HelpfulFeedbackProps {
  className?: string
}

export function HelpfulFeedback({ className }: HelpfulFeedbackProps) {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null)

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-gray-900">Was this helpful?</p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className={cn("w-16", feedback === "yes" && "bg-gray-100")}
          onClick={() => setFeedback("yes")}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Yes
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={cn("w-16", feedback === "no" && "bg-gray-100")}
          onClick={() => setFeedback("no")}
        >
          <ThumbsDown className="h-4 w-4 mr-2" />
          No
        </Button>
      </div>
    </div>
  )
}

