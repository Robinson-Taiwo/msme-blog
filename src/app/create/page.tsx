"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Editor from "@/components/editor/editor";
import { ArrowLeft, Settings, HelpCircle } from "lucide-react";
import { PostSettingsSheet } from "@/components/PostManagement";
import { HelpCenter } from "@/components/Help-center";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [token, setToken] = useState<string>("");
  const editorRef = useRef<{ getContent: () => string }>(null); // Type the ref
  const router = useRouter();

  // Check for token on mount and redirect if none exists
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token") || localStorage.getItem("token");
    console.log("Stored token (from sessionStorage or localStorage):", storedToken);
    if (!storedToken) {
      console.log("No token found in sessionStorage or localStorage, redirecting to /login");
      router.push("/login");
      return;
    }
    setToken(storedToken);
  }, [router]);

  const postData = {
    title: "Sample Blog Post",
    lastEdited: new Date("2025-03-13T08:00:00Z"),
    status: "Draft" as const,
    publishDate: "Immediately" as const,
    author: "Ali Ayub",
    slug: "sample-post-21",
    template: "Single post",
    discussionEnabled: true,
  };

  const handleDelete = () => {
    console.log("Post moved to trash");
    setIsDelete(true);
    setIsSettingsOpen(false);
  };

  const handlePublish = async () => {
    if (!editorRef.current || !token) return;

    const content = editorRef.current.getContent();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    const apiUrl = "/api/blog/create"; // Use the internal rewrite path

    try {
      console.log("Creating blog with token:", token);
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "token": token, // Use the fetched token
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Blog created successfully:", response.data);
      router.push("/"); // Redirect to homepage after success
    } catch (error) {
      const axiosError = error as AxiosError | Error;
      console.error("Error creating blog:", axiosError.message);
      if ((axiosError as AxiosError).response) {
        console.error("Error response:", (axiosError as AxiosError).response?.data);
        if ((axiosError as AxiosError).response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          sessionStorage.removeItem("token");
          localStorage.removeItem("token");
          router.push("/login");
        }
      } else {
        console.error("Network or other error:", axiosError.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-black xl:pl-[162px] xl:pr-[145px] xl:py-[35px] h-12 px-4 flex items-center justify-between fixed top-0 w-full z-50">
        <div className="text-white text-lg xl:text-[32px] xl:font-bold font-medium">icanwrite.</div>
        <Input
          type="text"
          placeholder="TITLE"
          className="max-w-[200px] sm:max-w-[300px] bg-gray-800 border-none text-white h-8 xl:h-[42px] xl:max-w-[263px] text-sm rounded-md placeholder:text-gray-400"
        />
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-5 w-5 xl:h-6 xl:w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setShowHelp(!showHelp)}>
            <HelpCircle className="h-5 w-5 xl:h-6 xl:w-6" />
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <div className="max-w-screen-xl xl:max-w-[1419px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Link>
          </div>

          <div className="space-y-8">
            <Input
              type="text"
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl sm:text-3xl font-medium border-[#0000001A] border-opacity-10 border-[0.5px] xl:py-[40px] lg:px-6 lg:py-7 px-0 placeholder:text-[#2C2C2CCC] text-opacity-80 rounded-none focus-visible:ring-0"
            />

            <div className="w-full flex-col border-[0.5px] border-[#0000001A] border-opacity-10 flex">
              <div className="bg-gray-50 rounded-lg xl:h-full lg:h-full p-6">
                <Editor ref={editorRef} />
              </div>
              <div className="flex justify-end px-6 py-4">
                <Button onClick={handlePublish} className="bg-gray-900 text-white hover:bg-gray-800">
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <HelpCenter open={showHelp} onOpenChange={setShowHelp} />
      <PostSettingsSheet
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        post={postData}
        onDelete={handleDelete}
        delete={isDelete}
      />
    </div>
  );
}