"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileSpreadsheet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const requirements = [
  "File must be in CSV format",
  "First row should contain column headers",
  "Required columns: Task, Category, Hours, Rate",
  "Maximum file size: 10MB",
];

interface ImportCsvFlowProps {
  onComplete?: () => void;
}

export function ImportCsvFlow({ onComplete }: ImportCsvFlowProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => {
    if (f.name.endsWith(".csv") || f.type === "text/csv") setFile(f);
  };

  const handleImport = () => {
    onComplete?.();
    router.push("/dashboard/estimates/est-1");
  };

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        onClick={() => fileRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-3 p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : file
              ? "border-emerald-300 bg-emerald-50/40"
              : "border-border hover:border-primary/30 hover:bg-muted/20"
        )}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        {file ? (
          <>
            <FileSpreadsheet className="h-10 w-10 text-emerald-600" />
            <div className="text-center">
              <p className="text-sm font-semibold">{file.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click to replace file
              </p>
            </div>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">
                Drag and drop your CSV file here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or click to browse · Supports .csv files up to 10MB
              </p>
            </div>
          </>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">CSV Requirements</p>
        <ul className="space-y-2">
          {requirements.map((req) => (
            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      <Button
        className="w-full h-11 rounded-xl"
        disabled={!file}
        onClick={handleImport}
      >
        Upload and Import
      </Button>
    </div>
  );
}
