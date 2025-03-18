"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Toolbar } from "./toolbar";

export function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-sm:prose-xs sm:prose-sm md:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none min-h-[500px] max-sm:min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[450px] xl:text-2xl xl:leading-8",
      },
    },
    content: "",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-[500px] max-sm:min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
      <div className="flex flex-row items-center w-full justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2 sm:flex-row sm:gap-4">
        <h1 className="font-bold text-[#2C2C2CCC] xl:text-2xl max-sm:text-sm sm:text-base md:text-lg lg:text-xl text-opacity-70">
          | Add your story here
        </h1>
        <Toolbar editor={editor} />
      </div>
      <div className="w-full">
        <EditorContent
          editor={editor}
          placeholder="| Add your story here"
          className="xl:text-[24px] xl:leading-[32px] xl:font-bold max-sm:text-sm sm:text-base md:text-lg lg:text-xl text-black"
        />
      </div>
    </div>
  );
}