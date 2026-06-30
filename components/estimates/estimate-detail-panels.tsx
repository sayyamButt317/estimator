"use client";

import type { Activity, ActivityType, Estimate } from "@/types";
import {
  aiSuggestions,
  risks,
  activities,
  comments,
  timelineMilestones,
  attachments,
} from "@/data/mock-data";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Shield,
  Plus,
  Download,
  Share2,
  MessageSquare,
  Pencil,
  ClipboardList,
} from "lucide-react";
import {
  HoursDistributionChart,
  CostBreakdownChart,
} from "@/components/charts/dashboard-charts";

interface EstimateRightSidebarProps {
  estimate: Estimate;
}

export function EstimateRightSidebar({ estimate }: EstimateRightSidebarProps) {
  return (
    <div className="space-y-5">
      {/* AI Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This e-commerce estimate covers 320 hours across 4 workstreams with
            high confidence (85%). Payment integration poses the highest risk.
            Consider adding security testing buffer.
          </p>
        </CardContent>
      </Card>

      {/* Project Health */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            Project Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-semibold text-emerald-600">
                {estimate.confidenceScore}%
              </span>
            </div>
            <Progress value={estimate.confidenceScore} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-semibold">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Est. completion:</span>
            <span className="font-medium">Aug 15, 2024</span>
          </div>
        </CardContent>
      </Card>

      {/* Team Recommendation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Team Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Optimal team of {estimate.teamSize}:
          </p>
          <div className="space-y-2">
            {[
              { role: "Project Manager", count: 1 },
              { role: "Frontend Developer", count: 2 },
              { role: "Backend Developer", count: 1 },
              { role: "UI/UX Designer", count: 1 },
              { role: "QA Engineer", count: 1 },
            ].map((item) => (
              <div key={item.role} className="flex justify-between text-sm">
                <span>{item.role}</span>
                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Potential Risks */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Potential Risks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {risks.slice(0, 3).map((risk) => (
            <div key={risk.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    risk.severity === "high" || risk.severity === "critical"
                      ? "destructive"
                      : "warning"
                  }
                  className="text-[10px]"
                >
                  {risk.severity}
                </Badge>
                <span className="text-sm font-medium">{risk.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{risk.mitigation}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant={
                    suggestion.type === "warning"
                      ? "warning"
                      : suggestion.type === "opportunity"
                        ? "success"
                        : "info"
                  }
                  className="text-[10px]"
                >
                  {suggestion.type}
                </Badge>
              </div>
              <p className="text-sm font-medium">{suggestion.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {suggestion.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function EstimateOverviewTab({ estimate: _estimate }: { estimate: Estimate }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HoursDistributionChart />
        <CostBreakdownChart />
      </div>
    </div>
  );
}

const activityTypeConfig: Record<
  ActivityType,
  { label: string; icon: typeof Plus; iconClass: string; badgeVariant: "default" | "success" | "info" | "warning" | "secondary" }
> = {
  created: { label: "Created", icon: Plus, iconClass: "text-emerald-600 bg-emerald-50", badgeVariant: "success" },
  updated: { label: "Updated", icon: Pencil, iconClass: "text-blue-600 bg-blue-50", badgeVariant: "info" },
  downloaded: { label: "Downloaded", icon: Download, iconClass: "text-violet-600 bg-violet-50", badgeVariant: "secondary" },
  shared: { label: "Shared", icon: Share2, iconClass: "text-cyan-600 bg-cyan-50", badgeVariant: "info" },
  comment: { label: "Comment", icon: MessageSquare, iconClass: "text-amber-600 bg-amber-50", badgeVariant: "warning" },
  ai_generated: { label: "AI Generated", icon: Sparkles, iconClass: "text-primary bg-primary/10", badgeVariant: "default" },
  requirement_updated: { label: "Requirement", icon: ClipboardList, iconClass: "text-orange-600 bg-orange-50", badgeVariant: "warning" },
};

function ActivityTimelineItem({
  activity,
  isLast,
}: {
  activity: Activity;
  isLast: boolean;
}) {
  const config = activityTypeConfig[activity.type];
  const Icon = config.icon;

  return (
    <div className="flex gap-4">
      <div className="relative flex flex-col items-center">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        {!isLast && <div className="w-px flex-1 min-h-[24px] bg-border mt-2" />}
      </div>
      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-6"}`}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge variant={config.badgeVariant} className="text-[10px]">
            {config.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(activity.timestamp)}
          </span>
        </div>
        <p className="text-sm">
          <span className="font-medium">{activity.user.name}</span>{" "}
          <span className="text-muted-foreground">{activity.description}</span>
        </p>
      </div>
    </div>
  );
}

export function EstimateActivityTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Activity Timeline</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Full history of changes, shares, downloads, and comments on this estimate
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {activities.map((activity, i) => (
            <ActivityTimelineItem
              key={activity.id}
              activity={activity}
              isLast={i === activities.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function EstimateTimelineTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineMilestones.map((milestone) => (
            <div key={milestone.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{milestone.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {milestone.startDate} → {milestone.endDate} · {milestone.assignee}
                  </p>
                </div>
                <span className="text-sm font-medium tabular-nums">
                  {milestone.progress}%
                </span>
              </div>
              <Progress value={milestone.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function EstimateNotesTab() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-[10px]">SJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <textarea
            placeholder="Add a note..."
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 min-h-[80px]"
          />
        </div>
      </div>
      <Separator />
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-[10px]">
              {comment.user.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(comment.timestamp)}
              </span>
            </div>
            <p className="text-sm mt-1">{comment.content}</p>
            {comment.reactions.length > 0 && (
              <div className="flex gap-1 mt-2">
                {comment.reactions.map((r) => (
                  <button
                    key={r.emoji}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs hover:bg-muted/80"
                  >
                    {r.emoji} {r.count}
                  </button>
                ))}
              </div>
            )}
            {comment.replies?.map((reply) => (
              <div key={reply.id} className="flex gap-3 mt-3 ml-4 pl-4 border-l-2 border-border">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[10px]">
                    {reply.user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{reply.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(reply.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm mt-0.5">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EstimateAttachmentsTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {attachments.map((file) => (
        <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {file.size} · {file.uploadedBy.name}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function EstimateRisksTab() {
  return (
    <div className="space-y-4">
      {risks.map((risk) => (
        <Card key={risk.id}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant={
                      risk.severity === "high" || risk.severity === "critical"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {risk.severity} severity
                  </Badge>
                  <Badge variant="outline">{risk.probability} probability</Badge>
                </div>
                <h4 className="font-medium">{risk.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {risk.description}
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-xl bg-muted/40">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Mitigation
              </p>
              <p className="text-sm">{risk.mitigation}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function EstimateAISuggestionsTab() {
  return (
    <div className="space-y-4">
      {aiSuggestions.map((suggestion) => (
        <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      suggestion.type === "warning"
                        ? "warning"
                        : suggestion.type === "opportunity"
                          ? "success"
                          : "info"
                    }
                  >
                    {suggestion.type}
                  </Badge>
                  <Badge variant="outline">{suggestion.impact} impact</Badge>
                </div>
                <h4 className="font-medium">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
