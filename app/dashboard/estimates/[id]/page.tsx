"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Share2,
  Copy,
  Printer,
  Sparkles,
  DollarSign,
  Clock,
  Calendar,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import { getEstimateById } from "@/data/estimates";
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/cards/stat-card";
import { EstimateSheet } from "@/components/estimates/estimate-sheet";
import { RequirementsTab } from "@/components/estimates/requirements-tab";
import {
  EstimateRightSidebar,
  EstimateOverviewTab,
  EstimateTimelineTab,
  EstimateNotesTab,
  EstimateAttachmentsTab,
  EstimateRisksTab,
  EstimateAISuggestionsTab,
} from "@/components/estimates/estimate-detail-panels";
import { ShareDialog } from "@/components/dialogs/share-dialog";
import { DownloadDialog } from "@/components/dialogs/download-dialog";

interface EstimateDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EstimateDetailPage({ params }: EstimateDetailPageProps) {
  const { id } = use(params);
  const estimate = getEstimateById(id);
  const [shareOpen, setShareOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  if (!estimate) {
    notFound();
  }

  const overviewCards = [
    {
      title: "Estimated Cost",
      value: formatCurrency(estimate.totalCost),
      icon: DollarSign,
    },
    {
      title: "Estimated Hours",
      value: `${estimate.estimatedHours}h`,
      icon: Clock,
    },
    {
      title: "Timeline",
      value: estimate.timeline,
      icon: Calendar,
    },
    {
      title: "Team Size",
      value: estimate.teamSize,
      icon: Users,
    },
    {
      title: "Confidence",
      value: `${estimate.confidenceScore}%`,
      icon: Target,
      iconColor: "text-emerald-500",
    },
    {
      title: "Profit Margin",
      value: `${estimate.profitMargin}%`,
      icon: TrendingUp,
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Link */}
      <Link
        href="/dashboard/estimates"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Estimates
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {estimate.projectName}
            </h1>
            <StatusBadge status={estimate.status} />
            <Badge variant="outline">{estimate.version}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{estimate.estimateId}</span>
            <span>·</span>
            <span>{estimate.client}</span>
            <span>·</span>
            <span>Created {formatDate(estimate.createdDate)}</span>
            <span>·</span>
            <span>Updated {formatRelativeTime(estimate.updatedDate)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-1.5" />
            Open
          </Button>
          <Button variant="outline" size="sm" onClick={() => setDownloadOpen(true)}>
            <Download className="h-4 w-4 mr-1.5" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShareOpen(true)}>
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1.5" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1.5" />
            Print
          </Button>
          <Button size="sm">
            <Sparkles className="h-4 w-4 mr-1.5" />
            AI Improve
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {overviewCards.map((card) => (
          <StatCard key={card.title} {...card} className="!p-4" />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">
                Requirements
                <Badge variant="secondary" className="ml-1.5 text-[10px]">
                  28
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="sheet">Estimate Sheet</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="ai">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <EstimateOverviewTab estimate={estimate} />
            </TabsContent>
            <TabsContent value="requirements">
              <RequirementsTab />
            </TabsContent>
            <TabsContent value="sheet">
              <EstimateSheet />
            </TabsContent>
            <TabsContent value="risks">
              <EstimateRisksTab />
            </TabsContent>
            <TabsContent value="timeline">
              <EstimateTimelineTab />
            </TabsContent>
            <TabsContent value="attachments">
              <EstimateAttachmentsTab />
            </TabsContent>
            <TabsContent value="activity">
              <EstimateOverviewTab estimate={estimate} />
            </TabsContent>
            <TabsContent value="notes">
              <EstimateNotesTab />
            </TabsContent>
            <TabsContent value="ai">
              <EstimateAISuggestionsTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-1">
          <EstimateRightSidebar estimate={estimate} />
        </div>
      </div>

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        estimateName={estimate.projectName}
      />
      <DownloadDialog open={downloadOpen} onOpenChange={setDownloadOpen} />
    </motion.div>
  );
}
