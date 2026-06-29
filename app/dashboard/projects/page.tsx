"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { projects } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const statusConfig = {
  active: { label: "Active", variant: "success" as const },
  completed: { label: "Completed", variant: "info" as const },
  on_hold: { label: "On Hold", variant: "warning" as const },
  planning: { label: "Planning", variant: "draft" as const },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage your client projects and track progress"
      >
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          New Project
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <Badge variant={statusConfig[project.status].variant}>
                    {statusConfig[project.status].label}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-semibold tabular-nums">
                      {formatCurrency(project.totalBudget)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimates</span>
                    <span className="font-medium">{project.estimates}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.map((member) => (
                        <Avatar key={member.id} className="h-7 w-7 border-2 border-white">
                          <AvatarFallback className="text-[10px]">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Due {project.deadline}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
