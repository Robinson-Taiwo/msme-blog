"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
  }

  const bgImage = "/secondbg.jpeg"

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[400px] mx-4 bg-white rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-[32px] font-medium text-gray-900 mb-1">Create an account</h1>
          <p className="text-base text-gray-500">Create your account to start blogging</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-900">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full h-10 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
              First name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full h-10 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-900">
              Last name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full h-10 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:ring-gray-400"
              required
            />
          </div>

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
            />
          </div>

          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800 mt-6">
            Continue
          </Button>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/login" className="text-gray-900 hover:underline">
              Log in
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

export default SignupPage

