"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Shield } from "lucide-react";

export default function PoliciesPage() {
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
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#005081]">Policies & Guidelines</h1>
            <p className="text-[#7D818B] mt-2">
              Important policies and guidelines for using AAU Startups Portal
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card 
              className="border-[#CAD6DE] hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push('/terms')}
            >
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-[#005081]/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-[#005081]" />
                </div>
                <h2 className="text-2xl font-bold text-[#005081] mb-3">Terms of Service</h2>
                <p className="text-[#7D818B] mb-4">
                  Read our terms and conditions for using the AAU Startups Portal platform.
                </p>
                <Button variant="link" className="text-[#005081] p-0">
                  Read Terms →
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-[#CAD6DE] hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push('/privacy')}
            >
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-[#005081]/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-[#005081]" />
                </div>
                <h2 className="text-2xl font-bold text-[#005081] mb-3">Privacy Policy</h2>
                <p className="text-[#7D818B] mb-4">
                  Learn how we collect, use, and protect your personal information.
                </p>
                <Button variant="link" className="text-[#005081] p-0">
                  Read Privacy Policy →
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#CAD6DE]">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Community Guidelines</h2>
                <p className="text-[#21282D] leading-relaxed mb-4">
                  To maintain a positive and productive environment, all members of the AAU Startups 
                  Portal community are expected to:
                </p>
                <ul className="space-y-2 text-[#21282D] ml-6">
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Treat all members with respect and professionalism
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Provide constructive feedback and support to fellow entrepreneurs
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Respect intellectual property and confidential information
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Engage in honest and transparent communication
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Report any violations or concerns to administrators
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Application Guidelines</h2>
                <p className="text-[#21282D] leading-relaxed mb-4">
                  When submitting a startup idea or application:
                </p>
                <ul className="space-y-2 text-[#21282D] ml-6">
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Provide accurate and complete information
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Clearly articulate your problem statement and solution
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Include realistic financial projections and timelines
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Be prepared to answer questions and provide additional details
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Respond promptly to feedback from reviewers
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Code of Conduct</h2>
                <p className="text-[#21282D] leading-relaxed">
                  We are committed to providing a welcoming and inclusive environment. Harassment, 
                  discrimination, or any form of inappropriate behavior will not be tolerated. 
                  Violations may result in suspension or removal from the platform.
                </p>
              </div>

              <div className="pt-6 border-t border-[#CAD6DE]">
                <p className="text-[#7D818B] text-sm">
                  For questions about our policies or to report concerns, please contact us at{" "}
                  <a href="mailto:support@aaustartups.edu.et" className="text-[#005081] hover:underline">
                    support@aaustartups.edu.et
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
