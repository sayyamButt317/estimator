"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import type { NewEstimateFlowType } from "@/types/estimate";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  NewEstimateOptionCards,
  flowMeta,
} from "./new-estimate-option-cards";
import { FromScratchFlow } from "./flows/from-scratch-flow";
import { FromTemplateFlow } from "./flows/from-template-flow";
import { AIGenerateFlow } from "./flows/ai-generate-flow";
import { ImportCsvFlow } from "./flows/import-csv-flow";

type View = "cards" | NewEstimateFlowType;

interface NewEstimateFlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: View;
}

export function NewEstimateFlowDialog({
  open,
  onOpenChange,
  initialView = "cards",
}: NewEstimateFlowDialogProps) {
  const [view, setView] = useState<View>(initialView);

  useEffect(() => {
    if (open) setView(initialView);
  }, [open, initialView]);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setView("cards"), 200);
  };

  const handleComplete = () => handleClose();

  const isCards = view === "cards";
  const meta = !isCards ? flowMeta[view] : null;

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(v) : handleClose())}>
      <DialogContent
        className={
          isCards
            ? "max-w-3xl p-0 gap-0 overflow-hidden sm:max-w-3xl [&>button]:hidden"
            : "max-w-lg p-0 gap-0 overflow-hidden sm:max-w-lg [&>button]:hidden"
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            {!isCards && (
              <button
                onClick={() => setView("cards")}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-semibold">
                {isCards ? "New Estimate" : meta?.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isCards
                  ? "Choose how you'd like to create your estimate"
                  : meta?.subtitle}
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

        {/* Body */}
        <div className="px-6 py-6 max-h-[75vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {isCards ? (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <NewEstimateOptionCards onSelect={(flow) => setView(flow)} />
              </motion.div>
            ) : (
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                {view === "scratch" && (
                  <FromScratchFlow onComplete={handleComplete} />
                )}
                {view === "template" && (
                  <FromTemplateFlow onComplete={handleComplete} />
                )}
                {view === "ai" && <AIGenerateFlow onComplete={handleComplete} />}
                {view === "import" && (
                  <ImportCsvFlow onComplete={handleComplete} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
