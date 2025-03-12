"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Heart, MessageSquare } from "lucide-react"

interface StoryCardProps {
  category: string
  date: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  stats: {
    likes: string
    comments: string
  }
  onEdit?: () => void
}

export function StoryCard({ category, date, title, content, author, stats, onEdit }: StoryCardProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      {/* Category and Date */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{category}</span>
        <span>{date}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold uppercase mb-2">{title}</h3>

      {/* Content */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{content}</p>

      {/* Author and Stats */}
      <div className="flex items-center justify-between">
        {/* Author */}
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{author.name}</span>
        </div>

        {/* Actions and Stats */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent" onClick={onEdit}>
            <Edit className="h-4 w-4 text-gray-500" />
          </Button>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-500">{stats.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-500">{stats.comments}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

