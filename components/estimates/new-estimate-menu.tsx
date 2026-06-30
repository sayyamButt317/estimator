"use client";

import { useState } from "react";
import {
  Pencil,
  LayoutGrid,
  Sparkles,
  FileSpreadsheet,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewEstimateFlowDialog } from "./new-estimate-flow-dialog";
import type { NewEstimateFlowType } from "@/types/estimate";

type DialogView = "cards" | NewEstimateFlowType;

const dropdownOptions: {
  id: NewEstimateFlowType;
  label: string;
  description: string;
  icon: typeof Pencil;
}[] = [
  {
    id: "scratch",
    label: "From Scratch",
    description: "Start a new estimate from scratch",
    icon: Pencil,
  },
  {
    id: "template",
    label: "From Template",
    description: "Use a pre-built template",
    icon: LayoutGrid,
  },
  {
    id: "ai",
    label: "AI Generate",
    description: "Generate estimate with AI",
    icon: Sparkles,
  },
  {
    id: "import",
    label: "Import CSV",
    description: "Import estimate from CSV file",
    icon: FileSpreadsheet,
  },
];

export function NewEstimateMenu() {
  const [open, setOpen] = useState(false);
  const [initialView, setInitialView] = useState<DialogView>("cards");

  const launch = (view: DialogView) => {
    setInitialView(view);
    setOpen(true);
  };

  return (
    <>
      <div className="flex items-center">
        <Button
          size="sm"
          className="gap-1.5 rounded-l-full rounded-r-none bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20 pl-3 pr-3 border-r border-primary-foreground/20"
          onClick={() => launch("cards")}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Estimate</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="rounded-l-none rounded-r-full bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20 px-2"
            >
              <ChevronDown className="h-3.5 w-3.5 opacity-80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 rounded-xl p-1.5 shadow-[var(--shadow-elevated)]"
          >
            {dropdownOptions.map((option) => {
              const Icon = option.icon;
              return (
                <DropdownMenuItem
                  key={option.id}
                  className="rounded-lg px-3 py-2.5 cursor-pointer flex flex-col items-start gap-0.5 h-auto"
                  onClick={() => launch(option.id)}
                >
                  <span className="flex items-center gap-2 font-medium text-sm">
                    <Icon
                      className={
                        option.id === "ai" ? "h-4 w-4 text-primary" : "h-4 w-4"
                      }
                    />
                    {option.label}
                  </span>
                  <span className="text-xs text-muted-foreground pl-6">
                    {option.description}
                  </span>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
              onClick={() => launch("cards")}
            >
              View all options…
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <NewEstimateFlowDialog
        open={open}
        onOpenChange={setOpen}
        initialView={initialView}
      />
    </>
  );
}
