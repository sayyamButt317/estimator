"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus } from "lucide-react";
import type { FromScratchFormValues } from "@/types/estimate";
import { clientOptions } from "@/data/template-preview";
import { projects } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultValues: FromScratchFormValues = {
  estimateName: "",
  project: "",
  client: "",
};

interface FromScratchFlowProps {
  onComplete?: () => void;
}

export function FromScratchFlow({ onComplete }: FromScratchFlowProps) {
  const router = useRouter();
  const [form, setForm] = useState<FromScratchFormValues>(defaultValues);

  const canCreate = form.estimateName.trim() && form.project;

  const handleCreate = () => {
    onComplete?.();
    router.push("/dashboard/estimates/est-1");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAFAFA] border border-border">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <FilePlus className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Build your estimate step by step — add requirements, tasks, hours, and
          rates at your own pace.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Estimate Details</h4>

        <div className="space-y-2">
          <Label htmlFor="est-name">Estimate Name</Label>
          <Input
            id="est-name"
            placeholder="e.g. E-commerce Website Development"
            value={form.estimateName}
            onChange={(e) =>
              setForm((p) => ({ ...p, estimateName: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Project</Label>
          <Select
            value={form.project}
            onValueChange={(v) => setForm((p) => ({ ...p, project: v }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select or create a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
              <SelectItem value="new">+ Create new project</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Client (Optional)</Label>
          <Select
            value={form.client}
            onValueChange={(v) => setForm((p) => ({ ...p, client: v }))}
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

      <Button
        className="w-full h-11 rounded-xl"
        disabled={!canCreate}
        onClick={handleCreate}
      >
        Create Estimate
      </Button>
    </div>
  );
}
