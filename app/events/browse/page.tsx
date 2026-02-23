"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Calendar } from "lucide-react";

export default function BrowseEventsPage() {
  return (
    <div className="min-h-screen bg-white text-[#21282D] font-sans">
      {/* Header Section */}
      <section className="bg-[#CAD6DE]/30 py-16 px-4 border-b border-[#CAD6DE]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-[#005081] tracking-tight">
              Explore Events
            </h1>
            <p className="text-xl text-[#7D818B] max-w-2xl mx-auto">
              Discover pitch events, networking sessions, and workshops from
              AAU Startups Center. Connect with the innovation community.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-[#7D818B]" />
                <Input
                  placeholder="Search events by title, location, or type..."
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#21282D]">
                Upcoming Events
              </h2>
              <p className="text-[#7D818B]">
                Pitch events, workshops, and networking opportunities
              </p>
            </div>
            <Select>
              <SelectTrigger className="w-48 border-[#CAD6DE]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pitch">Pitch Event</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="demo">Demo Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Empty State */}
          <Card className="border-[#CAD6DE] max-w-2xl mx-auto">
            <CardContent className="py-16 px-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="h-20 w-20 rounded-full bg-[#005081]/10 flex items-center justify-center">
                  <Calendar className="h-10 w-10 text-[#005081]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#21282D]">
                    There are no events yet
                  </h3>
                  <p className="text-[#7D818B] max-w-md">
                    Check back later for upcoming pitch days, workshops, and
                    networking sessions from our community.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
