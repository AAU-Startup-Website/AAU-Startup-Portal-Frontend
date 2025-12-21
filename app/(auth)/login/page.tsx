"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User, Phone, Mail, Globe } from "lucide-react"
import { loginUser } from "@/lib/api"
import { setToken } from "@/lib/auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const data = await loginUser({ username, password })
      if (data.token) {
        setToken(data.token)
        router.push("/dashboard")
      } else {
        setError("Login failed: No access token received")
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Contact Bar (Dark Navy) */}
      <div className="bg-[#001529] text-white py-2 px-6 flex justify-between items-center text-xs">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Phone size={12} /> +251 11 123 4567</span>
          <span className="flex items-center gap-1"><Mail size={12} /> portal@aau.edu.et</span>
        </div>
        <div className="hidden md:flex gap-4">
          <span className="flex items-center gap-1"><Globe size={12} /> www.aau.edu.et</span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Side: Image with Curved Edge */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <img 
            src="image1.png" 
            alt="University Architecture" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/30" />
          
          {/* Curved Edge SVG */}
          <div className="absolute top-0 right-[-1px] h-full w-24 fill-white">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white">
              <path d="M100 0 C50 0 50 100 100 100 Z" />
            </svg>
          </div>

          <div className="absolute bottom-20 left-12 text-white z-10 max-w-md">
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-wider">Welcome Back</h2>
            <p className="text-lg opacity-90 font-light italic border-l-4 border-blue-400 pl-4">
              "Access the hub of innovation and entrepreneurial excellence."
            </p>
          </div>
        </div>

        {/* Right Side: Login Form Area */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-sm space-y-8">
            {/* Logo and Title */}
            <div className="text-center">
              <div className="inline-block p-3 rounded-full bg-blue-50 mb-4">
                <div className="h-16 w-16 rounded-full bg-[#0056b3] flex items-center justify-center text-white font-black text-xl shadow-lg">
                  AAU
                </div>
              </div>
              <h1 className="text-3xl font-bold text-[#001529] tracking-tight">AAU STARTUPS</h1>
              <p className="text-[#6c757d] mt-2 font-medium uppercase text-xs tracking-[0.2em]">Institutional Access Portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="bg-red-50 border-red-200 text-red-800 rounded-lg">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {/* Username Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="username" className="text-xs font-bold text-[#0056b3] ml-1 uppercase">Username</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="username"
                      placeholder="Username"
                      className="pl-11 h-12 rounded-full border-slate-200 focus:border-[#0056b3] focus:ring-[#0056b3]/10 transition-all bg-slate-50/30"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <Label htmlFor="password" className="text-xs font-bold text-[#0056b3] uppercase">Password</Label>
                    <Link href="/forgot-password" size="sm" className="text-[10px] font-bold text-slate-400 hover:text-[#0056b3] uppercase tracking-tighter">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-11 h-12 rounded-full border-slate-200 focus:border-[#0056b3] focus:ring-[#0056b3]/10 transition-all bg-slate-50/30"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0056b3]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-1">
                <Checkbox id="remember" className="rounded-sm border-slate-300" />
                <label htmlFor="remember" className="text-[11px] text-slate-500 font-medium">
                  Stay signed in for 30 days
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-full bg-[#0056b3] hover:bg-[#003d82] text-white font-bold text-sm tracking-wide shadow-lg transition-transform active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? "AUTHENTICATING..." : "SIGN IN TO PORTAL"}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-500 font-medium">
                New to the platform?{" "}
                <Link href="/register" className="text-[#0056b3] hover:underline font-bold">
                  CREATE ACCOUNT
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}