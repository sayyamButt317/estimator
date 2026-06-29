"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, FileJson, File, FileType } from "lucide-react";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formats = [
  { id: "pdf", label: "PDF Document", icon: FileText, description: "Formatted report with charts" },
  { id: "excel", label: "Excel Spreadsheet", icon: FileSpreadsheet, description: "Full estimate sheet with formulas" },
  { id: "csv", label: "CSV File", icon: File, description: "Raw data export" },
  { id: "word", label: "Word Document", icon: FileType, description: "Editable proposal document" },
  { id: "json", label: "JSON Data", icon: FileJson, description: "Machine-readable format" },
];

export function DownloadDialog({ open, onOpenChange }: DownloadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Estimate</DialogTitle>
          <DialogDescription>
            Choose your preferred format to download
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {formats.map((format) => {
            const Icon = format.icon;
            return (
              <button
                key={format.id}
                className="flex w-full items-center gap-4 rounded-xl border border-border p-4 text-left transition-all hover:bg-muted/50 hover:border-primary/20 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{format.label}</p>
                  <p className="text-xs text-muted-foreground">{format.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <Button className="w-full mt-2">Download Selected</Button>
      </DialogContent>
    </Dialog>
  );
}
