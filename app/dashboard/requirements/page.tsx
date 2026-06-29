"use client";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/cards/empty-state";
import { ClipboardList } from "lucide-react";

export default function RequirementsPage() {
  return (
    <>
      <PageHeader
        title="Requirements"
        description="Manage project requirements across all estimates"
      />
      <EmptyState
        icon={ClipboardList}
        title="Requirements are managed per estimate"
        description="Open an estimate to view and manage its requirements, or create a new estimate to get started."
        actionLabel="View Estimates"
        onAction={() => { window.location.href = "/dashboard/estimates"; }}
      />
    </>
  );
}
