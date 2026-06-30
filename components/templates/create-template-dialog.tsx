"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import type { CreateTemplateFormValues, DifficultyLevel } from "@/types/template";
import {
  templateCategories,
  projectTypes,
  defaultTemplatePreviewRows,
} from "@/data/template-preview";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateStepper } from "./template-stepper";
import { TemplatePreviewTable } from "./template-preview-table";
import { cn } from "@/lib/utils";

const STEPS = ["Template Details", "Estimate Structure", "Review & Save"];

const difficultyOptions: { value: DifficultyLevel; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "complex", label: "Complex" },
];

const defaultValues: CreateTemplateFormValues = {
  name: "",
  description: "",
  category: "",
  projectType: "",
  estimatedHours: 320,
  difficulty: "medium",
  tags: [],
  allowCustomization: true,
  includeSampleData: true,
  shareWithTeam: true,
};

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTemplateDialog({ open, onOpenChange }: CreateTemplateDialogProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState<CreateTemplateFormValues>(defaultValues);

  const update = <K extends keyof CreateTemplateFormValues>(
    key: K,
    value: CreateTemplateFormValues[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      update("tags", [...form.tags, tag]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag: string) => {
    update(
      "tags",
      form.tags.filter((t) => t !== tag)
    );
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setForm(defaultValues);
      setTagInput("");
    }, 200);
  };

  const handleSave = () => {
    handleClose();
    router.push("/dashboard/estimates");
  };

  const canProceedStep1 =
    form.name.trim() && form.category && form.projectType && form.estimatedHours > 0;

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(v) : handleClose())}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden sm:max-w-2xl [&>button]:hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Create New Template</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Build a reusable estimation template for your projects
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-5 border-b border-border bg-[#FAFAFA]/50">
          <TemplateStepper steps={STEPS} currentStep={step} />
        </div>

        {/* Body */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">Template Details</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Add template information and configure basic settings
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    <Upload className="h-3.5 w-3.5" />
                    Import from Estimate
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tpl-name">Template Name</Label>
                    <Input
                      id="tpl-name"
                      placeholder="e.g. E-commerce Web Application"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tpl-desc">Description</Label>
                    <Textarea
                      id="tpl-desc"
                      placeholder="Describe the template scope, typical use cases, and what's included..."
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      className="min-h-[90px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) => update("category", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
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
                      <Label>Project Type</Label>
                      <Select
                        value={form.projectType}
                        onValueChange={(v) => update("projectType", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tpl-hours">Estimated Total Hours</Label>
                    <div className="relative">
                      <Input
                        id="tpl-hours"
                        type="number"
                        min={1}
                        value={form.estimatedHours}
                        onChange={(e) =>
                          update("estimatedHours", Number(e.target.value) || 0)
                        }
                        className="pr-16"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        hours
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Difficulty Level</Label>
                    <div className="flex rounded-xl border border-border p-1 bg-[#FAFAFA]">
                      {difficultyOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update("difficulty", opt.value)}
                          className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-lg transition-colors",
                            form.difficulty === opt.value
                              ? "bg-white text-primary shadow-sm border border-border"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tpl-tags">Tags</Label>
                    <Input
                      id="tpl-tags"
                      placeholder="Add tags and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      onBlur={addTag}
                    />
                    {form.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-primary/70"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-semibold">Template Settings</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        key: "allowCustomization" as const,
                        title: "Allow Customization",
                        desc: "Users can modify tasks, hours & rates",
                      },
                      {
                        key: "includeSampleData" as const,
                        title: "Include Sample Data",
                        desc: "Include example tasks and estimates",
                      },
                      {
                        key: "shareWithTeam" as const,
                        title: "Share with Team",
                        desc: "Make this template available to team",
                      },
                    ].map((setting) => (
                      <label
                        key={setting.key}
                        className={cn(
                          "flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-colors",
                          form[setting.key]
                            ? "border-primary/30 bg-primary/5"
                            : "border-border hover:border-border/80"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={form[setting.key]}
                            onCheckedChange={(c) => update(setting.key, c === true)}
                            className="mt-0.5"
                          />
                          <div>
                            <p className="text-sm font-medium leading-tight">
                              {setting.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 leading-snug">
                              {setting.desc}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-semibold">Estimate Structure</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Review the default task breakdown for this template. You can
                    customize it after saving.
                  </p>
                </div>
                <TemplatePreviewTable rows={defaultTemplatePreviewRows} />
                <p className="text-xs text-muted-foreground">
                  {form.includeSampleData
                    ? "Sample data will be included with this template."
                    : "Template will start with an empty structure."}
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="font-semibold">Review & Save</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Confirm your template details before saving
                  </p>
                </div>

                <div className="rounded-xl border border-border divide-y divide-border">
                  {[
                    { label: "Template Name", value: form.name || "—" },
                    { label: "Category", value: form.category || "—" },
                    { label: "Project Type", value: form.projectType || "—" },
                    { label: "Estimated Hours", value: `${form.estimatedHours}h` },
                    {
                      label: "Difficulty",
                      value: form.difficulty.charAt(0).toUpperCase() + form.difficulty.slice(1),
                    },
                    { label: "Tags", value: form.tags.join(", ") || "—" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-4 py-3 text-sm"
                    >
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.allowCustomization && (
                    <span className="text-xs bg-muted px-2.5 py-1 rounded-full">
                      Customizable
                    </span>
                  )}
                  {form.includeSampleData && (
                    <span className="text-xs bg-muted px-2.5 py-1 rounded-full">
                      Sample data
                    </span>
                  )}
                  {form.shareWithTeam && (
                    <span className="text-xs bg-muted px-2.5 py-1 rounded-full">
                      Shared with team
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-[#FAFAFA]/50">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !canProceedStep1}
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSave}>
                <Check className="h-4 w-4" />
                Save Template
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
