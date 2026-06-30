"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Loader2, Check, ListOrdered } from "lucide-react";
import type { AIGenerateFormValues } from "@/types/estimate";
import { templateCategories } from "@/data/template-preview";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MAX_CHARS = 2000;

const defaultValues: AIGenerateFormValues = {
  projectDescription: "",
  projectType: "",
  complexity: "medium",
};

interface AIGenerateFlowProps {
  onComplete?: () => void;
}

export function AIGenerateFlow({ onComplete }: AIGenerateFlowProps) {
  const router = useRouter();
  const [form, setForm] = useState<AIGenerateFormValues>(defaultValues);
  const [phase, setPhase] = useState<"input" | "generating" | "done">("input");

  const canGenerate =
    form.projectDescription.trim().length >= 20 && form.projectType;

  const handleGenerate = async () => {
    setPhase("generating");
    await new Promise((r) => setTimeout(r, 2000));
    setPhase("done");
  };

  const handleUse = () => {
    onComplete?.();
    router.push("/dashboard/estimates/est-1");
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "input" && (
        <motion.div
          key="input"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-5"
        >
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15">
            <div className="flex items-center gap-2 mb-3">
              <ListOrdered className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-primary">How it works</p>
            </div>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-semibold text-foreground shrink-0">1.</span>
                Describe your project in detail
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground shrink-0">2.</span>
                AI analyzes requirements and scope
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground shrink-0">3.</span>
                Get a complete estimate with tasks, hours & costs
              </li>
            </ol>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai-desc">Project Description</Label>
            <Textarea
              id="ai-desc"
              placeholder="Describe your project, goals, features, tech stack, timeline, etc."
              value={form.projectDescription}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  projectDescription: e.target.value.slice(0, MAX_CHARS),
                }))
              }
              className="min-h-[140px]"
            />
            <p className="text-xs text-muted-foreground text-right tabular-nums">
              {form.projectDescription.length} / {MAX_CHARS}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Project Type</Label>
            <Select
              value={form.projectType}
              onValueChange={(v) => setForm((p) => ({ ...p, projectType: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {templateCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Complexity</Label>
            <div className="flex rounded-xl border border-border p-1 bg-[#FAFAFA]">
              {(["low", "medium", "high"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, complexity: level }))}
                  className={cn(
                    "flex-1 py-2.5 text-sm font-medium rounded-lg capitalize transition-colors",
                    form.complexity === level
                      ? "bg-white text-primary shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full h-11 rounded-xl"
            disabled={!canGenerate}
            onClick={handleGenerate}
          >
            <Sparkles className="h-4 w-4" />
            Generate Estimate
          </Button>
        </motion.div>
      )}

      {phase === "generating" && (
        <motion.div
          key="generating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-16 text-center"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <p className="font-semibold">Generating your estimate...</p>
          <p className="text-sm text-muted-foreground mt-1">
            AI is analyzing scope and building task breakdown
          </p>
        </motion.div>
      )}

      {phase === "done" && (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 text-center py-6"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 mx-auto">
            <Check className="h-7 w-7 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-lg">Estimate ready!</p>
            <p className="text-sm text-muted-foreground mt-1">
              320 hours · $48,560 · 85% confidence · 28 tasks
            </p>
          </div>
          <Button className="w-full h-11 rounded-xl" onClick={handleUse}>
            <Wand2 className="h-4 w-4" />
            Open Estimate
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
