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
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none min-h-[500px] xl:text-2xl xl:leading-8",
      },
    },
    content: "",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="flex md:flex-row flex-col-reverse  md:items-center w-full justify-between">
        <h1 className="font-bold mt-4 md:mt-0 text-[#2C2C2CCC] xl:text-2xl lg:text-xl text-opacity-70">
          | Add your story here
        </h1>
        <Toolbar editor={editor} />
      </div>
      <div className="w-full">
        <EditorContent
          editor={editor}
          placeholder="| Add your story here"
          className="xl:text-[24px] xl:leading-[32px] xl:font-bold text-black"
        />
      </div>
    </div>
  );
}