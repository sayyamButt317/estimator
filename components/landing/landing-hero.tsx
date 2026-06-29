"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingHeroPreview } from "./landing-hero-preview";

const trustSignals = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
];

const logos = ["Google", "Microsoft", "Airbnb", "Shopify", "Slack", "Amazon"];

export function LandingHero() {
  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FF] via-white to-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-16 items-center">
          {/* Left — copy */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/15 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-primary uppercase">
                <Sparkles className="h-3 w-3" />
                AI-Powered Estimation Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-6 text-4xl sm:text-5xl xl:text-[3.25rem] font-bold tracking-tight leading-[1.08] text-foreground"
            >
              Accurate Estimates.{" "}
              <span className="text-primary">Better Projects.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Estimator helps project managers create accurate project estimates
              in minutes, not days. Plan smarter, deliver on time, and increase
              profitability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row items-start gap-3"
            >
              <Button
                size="lg"
                className="h-12 px-6 rounded-xl text-sm font-medium bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                asChild
              >
                <Link href="/login">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 rounded-xl text-sm font-medium border-border bg-white"
              >
                Book a Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-2"
            >
              {trustSignals.map((signal) => (
                <span
                  key={signal}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  {signal}
                </span>
              ))}
            </motion.div>

            {/* Trusted by — inside hero left column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="mt-12 lg:mt-16 pt-8 border-t border-border/60"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Trusted by project managers at
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {logos.map((logo) => (
                  <span
                    key={logo}
                    className="text-sm font-semibold text-muted-foreground/35 select-none"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — product mockup */}
          <div className="relative lg:pl-4">
            <LandingHeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
