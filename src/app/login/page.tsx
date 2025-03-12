"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const bgImage = "/background.jpeg"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen h-screen  flex justify-center items-center  bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[400px] justify-center flex flex-col mx-4 h-[80%] bg-white rounded-lg p-8">
        <div className="text-center  mb-8">
          <h1 className="text-[42px] text-2xl  font-semibold text-foreground mb-[14.69px]">Welcome back</h1>
          <p className="text-base xl:text-xl text-black  text-opacity-7">Input your email and password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm xl:text-[18px] font-semibold text-primary">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full h-10 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm xl:text-[18px] font-semibold text-primary">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-10 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link href="/forgot-password" className="text-gray-600 hover:text-gray-900">
              Forget password?
            </Link>
            <Link href="/reset-password" className="text-gray-600 hover:text-gray-900">
              Reset Password
            </Link>
          </div>

          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
            Login
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-500">New here? </span>
            <Link href="/signup" className="text-gray-900 hover:underline">
              Create account
            </Link>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
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
  )
}

export default LoginPage

