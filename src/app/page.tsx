"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import bell from "@/components/images/bell.svg";
import arrow from "@/components/images/arrow.svg";
import avatar from "@/components/images/Avatars.svg";
import logout from "@/components/images/logout-02.svg";
import Image from "next/image";
import { StoryCard } from "@/components/StoryCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ProfileDialog } from "@/components/Profile-dialog";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface Blog {
  id: string | number;
  category?: string;
  createdAt: string | Date;
  title: string;
  content: string;
  author: string;
  likeCount?: number;
  comments?: [];
  views?: number | string;
}

const HomePage = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token") || localStorage.getItem("token");
    console.log("Stored token (from sessionStorage or localStorage):", storedToken);
    if (!storedToken) {
      console.log("No token found in sessionStorage or localStorage, redirecting to /login");
      router.push("/login");
      return;
    }
    setToken(storedToken);
    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      console.log("Fetching blogs with token:", token);
      const response = await axios.get("/api/blog/blogs", { headers: { token } });
      // console.log("API response:", response.data);
      const blogsData = response.data;
      setBlogs(blogsData.data);
      // console.log("Fetched blogs:", blogsData);
    } catch (error) {
      const axiosError = error as AxiosError | Error;
      console.error("Error fetching blogs:", axiosError.message);
      if ((axiosError as AxiosError).response) {
        console.error("Error response:", (axiosError as AxiosError).response?.data);
        if ((axiosError as AxiosError).response?.status === 401) {
          alert("Session expired. Please log in again.");
          sessionStorage.removeItem("token");
          localStorage.removeItem("token");
          router.push("/login");
        }
      } else {
        console.error("Network or other error:", axiosError.message);
        setBlogs([]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex items-center justify-center bg-black">
        <div className="flex h-16 max-sm:h-12 sm:h-14 md:h-16 w-full max-w-screen-xl px-6 max-sm:px-2 sm:px-4 md:px-6 lg:px-12 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-8 max-sm:gap-2 sm:gap-4 md:gap-6 lg:gap-12">
            <div className="text-white text-lg max-sm:text-sm sm:text-base md:text-lg xl:text-[18px] font-bold">icanwrite.</div>
            <div className="relative flex-1 max-w-[280px] max-sm:max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 max-sm:h-3 max-sm:w-3 text-[#B3B3B3]" />
              <Input
                placeholder="Search"
                className="pl-10 h-8 max-sm:h-7 sm:h-8 md:h-9 text-sm max-sm:text-xs rounded-md bg-[#323131] placeholder:text-gray-400 border border-[#B3B3B3] border-opacity-20 w-full"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 max-sm:gap-1 sm:gap-2 md:gap-3">
            <Image src={bell} alt="Notification bell" className="h-6 w-6 max-sm:h-4 max-sm:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            <Image
              src={avatar}
              alt="User avatar"
              className="h-8 w-8 max-sm:h-6 max-sm:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 cursor-pointer"
              onClick={() => setIsProfileOpen(true)}
            />
            <p className="text-white text-sm max-sm:text-[10px] sm:text-xs md:text-sm truncate max-w-[120px] max-sm:max-w-[60px] sm:max-w-[90px] md:max-w-[110px]">
              Maryam Ahmad
            </p>
            <Image src={logout} alt="Logout icon" className="h-6 w-6 max-sm:h-4 max-sm:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto w-full flex-col px-6 max-sm:px-2 sm:px-4 md:px-6 py-8 max-sm:py-4 sm:py-6 md:py-8">
        <div className="xl:max-w-[1398px]">
          {/* Hero Section */}
          <Card className="bg-black xl:pt-[44px] text-white p-8 max-sm:p-4 sm:p-6 md:p-8 xl:h-[385px] rounded-lg mb-8 max-sm:mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-2xl max-sm:text-lg sm:text-xl md:text-3xl font-bold mb-4 max-sm:mb-2 sm:mb-3 md:mb-4 xl:text-6xl xl:font-extrabold text-center">Right to Write</h1>
            <p className="text-sm max-sm:text-xs sm:text-sm md:text-base xl:w-[1086px] xl:text-2xl text-center mb-6 max-sm:mb-3 sm:mb-4 md:mb-6 mx-auto">
              For a writing interface, the navigation should be intuitive and structured to enhance the user experience.
              Here are some essential navigation for a writing interface, the navigation should be intuitive and
              structured to enhance the user experience.
            </p>
            <div className="flex justify-center">
              <Link href="/create">
                <Button variant="outline" className="bg-white text-black hover:bg-gray-100 max-sm:h-8 max-sm:text-sm sm:h-9 md:h-10 xl:font-bold xl:h-[40px] xl:w-[149px] xl:mt-[35px]">
                  Start to write
                </Button>
              </Link>
            </div>
          </Card>

          {/* Two Column Layout */}
          <div className="flex flex-col md:flex-row max-sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8     lg:justify-items-between xl:gap-[52px]  lg:gap-[3.72%]">
            {/* Left Column - Stories */}
            <div className="md:col-span-1 w-full max-sm:col-span-1   sm:col-span-1 lg:col-span-1 xl:w-full  lg:w-full ">
              <h2 className="text-xl max-sm:text-lg sm:text-xl md:text-2xl xl:text-[40px] xl:font-semibold font-semibold xl:mb-[56px] mb-6 max-sm:mb-4 sm:mb-5 lg:mb-10 md:mb-6">Your Stories</h2>
              <div className="space-y-6 max-sm:space-y-4 sm:space-y-5 md:space-y-6">
                {Array.isArray(blogs) ? (
                  blogs.map((blog) => (
                    <StoryCard
                      key={blog.id}
                      blogId={blog.id}
                      category={blog.category || "Uncategorized"}
                      date={new Date(blog.createdAt).toLocaleDateString()}
                      title={blog.title}
                      content={blog.content}
                      author={{
                        name: blog.author,
                        avatar: "/profile-avatar.png",
                      }}
                      stats={{
                        likes: blog.likeCount?.toString() || "0",
                        comments: blog.comments?.length.toString() || "0",
                        views: blog.views || "0",
                      }}
                      onEdit={() => router.push(`/create?blogId=${blog.id}`)}
                    />
                  ))
                ) : (
                  <p>No blogs available.</p>
                )}
              </div>
            </div>

            {/* Right Column - Ideas & Goals */}
            <div className="md:col-span-1 max-sm:col-span-1 sm:col-span-1 lg:col-span-1  w-full   item flex flex-col xl:w-[60%] flex-end lg:w-[70%]  ">
              {/* Ideas Section */}
              <div className="mb-8 max-sm:mb-4 sm:mb-6 md:mb-8">
                <div className="flex  justify-between items-center">
                  <h2 className="xl:text-[40px] max-sm:text-lg sm:text-xl md:text-2xl lg:text-[32px] font-semibold text-[#2C2C2C]">
                    Ideas
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="xl:text-sm max-sm:text-[10px] sm:text-xs md:text-xs lg:text-xs text-foreground flex flex-row gap-0 xl:py-[8px] xl:px-[12px] max-sm:py-[4px] max-sm:px-[6px] sm:py-[5px] sm:px-[8px] md:py-[6px] md:px-[10px] border"
                  >
                    <span>
                      <Image src={arrow} alt="Arrow icon" className="xl:h-4 xl:w-4 max-sm:h-2 max-sm:w-2 sm:h-3 sm:w-3 md:h-3 md:w-3" />
                    </span>
                    <span>see all</span>
                  </Button>
                </div>
                <p className="xl:text-xl lg:mb-4 max-sm:text-xs sm:text-sm md:text-sm lg:text-base font-medium text-[#B3B3B3]">
                  Things you can write about.
                </p>
                <div className="space-y-2 xl:pt-[47px] xl:pb-4 xl:rounded-[20px] xl:pl-[33px] xl:pr-6 max-sm:pt-[24px] max-sm:pb-2 max-sm:rounded-[12px] max-sm:pl-[16px] max-sm:pr-[12px] sm:pt-[30px] sm:pb-3 sm:rounded-[14px] sm:pl-[20px] sm:pr-[14px] md:pt-[33px] md:pb-3 md:rounded-[16px] md:pl-[24px] md:pr-[16px] lg:pt-[38px] lg:pb-4 lg:rounded-[18px] lg:pl-[26px] lg:pr-[18px] border border-[#D9D9D9]">
                  {["Detective", "Comedy", "Thrillers", "Science", "Drama"].map((category) => (
                    <div key={category} className="hover:bg-gray-50 cursor-pointer">
                      <span className="max-sm:text-xs sm:text-sm md:text-base">{category}</span>
                      <div className="border-t w-full xl:mb-7 xl:mt-6 max-sm:mb-[14px] max-sm:mt-3 sm:mb-[18px] sm:mt-4 md:mb-[22px] md:mt-5 lg:mb-[22px] lg:mt-5"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Goals Section */}
              <div className="mb-8 max-sm:mb-4 sm:mb-6 md:mb-8">
                <div className="flex justify-between items-center xl:mb-4 max-sm:mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                  <h2 className="xl:text-[40px] max-sm:text-lg sm:text-xl md:text-2xl lg:text-[32px] font-semibold text-[#2C2C2C]">
                    Daily goals
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="xl:text-sm max-sm:text-[10px] sm:text-xs md:text-xs lg:text-xs text-foreground flex flex-row gap-0 xl:py-[8px] xl:px-[12px] max-sm:py-[4px] max-sm:px-[6px] sm:py-[5px] sm:px-[8px] md:py-[6px] md:px-[10px] border"
                  >
                    <span>
                      <Image src={arrow} alt="Arrow icon" className="xl:h-4 xl:w-4 max-sm:h-2 max-sm:w-2 sm:h-3 sm:w-3 md:h-3 md:w-3" />
                    </span>
                    <span>see all</span>
                  </Button>
                </div>
                <div className="space-y-2 xl:pt-[47px] xl:pb-5 xl:rounded-[20px] xl:pl-[33px] xl:pr-6 max-sm:pt-[24px] max-sm:pb-2 max-sm:rounded-[12px] max-sm:pl-[16px] max-sm:pr-[12px] sm:pt-[30px] sm:pb-3 sm:rounded-[14px] sm:pl-[20px] sm:pr-[14px] md:pt-[33px] md:pb-3 md:rounded-[16px] md:pl-[24px] md:pr-[16px] lg:pt-[38px] lg:pb-4 lg:rounded-[18px] lg:pl-[26px] lg:pr-[18px] border border-[#D9D9D9]">
                  {["Finish the first chapter", "Read a novel", "Upload a blog"].map((goal) => (
                    <div key={goal} className="flex flex-col space-x-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={goal} />
                        <label
                          htmlFor={goal}
                          className="xl:text-sm max-sm:text-[10px] sm:text-xs md:text-xs lg:text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {goal}
                        </label>
                      </div>
                      <div className="border-t w-full xl:mb-7 xl:mt-6 max-sm:mb-[14px] max-sm:mt-3 sm:mb-[18px] sm:mt-4 md:mb-[22px] md:mt-5 lg:mb-[22px] lg:mt-5"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Ideas Section */}
          <div className="w-full justify-center flex-col items-center text-center flex">
            <h2 className="xl:text-[40px] max-sm:text-lg sm:text-xl md:text-2xl lg:text-[32px] xl:mt-[86px] max-sm:mt-[40px] sm:mt-[50px] md:mt-[60px] lg:mt-[68px] font-semibold xl:mb-4 max-sm:mb-1 sm:mb-2 md:mb-3 lg:mb-3">
              Weekly Ideas
            </h2>
            <div className="border w-full xl:pt-[43px] xl:pb-[47px] max-sm:pt-[24px] max-sm:pb-[26px] sm:pt-[30px] sm:pb-[33px] md:pt-[34px] md:pb-[38px] lg:pt-[34px] lg:pb-[38px] border-[#0000001A] border-opacity-10 xl:mb-[159px] max-sm:mb-[80px] sm:mb-[100px] md:mb-[120px] lg:mb-[126px]">
              <div className="xl:text-[24px] max-sm:text-sm sm:text-base md:text-lg lg:text-[20px] text-[#B3B3B3] font-semibold">
                Science
              </div>
              <div className="xl:text-4xl max-sm:text-lg sm:text-xl md:text-2xl lg:text-[25px] leading-[145%] text-black font-bold">
                Quantum Energy Computing
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </div>
  );
};

export default HomePage;