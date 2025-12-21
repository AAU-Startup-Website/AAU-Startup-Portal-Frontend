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
  Phone,
  Globe,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  // REMOVED: confirmPassword state
  const [role, setRole] = useState<"founder" | "mentor" | "investor" | "admin">(
    "founder"
  );

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

    // REMOVED: password !== confirmPassword check logic

    try {
      await signUp({
        email,
        password,
        firstName: username,
        lastName: "",
        role: role,
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Contact Bar */}
      <div className="bg-[#001529] text-white py-2 px-6 flex justify-between items-center text-xs">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Phone size={12} /> +251 11 123 4567
          </span>
          <span className="flex items-center gap-1">
            <Mail size={12} /> info@aau.edu.et
          </span>
        </div>
        <div className="hidden md:flex gap-4">
          <span className="flex items-center gap-1">
            <Globe size={12} /> www.aau.edu.et
          </span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Side: Image */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <img
            src="/image1.png"
            alt="AAU Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/20" />

          <div className="absolute top-0 right-[-1px] h-full w-24 fill-white">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full fill-white"
            >
              <path d="M100 0 C50 0 50 100 100 100 Z" />
            </svg>
          </div>

          <div className="absolute bottom-20 left-12 text-white z-10 max-w-md">
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-wider">
              Innovating the Future
            </h2>
            <p className="text-lg opacity-90 font-light italic border-l-4 border-blue-400 pl-4">
              "Empowering the next generation of Ethiopian entrepreneurs."
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <div className="inline-block p-3 rounded-full bg-blue-50 mb-2">
                <div className="h-14 w-14 rounded-full bg-[#0056b3] flex items-center justify-center text-white font-black text-lg shadow-lg">
                  AAU
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#001529] tracking-tight">
                AAU STARTUPS
              </h1>
              <p className="text-[#6c757d] mt-1 font-medium uppercase text-[10px] tracking-[0.2em]">
                Institutional Registration Portal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-50 border-red-200 text-red-800 rounded-lg">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label
                    htmlFor="username"
                    className="text-[10px] font-bold text-[#0056b3] uppercase ml-1"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="username"
                      placeholder="johndoe_251"
                      className="pl-11 h-11 rounded-full border-slate-200 bg-slate-50/50"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-bold text-[#0056b3] uppercase ml-1"
                  >
                    Official Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@aau.edu.et"
                      className="pl-11 h-11 rounded-full border-slate-200 bg-slate-50/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="department"
                    className="text-[10px] font-bold text-[#0056b3] uppercase ml-1"
                  >
                    Department
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="department"
                      placeholder="e.g. Computer Science"
                      className="pl-11 h-11 rounded-full border-slate-200 bg-slate-50/50"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-[10px] font-bold text-[#0056b3] uppercase ml-1"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-11 h-11 rounded-full border-slate-200 bg-slate-50/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {["founder", "mentor", "investor", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as any)}
                    className={`text-[9px] font-bold uppercase py-2 border rounded-full transition-all ${
                      role === r
                        ? "bg-[#0056b3] border-[#0056b3] text-white shadow-md"
                        : "bg-white text-slate-500 border-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-full bg-[#0056b3] hover:bg-[#003d82] text-white font-bold shadow-lg mt-2"
                disabled={isLoading}
              >
                {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#0056b3] font-bold hover:underline"
                >
                  SIGN IN
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
