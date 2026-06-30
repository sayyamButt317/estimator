import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateStepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function TemplateStepper({ steps, currentStep, className }: TemplateStepperProps) {
  return (
    <div className={cn("flex items-center justify-center gap-0", className)}>
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isActive && "bg-primary text-white",
                  isCompleted && "bg-primary/15 text-primary",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : stepNum}
              </div>
              <span
                className={cn(
                  "text-sm whitespace-nowrap hidden sm:inline",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 sm:w-16 h-px mx-2 sm:mx-4 border-t border-dashed",
                  stepNum < currentStep ? "border-primary/40" : "border-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
