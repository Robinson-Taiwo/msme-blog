"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const bgImage = "/secondbg.jpeg"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[400px] mx-4 bg-white rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-medium text-gray-900 mb-1">Forget Password</h1>
          <p className="text-base text-gray-500">Reset to mail</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-900">
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

          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword

