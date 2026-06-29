import { PageHeader } from "@/components/layout/page-header";
import { EstimatesTable } from "@/components/tables/estimates-table";
import { Button } from "@/components/ui/button";
import { Upload, FileDown } from "lucide-react";

export default function EstimatesPage() {
  return (
    <>
      <PageHeader
        title="Estimates"
        description="Manage and track all your project estimates"
      >
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-1.5" />
          Import
        </Button>
        <Button variant="outline" size="sm">
          <FileDown className="h-4 w-4 mr-1.5" />
          Export
        </Button>
      </PageHeader>
      <EstimatesTable />
    </>
  );
}
