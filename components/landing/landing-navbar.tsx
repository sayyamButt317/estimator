"use client";

import Link from "next/link";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const productLinks = [
  { label: "Estimate Sheets", href: "#product" },
  { label: "AI Insights", href: "#product" },
  { label: "Timelines", href: "#product" },
  { label: "Integrations", href: "#" },
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "/dashboard/templates" },
  { label: "Pricing", href: "#pricing" },
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "API Reference", href: "#" },
];

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-8 px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-white text-sm">
            E
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-foreground">
            Estimator
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none">
              Product
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {productLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none">
              Resources
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {resourceLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="#enterprise"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Enterprise
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex rounded-lg">
            Book a demo
          </Button>
          <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 px-4" asChild>
            <Link href="/login">
              Get Started Free
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
