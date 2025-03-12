"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const bgImage = "/secondbg.jpeg"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change logic here
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[400px] mx-4 bg-white  rounded-lg p-8">
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

          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword

