"use client";

import type React from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import SuccessComponent from "@/components/SuccessComponent";
import { toast } from "sonner";

const VerifyPage = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const bgImage = "/secondbg.jpeg";

  const handleVerify = async () => {
    if (value.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/verify-otp", { otp: value });
      console.log("Response:", response);

      if (response.status >= 200 && response.status < 300) {
        const isSuccessResponse =
          response.data?.status === "Success" ||
          response.data?.statusCode === "00" ||
          response.data?.message?.includes("success");

        if (isSuccessResponse) {
          const successMessage = response.data.message || "OTP verified successfully!";
          setMessage("Your account is verified successfully");
          setIsSuccess(true);
          toast.success(successMessage);
          console.log("Success response data:", response.data);
        } else {
          toast.error(response.data.message || "Invalid OTP");
          console.log("Non-success response data:", response.data);
        }
      } else {
        toast.error(response.data.message || "Verification failed");
        console.log("Unexpected status:", response.status, response.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError | Error;
      const errorMessage = (axiosError as AxiosError<{ message?: string }>).response?.data?.message || "OTP verification failed";
      toast.error(errorMessage);
      console.error("OTP verification failed:", (axiosError as AxiosError<{ message?: string }>).response?.data || axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen min-h-screen flex justify-center max-sm:py-4 max-sm:px-4 py-[63px] px-[98px] items-center bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center max-w-[400px] xl:max-w-[581px] max-sm:max-w-[90%] mx-4 bg-white rounded-lg max-sm:p-4 p-8 relative">
        {isSuccess && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
            <SuccessComponent message={message} />
          </div>
        )}

        <div className="text-center xl:mb-[56px] max-sm:mb-4 mb-6">
          <h1 className="text-[32px] max-sm:text-2xl font-medium text-gray-900 mb-1">Verify email</h1>
          <p className="text-base max-sm:text-sm text-gray-500">Enter your verification message</p>
        </div>

        <div className="text-black w-full text-start">
          Email verification

          <div className="space-y-2">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup className="text-[#B3B3B3] gap-x-4 xl:gap-x-12 max-sm:gap-x-2 w-full">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex flex-row mt-2 w-[88%] max-sm:w-full gap-[2px] justify-end">
            <span className="xl:text-base text-sm max-sm:text-xs text-[#2C2C2CB2] text-opacity-70 xl:font-semibold">
              Not received?
            </span>
            <span className="text-[#2C2C2C] xl:text-base text-sm max-sm:text-xs xl:font-semibold cursor-pointer">
              Resend
            </span>
          </div>

          <Button
            className="w-full xl:mt-[38px] max-sm:mt-6 mt-8 max-sm:h-10"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;