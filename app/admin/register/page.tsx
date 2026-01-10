"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  GraduationCap,
  Loader2,
  AlertCircle,
  ArrowRight,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export default function AdminRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const usernameRegex = /^[a-zA-Z0-9@.+-_]+$/;
    if (!usernameRegex.test(username)) {
      setError("Username can only contain letters, numbers, and @ . + - _");
      setIsLoading(false);
      return;
    }

    try {
      await signUp({
        email,
        password,
        firstName: username,
        lastName: "",
        role: "admin",
        department,
      });
      router.push("/login");
    } catch (err: any) {
      const serverError = err.response?.data;
      if (serverError) {
        const firstError = Object.values(serverError)[0];
        setError(
          Array.isArray(firstError) ? firstError[0] : "Registration failed."
        );
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
      {/* Main Content Split */}
      <div className="flex-1 flex relative">
        {/* Left Side: Image & Quote (Visual) */}
        <div className="hidden lg:flex w-[45%] relative bg-[#005081] items-center justify-center">
          {/* Background Image */}
          <img
            src="/image1.png"
            alt="AAU Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay - Ensures text readability while keeping the image visible. */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#005081]/95 via-[#005081]/70 to-[#005081]/30" />

          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

          {/* Centered Content */}
          <div className="relative z-10 px-12 max-w-xl text-white space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse"></span>
              <span>Join 500+ Innovators</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              Innovate for <br />
              <span className="text-[#E63946]">Impact.</span>
            </h1>

            <blockquote className="border-l-4 border-[#E63946] pl-6 py-2">
              <p className="text-lg xl:text-xl text-white/90 font-light italic leading-relaxed">
                "The AAU Startups Portal is your gateway to innovation. We
                prepare students for successful completion, employability, and
                job creation."
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
              <p>Join a growing community</p>
            </div>
          </div>

          {/* Slanted Separator - Elegant transition */}
          <div
            className="absolute top-0 right-0 bottom-0 w-16 bg-white z-20"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>

        {/* Right Side: Form - Now uses flex-col for better vertical flow and overflow handling */}
        <div className="w-full lg:w-[55%] bg-white flex flex-col p-6 lg:p-12 h-full overflow-y-auto">
          <div className="w-full max-w-md mx-auto space-y-6 flex-grow">
            {" "}
            {/* Added mx-auto and flex-grow */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#005081] tracking-tight">
                Admin Registration
              </h2>
              <p className="text-[#7D818B] text-sm">
                Create an admin account for the AAU Startups Portal.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-50 border-red-200 text-red-700 py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs ml-2">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Grid for compact layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
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
                      placeholder="johndoe_admin"
                      className="pl-9 h-10 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="department"
                    className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                  >
                    Department
                  </Label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                    <Input
                      id="department"
                      placeholder="e.g. Admin"
                      className="pl-9 h-10 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                >
                  Official Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@aau.edu.et"
                    className="pl-9 h-10 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-9 h-10 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
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

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 bg-[#005081] hover:bg-[#015384] text-white font-bold tracking-wide shadow-md hover:shadow-lg transition-all mt-4 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Admin Account...
                  </>
                ) : (
                  <span className="flex items-center">
                    CREATE ADMIN ACCOUNT{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </div>
          {/* Terms and Policy section at the bottom, outside the form but within the scrollable area */}
          <p className="text-xs text-center text-[#7D818B] mt-4 flex-none pb-4">
            {" "}
            {/* Added pb-4 for bottom padding */}
            By registering, you agree to AAU's{" "}
            <Link href="/terms" className="underline hover:text-[#005081]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-[#005081]">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
