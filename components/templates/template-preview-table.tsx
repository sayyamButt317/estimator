"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TemplatePreviewRow } from "@/types/template";
import { cn } from "@/lib/utils";

interface TemplatePreviewTableProps {
  rows: TemplatePreviewRow[];
  className?: string;
}

function GroupRows({
  group,
  index,
  defaultExpanded = true,
}: {
  group: TemplatePreviewRow;
  index: number;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = group.children && group.children.length > 0;

  return (
    <Fragment>
      <tr
        className={cn(
          "border-b border-border text-sm cursor-pointer",
          hasChildren && "bg-primary/5 hover:bg-primary/8"
        )}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <td className="px-4 py-3 font-medium">
          <span className="flex items-center gap-1.5">
            {hasChildren && (
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-primary transition-transform",
                  !expanded && "-rotate-90"
                )}
              />
            )}
            {index + 1}. {group.name}
          </span>
        </td>
        <td className="px-4 py-3 tabular-nums text-right font-medium">{group.hours}</td>
        <td className="px-4 py-3 tabular-nums text-right text-muted-foreground">
          ${group.rate}
        </td>
        <td className="px-4 py-3 tabular-nums text-right font-semibold text-primary">
          ${group.amount.toLocaleString()}
        </td>
      </tr>
      {expanded &&
        group.children?.map((child, ci) => (
          <tr
            key={child.id}
            className="border-b border-border/60 text-sm hover:bg-muted/20"
          >
            <td className="px-4 py-2.5 pl-10 text-muted-foreground">
              {index + 1}.{ci + 1} {child.name}
            </td>
            <td className="px-4 py-2.5 tabular-nums text-right">{child.hours}</td>
            <td className="px-4 py-2.5 tabular-nums text-right text-muted-foreground">
              ${child.rate}
            </td>
            <td className="px-4 py-2.5 tabular-nums text-right">
              ${child.amount.toLocaleString()}
            </td>
          </tr>
        ))}
    </Fragment>
  );
}

export function TemplatePreviewTable({ rows, className }: TemplatePreviewTableProps) {
  const totalHours = rows.reduce((sum, r) => sum + r.hours, 0);
  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-border">
              {["Task / Category", "Hours", "Rate (USD/hr)", "Amount (USD)"].map((col) => (
                <th
                  key={col}
                  className={cn(
                    "px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                    col !== "Task / Category" && "text-right"
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((group, i) => (
              <GroupRows key={group.id} group={group} index={i} />
            ))}
            <tr className="bg-[#FAFAFA] text-sm font-semibold">
              <td className="px-4 py-3">Grand Total</td>
              <td className="px-4 py-3 tabular-nums text-right">{totalHours}</td>
              <td className="px-4 py-3" />
              <td className="px-4 py-3 tabular-nums text-right text-primary">
                ${totalAmount.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
