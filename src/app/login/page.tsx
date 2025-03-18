"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const bgImage = "/background.jpeg";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/login", { email, password });
      console.log("API response:", response.data);

      if (response.data.status === "Failed") {
        throw new Error(response.data.message || "Login failed");
      }

      if (!response.data.access_token) {
        throw new Error("No access token received from the server");
      }

      const token = response.data.access_token;
      const userData = {
        email: response.data.email || email,
        firstName: response.data.firstname || "",
        lastName: response.data.lastname || "",
      };

      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log("Token saved in localStorage:", localStorage.getItem("token"));
      console.log("Token saved in sessionStorage:", sessionStorage.getItem("token"));
      console.log("User data saved in localStorage:", localStorage.getItem("userData"));

      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      const axiosError = error as AxiosError | Error;
      console.error("Login failed:", axiosError.message);
      toast.error(axiosError.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen h-screen flex justify-center items-center bg-gray-100 max-sm:p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[400px] max-sm:max-w-[90%] justify-center flex flex-col mx-4 h-[80%] max-sm:h-auto max-sm:min-h-[80vh] bg-white rounded-lg p-8 max-sm:p-4">
        <div className="text-center mb-8 max-sm:mb-6">
          <h1 className="text-[42px] text-2xl max-sm:text-2xl font-semibold text-foreground mb-[14.69px] max-sm:mb-2">
            Welcome back
          </h1>
          <p className="text-base xl:text-xl max-sm:text-sm text-black text-opacity-7">Input your email and password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-sm:space-y-4">
          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="email" className="text-sm xl:text-[18px] max-sm:text-xs font-semibold text-primary">
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
            />
          </div>

          <div className="space-y-2 max-sm:space-y-1">
            <Label htmlFor="password" className="text-sm xl:text-[18px] max-sm:text-xs font-semibold text-primary">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-10 max-sm:h-9 px-3 py-2 text-sm max-sm:text-xs placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm max-sm:text-xs">
            <Link href="/change-password" className="text-gray-600 hover:text-gray-900">
              Forget password?
            </Link>
            <Link href="/reset-password" className="text-gray-600 hover:text-gray-900">
              Reset Password
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800 max-sm:h-9 max-sm:text-sm"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm max-sm:text-xs">
            <span className="text-gray-500">New here? </span>
            <Link href="/sign-up" className="text-gray-900 hover:underline">
              Create account
            </Link>
          </div>
        </form>

        <p className="mt-8 max-sm:mt-6 text-center text-xs max-sm:text-[10px] text-gray-500">
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

export default LoginPage;