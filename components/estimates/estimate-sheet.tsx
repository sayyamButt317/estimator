"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { SheetRow } from "@/types";
import { sheetRows } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/ui/status-badge";

const statusColors: Record<string, string> = {
  completed: "success",
  in_progress: "info",
  pending: "draft",
  blocked: "destructive",
};

const columns = [
  { key: "id", label: "ID", width: 60 },
  { key: "epic", label: "Epic", width: 100 },
  { key: "module", label: "Module", width: 90 },
  { key: "feature", label: "Feature", width: 100 },
  { key: "task", label: "Task", width: 180, frozen: true },
  { key: "description", label: "Description", width: 200 },
  { key: "assignedRole", label: "Role", width: 120 },
  { key: "developerLevel", label: "Level", width: 80 },
  { key: "hours", label: "Hours", width: 70 },
  { key: "hourlyRate", label: "Rate", width: 70 },
  { key: "totalCost", label: "Total", width: 90 },
  { key: "complexity", label: "Complexity", width: 90 },
  { key: "risk", label: "Risk", width: 70 },
  { key: "priority", label: "Priority", width: 80 },
  { key: "status", label: "Status", width: 100 },
];

function SheetRowComponent({
  row,
  depth = 0,
  index,
}: {
  row: SheetRow;
  depth?: number;
  index: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const isGroup = row.isGroup && row.children;

  if (isGroup) {
    return (
      <>
        <tr
          className="bg-primary/4 border-b border-border cursor-pointer hover:bg-primary/6 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <td className="sticky left-0 z-10 bg-primary/4 px-3 py-2.5 border-r border-border">
            <div className="flex items-center gap-2">
              {expanded ? (
                <ChevronDown className="h-3.5 w-3.5 text-primary" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-primary" />
              )}
              <span className="font-semibold text-sm">{row.task}</span>
            </div>
          </td>
          <td colSpan={columns.length - 4} />
          <td className="px-3 py-2.5 text-sm font-semibold tabular-nums text-right">
            {row.hours}h
          </td>
          <td className="px-3 py-2.5" />
          <td className="px-3 py-2.5 text-sm font-semibold tabular-nums text-right text-primary">
            {formatCurrency(row.totalCost)}
          </td>
          <td colSpan={columns.length - 12} />
        </tr>
        <AnimatePresence>
          {expanded &&
            row.children?.map((child, i) => (
              <SheetRowComponent
                key={child.id}
                row={child}
                depth={depth + 1}
                index={i}
              />
            ))}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-border hover:bg-muted/30 transition-colors group"
    >
      <td className="sticky left-0 z-10 bg-white group-hover:bg-muted/30 px-3 py-2 border-r border-border text-xs text-muted-foreground tabular-nums">
        {index + 1}
      </td>
      <td className="px-3 py-2 text-xs">{row.epic}</td>
      <td className="px-3 py-2 text-xs">{row.module}</td>
      <td className="px-3 py-2 text-xs">{row.feature}</td>
      <td className="sticky left-[60px] z-10 bg-white group-hover:bg-muted/30 px-3 py-2 border-r border-border">
        <span className="text-sm font-medium">{row.task}</span>
      </td>
      <td className="px-3 py-2 text-xs text-muted-foreground max-w-[200px] truncate">
        {row.description}
      </td>
      <td className="px-3 py-2 text-xs">{row.assignedRole}</td>
      <td className="px-3 py-2 text-xs">{row.developerLevel}</td>
      <td className="px-3 py-2 text-sm tabular-nums text-right font-medium">
        {row.hours}
      </td>
      <td className="px-3 py-2 text-xs tabular-nums text-right">
        ${row.hourlyRate}
      </td>
      <td className="px-3 py-2 text-sm tabular-nums text-right font-medium">
        {formatCurrency(row.totalCost)}
      </td>
      <td className="px-3 py-2">
        <Badge variant="outline" className="text-[10px]">
          {row.complexity}
        </Badge>
      </td>
      <td className="px-3 py-2">
        <PriorityBadge priority={row.risk} />
      </td>
      <td className="px-3 py-2">
        <PriorityBadge priority={row.priority} />
      </td>
      <td className="px-3 py-2">
        <Badge
          variant={statusColors[row.status] as "success" | "info" | "draft" | "destructive"}
          className="text-[10px]"
        >
          {row.status.replace("_", " ")}
        </Badge>
      </td>
    </motion.tr>
  );
}

export function EstimateSheet() {
  const subtotal = sheetRows.reduce((sum, g) => sum + g.totalCost, 0);
  const tax = subtotal * 0.08;
  const discount = 0;
  const finalTotal = subtotal + tax - discount;
  const margin = 32;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {["+ Add Item", "Insert", "Delete", "Filter", "Group", "Sort"].map(
            (action) => (
              <button
                key={action}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted transition-colors"
              >
                {action}
              </button>
            )
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Auto-saved
          </span>
          <span>·</span>
          <span>Saved 2 min ago</span>
        </div>
      </div>

      {/* Grid */}
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-[var(--shadow-card)]">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20">
              <tr className="bg-muted/60 border-b border-border">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap border-r border-border/50 last:border-r-0",
                      col.frozen && "sticky left-[60px] z-20 bg-muted/60"
                    )}
                    style={{ minWidth: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Grand Total Row */}
              <tr className="bg-primary/8 border-b-2 border-primary/20">
                <td
                  colSpan={8}
                  className="sticky left-0 z-10 bg-primary/8 px-3 py-2.5 border-r border-border"
                >
                  <span className="font-bold text-sm text-primary">PROJECT TOTAL</span>
                </td>
                <td className="px-3 py-2.5 text-sm font-bold tabular-nums text-right">
                  320h
                </td>
                <td />
                <td className="px-3 py-2.5 text-sm font-bold tabular-nums text-right text-primary">
                  {formatCurrency(48560)}
                </td>
                <td colSpan={4} />
              </tr>

              {sheetRows.map((group, i) => (
                <SheetRowComponent key={group.id} row={group} index={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Totals */}
        <div className="border-t border-border bg-muted/20 px-6 py-4">
          <div className="flex justify-end">
            <div className="space-y-2 w-64">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium tabular-nums">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium tabular-nums">-{formatCurrency(discount)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold">Final Total</span>
                <span className="font-bold text-primary tabular-nums">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Profit Margin</span>
                <span className="font-medium text-emerald-600">{margin}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
