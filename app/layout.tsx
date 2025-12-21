"use client"; // Required to use usePathname

import type React from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { usePathname } from "next/navigation"; // Hook to detect current route
import { Analytics } from "@vercel/analytics/next";
import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/components/auth/auth-context";
import { Suspense } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define which paths should NOT have header and footer
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}
      >
        <AuthProvider>
          {/* Only show Header if NOT on login or register page */}
          {!isAuthPage && (
            <Suspense fallback={<div className="h-16 border-b animate-pulse bg-slate-50" />}>
              <HeaderWrapper />
            </Suspense>
          )}

          <main className="flex-1">{children}</main>

          {/* Only show Footer if NOT on login or register page */}
          {!isAuthPage && (
            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-50" />}>
              <Footer />
            </Suspense>
          )}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}