"use client";

import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Apprentissage",
      links: [
        { name: "Cours React", href: "/learn/react-foundation-1-1" },
        { name: "Quiz", href: "/quiz" },
        { name: "Code Lab", href: "/code-lab" },
        { name: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Exemples", href: "#" },
        { name: "Tutoriels", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "À propos",
      links: [
        { name: "Notre mission", href: "#" },
        { name: "Équipe", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Carrières", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@reactacademy.com", label: "Email" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                React Academy
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              La meilleure plateforme pour maîtriser React et Tailwind CSS avec
              des cours interactifs et des projets pratiques.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-10 w-10 p-0 rounded-lg border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} React Academy. Tous droits réservés.
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            Fait avec <Heart className="h-4 w-4 mx-1 text-red-500" /> par
            l'équipe React Academy
          </p>
        </div>
      </div>
    </footer>
  );
}
