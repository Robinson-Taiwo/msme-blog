"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bgImage = "/secondbg.jpeg";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post("/api/forgot-password", { email });
      console.log(response.data);
      toast.success(response.data.message || "Password reset email sent successfully!");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("password reset failed:", axiosError.response?.data || axiosError.message);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen min-h-screen flex justify-center items-center py-[63px] px-[98px] max-sm:p-4 bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full justify-center flex flex-col max-w-[400px] max-sm:max-w-[90%] h-full max-sm:h-auto max-sm:min-h-[50vh] mx-4 bg-white rounded-lg p-8 max-sm:p-4">
        <div className="text-center mb-8 max-sm:mb-4">
          <h1 className="text-[32px] max-sm:text-xl font-medium text-gray-900 mb-1 max-sm:mb-0.5">
            Forget Password
          </h1>
          <p className="text-base max-sm:text-sm text-gray-500">Reset to mail</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-sm:space-y-4">
          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="email" className="text-sm max-sm:text-xs font-medium text-gray-900">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full h-10 max-sm:h-9 px-3 py-2 text-sm max-sm:text-xs placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
              disabled={loading}
            />
          </div>

          {message && (
            <p className="text-sm max-sm:text-xs text-green-600 text-center max-sm:leading-tight">{message}</p>
          )}
          {error && (
            <p className="text-sm max-sm:text-xs text-red-600 text-center max-sm:leading-tight">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800 max-sm:h-9 max-sm:text-sm"
            disabled={loading}
          >
            {loading ? "Sending..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;