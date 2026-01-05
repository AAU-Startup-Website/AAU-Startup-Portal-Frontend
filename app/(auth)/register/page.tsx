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
  Briefcase,
  Users,
  Trophy,
  Shield,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

const DEPARTMENTS = [
  "Computer Science (CS)",
  "Information Systems (IS)",
  "Software Engineering",
  "Electrical and Computer Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Management",
  "Economics",
  "Accounting and Finance",
  "Marketing Management",
  "Architecture",
  "Pharmacy",
  "Public Health",
  "Medicine",
  "Other",
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [customDept, setCustomDept] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"founder" | "mentor" | "investor" | "admin">(
    "founder"
  );

  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const finalDepartment =
      selectedDept === "Other" ? customDept : selectedDept;

    if (!finalDepartment) {
      setError("Please select your department.");
      setIsLoading(false);
      return;
    }

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
        role: role,
        department: finalDepartment,
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

  const getRoleIcon = (r: string) => {
    switch (r) {
      case "founder":
        return <Briefcase className="w-3 h-3 mb-1" />;
      case "mentor":
        return <GraduationCap className="w-3 h-3 mb-1" />;
      case "investor":
        return <Trophy className="w-3 h-3 mb-1" />;
      case "admin":
        return <Shield className="w-3 h-3 mb-1" />;
      default:
        return <User className="w-3 h-3 mb-1" />;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
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
            Already a member?{" "}
            <Link
              href="/login"
              className="text-[#005081] hover:underline font-bold ml-1"
            >
              Sign In
            </Link>
          </span>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Side: Image */}
        <div className="hidden lg:flex w-[45%] relative bg-[#005081] items-center justify-center h-full">
          <img
            src="/image1.png"
            alt="AAU Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#005081]/95 via-[#005081]/70 to-[#005081]/30" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

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
                prepare innovators for successful completion, employability, and
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

          <div
            className="absolute top-0 right-0 bottom-0 w-16 bg-white z-20"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>

        {/* Right Side: Form Container */}
        {/* CHANGED: Removed overflow-y-auto from here. Added h-full relative. */}
        <div className="w-full lg:w-[55%] bg-white flex flex-col h-full relative overflow-hidden">
          {/* SCROLL WRAPPER: This div now handles the scrolling. 
              Added pb-20 to ensure plenty of space at the bottom when "Other" is selected */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 pb-20 scroll-smooth">
            <div className="w-full max-w-md mx-auto space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#005081] tracking-tight">
                  Create Account
                </h2>
                <p className="text-[#7D818B] text-sm">
                  Enter your institutional details to access the portal.
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
                        placeholder="johndoe_251"
                        className="pl-9 h-10 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Department Dropdown */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="department"
                      className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                    >
                      Department
                    </Label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors pointer-events-none" />
                      <select
                        id="department"
                        className="w-full pl-9 pr-8 h-10 bg-slate-50 border border-[#CAD6DE] rounded-md text-sm focus:border-[#005081] focus:ring-[#005081] transition-all appearance-none cursor-pointer"
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Conditional "Other" Input */}
                {selectedDept === "Other" && (
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label
                      htmlFor="customDept"
                      className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                    >
                      Specify Department
                    </Label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                      <Input
                        id="customDept"
                        placeholder="Enter your department name"
                        className="pl-9 h-10 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                        value={customDept}
                        onChange={(e) => setCustomDept(e.target.value)}
                        required={selectedDept === "Other"}
                      />
                    </div>
                  </div>
                )}

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
                      placeholder="name@aau.edu.et"
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

                {/* Role Selection */}
                <div className="space-y-2 pt-1">
                  <Label className="text-xs font-bold text-[#21282D] uppercase tracking-wider">
                    I am a
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["founder", "mentor", "investor", "admin"].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r as any)}
                        className={`
                          flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] font-bold uppercase transition-all duration-200
                          ${
                            role === r
                              ? "bg-[#005081] border-[#005081] text-white shadow-md scale-[1.02]"
                              : "bg-white border-[#CAD6DE] text-[#7D818B] hover:border-[#005081] hover:text-[#005081]"
                          }
                        `}
                      >
                        {getRoleIcon(r)}
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#005081] hover:bg-[#015384] text-white font-bold tracking-wide shadow-md hover:shadow-lg transition-all mt-6 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Initializing...
                    </>
                  ) : (
                    <span className="flex items-center">
                      CREATE ACCOUNT{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Terms */}
              <p className="text-xs text-center text-[#7D818B] pt-4">
                By registering, you agree to AAU's{" "}
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
