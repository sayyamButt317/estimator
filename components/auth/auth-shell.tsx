"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Target, Zap, Shield } from "lucide-react";

interface AuthShellProps {
  children: React.ReactNode;
}

const highlights = [
  {
    icon: Target,
    title: "AI-powered estimates",
    description: "Generate accurate project estimates in minutes, not days.",
  },
  {
    icon: Zap,
    title: "Excel-grade sheets",
    description: "Premium spreadsheet views with grouping, formulas, and subtotals.",
  },
  {
    icon: Shield,
    title: "Enterprise ready",
    description: "Built for teams that need confidence, clarity, and control.",
  },
];

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Estimator</span>
          </Link>

          <div className="space-y-10 max-w-md">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight leading-tight">
                Estimate smarter.
                <br />
                Ship with confidence.
              </h2>
              <p className="text-white/60 mt-4 text-sm leading-relaxed">
                The modern platform for AI-assisted project estimation — trusted by
                product teams who refuse to guess on scope, cost, and timeline.
              </p>
            </div>

            <div className="space-y-6">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-sm text-white/50 mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Estimator. All rights reserved.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="lg:hidden mb-8 absolute top-6 left-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Estimator</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
