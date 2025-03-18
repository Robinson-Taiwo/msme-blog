"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import avatar from "@/components/images/avatar.png"
import Image from "next/image"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface SupportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupportDialog({ open, onOpenChange }: SupportDialogProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Howdy, I'm icanwrites.com's support assistant. I can help with questions about your site or account.",
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: "Thank you for your message. Our team will get back to you shortly.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] xl:pl-[27px] xl:pr-[48px] xl:max-h-[618px] xl:max-w-[703px]   p-0">
        <DialogHeader className="p-4 xl:pt-[39px]  border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Support Assistance</DialogTitle>
          
          </div>
        
        </DialogHeader>

          <div className="text-xs text-center text-gray-500 mt-2">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>

        <div className="flex-1 p-4   space-y-4 min-h-[300px]  max-h-[400px]  overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex border border-black border-opacity-10 border-[0.5px] xl:w-[549px] xl:h-[139px]  items-center justify-center rounded-lg gap-3 ${msg.isUser ? "flex-row-reverse" : ""}`}>
              {!msg.isUser && (
               <Image  src={avatar}  className=" xl:h-[40px] xl:w-[40px] "  alt="support" />
              )}
              <div
                className={`rounded-lg  p-3 xl:w-full max-w-[80%] ${
                  msg.isUser ? "bg-black text-white" : " text-gray-900"
                }`}
              >
                <p className="text-sm xl:text-base ">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-t-[#B3B3B3] ">
          <div className="flex items-center flex-row gap-2">
            <Input
              placeholder="Type your message....."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 outline-0 xl:h-[72px]  focus:outline-0 focus:border-none "
            />
            <Button size="icon" variant="outline" onClick={handleSendMessage} className="shrink-0 items-center justify-center flex h-full xl:w-[69px] rounded-md xl:h-[72px]  ">
              <Send className="xl:h-[19px] xl:w-[19px] h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

