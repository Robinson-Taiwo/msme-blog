"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import pencil from "@/components/images/pencil.svg";
import like from "@/components/images/like.svg";
import eye from "@/components/images/view.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface StoryCardProps {
  blogId: number | string ; // Added for blog-specific actions
  category: string;
  date: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  stats: {
    likes: string;
    comments: string;
    views: string | number ;
    
  };
  onEdit?: () => void;
}

export function StoryCard({ blogId,  category, date, title, content, author, stats, onEdit }: StoryCardProps) {
  const [comment, setComment] = useState("");
  const [token, setToken] = useState<string>("");
  const [likes, setLikes] = useState(stats.likes);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLike = async () => {
    if (!token) {
      alert("Please log in to like a post.");
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post(`/api/blog/${blogId}/like`, null, {
        headers: { token },
      });
      console.log("Blog liked:", response.data);
      setLikes((prev) => (parseInt(prev) + 1).toString()); // Increment likes
    } catch (error) {
      const axiosError = error as AxiosError | Error; // Match LoginPage style
      console.error("Error liking blog:", axiosError);
      if ((axiosError as AxiosError).response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  const handleComment = async () => {
    if (!token) {
      alert("Please log in to comment.");
      router.push("/login");
      return;
    }

    if (!comment) {
      alert("Please enter a comment.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/blog/comment/${blogId}`,
        { content: comment },
        { headers: { token } }
      );
      console.log("Comment added:", response.data);
      setComment("");
      // Optionally update comments count
    } catch (error) {
      const axiosError = error as AxiosError | Error; // Match LoginPage style
      console.error("Error adding comment:", axiosError);
      if ((axiosError as AxiosError).response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  return (
    <div className="bg-white border border-[#D9D9D9] rounded-[20px] p-4 mb-4 xl:pl-[50.29px] xl:pr-[29.8px] xl:pt-[32px] lg:w-full lg:pl-[35px] lg:pr-[20px] lg:pt-[22px]">
      {/* Category and Date */}
      <div className="flex justify-between mb-5 text-gray-400 xl:text-6 lg:text-sm xl:text-[#B3B3B3] lg:text-gray-500">
        <span>{category}</span>
        <span className="font-medium xl:text-5 lg:text-xs xl:text-[#2C2C2C] lg:text-gray-700">{date}</span>
      </div>

      <div className="flex flex-col">
        {/* Title */}
        <h3 className="uppercase text-gray-800 mb-[21px] xl:text-[34px] lg:text-[28px] xl:text-[#2C2C2C] lg:text-gray-800 font-bold">{title}</h3>

        {/* Content */}
        <p className="mb-[30px] xl:text-6 xl:font-semibold xl:text-[#B3B3B3] lg:text-sm lg:font-normal lg:text-gray-600">{content}</p>
      </div>

      <div className="border-t border-t-[#B3B3B3] mb-[32px]"></div>

      {/* Author and Stats */}
      <div className="flex items-center justify-between">
        {/* Author */}
        <div className="flex items-center">
          <Avatar className="xl:h-[40px] xl:w-[40px] lg:h-[32px] lg:w-[32px]">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="xl:text-2xl xl:font-medium xl:text-[#2C2C2C] lg:text-xl lg:font-medium lg:text-gray-800">{author.name}</span>
        </div>

        {/* Actions and Stats */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent xl:font-medium xl:text-5 lg:font-medium lg:text-sm xl:text-[#2C2C2C] lg:text-gray-700"
            onClick={onEdit}
          >
            <Image src={pencil} alt="Edit icon" className="xl:h-6 xl:w-6 lg:h-5 lg:w-5" />
          </Button>
          <div className="flex items-center gap-1">
            <Image src={eye} alt="Views icon" className="xl:h-6 xl:w-6 lg:h-5 lg:w-5" />
            <span className="xl:font-medium xl:text-5 xl:text-[#2C2C2C] lg:font-medium lg:text-sm lg:text-gray-700">{stats.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={like} alt="Likes icon" className="xl:h-6 xl:w-6 lg:h-5 lg:w-5" onClick={handleLike} />
            <span className="xl:font-medium xl:text-5 xl:text-[#2C2C2C] lg:font-medium lg:text-sm lg:text-gray-700">{stats.likes}</span>
          </div>
        </div>
      </div>


    </div>
  );
}