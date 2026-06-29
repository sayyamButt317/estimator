"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  FileSpreadsheet,
  Target,
  Clock,
  DollarSign,
  Sparkles,
  Plus,
  Upload,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { dashboardStats, projects, aiSuggestions, activities } from "@/data/mock-data";
import { estimates } from "@/data/estimates";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { StatCard } from "@/components/cards/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  BurnRateChart,
  SprintDistributionChart,
} from "@/components/charts/dashboard-charts";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function DashboardContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Projects"
          value={dashboardStats.totalProjects}
          icon={FolderKanban}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Active Estimates"
          value={dashboardStats.activeEstimates}
          icon={FileSpreadsheet}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Avg. Accuracy"
          value={`${dashboardStats.averageAccuracy}%`}
          icon={Target}
          iconColor="text-emerald-500"
          trend={{ value: 3, positive: true }}
        />
        <StatCard
          title="Hours Estimated"
          value={`${dashboardStats.hoursEstimated.toLocaleString()}h`}
          icon={Clock}
          iconColor="text-amber-500"
        />
        <StatCard
          title="Revenue Potential"
          value={formatCurrency(dashboardStats.revenuePotential)}
          icon={DollarSign}
          iconColor="text-emerald-600"
          trend={{ value: 15, positive: true }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Estimates */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Recent Estimates</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/estimates">
                  View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {estimates.slice(0, 5).map((estimate) => (
                <Link
                  key={estimate.id}
                  href={`/dashboard/estimates/${estimate.id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/8 shrink-0">
                      <FileSpreadsheet className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {estimate.projectName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {estimate.estimateId} · {estimate.client}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={estimate.status} />
                    <span className="text-sm font-semibold tabular-nums hidden sm:inline">
                      {formatCurrency(estimate.totalCost)}
                    </span>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "New Estimate", icon: Plus, href: "/dashboard/estimates" },
                { label: "AI Generate", icon: Sparkles, href: "/dashboard/estimates" },
                { label: "From Template", icon: FileSpreadsheet, href: "/dashboard/templates" },
                { label: "Import Data", icon: Upload, href: "#" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/20 hover:bg-primary/4 transition-all"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/8">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <BurnRateChart />
        </motion.div>
        <motion.div variants={item}>
          <SprintDistributionChart />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Recent Projects</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/projects">View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.client}</p>
                    </div>
                    <span className="text-sm font-medium tabular-nums">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.slice(0, 3).map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <Badge
                    variant={
                      suggestion.type === "warning"
                        ? "warning"
                        : suggestion.type === "opportunity"
                          ? "success"
                          : "info"
                    }
                    className="text-[10px] mb-1.5"
                  >
                    {suggestion.type}
                  </Badge>
                  <p className="text-sm font-medium">{suggestion.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {suggestion.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{project.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(project.totalBudget)}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {project.deadline}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-[10px]">
                        {activity.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {i < activities.length - 1 && (
                      <div className="absolute top-8 left-1/2 w-px h-6 -translate-x-1/2 bg-border" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.description}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
