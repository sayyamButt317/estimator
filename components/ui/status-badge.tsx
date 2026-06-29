import type { EstimateStatus, Priority, Complexity } from "@/types";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<
  EstimateStatus,
  { label: string; variant: "success" | "warning" | "info" | "destructive" | "draft" | "secondary" }
> = {
  approved: { label: "Approved", variant: "success" },
  in_review: { label: "In Review", variant: "warning" },
  draft: { label: "Draft", variant: "draft" },
  rejected: { label: "Rejected", variant: "destructive" },
  archived: { label: "Archived", variant: "secondary" },
};

const priorityConfig: Record<
  Priority,
  { label: string; variant: "destructive" | "warning" | "info" | "secondary" }
> = {
  critical: { label: "Critical", variant: "destructive" },
  high: { label: "High", variant: "warning" },
  medium: { label: "Medium", variant: "info" },
  low: { label: "Low", variant: "secondary" },
};

const complexityConfig: Record<
  Complexity,
  { label: string; variant: "destructive" | "warning" | "info" | "secondary" }
> = {
  very_high: { label: "Very High", variant: "destructive" },
  high: { label: "High", variant: "warning" },
  medium: { label: "Medium", variant: "info" },
  low: { label: "Low", variant: "secondary" },
};

interface StatusBadgeProps {
  status: EstimateStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

interface ComplexityBadgeProps {
  complexity: Complexity;
  className?: string;
}

export function ComplexityBadge({ complexity, className }: ComplexityBadgeProps) {
  const config = complexityConfig[complexity];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

interface ConfidenceBadgeProps {
  score: number;
  className?: string;
}

export function ConfidenceBadge({ score, className }: ConfidenceBadgeProps) {
  const variant =
    score >= 80 ? "success" : score >= 60 ? "warning" : "destructive";
  const label = score >= 80 ? "High" : score >= 60 ? "Medium" : "Low";

  return (
    <Badge variant={variant} className={className}>
      {label} ({score}%)
    </Badge>
  );
}
