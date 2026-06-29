import { PageHeader } from "@/components/layout/page-header";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your projects, estimates, and AI insights"
      />
      <DashboardContent />
    </>
  );
}
