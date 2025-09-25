import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/components/auth/auth-context";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AAU Startups Portal",
  description:
    "Empowering innovation and entrepreneurship at Addis Ababa University",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderWrapper />
          </Suspense>

          <main className="flex-1">{children}</main>

          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
