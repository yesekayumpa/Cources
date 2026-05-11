"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Trophy,
  Code,
  BarChart3,
  User,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAppStore();

  const navigation = [
    { name: "Accueil", href: "/", icon: Home },
    {
      name: "Apprentissage",
      href: "/learn/react-foundation-1-1",
      icon: BookOpen,
    },
    { name: "Quiz", href: "/quiz", icon: Trophy },
    { name: "Code Lab", href: "/code-lab", icon: Code },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              React Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">
                  {user?.name || "Invité"}
                </span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>{user?.name || "Profil"}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
