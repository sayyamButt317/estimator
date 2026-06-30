"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileStack,
  X,
  ExternalLink,
  Sparkles,
  Globe,
  Code,
  Smartphone,
  Brain,
  Cloud,
  Users,
  Building,
  Heart,
  DollarSign,
} from "lucide-react";
import type { Template } from "@/types";
import type { UseTemplateFormValues } from "@/types/template";
import {
  defaultTemplatePreviewRows,
  clientOptions,
} from "@/data/template-preview";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplatePreviewTable } from "./template-preview-table";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Smartphone,
  Globe,
  Brain,
  Cloud,
  Users,
  Building,
  Heart,
  DollarSign,
};

interface UseTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
}

export function UseTemplateDialog({
  open,
  onOpenChange,
  template,
}: UseTemplateDialogProps) {
  const router = useRouter();
  const [form, setForm] = useState<UseTemplateFormValues>({
    mode: "create",
    estimateName: "",
    client: "",
  });

  useEffect(() => {
    if (open && template) {
      setForm({ mode: "create", estimateName: template.name, client: "" });
    }
  }, [open, template]);

  if (!template) return null;

  const Icon = iconMap[template.icon] || Globe;

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setForm({ mode: "create", estimateName: "", client: "" });
    }, 200);
  };

  const handleUse = () => {
    handleClose();
    router.push("/dashboard/estimates/est-1");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(v) : handleClose())}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden sm:max-w-3xl [&>button]:hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 shrink-0">
              <FileStack className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Use Template</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Review template details and start a new estimate
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

        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-5">
          {/* Template summary card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-[#FAFAFA]">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl shrink-0"
                style={{ backgroundColor: `${template.color}15` }}
              >
                <Icon className="h-6 w-6" style={{ color: template.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{template.name}</h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                  {template.description}
                </p>
              </div>
            </div>
            <div className="flex gap-6 sm:gap-8 shrink-0 sm:text-right">
              <div>
                <p className="text-2xl font-bold tabular-nums">{template.estimatedHours}h</p>
                <p className="text-xs text-muted-foreground">Total Hours</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums">{template.tasks}</p>
                <p className="text-xs text-muted-foreground">Tasks</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="preview">
            <div className="flex items-center justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="preview">Template Preview</TabsTrigger>
                <TabsTrigger value="details">Template Details</TabsTrigger>
              </TabsList>
              <button className="flex items-center gap-1 text-sm text-primary hover:underline shrink-0">
                Preview Full Sheet
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>

            <TabsContent value="preview" className="mt-0">
              <TemplatePreviewTable rows={defaultTemplatePreviewRows} />
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              <div className="rounded-xl border border-border divide-y divide-border">
                {[
                  { label: "Category", value: template.category },
                  { label: "Estimated Hours", value: `${template.estimatedHours}h` },
                  { label: "Total Tasks", value: String(template.tasks) },
                  { label: "Description", value: template.description },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium sm:text-right max-w-sm">{row.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Create new estimate */}
          <div className="rounded-2xl border border-border p-5 space-y-4">
            <h4 className="font-semibold text-sm">Create New Estimate</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  {
                    value: "create" as const,
                    title: "Create from this template",
                    desc: "Start a new estimate with all template tasks pre-filled",
                  },
                  {
                    value: "draft" as const,
                    title: "Create from template as draft",
                    desc: "Save as draft to customize before sharing",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                      form.mode === option.value
                        ? "border-primary/40 bg-primary/5"
                        : "border-border hover:bg-muted/30"
                    )}
                  >
                    <input
                      type="radio"
                      name="use-mode"
                      checked={form.mode === option.value}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, mode: option.value }))
                      }
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <p className="text-sm font-medium">{option.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {option.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="est-name">Estimate Name</Label>
                  <Input
                    id="est-name"
                    placeholder="e.g. Client Project Estimate"
                    value={form.estimateName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, estimateName: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client (Optional)</Label>
                  <Select
                    value={form.client}
                    onValueChange={(v) =>
                      setForm((prev) => ({ ...prev, client: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientOptions.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-[#FAFAFA]/50">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUse} disabled={!form.estimateName.trim()}>
            <Sparkles className="h-4 w-4" />
            Use Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
