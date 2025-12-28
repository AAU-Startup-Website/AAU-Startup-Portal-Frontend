"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Users,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const loggedInUser = await login(username, password);
      if (loggedInUser) {
        // Redirect based on role
        switch (loggedInUser.role) {
          case "admin":
            router.push("/dashboard");
            break;
          case "founder":
            router.push("/founder");
            break;
          case "investor":
            router.push("/investor");
            break;
          case "mentor":
            router.push("/mentor");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        setError("Login failed: Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden font-sans">
      {/* 1. Consistent Header (Matches Register Page) */}
      <header className="flex-none h-20 border-b border-[#CAD6DE] bg-white px-6 lg:px-12 flex items-center justify-between z-20">
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative overflow-hidden rounded-full p-0.5">
            <img
              src="/logo.png"
              alt="AAU Startup Center Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col justify-center pl-4 border-l-2 border-[#CAD6DE] h-10">
            <div className="text-[#005081] text-[16px] font-bold leading-none mb-1 group-hover:text-[#015384] transition-colors">
              ኤኤዩ ስታርታፕ ማዕከል
            </div>
            <div className="text-[#E63946] text-[12px] font-bold tracking-[1.5px] leading-none">
              AAU STARTUP CENTER
            </div>
          </div>
        </Link>

        {/* Back button and Register link */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-[#7D818B] hover:text-[#005081] hover:bg-[#CAD6DE]/20 flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <span className="text-sm font-medium text-[#7D818B]">
            New here?{" "}
            <Link
              href="/register"
              className="text-[#005081] hover:underline font-bold ml-1"
            >
              Create Account
            </Link>
          </span>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Left Side: Image & Quote (Visual) */}
        <div className="hidden lg:flex w-[45%] relative bg-[#005081] items-center justify-center">
          {/* Background Image */}
          <img
            src="/image1.png"
            alt="AAU Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#005081]/95 via-[#005081]/70 to-[#005081]/30" />

          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

          {/* Centered Content */}
          <div className="relative z-10 px-12 max-w-xl text-white space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse"></span>
              <span>Welcome Back</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              Access the Hub of <br />
              <span className="text-[#E63946]">Innovation.</span>
            </h1>

            <blockquote className="border-l-4 border-[#E63946] pl-6 py-2">
              <p className="text-lg xl:text-xl text-white/90 font-light italic leading-relaxed">
                "Empowering the next generation of Ethiopian entrepreneurs
                through knowledge, mentorship, and resources."
              </p>
            </blockquote>

            <div className="pt-4 flex items-center gap-4 text-sm text-white/70">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#005081] bg-gray-200 flex items-center justify-center text-[#005081] text-xs font-bold"
                  >
                    <Users size={12} />
                  </div>
                ))}
              </div>
              <p>Join the community</p>
            </div>
          </div>

          {/* Slanted Separator */}
          <div
            className="absolute top-0 right-0 bottom-0 w-16 bg-white z-20"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>

        {/* Right Side: Login Form Area */}
        <div className="w-full lg:w-[55%] bg-white flex flex-col items-center justify-center p-6 lg:p-12 h-full overflow-y-auto">
          <div className="w-full max-w-sm space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-2">
              <div className="inline-block p-3 rounded-full bg-[#005081]/5 mb-2">
                <div className="h-12 w-12 rounded-full bg-[#005081] flex items-center justify-center text-white shadow-lg">
                  <Lock className="h-6 w-6" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-[#005081] tracking-tight">
                Welcome Back
              </h1>
              <p className="text-[#7D818B] text-sm font-medium">
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="bg-red-50 border-red-200 text-red-700 py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs ml-2">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-5">
                {/* Username Input */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="username"
                    className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                  >
                    Username
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                    <Input
                      id="username"
                      placeholder="Username"
                      className="pl-9 h-11 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="password"
                      className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                    >
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-bold text-[#005081] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-9 h-11 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D818B] hover:text-[#005081]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="rounded border-[#CAD6DE] text-[#005081] focus:ring-[#005081]"
                />
                <label
                  htmlFor="remember"
                  className="text-xs text-[#7D818B] font-medium cursor-pointer"
                >
                  Stay signed in for 30 days
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#005081] hover:bg-[#015384] text-white font-bold tracking-wide shadow-md hover:shadow-lg transition-all group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <span className="flex items-center">
                    SIGN IN{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-[#CAD6DE]/50 mt-6">
              <p className="text-xs text-[#7D818B]">
                By signing in, you agree to AAU's{" "}
                <Link href="/terms" className="underline hover:text-[#005081]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-[#005081]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
