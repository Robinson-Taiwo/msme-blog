"use client";

import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Type, ImageIcon, Heading, LayoutGrid, List, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | null;
}

interface ToolbarButton {
  icon: typeof Type;
  label: string;
  action: () => void;
  isActive?: boolean;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  const buttons: ToolbarButton[] = [
    {
      icon: Type,
      label: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
    },
    {
      icon: ImageIcon,
      label: "Image",
      action: () => {
        const url = window.prompt("Enter image URL");
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      },
    },
    {
      icon: Heading,
      label: "Headings",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: LayoutGrid,
      label: "Gallery",
      action: () => {
        /* Implement gallery logic */
      },
    },
    {
      icon: List,
      label: "Lists",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: Quote,
      label: "Quotes",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
  ];

  return (
    <div className="flex flex-row gap-4 max-sm:gap-1 sm:gap-2 md:gap-3 lg:gap-4 max-sm:flex-wrap">
      {buttons.map((button, index) => (
        <div key={index} className="flex flex-col items-center gap-1 max-sm:gap-0.5 sm:gap-1 md:gap-1 lg:gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={button.action}
            className={cn(
              "h-10 w-10 max-sm:h-8 max-sm:w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-24 xl:w-24 rounded-lg",
              button.isActive && "bg-gray-100"
            )}
          >
            <button.icon className="h-5 w-5 max-sm:h-4 max-sm:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
          </Button>
          <span className="text-xs max-sm:text-[10px] sm:text-xs md:text-sm lg:text-sm text-gray-500">{button.label}</span>
        </div>
      ))}
    </div>
  );
};