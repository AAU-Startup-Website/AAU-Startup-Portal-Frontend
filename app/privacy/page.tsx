"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#CAD6DE]/30 py-12 px-4 border-b border-[#CAD6DE]">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-[#005081]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-[#005081]/10 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-[#005081]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#005081]">Privacy Policy</h1>
              <p className="text-[#7D818B] mt-2">Last updated: April 3, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-[#CAD6DE]">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Introduction</h2>
                <p className="text-[#21282D] leading-relaxed">
                  AAU Startups Portal ("we", "our", or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you use our platform.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Information We Collect</h2>
                <p className="text-[#21282D] leading-relaxed mb-3">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#21282D] ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials and profile information</li>
                  <li>Startup ideas, business plans, and related documents</li>
                  <li>Communications with mentors, investors, and other users</li>
                  <li>Usage data and analytics</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">How We Use Your Information</h2>
                <p className="text-[#21282D] leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#21282D] ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your applications and connect you with mentors and investors</li>
                  <li>Send you updates, announcements, and administrative messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns and improve user experience</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Information Sharing</h2>
                <p className="text-[#21282D] leading-relaxed">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#21282D] ml-4 mt-3">
                  <li>Mentors and investors (with your consent)</li>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Data Security</h2>
                <p className="text-[#21282D] leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Your Rights</h2>
                <p className="text-[#21282D] leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#21282D] ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Contact Us</h2>
                <p className="text-[#21282D] leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-[#005081] font-medium mt-2">
                  privacy@aaustartups.edu.et
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
