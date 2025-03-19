"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Toolbar } from "./toolbar";

// Explicitly import and register the List module
import List from "quill/formats/list";
Quill.register("formats/list", List);

// Wrap Editor with forwardRef to accept a ref from EditorPage
const Editor = forwardRef((props, ref) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !editorInstance.current) {
      editorInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: false, // Custom toolbar
        },
        formats: ["header", "bold", "italic", "list", "image", "blockquote"],
        placeholder: "",
      });
    }

    // Cleanup on unmount
    return () => {
      if (editorInstance.current) {
        editorInstance.current.off("text-change");
      }
    };
  }, []);

  // Expose getContent method via the ref
  useImperativeHandle(ref, () => ({
    getContent: () => {
      return editorInstance.current ? editorInstance.current.root.innerHTML : "";
    },
  }));

  const handleImageUpload = (isGallery: boolean = false) => {
    const quill = editorInstance.current;
    if (!quill) return;

    const range = quill.getSelection() || quill.getSelection(true);
    if (!range) {
      quill.focus();
      return;
    }

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", isGallery ? "true" : "false");
    input.click();

    input.onchange = () => {
      const files = input.files;
      if (!files) return;

      Array.from(files).forEach((file) => {
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target?.result as string;
          if (base64Image) {
            quill.insertEmbed(range.index, "image", base64Image);
            quill.setSelection(range.index + 1, 0);
          }
        };
        reader.readAsDataURL(file);
      });
    };
  };

  const handleFormatText = (format: string) => {
    const quill = editorInstance.current;
    if (!quill) return;

    const range = quill.getSelection();
    if (!range) {
      quill.focus();
      return;
    }

    switch (format) {
      case "paragraph":
        quill.removeFormat(range.index, range.length);
        break;
      case "image":
        handleImageUpload(false); // Single image upload
        break;
      case "heading":
        const currentHeader = quill.getFormat(range).header;
        quill.format("header", currentHeader === 2 ? false : 2);
        break;
      case "gallery":
        handleImageUpload(true); // Multiple image upload
        break;
      case "list":
        const currentList = quill.getFormat(range).list;
        quill.format("list", currentList === "bullet" ? false : "bullet");
        break;
      case "quote":
        const currentBlockquote = quill.getFormat(range).blockquote;
        quill.format("blockquote", !currentBlockquote);
        break;
      default:
        console.log(`Unknown format: ${format}`);
    }
  };

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="flex md:flex-row flex-col-reverse md:items-center w-full justify-between">
        <h1 className="font-bold mt-4 md:mt-0 text-[#2C2C2CCC] xl:text-2xl lg:text-xl text-opacity-70">
          | Add your story here
        </h1>
        <Toolbar onFormatText={handleFormatText} />
      </div>
      <div className="w-full">
        <div
          ref={quillRef}
          className="xl:text-[24px] xl:leading-[32px] xl:font-bold text-black prose prose-sm sm:prose lg:prose-2xl border-none outline-none max-w-none min-h-[500px]"
        />
      </div>
    </div>
  );
});

// Set displayName to satisfy ESLint's react/display-name rule
Editor.displayName = "Editor";

export default Editor;