"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Calendar, Target, Lightbulb, Rocket, ExternalLink } from "lucide-react";

export default function HomePage() {
  const heroImages = [
    "/image1.png",
    "/image3.png",
    "/image2.png",
    "/image4.png",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* AAU Brand Colors defined in a style block for ease of use */}
      <style jsx global>{`
        :root {
          --aau-blue: #005696;
          --aau-gold: #f2a900;
          --aau-dark-blue: #003d6b;
        }
        @keyframes fast-slide-in-out {
          0% { opacity: 0; transform: scale(1.1); }
          10% { opacity: 1; transform: scale(1); }
          30% { opacity: 1; transform: scale(1); }
          40% { opacity: 0; transform: scale(1); }
          100% { opacity: 0; }
        }
        .hero-image-slide {
          animation: fast-slide-in-out 16s ease-in-out infinite;
        }
        .hero-image-slide:nth-child(1) { animation-delay: 0s; }
        .hero-image-slide:nth-child(2) { animation-delay: 4s; }
        .hero-image-slide:nth-child(3) { animation-delay: 8s; }
        .hero-image-slide:nth-child(4) { animation-delay: 12s; }
      `}</style>

      {/* Hero Section - Matching the Screenshot Style */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-[#005696]">
        {/* Left Side: Image with Arch Cut-out */}
        <div className="absolute left-0 top-0 w-1/2 h-full z-0 hidden lg:block">
           <div className="relative w-full h-full">
            {heroImages.map((src, index) => (
                <img
                key={index}
                src={src}
                alt="AAU Campus"
                className="absolute inset-0 w-full h-full object-cover hero-image-slide"
                />
            ))}
            {/* The White Curved Overlay from the screenshot */}
            <div className="absolute -right-1 top-0 h-full w-32 bg-[#005696] clip-path-curve" 
                 style={{ clipPath: 'ellipse(100% 100% at 100% 50%)', transform: 'translateX(50%)' }}>
            </div>
           </div>
        </div>

        {/* Right Side / Mobile Center: Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="lg:w-1/2 lg:ml-auto text-white space-y-8">
            <div className="space-y-4">
               <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
                SEEK WISDOM, <br/>
                <span className="text-white/90">ELEVATE YOUR INTELLECT</span> <br/>
                <span className="text-[#f2a900]">AND SERVE HUMANITY</span>
              </h1>
              
              <div className="h-1 bg-[#f2a900] w-24"></div>

              <p className="text-lg md:text-xl text-blue-50/90 max-w-xl font-medium leading-relaxed">
                AAU provides an exceptional educational experience to all students that 
                prepares them for successful completion, employability and job creation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#005696] hover:bg-blue-50 font-bold px-8">
                Login <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8">
                Find Co-founders <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats - Inspired by "Our Impact in Numbers" */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-6">
          <p className="text-[#005696] font-bold uppercase tracking-widest text-sm mb-4">Statistics</p>
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Startups Launched", value: "150+" },
              { label: "Expert Mentors", value: "50+" },
              { label: "Funding Raised", value: "$2M+" },
              { label: "Success Rate", value: "85%" },
            ].map((stat, i) => (
              <div key={i} className="border-l-4 border-[#f2a900] pl-6 py-2">
                <div className="text-4xl font-black text-[#005696]">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Clean Modern Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-[#003d6b] mb-4">Why Choose AAU Startups?</h2>
              <p className="text-lg text-slate-600">Everything you need to build, launch, and scale your startup within the Ethiopian ecosystem.</p>
            </div>
            <Button className="bg-[#005696] hover:bg-[#003d6b]">Join the Program</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Lightbulb className="text-[#f2a900]" />} 
              title="Expert Mentorship" 
              desc="Get guidance from industry experts and successful Ethiopian entrepreneurs."
            />
            <FeatureCard 
              icon={<Target className="text-[#f2a900]" />} 
              title="Funding Opportunities" 
              desc="Access to seed funding, government grants, and private investor networks."
            />
            <FeatureCard 
              icon={<Rocket className="text-[#f2a900]" />} 
              title="Resources & Tools" 
              desc="Modern co-working spaces, legal support, and global business tools."
            />
          </div>
        </div>
      </section>

      {/* Events Section - Structured List */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-[#005696] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-lg">Join hundreds of entrepreneurs who have transformed their ideas into successful businesses.</p>
              <div className="flex gap-4">
                <Button className="bg-[#f2a900] hover:bg-[#d49400] text-[#003d6b] font-bold">Apply Now</Button>
                <Button variant="link" className="text-white hover:text-[#f2a900]">Find Co-founders →</Button>
              </div>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
               <Rocket size={400} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white shadow-md">
      <CardHeader>
        <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-[#005696] transition-colors duration-300">
          <div className="group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl text-[#003d6b]">{title}</CardTitle>
        <CardDescription className="text-slate-600 leading-relaxed pt-2">
          {desc}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}