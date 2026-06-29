"use client";

import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, TrendingUp } from "lucide-react";

const suggestions = [
  {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Add security testing buffer",
    desc: "Payment integration may need +16h for PCI compliance",
  },
  {
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Optimize team allocation",
    desc: "Add QA engineer in Sprint 4 to reduce risk",
  },
  {
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/8",
    title: "Missing WCAG requirements",
    desc: "Accessibility standards recommended for e-commerce",
  },
];

export function LandingWorkflowPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="rounded-2xl border border-border bg-white shadow-[var(--shadow-elevated)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#FAFAFA]">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">AI Insights Panel</span>
        </div>

        <div className="flex">
          {/* Mini table */}
          <div className="flex-1 p-4 border-r border-border hidden sm:block">
            <p className="text-xs font-semibold mb-3">Estimate Breakdown</p>
            <div className="space-y-2">
              {[
                { label: "Frontend", pct: 38, color: "bg-primary" },
                { label: "Backend", pct: 31, color: "bg-violet-500" },
                { label: "Design", pct: 19, color: "bg-pink-500" },
                { label: "PM", pct: 12, color: "bg-emerald-500" },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground">{bar.label}</span>
                    <span className="font-medium">{bar.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI panel */}
          <div className="w-full sm:w-56 p-4 bg-[#FAFAFA]">
            <div className="flex items-center gap-1.5 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">AI Insights</span>
            </div>

            {/* Confidence ring */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative h-20 w-20">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#ECECEC" strokeWidth="6" />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${85 * 2.01} ${100 * 2.01}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-primary">85%</span>
                </div>
              </div>
              <p className="text-[10px] font-medium text-emerald-600 mt-1">High confidence</p>
            </div>

            <div className="space-y-2">
              {suggestions.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="p-2.5 rounded-xl bg-white border border-border">
                    <div className="flex gap-2">
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
                        <Icon className={`h-3 w-3 ${s.color}`} />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium leading-tight">{s.title}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5 leading-snug">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
