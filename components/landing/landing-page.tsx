"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Brain,
  FileSpreadsheet,
  Calendar,
  Users,
  Share2,
  Download,
  ClipboardList,
  Wand2,
  SlidersHorizontal,
  Send,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LandingNavbar } from "./landing-navbar";
import { LandingHero } from "./landing-hero";
import { LandingWorkflowPreview } from "./landing-workflow-preview";
import { LandingFooter } from "./landing-footer";

const trustSignals = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
];

const features = [
  {
    icon: Brain,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    title: "AI-Powered Estimation",
    description:
      "Generate accurate project estimates in minutes using AI that understands your requirements and industry standards.",
  },
  {
    icon: FileSpreadsheet,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Excel-Like Estimate Sheets",
    description:
      "Work in familiar spreadsheet-style sheets with formulas, grouping, subtotals, and frozen columns.",
  },
  {
    icon: Calendar,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Project Timelines",
    description:
      "Visualize project schedules with Gantt-style timelines, milestones, dependencies, and progress tracking.",
  },
  {
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Team Management",
    description:
      "Assign roles, track capacity, and get AI-powered team recommendations for optimal project delivery.",
  },
  {
    icon: Share2,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    title: "Share & Collaborate",
    description:
      "Share estimates with clients and team members. Control access with viewer, editor, and commenter roles.",
  },
  {
    icon: Download,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    title: "Export & Reports",
    description:
      "Export to PDF, Excel, CSV, Word, or JSON. Generate professional client-ready proposals instantly.",
  },
];

const steps = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Add Requirements",
    description:
      "Import or write project requirements. AI helps categorize and identify gaps automatically.",
  },
  {
    step: 2,
    icon: Wand2,
    title: "Generate Estimate",
    description:
      "AI analyzes requirements and generates a detailed estimate with hours, costs, and timelines.",
  },
  {
    step: 3,
    icon: SlidersHorizontal,
    title: "Review & Customize",
    description:
      "Fine-tune in Excel-like sheets. Adjust rates, add buffers, and refine with AI suggestions.",
  },
  {
    step: 4,
    icon: Send,
    title: "Share & Deliver",
    description:
      "Share with clients, export proposals, and track approvals — all from one platform.",
  },
];

const testimonials = [
  {
    quote:
      "Estimator cut our proposal time from 2 days to 2 hours. The AI suggestions caught scope gaps we used to miss.",
    name: "Sarah Johnson",
    role: "Senior Project Manager",
    company: "TechCorp",
    avatar: "SJ",
  },
  {
    quote:
      "The Excel-like sheets are a game changer. Our clients love the professional exports and confidence scores.",
    name: "Michael Chen",
    role: "Delivery Director",
    company: "AgileWorks",
    avatar: "MC",
  },
  {
    quote:
      "We increased estimate accuracy by 23% in the first quarter. The ROI was immediate and undeniable.",
    name: "Emily Rodriguez",
    role: "VP of Engineering",
    company: "BuildFast",
    avatar: "ER",
  },
];

function TrustSignals({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 ${className ?? ""}`}>
      {trustSignals.map((signal) => (
        <span
          key={signal}
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
          {signal}
        </span>
      ))}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <LandingHero />

      {/* Features */}
      <section id="features" className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3">Everything You Need</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Powerful features for modern
              <br className="hidden sm:block" />
              project managers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="h-full border-border/80 hover:shadow-[var(--shadow-elevated)] hover:border-border transition-all duration-300 group">
                    <CardContent className="p-7">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg} mb-5`}
                      >
                        <Icon className={`h-5 w-5 ${feature.iconColor}`} />
                      </div>
                      <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="product" className="py-24 px-6 lg:px-8 bg-[#F8F9FF]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-primary mb-3">How It Works</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
                From requirements to
                <br />
                proposal in 4 steps
              </h2>

              <div className="space-y-8">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5"
                    >
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
                          {step.step}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="w-px flex-1 bg-border mt-2 min-h-[24px]" />
                        )}
                      </div>
                      <div className="pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <LandingWorkflowPreview />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3">Loved by Project Managers</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Teams ship better estimates, faster
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-border/80">
                  <CardContent className="p-7 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role} at {t.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#F8F9FF] border border-primary/10 px-8 py-14 sm:px-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to create better estimates?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Join thousands of project managers who deliver accurate proposals
              faster with AI-powered estimation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="h-12 px-7 rounded-xl text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                asChild
              >
                <Link href="/login">Start Your Free Trial</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-7 rounded-xl text-base"
              >
                Book a Demo
              </Button>
            </div>
            <TrustSignals className="mt-6" />
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
