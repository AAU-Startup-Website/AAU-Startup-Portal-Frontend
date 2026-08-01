"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";
import {
  Menu,
  User,
  LogOut,
  Settings,
  Home,
  FileText,
  Users,
  BookOpen,
  Calendar,
  Briefcase,
  Trophy,
  Megaphone,
} from "lucide-react";

/* ---------------- NAV CONFIG ---------------- */

const publicNavItems = [
  { href: "/", label: "Home", icon: Home },
  //{ href: "/apply", label: "Apply", icon: FileText },
  { href: "/startups/browse", label: "Startups", icon: Briefcase },
  { href: "/stories", label: "Stories", icon: Trophy },
  { href: "/events/browse", label: "Events", icon: Calendar },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/announcements", label: "Announcements", icon: Megaphone },
];

const protectedPublicNavItems = [
  { href: "/cofounders", label: "Co-founders", icon: Users },
  { href: "/resources", label: "Resources", icon: BookOpen },
];

const roleBasedNavItems = {
  founder: [
    { href: "/founder", label: "My Dashboard", icon: Home },
    { href: "/cofounders", label: "Co-founders", icon: Users },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/messages", label: "Messages", icon: Megaphone },
    { href: "/bookings", label: "Bookings", icon: Calendar },
  ],
  mentor: [
    { href: "/mentor", label: "My Dashboard", icon: Home },
    { href: "/cofounders", label: "Co-founders", icon: Users },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/messages", label: "Messages", icon: Megaphone },
    { href: "/events/browse", label: "Events", icon: Calendar },
  ],
  investor: [
    { href: "/investor", label: "My Dashboard", icon: Home },
    { href: "/startups/browse", label: "Browse Startups", icon: Briefcase },
    { href: "/opportunities", label: "Opportunities", icon: Trophy },
    { href: "/events/browse", label: "Events", icon: Calendar },
  ],
  admin: [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/reviews", label: "Reviews", icon: FileText },
    { href: "/analytics", label: "Analytics", icon: Briefcase },
    { href: "/admin/startups", label: "Manage Startups", icon: Briefcase },
    { href: "/admin/events", label: "Manage Events", icon: Calendar },
    { href: "/resources", label: "Manage Resources", icon: BookOpen },
  ],
};

/* ---------------- HEADER ---------------- */

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const userRole = user?.role;
  const userName = user?.name || "User";

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.charAt(0).toUpperCase();
  };

  const getNavItems = () => {
    if (userRole && isAuthenticated) {
      return (
        roleBasedNavItems[userRole as keyof typeof roleBasedNavItems] || []
      );
    } else if (isAuthenticated) {
      return [...publicNavItems, ...protectedPublicNavItems];
    }
    return publicNavItems;
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto max-w-7xl flex h-20 items-center justify-between px-6">
        {/* -------- AAU STARTUP CENTER LOGO -------- */}
        <Link
          href="/"
          className="flex items-center space-x-4 cursor-pointer group"
        >
          {/* Static Logo Container (no hover effects) */}
          <div className="relative overflow-hidden rounded-full border-2 border-transparent transition-all duration-500 p-0.5">
            <img
              src="/logo.png"
              alt="AAU Startup Center Logo"
              className="h-12 w-auto object-contain transition-transform duration-500 ease-in-out"
            />
          </div>

          <div className="hidden md:flex flex-col justify-center pl-4 border-l-2 border-slate-200 h-10">
            {/* Amharic Text - PRIMARY BLUE */}
            <div className="text-primary text-[16px] tracking-[0.5px] leading-none mb-1 group-hover:text-blue-700 transition-colors duration-300">
              አዲስ አበባ ዩኒቨርሲት ስታርታፕስ ማዕከል
            </div>

            {/* English Text - RED (#E63946) */}
            <div className="text-[#E63946]  text-[14px] tracking-[1.5px] leading-none group-hover:text-red-700 transition-colors duration-300">
              ADDIS ABABA UNIVERSITY STARTUPS CENTER
            </div>
          </div>
        </Link>

        {/* -------- DESKTOP NAV (Slide-In Underline Animation) -------- */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // FIX: Added 'after:content-['']' which is mandatory for pseudo-elements to show up
              className="relative text-[15px] font-medium text-slate-600 transition-colors duration-300 hover:text-primary py-2
                         after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* -------- RIGHT ACTIONS -------- */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/20 hover:scale-105 transition-all flex items-center justify-center">
                  <Avatar className="h-9 w-9 border border-gray-200">
                    {user?.avatar && (
                      <AvatarImage src={user.avatar} alt={userName} />
                    )}
                    <AvatarFallback className="bg-primary text-white font-bold">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 animate-in fade-in zoom-in-95 duration-200"
              >
                <DropdownMenuLabel>
                  <p className="text-sm font-medium text-primary">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {userRole}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/me"
                    className="cursor-pointer hover:text-primary"
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="cursor-pointer hover:text-primary"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              {/* Login Button - Animated Background Pill */}
              <Link
                href="/login"
                className="relative px-5 py-2 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-primary group"
              >
                {/* Background Pill: Changed to bg-blue-50 to ensure visibility */}
                <span className="absolute inset-0 rounded-full bg-blue-50 scale-0 transition-transform duration-300 group-hover:scale-100 origin-center" />
                {/* Text Content */}
                <span className="relative z-10">Login</span>
              </Link>

              {/* Register Button - Solid Primary */}
              <Button
                className="bg-primary hover:bg-blue-800 text-white font-bold shadow-md hover:shadow-lg hover:shadow-blue-900/20 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* -------- MOBILE MENU -------- */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-primary hover:bg-blue-50"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 border-l-primary/10">
              <div className="mt-6 space-y-6">
                <div className="flex items-center space-x-3 pb-6 border-b border-gray-100">
                  <img
                    src="/logo.png"
                    className="h-10 w-auto"
                    alt="AAU Startup Center Logo"
                  />
                  <div>
                    <p className="font-bold text-primary">AAU Startup Center</p>
                    {userRole ? (
                      <p className="text-xs text-muted-foreground capitalize">
                        {userRole}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Welcome Guest
                      </p>
                    )}
                  </div>
                </div>

                <nav className="flex flex-col space-y-2">
                  {/* Mobile Menu Items - Kept Simple & Accessible */}
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-primary transition-all duration-200 font-medium active:scale-95"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {!isAuthenticated && (
                  <div className="pt-6 border-t border-gray-100 space-y-3">
                    <Button
                      className="w-full bg-primary text-white font-bold shadow-lg shadow-blue-900/10 rounded-full"
                      size="lg"
                      asChild
                    >
                      <Link href="/register">Create Account</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary/20 text-primary hover:bg-blue-50 font-semibold rounded-full"
                      size="lg"
                      asChild
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
