import { PageHeader } from "@/components/layout/page-header";
import { HoursDistributionChart, CostBreakdownChart, BurnRateChart } from "@/components/charts/dashboard-charts";

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Analytics and insights across your estimates"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HoursDistributionChart />
        <CostBreakdownChart />
        <BurnRateChart />
      </div>
    </>
  );
}
