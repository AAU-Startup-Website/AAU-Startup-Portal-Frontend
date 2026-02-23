"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BookOpen } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-white text-[#21282D] font-sans">
      {/* Header Section */}
      <section className="bg-[#CAD6DE]/30 py-16 px-4 border-b border-[#CAD6DE]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-[#005081] tracking-tight">
              Knowledge Library
            </h1>
            <p className="text-xl text-[#7D818B] max-w-2xl mx-auto">
              Access comprehensive guides, tutorials, and resources to
              accelerate your entrepreneurial journey.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-[#7D818B]" />
                <Input
                  placeholder="Search guides, videos, FAQs..."
                  className="pl-10 h-12 border-[#005081]/20 focus-visible:ring-[#005081]"
                />
              </div>
              <Button className="h-12 px-6 bg-[#005081] hover:bg-[#015384] text-white transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="guides" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-[#CAD6DE]/20 p-1 rounded-lg">
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm text-[#7D818B]"
              >
                Guides & Documents
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm text-[#7D818B]"
              >
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm text-[#7D818B]"
              >
                FAQs
              </TabsTrigger>
            </TabsList>

            {/* Guides - Empty State */}
            <TabsContent value="guides" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#21282D] mb-2">
                  Guides & Documents
                </h2>
                <p className="text-[#7D818B] mb-8">
                  Comprehensive resources for every stage of your startup journey
                </p>
              </div>
              <Card className="border-[#CAD6DE] max-w-2xl mx-auto">
                <CardContent className="py-16 px-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-[#005081]/10 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-[#005081]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-[#21282D]">
                        There are no guides yet
                      </h3>
                      <p className="text-[#7D818B] max-w-md">
                        Guides and documents will appear here soon. Check back
                        for resources to support your entrepreneurial journey.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Videos - Empty State */}
            <TabsContent value="videos" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#21282D] mb-2">
                  Video Tutorials
                </h2>
                <p className="text-[#7D818B] mb-8">
                  Learn through engaging video content from industry experts
                </p>
              </div>
              <Card className="border-[#CAD6DE] max-w-2xl mx-auto">
                <CardContent className="py-16 px-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-[#005081]/10 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-[#005081]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-[#21282D]">
                        There are no video tutorials yet
                      </h3>
                      <p className="text-[#7D818B] max-w-md">
                        Video tutorials will appear here soon. Check back for
                        learning content from our experts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQs - Empty State */}
            <TabsContent value="faqs" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#21282D] mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-[#7D818B] mb-8">
                  Find answers to common questions about our program
                </p>
              </div>
              <Card className="border-[#CAD6DE] max-w-2xl mx-auto">
                <CardContent className="py-16 px-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-[#005081]/10 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-[#005081]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-[#21282D]">
                        There are no FAQs yet
                      </h3>
                      <p className="text-[#7D818B] max-w-md">
                        FAQs will appear here soon. Check back for answers to
                        common questions about our program.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 bg-[#CAD6DE]/30 border-t border-[#CAD6DE]">
        <div className="container mx-auto max-w-7xl">
          <Card className="max-w-2xl mx-auto text-center p-8 bg-white border-[#005081]/10 shadow-sm">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-[#005081] mb-2">
                Need More Help?
              </h3>
              <p className="text-[#7D818B] mb-6">
                Our support team is here to help
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#005081] hover:bg-[#015384] text-white">
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-[#005081] text-[#005081] hover:bg-[#005081]/5"
                >
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
