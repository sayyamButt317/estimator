"use client";

import { motion } from "framer-motion";
import {
  Pencil,
  LayoutGrid,
  Sparkles,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import type { NewEstimateFlowType } from "@/types/estimate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const options: {
  id: NewEstimateFlowType;
  title: string;
  description: string;
  icon: typeof Pencil;
  iconBg: string;
  iconColor: string;
  badge?: string;
}[] = [
  {
    id: "scratch",
    title: "From Scratch",
    description:
      "Start a new estimate from a blank canvas. Add requirements, tasks, and build your estimate step by step.",
    icon: Pencil,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    badge: "New",
  },
  {
    id: "template",
    title: "From Template",
    description:
      "Choose from our pre-built templates and customize them to fit your project needs.",
    icon: LayoutGrid,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: "ai",
    title: "AI Generate",
    description:
      "Let AI generate a complete estimate based on your project description and requirements.",
    icon: Sparkles,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "AI",
  },
  {
    id: "import",
    title: "Import CSV",
    description:
      "Import your existing estimate from a CSV file. We'll structure it for you automatically.",
    icon: FileSpreadsheet,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

interface NewEstimateOptionCardsProps {
  onSelect: (flow: NewEstimateFlowType) => void;
}

export function NewEstimateOptionCards({ onSelect }: NewEstimateOptionCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((option, i) => {
        const Icon = option.icon;
        return (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col rounded-2xl border border-border bg-white p-5 hover:shadow-[var(--shadow-card)] hover:border-primary/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  option.iconBg
                )}
              >
                <Icon className={cn("h-5 w-5", option.iconColor)} />
              </div>
              {option.badge && (
                <Badge
                  variant={option.badge === "AI" ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  {option.badge}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold mb-2">{option.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
              {option.description}
            </p>
            <Button
              variant="outline"
              className="w-full rounded-xl group"
              onClick={() => onSelect(option.id)}
            >
              Select
              <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}

export const flowMeta: Record<
  NewEstimateFlowType,
  { title: string; subtitle: string }
> = {
  scratch: {
    title: "From Scratch",
    subtitle: "Create a new estimate from a blank canvas",
  },
  template: {
    title: "From Template",
    subtitle: "Choose a template to get started",
  },
  ai: {
    title: "AI Generate",
    subtitle: "Generate estimate with AI",
  },
  import: {
    title: "Import CSV",
    subtitle: "Import estimate from CSV file",
  },
};
