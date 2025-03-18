"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long."
      );
      return;
    }

    const registerData = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      username: formData.email.split("@")[0],
      password: formData.password,
    };

    try {
      const response = await axios.post("/api/register", registerData);
      console.log("Signup successful:", response.data);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      });
      setMessage("");
      toast.success("Signup successful! Please check your email for OTP verification.");
      router.push("/verify-email");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Signup failed:", axiosError.response?.data || axiosError.message);
      toast.error("Signup failed. Check console for details or try again.");
    }
  };

  const bgImage = "/secondbg.jpeg";

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center bg-gray-100 max-sm:p-2"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[400px] max-sm:max-w-[90%] mx-4 bg-white rounded-lg p-8 max-sm:p-4 max-sm:min-h-[80vh] max-sm:h-auto">
        <div className="text-center mb-6 max-sm:mb-4">
          <h1 className="text-[32px] max-sm:text-xl font-medium text-gray-900 mb-1 max-sm:mb-0.5">
            Create an account
          </h1>
          <p className="text-base max-sm:text-sm text-gray-500">Create your account to start blogging</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-sm:space-y-2">
          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="email" className="text-sm max-sm:text-xs font-medium text-gray-900">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full h-10 max-sm:h-8 px-3 py-2 text-sm max-sm:text-xs placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="firstName" className="text-sm max-sm:text-xs font-medium text-gray-900">
              First name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full h-10 max-sm:h-8 px-3 py-2 text-sm max-sm:text-xs placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="lastName" className="text-sm max-sm:text-xs font-medium text-gray-900">
              Last name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full h-10 max-sm:h-8 px-3 py-2 text-sm max-sm:text-xs placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="password" className="text-sm max-sm:text-xs font-medium text-gray-900">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-10 max-sm:h-8 px-3 py-2 text-sm max-sm:text-xs placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="confirmPassword" className="text-sm max-sm:text-xs font-medium text-gray-900">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full h-10 max-sm:h-8 px-3 py-2 text-sm max-sm:text-xs placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <p className="lg:text-base text-sm max-sm:text-xs text-[red] max-sm:leading-tight">{message}</p>

          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800 mt-6 max-sm:mt-4 max-sm:h-9 max-sm:text-sm"
          >
            Continue
          </Button>

          <div className="text-center text-sm max-sm:text-xs mt-4 max-sm:mt-2">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/login" className="text-gray-900 hover:underline">
              Log in
            </Link>
          </div>
        </form>

        <p className="mt-8 max-sm:mt-4 text-center text-xs max-sm:text-[10px] text-gray-500 max-sm:leading-tight">
          By using icanwrite, you agree to our{" "}
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/policies" className="hover:underline">
            Policies
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;