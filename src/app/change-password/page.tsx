"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios"; // Import Axios and AxiosError
import { toast } from "sonner"; // Import Sonner toast
import { useParams } from "next/navigation";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // Track loading state
  const [message, setMessage] = useState<string | null>(null); // Success message
  const [error, setError] = useState<string | null>(null); // Error message
  const bgImage = "/secondbg.jpeg";
  const params = useParams(); // Get the token from the URL

  // Password validation function
  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password); // Adjust special characters as needed
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 8;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (!@#$%^&*)."
      );
      setLoading(false);
      return;
    }

    const token = params?.token; // Extract token from URL
    if (!token) {
      setError("Invalid or missing reset token.");
      setLoading(false);
      return;
    }

    try {
      // Use the proxied URL via Next.js rewrite with dynamic token
      const response = await axios.post(`/api/reset-password/${token}`, {
        newPassword: formData.password, // Fixed: Added newPassword field
      });
      setMessage(response.data.message || "Password reset successfully!");
      toast.success(response.data.message || "Password reset successfully!");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("password reset failed:", axiosError.response?.data || axiosError.message);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen min-h-screen flex justify-center items-center bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[400px] justify-center flex flex-col mx-4 h-[80%] bg-white rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-medium text-gray-900 mb-1">Change Password</h1>
          <p className="text-base text-gray-500">Create a new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-900">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-10 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full h-10 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue"}
          </Button>

          {/* Display success or error message */}
          {message && <p className="text-sm text-green-600 text-center">{message}</p>}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;