"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="h-8 w-8 text-[#005081]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#005081]">Terms of Service</h1>
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
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Acceptance of Terms</h2>
                <p className="text-[#21282D] leading-relaxed">
                  By accessing and using the AAU Startups Portal, you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to these terms, 
                  please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Use of Service</h2>
                <p className="text-[#21282D] leading-relaxed mb-3">
                  You agree to use the AAU Startups Portal only for lawful purposes and in accordance 
                  with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#21282D] ml-4">
                  <li>Use the service in any way that violates applicable laws or regulations</li>
                  <li>Impersonate or attempt to impersonate another user or person</li>
                  <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                  <li>Upload or transmit viruses or any other malicious code</li>
                  <li>Attempt to gain unauthorized access to any portion of the service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">User Accounts</h2>
                <p className="text-[#21282D] leading-relaxed">
                  When you create an account with us, you must provide accurate, complete, and current 
                  information. You are responsible for safeguarding your password and for all activities 
                  that occur under your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Intellectual Property</h2>
                <p className="text-[#21282D] leading-relaxed">
                  The service and its original content, features, and functionality are owned by 
                  AAU Startups Portal and are protected by international copyright, trademark, patent, 
                  trade secret, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">User Content</h2>
                <p className="text-[#21282D] leading-relaxed">
                  You retain all rights to any content you submit, post, or display on or through 
                  the service. By submitting content, you grant us a worldwide, non-exclusive, 
                  royalty-free license to use, reproduce, and distribute your content in connection 
                  with the service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Application Process</h2>
                <p className="text-[#21282D] leading-relaxed">
                  Submission of a startup idea or application does not guarantee acceptance into 
                  any program. All applications are subject to review and approval by AAU administrators. 
                  We reserve the right to reject any application at our discretion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Termination</h2>
                <p className="text-[#21282D] leading-relaxed">
                  We may terminate or suspend your account and access to the service immediately, 
                  without prior notice or liability, for any reason, including breach of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Limitation of Liability</h2>
                <p className="text-[#21282D] leading-relaxed">
                  In no event shall AAU Startups Portal, nor its directors, employees, partners, 
                  agents, suppliers, or affiliates, be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising out of your use of the service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Changes to Terms</h2>
                <p className="text-[#21282D] leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. We will provide 
                  notice of any significant changes by posting the new Terms on this page.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#005081] mb-4">Contact Us</h2>
                <p className="text-[#21282D] leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-[#005081] font-medium mt-2">
                  support@aaustartups.edu.et
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
