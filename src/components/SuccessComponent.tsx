"use client";

import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Adjust import path based on your Shadcn setup

interface SuccessComponentProps {
  message: string;
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({ message }) => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="bg-white flex flex-col items-center justify-center w-full max-w-[90%] md:max-w-[60%] sm:max-w-[747px] min-h-[50vh] sm:min-h-[461px] xl:max-w-[747px] lg:max-w-[30%] p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg gap-4 sm:gap-6 md:gap-8">
        <DialogHeader className="flex w-full flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4">
          <DialogTitle className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-center">
            Success
          </DialogTitle>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 font-medium text-center max-w-[90%] sm:max-w-[80%]">
            {message}
            {/* Removed static text "this account is verified successfully" assuming it’s part of message prop */}
          </p>
        </DialogHeader>

        <div className="w-full flex items-center justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-[88.31px]">
          <Link
            href="/login"
            className="bg-[#2B2B2B] text-white w-full max-w-[90%] sm:max-w-[468px] h-10 sm:h-12 md:h-14 lg:h-[3.9rem] rounded-[9.04px] text-sm sm:text-base md:text-lg lg:text-xl font-medium flex items-center justify-center hover:bg-black/90 transition-colors"
          >
            Log in
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessComponent;