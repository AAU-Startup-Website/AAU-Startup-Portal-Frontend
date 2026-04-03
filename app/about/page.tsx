"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, Target, Lightbulb, Award } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#CAD6DE]/30 py-12 px-4 border-b border-[#CAD6DE]">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-[#005081]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#005081] mb-4">About AAU Startups Portal</h1>
            <p className="text-xl text-[#7D818B] max-w-3xl mx-auto">
              Empowering the next generation of Ethiopian entrepreneurs through innovation, 
              mentorship, and collaboration
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#005081] mb-6">Our Mission</h2>
            <p className="text-lg text-[#21282D] leading-relaxed mb-4">
              The AAU Startups Portal is dedicated to fostering entrepreneurship and innovation 
              within Addis Ababa University and the broader Ethiopian startup ecosystem. We provide 
              a comprehensive platform that connects aspiring founders with mentors, investors, 
              and resources needed to transform ideas into successful ventures.
            </p>
            <p className="text-lg text-[#21282D] leading-relaxed">
              Our mission is to create a thriving entrepreneurial community where students, 
              faculty, and alumni can collaborate, learn, and build sustainable businesses that 
              address real-world challenges in Ethiopia and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-[#CAD6DE] text-center">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 bg-[#005081]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-[#005081]" />
                </div>
                <h3 className="text-xl font-bold text-[#005081] mb-2">Innovation</h3>
                <p className="text-[#7D818B]">
                  Fostering creative solutions to local and global challenges
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#CAD6DE] text-center">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 bg-[#005081]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#005081]" />
                </div>
                <h3 className="text-xl font-bold text-[#005081] mb-2">Community</h3>
                <p className="text-[#7D818B]">
                  Building a supportive network of entrepreneurs and mentors
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#CAD6DE] text-center">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 bg-[#005081]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-[#005081]" />
                </div>
                <h3 className="text-xl font-bold text-[#005081] mb-2">Impact</h3>
                <p className="text-[#7D818B]">
                  Creating sustainable businesses that drive economic growth
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#CAD6DE] text-center">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 bg-[#005081]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#005081]" />
                </div>
                <h3 className="text-xl font-bold text-[#005081] mb-2">Excellence</h3>
                <p className="text-[#7D818B]">
                  Maintaining high standards in all our programs and initiatives
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#CAD6DE]/20 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#005081] mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#005081] mb-3">For Founders</h3>
                <ul className="space-y-2 text-[#21282D]">
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Idea validation and business planning support
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Access to experienced mentors and advisors
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Networking opportunities with investors
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Resources and tools for startup development
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#005081] mb-3">For Mentors & Investors</h3>
                <ul className="space-y-2 text-[#21282D]">
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Connect with promising startups and founders
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Share expertise and give back to the community
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Discover investment opportunities
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#005081] mr-2">•</span>
                    Track startup progress and milestones
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#005081] mb-4">Join Our Community</h2>
            <p className="text-lg text-[#7D818B] mb-8 max-w-2xl mx-auto">
              Whether you're a student with an idea, an experienced entrepreneur, or an investor 
              looking to support innovation, there's a place for you in the AAU Startups ecosystem.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-[#005081] hover:bg-[#015384] text-white"
                onClick={() => router.push('/register')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-[#005081] text-[#005081]"
                onClick={() => router.push('/apply')}
              >
                Submit Your Idea
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
