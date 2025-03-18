"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import avatar from "@/components/images/avatar.png"
import { toast } from "sonner";


interface ProfileData {
  mobile_phone: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [profile, setProfile] = useState<ProfileData>({
    mobile_phone: "",
    email: "",
    firstName: "Maryam", // Static value
    lastName: "Ahmad",   // Static value
    profilePicture: "",
  });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token") || localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (storedToken && open) {
      console.log("Token loaded:", storedToken);
      setToken(storedToken);

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setProfile((prev) => ({
          ...prev,
          mobile_phone: prev.mobile_phone, // Preserve existing phone if set
          email: userData.email || "",
          firstName: "Maryam", // Override with static value
          lastName: "Ahmad",   // Override with static value
          profilePicture: prev.profilePicture, // Preserve existing picture if set
        }));
      }
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldName = id === "phone" ? "mobile_phone" : id;
    setProfile((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleUpdateProfile = async () => {
    if (!token) {
      toast.error("User is not authenticated");
      return;
    }

    try {
      const response = await axios.put(
        "/api/update-profile",
        {
          mobile_phone: profile.mobile_phone,
          firstname: profile.firstName, // Send static "Maryam"
          lastname: profile.lastName,   // Send static "Ahmad"
        },
        {
          headers: { token: token },
        }
      );
      console.log("Profile update response:", response.data);
      setProfile((prev) => ({
        ...prev,
        mobile_phone: response.data.mobile_phone || prev.mobile_phone,
        email: prev.email,           // Keep from localStorage
        firstName: "Maryam",         // Static value
        lastName: "Ahmad",           // Static value
        profilePicture: response.data.profilePicture || prev.profilePicture,
      }));
      toast.success("Profile updated successfully!");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error updating profile:", axiosError.message);
      console.error("Response data:", axiosError.response?.data);
      toast.error(`Failed to update profile: ${axiosError.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[400px] xl:max-w-[555px] xl:h-[940px] p-0 ">
        <div className="p-6 xl:pt-[65px] xl:pl-[43px] xl:pr-[47px] ">
          <div className="flex flex-col items-center space-y-4">
<DialogTitle  className="hidden" ></DialogTitle>
            <Image
              src={avatar}
              alt="Profile Picture"
              className="h-20 w-20 xl:h-[73.6px] xl:w-[73.6px] object-cover rounded-full"
            />

            <h2 className="text-xl xl:text-[29.44px] xl:mt-[22.08px] font-medium text-gray-900">{profile.firstName} {profile.lastName}</h2>
          </div>

          <div className="space-y-6  ">
            <div className=" xl:mt-[51.32px]  ">
              <Label htmlFor="phone" className="text-sm font-normal text-black text-opacity-70 xl:text-base ">Phone number</Label>
              <Input
                id="phone"
                value={profile.mobile_phone}
                onChange={handleChange}
                className="h-10 xl:h-[66px] focus:outline-0 outline-0   bg-gray-50 border-gray-200"
              />
              <Button
                className="w-full lg:mt-4 mt-2 xl:h-[52px] bg-black text-white hover:bg-black/90 xl:text-base xl:mt-[24px]  h-10"
                onClick={handleUpdateProfile}
              >
                Update number
              </Button>
            </div>

            <div className="space-y-2  xl:mt-6 ">
              <Label htmlFor="email" className="text-sm font-normal text-gray-500">Email address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                readOnly
                className="h-10 xl:h-[66px] focus:outline-0 outline-0  bg-gray-50 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-normal text-gray-500">First name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                readOnly
                className="h-10 xl:h-[66px] focus:outline-0 outline-0  bg-gray-50 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-normal text-gray-500">Last name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                readOnly
                className="h-10 xl:h-[66px] focus:outline-0 outline-0  bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <Button variant="outline" className="w-full text-center xl:text-base   text-sm text-red-500 hover:text-red-600  xl:h-[52px] xl:mt-[44px] mt-4">Log out</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}