"use client";

import type React from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { confirmPasswordReset } from "@/lib/api";

export default function ResetPasswordConfirmPage() {
  const params = useParams<{ uid: string; token: string }>();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await confirmPasswordReset(params.uid, params.token, newPassword);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: any) {
      setError(
        err.message ||
          "This reset link is invalid or has expired. Please request a new one."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-[#005081]/5 mb-2">
            <div className="h-12 w-12 rounded-full bg-[#005081] flex items-center justify-center text-white shadow-lg">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#005081] tracking-tight">
            Set a new password
          </h1>
          <p className="text-[#7D818B] text-sm font-medium">
            Choose a new password for your account.
          </p>
        </div>

        {success ? (
          <Alert className="bg-green-50 border-green-200 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="text-sm ml-2">
              Your password has been reset. Redirecting you to login...
            </AlertDescription>
          </Alert>
        ) : (
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
              <div className="space-y-1.5">
                <Label
                  htmlFor="newPassword"
                  className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                >
                  New Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 h-11 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D818B] hover:text-[#005081]"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 h-11 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#005081] hover:bg-[#015384] text-white font-bold tracking-wide shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  RESETTING...
                </>
              ) : (
                "RESET PASSWORD"
              )}
            </Button>
          </form>
        )}

        <div className="text-center pt-4 border-t border-[#CAD6DE]/50">
          <Link
            href="/login"
            className="text-sm font-bold text-[#005081] hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
