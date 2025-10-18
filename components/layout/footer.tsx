import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-10">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* AAU Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-aau-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">AAU</span>
              </div>
              <h3 className="font-semibold aau-blue">AAU Startups Portal</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering innovation and entrepreneurship at Addis Ababa University.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/apply" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Apply Now
              </Link>
              <Link href="/startups" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Browse Startups
              </Link>
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/library" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/policies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Policies
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Addis Ababa University</p>
              <p>P.O. Box 1176</p>
              <p>Addis Ababa, Ethiopia</p>
              <p>startups@aau.edu.et</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">© 2024 Addis Ababa University. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
