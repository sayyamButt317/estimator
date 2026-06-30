"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Globe,
  Brain,
  Cloud,
  Users,
  Building,
  Heart,
  DollarSign,
  Sparkles,
} from "lucide-react";
import type { Template } from "@/types";
import { templates } from "@/data/mock-data";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateTemplateDialog } from "@/components/templates/create-template-dialog";
import { UseTemplateDialog } from "@/components/templates/use-template-dialog";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Smartphone,
  Globe,
  Brain,
  Cloud,
  Users,
  Building,
  Heart,
  DollarSign,
};

export default function TemplatesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [useOpen, setUseOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setUseOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Templates"
        description="Start faster with pre-built estimation templates"
      >
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <Sparkles className="h-4 w-4 mr-1.5" />
          Create Template
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((template, i) => {
          const Icon = iconMap[template.icon] || Code;
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl shrink-0"
                      style={{ backgroundColor: `${template.color}15` }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: template.color }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <Badge variant="secondary" className="text-[10px] mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground flex-1 mb-4">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm">
                      <span className="font-semibold">{template.estimatedHours}h</span>
                      <span className="text-muted-foreground"> · {template.tasks} tasks</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <CreateTemplateDialog open={createOpen} onOpenChange={setCreateOpen} />
      <UseTemplateDialog
        open={useOpen}
        onOpenChange={setUseOpen}
        template={selectedTemplate}
      />
    </>
  );
}
