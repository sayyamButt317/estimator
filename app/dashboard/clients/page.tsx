"use client";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/cards/empty-state";
import { Users } from "lucide-react";

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="Clients"
        description="Manage your client relationships and contacts"
      />
      <EmptyState
        icon={Users}
        title="Client management coming soon"
        description="Track client information, contact details, and project history all in one place."
      />
    </>
  );
}
