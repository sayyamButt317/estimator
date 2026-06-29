"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  FileSpreadsheet,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ExternalLink,
  Download,
  Share2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sidebarIcons = [
  LayoutDashboard,
  FolderKanban,
  FileSpreadsheet,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
];

const tableGroups = [
  {
    name: "Project Management",
    hours: 40,
    rate: 120,
    amount: 4800,
    pct: 10,
    expanded: true,
    children: [
      { name: "Sprint Planning & Tracking", hours: 24, rate: 120, amount: 2880, pct: 6 },
      { name: "Project Kickoff & Planning", hours: 16, rate: 120, amount: 1920, pct: 4 },
    ],
  },
  {
    name: "UI/UX Design",
    hours: 60,
    rate: 130,
    amount: 7800,
    pct: 16,
    expanded: false,
    children: [],
  },
  {
    name: "Frontend Development",
    hours: 120,
    rate: 150,
    amount: 18000,
    pct: 37,
    expanded: false,
    children: [],
  },
];

const stats = [
  { label: "Total Estimate", value: "$48,560" },
  { label: "Total Hours", value: "320h" },
  { label: "Duration", value: "6–8 weeks" },
  { label: "Team Size", value: "4–6 members" },
];

const tabs = [
  { label: "Overview", active: false },
  { label: "Requirements", count: 28, active: false },
  { label: "Estimate Sheet", active: true },
  { label: "Timeline", active: false },
  { label: "AI Insights", active: false },
];

export function LandingHeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Layered depth cards */}
      <div className="absolute -top-3 left-6 right-6 h-full rounded-2xl bg-white/60 border border-border/50 shadow-sm" />
      <div className="absolute -top-1.5 left-3 right-3 h-full rounded-2xl bg-white/80 border border-border/60 shadow-md" />

      <div className="relative rounded-2xl border border-border bg-white shadow-[0_24px_80px_-20px_rgba(99,102,241,0.18),0_12px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="flex">
          {/* Icon sidebar */}
          <div className="hidden sm:flex w-12 shrink-0 flex-col items-center py-4 gap-1 border-r border-border bg-[#FAFAFA]">
            {sidebarIcons.map((Icon, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  i === 2 ? "bg-primary/10 text-primary" : "text-muted-foreground/60"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
            ))}
            <div className="mt-auto">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/50">
                <LogOut className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Main panel */}
          <div className="flex-1 min-w-0 p-4 sm:p-5">
            {/* Project header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold">E-commerce Platform</h3>
                  <Badge variant="success" className="text-[9px] px-1.5 py-0">
                    Approved
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  EST-2024-0012 · Updated 2 hours ago
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[
                  { icon: ExternalLink, label: "Open" },
                  { icon: Download, label: "Download" },
                  { icon: Share2, label: "Share" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md border border-border text-[9px] text-muted-foreground"
                  >
                    <Icon className="h-2.5 w-2.5" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats row + confidence ring */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-[#FAFAFA] px-3 py-2"
                  >
                    <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                    <p className="text-xs font-semibold mt-0.5 tabular-nums">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-16">
                <div className="relative h-14 w-14">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#ECECEC" strokeWidth="4" />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${85 * 1.38} ${100 * 1.38}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">85%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-border">
                    {["#", "Task / Category", "Hours", "Rate (USD/hr)", "Amount (USD)", "% of Total"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-2.5 py-2 text-[9px] font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {tableGroups.map((group, gi) => (
                    <Fragment key={group.name}>
                      <tr className="bg-primary/5 border-b border-border text-[10px]">
                        <td className="px-2.5 py-2 text-muted-foreground">{gi + 1}</td>
                        <td className="px-2.5 py-2 font-medium">
                          <span className="flex items-center gap-1">
                            <ChevronDown
                              className={`h-3 w-3 text-primary ${group.expanded ? "" : "-rotate-90"}`}
                            />
                            {group.name}
                          </span>
                        </td>
                        <td className="px-2.5 py-2 tabular-nums font-medium">{group.hours}</td>
                        <td className="px-2.5 py-2 tabular-nums text-muted-foreground">
                          ${group.rate}
                        </td>
                        <td className="px-2.5 py-2 tabular-nums font-semibold text-primary">
                          ${group.amount.toLocaleString()}
                        </td>
                        <td className="px-2.5 py-2 tabular-nums text-muted-foreground">
                          {group.pct}%
                        </td>
                      </tr>
                      {group.expanded &&
                        group.children.map((child, ci) => (
                          <tr
                            key={child.name}
                            className="border-b border-border/60 text-[10px] hover:bg-muted/20"
                          >
                            <td className="px-2.5 py-1.5 text-muted-foreground pl-4">
                              {gi + 1}.{ci + 1}
                            </td>
                            <td className="px-2.5 py-1.5 text-muted-foreground pl-6">
                              {child.name}
                            </td>
                            <td className="px-2.5 py-1.5 tabular-nums">{child.hours}</td>
                            <td className="px-2.5 py-1.5 tabular-nums text-muted-foreground">
                              ${child.rate}
                            </td>
                            <td className="px-2.5 py-1.5 tabular-nums">
                              ${child.amount.toLocaleString()}
                            </td>
                            <td className="px-2.5 py-1.5 tabular-nums text-muted-foreground">
                              {child.pct}%
                            </td>
                          </tr>
                        ))}
                    </Fragment>
                  ))}
                  <tr className="bg-[#FAFAFA] text-[10px] font-semibold">
                    <td colSpan={2} className="px-2.5 py-2.5">
                      Grand Total
                    </td>
                    <td className="px-2.5 py-2.5 tabular-nums">320</td>
                    <td className="px-2.5 py-2.5" />
                    <td className="px-2.5 py-2.5 tabular-nums text-primary">$48,560</td>
                    <td className="px-2.5 py-2.5 tabular-nums">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
