"use client";

import type { Requirement, RequirementCategory } from "@/types";
import { requirements } from "@/data/mock-data";
import { PriorityBadge, ComplexityBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categoryLabels: Record<RequirementCategory, string> = {
  functional: "Functional",
  non_functional: "Non-Functional",
  technical: "Technical",
  security: "Security",
  performance: "Performance",
  business: "Business",
  acceptance_criteria: "Acceptance Criteria",
  dependencies: "Dependencies",
  out_of_scope: "Out of Scope",
};

const categoryOrder: RequirementCategory[] = [
  "functional",
  "non_functional",
  "technical",
  "security",
  "performance",
  "business",
  "acceptance_criteria",
  "dependencies",
  "out_of_scope",
];

function RequirementCard({ req }: { req: Requirement }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-medium">{req.title}</h4>
          <PriorityBadge priority={req.priority} />
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{req.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-muted-foreground">
            {req.storyPoints} SP
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs font-medium">{req.estimatedHours}h</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{req.assignedRole}</span>
        </div>
      </div>
      <ComplexityBadge complexity={req.difficulty} />
    </div>
  );
}

export function RequirementsTab() {
  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      const items = requirements.filter((r) => r.category === cat);
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {} as Record<RequirementCategory, Requirement[]>
  );

  const counts = {
    mustHave: requirements.filter((r) => r.priority === "critical" || r.priority === "high").length,
    shouldHave: requirements.filter((r) => r.priority === "medium").length,
    couldHave: requirements.filter((r) => r.priority === "low").length,
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Total: <strong className="text-foreground">{requirements.length}</strong> requirements
        </span>
        <Badge variant="destructive">Must Have ({counts.mustHave})</Badge>
        <Badge variant="warning">Should Have ({counts.shouldHave})</Badge>
        <Badge variant="info">Could Have ({counts.couldHave})</Badge>
      </div>

      {/* Grouped Requirements */}
      {Object.entries(grouped).map(([category, items]) => (
        <Card key={category}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              {categoryLabels[category as RequirementCategory]}
              <Badge variant="secondary" className="text-[10px]">
                {items.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {items.map((req) => (
              <RequirementCard key={req.id} req={req} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
