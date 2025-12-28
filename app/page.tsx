"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Lightbulb,
  Rocket,
  ExternalLink,
  Users,
} from "lucide-react";

export default function HomePage() {
  const heroImages = [
    "/image1.png",
    "/image2.png",
    "/image3.png",
    "/image4.png",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Custom Styles for Animation */}
      <style jsx global>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          30% {
            opacity: 1;
            transform: scale(1);
          }
          40% {
            opacity: 0;
            transform: scale(1);
          }
          100% {
            opacity: 0;
          }
        }
        .hero-slide {
          animation: fadeSlide 16s ease-in-out infinite;
        }
        .hero-slide:nth-child(1) {
          animation-delay: 0s;
        }
        .hero-slide:nth-child(2) {
          animation-delay: 4s;
        }
        .hero-slide:nth-child(3) {
          animation-delay: 8s;
        }
        .hero-slide:nth-child(4) {
          animation-delay: 12s;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-[600px] overflow-hidden bg-white">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 h-full z-20 flex items-center bg-white/95 lg:bg-white px-6 py-8 lg:py-0">
          <div className="container mx-auto max-w-2xl pl-2 lg:pl-12 space-y-6">
            {/* Title */}
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-blue-50 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-1">
                Addis Ababa University
              </div>
              {/* UPDATED: Reduced text size to ensure buttons are visible */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-primary">
                EMPOWER MINDS, <br />
                CREATE INNOVATION <br />
                <span className="text-primary drop-shadow-sm">
                  AND IMPACT SOCIETY NOW!
                </span>
              </h1>

              {/* Decorative Line */}
              <div className="h-1.5 w-20 bg-primary rounded-full"></div>

              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-lg">
                The AAU Startups Portal is your gateway to innovation. We
                prepare students for successful completion, employability, and
                job creation through entrepreneurship.
              </p>
            </div>

            {/* Buttons - Visible immediately */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-blue-800 font-bold px-8 shadow-lg w-full sm:w-auto h-11 text-base transition-all duration-300"
              >
                <Link href="/register">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary font-bold px-8 w-full sm:w-auto h-11 text-base hover:text-primary"
              >
                <Link href="/startups">
                  Explore Startups <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Image Slider */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 lg:block overflow-hidden">
          {/* Overlay to darken images slightly for contrast */}
          <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply pointer-events-none"></div>

          <div className="relative w-full h-full">
            {heroImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`AAU Campus ${index + 1}`}
                // Added backfaceVisibility to prevent flickering during animation
                className="absolute inset-0 w-full h-full object-cover hero-slide"
                style={{ backfaceVisibility: "hidden" }}
              />
            ))}
          </div>

          {/* FIXED: Curved Cutout Separator (White) */}
          <div
            className="absolute -left-[1px] top-0 h-full w-32 bg-white z-[50] hidden lg:block"
            style={{
              clipPath: "ellipse(100% 100% at 0% 50%)",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          ></div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl space-y-4">
              <span className="text-primary/80 font-bold uppercase tracking-widest text-sm">
                Why Join Us?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Everything you need to build, launch, and scale.
              </h2>
              <p className="text-lg text-slate-600">
                Leverage the full power of Addis Ababa University's ecosystem to
                transform your idea into a reality.
              </p>
            </div>
            <Button
              asChild
              className="bg-primary hover:bg-blue-800 text-white font-bold h-12 px-6"
            >
              <Link href="/apply">Start Your Application</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8 text-primary" />}
              title="Expert Mentorship"
              desc="Get personalized guidance from industry experts and successful Ethiopian entrepreneurs."
            />
            <FeatureCard
              icon={<Target className="w-8 h-8 text-primary" />}
              title="Funding Access"
              desc="Direct connections to seed funding, government grants, and our private investor network."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-primary" />}
              title="Collaborative Network"
              desc="Join a vibrant community of innovators, developers, and co-founders at AAU."
            />
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-white flex flex-col lg:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Serve Humanity?
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Join hundreds of students who have transformed their intellect
                into impactful businesses. The journey starts here.
              </p>
              <div className="flex gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-blue-50 text-primary font-bold border-none"
                >
                  <Link href="/register">Create Account</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Decorative Icon Background */}
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 rotate-12 pointer-events-none">
              <Rocket size={450} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-slate-100 bg-white hover:-translate-y-1">
      <CardHeader className="space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center transition-colors duration-300">
          <div className="transition-colors duration-300">{icon}</div>
        </div>
        <CardTitle className="text-xl font-bold text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600 leading-relaxed text-base">
          {desc}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
