"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ExternalLink,
  Download,
  Share2,
  Copy,
  Archive,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  FileDown,
} from "lucide-react";
import type { Estimate } from "@/types";
import { estimates } from "@/data/estimates";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  StatusBadge,
  PriorityBadge,
  ComplexityBadge,
  ConfidenceBadge,
} from "@/components/ui/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ShareDialog } from "@/components/dialogs/share-dialog";
import { DownloadDialog } from "@/components/dialogs/download-dialog";

const columns: ColumnDef<Estimate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "estimateId",
    header: "Estimate ID",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/estimates/${row.original.id}`}
        className="font-medium text-primary hover:underline"
      >
        {row.getValue("estimateId")}
      </Link>
    ),
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Project Name
        <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <p className="font-medium truncate">{row.getValue("projectName")}</p>
        <p className="text-xs text-muted-foreground truncate">
          {row.original.client}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("client")}</span>
    ),
  },
  {
    accessorKey: "projectType",
    header: "Type",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("projectType")}
      </span>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "complexity",
    header: "Complexity",
    cell: ({ row }) => <ComplexityBadge complexity={row.original.complexity} />,
  },
  {
    accessorKey: "estimatedHours",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hours
        <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {row.getValue<number>("estimatedHours")}h
      </span>
    ),
  },
  {
    accessorKey: "hourlyRate",
    header: "Rate",
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">
        ${row.getValue<number>("hourlyRate")}/hr
      </span>
    ),
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Cost
        <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums">
        {formatCurrency(row.getValue("totalCost"))}
      </span>
    ),
  },
  {
    accessorKey: "timeline",
    header: "Timeline",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("timeline")}</span>
    ),
  },
  {
    accessorKey: "createdDate",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.getValue("createdDate"))}
      </span>
    ),
  },
  {
    accessorKey: "updatedDate",
    header: "Updated",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.getValue("updatedDate"))}
      </span>
    ),
  },
  {
    accessorKey: "confidenceScore",
    header: "Confidence",
    cell: ({ row }) => (
      <ConfidenceBadge score={row.getValue("confidenceScore")} />
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.original.owner;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-[10px]">
              {owner.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm hidden xl:inline">{owner.name.split(" ")[0]}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions estimate={row.original} />,
  },
];

function RowActions({ estimate }: { estimate: Estimate }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/estimates/${estimate.id}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDownloadOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShareOpen(true)}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        estimateName={estimate.projectName}
      />
      <DownloadDialog open={downloadOpen} onOpenChange={setDownloadOpen} />
    </>
  );
}

export function EstimatesTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    client: false,
    projectType: false,
    hourlyRate: false,
    createdDate: false,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: estimates,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const selectedCount = Object.keys(rowSelection).length;

  const exportCSV = () => {
    const headers = ["Estimate ID", "Project", "Client", "Status", "Hours", "Total Cost"];
    const rows = estimates.map((e) =>
      [e.estimateId, e.projectName, e.client, e.status, e.estimatedHours, e.totalCost].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "estimates.csv";
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Input
          placeholder="Search estimates..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <span className="text-sm text-muted-foreground mr-2">
              {selectedCount} selected
            </span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-1.5" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <FileDown className="h-4 w-4 mr-1.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-[var(--shadow-card)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border bg-muted/30">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/20"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            –{Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
                size="icon-sm"
                onClick={() => table.setPageIndex(i)}
                className="w-8"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
