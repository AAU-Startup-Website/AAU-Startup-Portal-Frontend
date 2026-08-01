"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { requestPasswordReset } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
    } catch {
      // Intentionally ignored: always show the same generic confirmation
      // regardless of whether the email exists, so this page can't be used
      // to enumerate registered accounts.
    } finally {
      setIsLoading(false);
      setSubmitted(true);
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
            Reset your password
          </h1>
          <p className="text-[#7D818B] text-sm font-medium">
            Enter your account email and we'll send you a reset link.
          </p>
        </div>

        {submitted ? (
          <Alert className="bg-green-50 border-green-200 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="text-sm ml-2">
              If an account exists for {email}, a password reset link has
              been sent. Check your inbox (and spam folder) for the email.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-bold text-[#21282D] uppercase tracking-wider"
              >
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D818B] group-focus-within:text-[#005081] transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@aau.edu.et"
                  className="pl-9 h-11 bg-slate-50 border-[#CAD6DE] focus:border-[#005081] focus:ring-[#005081] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
                  SENDING...
                </>
              ) : (
                "SEND RESET LINK"
              )}
            </Button>
          </form>
        )}

        <div className="text-center pt-4 border-t border-[#CAD6DE]/50">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#005081] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
