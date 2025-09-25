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

const publicNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/apply", label: "Apply", icon: FileText },
  { href: "/startups", label: "Startups", icon: Briefcase },
  { href: "/stories", label: "Stories", icon: Trophy },
  { href: "/events", label: "Events", icon: Calendar },
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
    { href: "/events", label: "Events", icon: Calendar },
  ],
  investor: [
    { href: "/investor", label: "My Dashboard", icon: Home },
    { href: "/startups", label: "Browse Startups", icon: Briefcase },
    { href: "/opportunities", label: "Opportunities", icon: Trophy },
    { href: "/events", label: "Events", icon: Calendar },
  ],
  admin: [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/reviews", label: "Reviews", icon: FileText },
    { href: "/analytics", label: "Analytics", icon: Briefcase },
    { href: "/startups", label: "Manage Startups", icon: Briefcase },
    { href: "/resources", label: "Manage Resources", icon: BookOpen },
  ],
};

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const userRole = user?.role;
  const userName = user?.name || "User";
  const userAvatar = user?.avatar;

  // Generate initials from user name
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const getNavItems = () => {
    if (userRole && isAuthenticated) {
      return roleBasedNavItems[userRole] || [];
    } else if (isAuthenticated) {
      // Authenticated but no role selected yet - show public + protected pages
      return [...publicNavItems, ...protectedPublicNavItems];
    } else {
      // Not authenticated - show only public pages
      return publicNavItems;
    }
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        {/* Logo and Portal Name */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-aau-blue flex items-center justify-center">
              <span className="text-white font-bold text-sm">AAU</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-aau-blue">
                AAU Startups Portal
              </h1>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* User Menu or Auth Buttons */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userAvatar || "/placeholder.svg"}
                      alt={userName}
                    />
                    <AvatarFallback className="bg-aau-blue text-white text-sm">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">
                      {userRole || "No role selected"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/me">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/me">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-aau-blue hover:bg-aau-blue/90">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <div className="h-10 w-10 rounded-full bg-aau-blue flex items-center justify-center">
                    <span className="text-white font-bold">AAU</span>
                  </div>
                  <div>
                    <h2 className="font-semibold">AAU Startups Portal</h2>
                    {userRole && (
                      <p className="text-sm text-muted-foreground capitalize">
                        {userRole}
                      </p>
                    )}
                  </div>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" asChild className="justify-start">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-aau-blue hover:bg-aau-blue/90 justify-start"
                    >
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Register
                      </Link>
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
