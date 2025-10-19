"use client"; // Add this directive at the very top

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
import { ArrowRight, Calendar, Target, Lightbulb, Rocket } from "lucide-react";

export default function HomePage() {
  const heroImages = [
    "/image1.png", // Replace with the actual paths to your uploaded images
    "/image3.png",
    "/image2.png",
    "/image4.png",
  ];

  return (
    <div className="min-h-screen">
      {/* Custom styles for the image slider */}
      <style jsx>{`
        @keyframes slide-fade-in-out {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          10% {
            opacity: 1;
            transform: translateX(0%);
          }
          25% {
            opacity: 1;
            transform: translateX(0%);
          }
          35% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 0;
            transform: translateX(-100%);
          }
        }

        .hero-image-slide {
          animation: slide-fade-in-out 30s infinite; /* 30s for the total cycle, adjust as needed */
        }

        /* Adjust delay for each image */
        .hero-image-slide:nth-child(1) {
          animation-delay: 0s;
        }
        .hero-image-slide:nth-child(2) {
          animation-delay: 7.5s; /* 30s / 4 images = 7.5s per image visibility */
        }
        .hero-image-slide:nth-child(3) {
          animation-delay: 15s;
        }
        .hero-image-slide:nth-child(4) {
          animation-delay: 22.5s;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`AAU Startups background ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover hero-image-slide"
            />
          ))}
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content over the slider */}
        <div className="relative z-10 container mx-auto max-w-7xl text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge className="bg-aau-gold text-aau-blue hover:bg-aau-gold/90">
              🚀 Now Accepting Applications
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Transform Your <span className="text-aau-blue-light">Ideas</span>{" "}
              Into
              <span className="text-aau-gold-light"> Impactful Startups</span>
            </h1>

            <p className="text-xl text-white/90 text-pretty max-w-2xl mx-auto">
              Join AAU's premier startup incubation program. Get mentorship,
              resources, and funding to turn your innovative ideas into
              successful businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="bg-aau-blue hover:bg-aau-blue/90"
              >
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-gray text-black hover:bg-aau-blue hover:text-aau-blue"
              >
                <Link href="/startups">Browse Startups</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-aau-blue">150+</div>
              <div className="text-sm text-muted-foreground">
                Startups Launched
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-aau-blue">50+</div>
              <div className="text-sm text-muted-foreground">
                Expert Mentors
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-aau-blue">$2M+</div>
              <div className="text-sm text-muted-foreground">
                Funding Raised
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-aau-blue">85%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose AAU Startups Portal?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, launch, and scale your startup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-aau-blue/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-aau-blue" />
                </div>
                <CardTitle>Expert Mentorship</CardTitle>
                <CardDescription>
                  Get guidance from industry experts and successful
                  entrepreneurs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-aau-gold/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-aau-gold" />
                </div>
                <CardTitle>Funding Opportunities</CardTitle>
                <CardDescription>
                  Access to seed funding, grants, and investor networks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-aau-blue/10 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-aau-blue" />
                </div>
                <CardTitle>Resources & Tools</CardTitle>
                <CardDescription>
                  Co-working spaces, legal support, and business development
                  tools
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Startups */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Startups</h2>
              <p className="text-muted-foreground">
                Discover innovative companies from our community
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/startups">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-aau-blue to-aau-gold"></div>
                    <Badge variant="secondary">FinTech</Badge>
                  </div>
                  <CardTitle>EthioPay Solutions</CardTitle>
                  <CardDescription>
                    Revolutionary mobile payment platform for rural Ethiopia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Series A</span>
                    <span>$500K raised</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">
                Join our community events and workshops
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Startup Pitch Night",
                date: "Dec 15, 2024",
                time: "6:00 PM",
                location: "AAU Main Campus",
              },
              {
                title: "Entrepreneurship Workshop",
                date: "Dec 20, 2024",
                time: "2:00 PM",
                location: "Innovation Hub",
              },
            ].map((event, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {event.date}
                          </span>
                          <span>{event.time}</span>
                        </div>
                        <div className="mt-1">{event.location}</div>
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                      RSVP
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-aau-blue text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90">
              Join hundreds of entrepreneurs who have transformed their ideas
              into successful businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-aau-gold text-aau-blue hover:bg-aau-gold/90"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:text-aau-blue bg-transparent"
              >
                <Link href="/cofounders">Find Co-founders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
