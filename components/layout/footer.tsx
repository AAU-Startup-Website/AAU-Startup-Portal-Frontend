import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    // Background: Light Gray-Blue with opacity to match other sections
    <footer className="border-t border-[#CAD6DE] bg-[#CAD6DE]/30 mt-10">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* -------- AAU Branding & Logo -------- */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-4 group">
              {/* Logo Image */}
              <div className="relative overflow-hidden rounded-full p-0.5">
                <img
                  src="/logo.png"
                  alt="AAU Startup Center Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Logo Text */}
              <div className="flex flex-col justify-center pl-4 border-l-2 border-[#CAD6DE] h-10">
                {/* Amharic Text - Primary Blue */}
                <div className="text-[#005081] text-[16px] font-bold leading-none mb-1">
                  ኤኤዩ ስታርታፕ ማዕከል
                </div>

                {/* English Text - AAU Red */}
                <div className="text-[#E63946] text-[12px] font-bold tracking-[1.5px] leading-none">
                  AAU STARTUP CENTER
                </div>
              </div>
            </Link>

            <p className="text-sm text-[#7D818B] leading-relaxed max-w-xs pt-2">
              Empowering innovation and entrepreneurship at Addis Ababa
              University. Building the future of Ethiopia, one startup at a
              time.
            </p>
          </div>

          {/* -------- Quick Links -------- */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#005081] text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/apply"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                Apply Now
              </Link>
              <Link
                href="/startups"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                Browse Startups
              </Link>
              <Link
                href="/resources"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                Resources
              </Link>
              <Link
                href="/events"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                Events
              </Link>
            </nav>
          </div>

          {/* -------- Support -------- */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#005081] text-lg">Support</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/library"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                Help Center
              </Link>
              <Link
                href="/about"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                About Us
              </Link>
              <Link
                href="/policies"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                Policies
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[#7D818B] hover:text-[#005081] hover:underline transition-all w-fit"
              >
                Contact Support
              </Link>
            </nav>
          </div>

          {/* -------- Contact Info -------- */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#005081] text-lg">Contact Us</h4>
            <div className="space-y-3 text-sm text-[#7D818B]">
              <p>Addis Ababa University</p>
              <p>P.O. Box 1176</p>
              <p>Addis Ababa, Ethiopia</p>
              <a
                href="mailto:startups@aau.edu.et"
                className="block text-[#005081] hover:underline font-medium"
              >
                startups@aau.edu.et
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[#CAD6DE]" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-[#7D818B]">
            © {new Date().getFullYear()} Addis Ababa University. All rights
            reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-[#7D818B] hover:text-[#005081] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[#7D818B] hover:text-[#005081] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
