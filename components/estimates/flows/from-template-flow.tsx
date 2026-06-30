"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Code,
  Smartphone,
  Globe,
  Brain,
  Cloud,
  Users,
  Building,
  Heart,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import type { Template } from "@/types";
import { templates } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseTemplateDialog } from "@/components/templates/use-template-dialog";

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

const categories = ["All Categories", ...Array.from(new Set(templates.map((t) => t.category)))];

interface FromTemplateFlowProps {
  onComplete?: () => void;
}

export function FromTemplateFlow({ onComplete }: FromTemplateFlowProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [selected, setSelected] = useState<Template | null>(null);
  const [useOpen, setUseOpen] = useState(false);

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All Categories" || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (template: Template) => {
    setSelected(template);
    onComplete?.();
    setUseOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-2xl border border-border divide-y divide-border max-h-[360px] overflow-y-auto">
          {filtered.map((template) => {
            const Icon = iconMap[template.icon] || Globe;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => handleSelect(template)}
                className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-muted/40 transition-colors group"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${template.color}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color: template.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {template.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                    {template.estimatedHours}h · {template.tasks} tasks
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>

        <Button variant="outline" className="w-full rounded-xl" asChild>
          <Link href="/dashboard/templates">Browse All Templates</Link>
        </Button>
      </div>

      <UseTemplateDialog
        open={useOpen}
        onOpenChange={(v) => {
          setUseOpen(v);
          if (!v) setSelected(null);
        }}
        template={selected}
      />
    </>
  );
}
