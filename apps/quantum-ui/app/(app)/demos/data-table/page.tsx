"use client"

import * as React from "react"
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from "@tanstack/react-table"
import { CircleCheck, CircleDashed, CircleDot, CircleX, Timer } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { DataTable } from "@/registry/new-york-v4/ui/data-table/data-table"
import { DataTableColumnHeader } from "@/registry/new-york-v4/ui/data-table/data-table-column-header"
import { DataTableToolbar } from "@/registry/new-york-v4/ui/data-table/data-table-toolbar"
import { DataTablePagination } from "@/registry/new-york-v4/ui/data-table/data-table-pagination"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"

// Sample data
type Task = {
  id: string
  title: string
  status: "backlog" | "todo" | "in-progress" | "done" | "canceled"
  priority: "low" | "medium" | "high"
  label: "bug" | "feature" | "docs"
}

const statuses = [
  { value: "backlog", label: "Backlog", icon: CircleDashed },
  { value: "todo", label: "Todo", icon: CircleDot },
  { value: "in-progress", label: "In Progress", icon: Timer },
  { value: "done", label: "Done", icon: CircleCheck },
  { value: "canceled", label: "Canceled", icon: CircleX },
]

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

const data: Task[] = Array.from({ length: 50 }, (_, i) => ({
  id: `TASK-${1000 + i}`,
  title: [
    "Fix login page redirect loop",
    "Add dark mode toggle to settings",
    "Migrate database to PostgreSQL",
    "Implement file upload with drag and drop",
    "Refactor authentication middleware",
    "Write integration tests for API endpoints",
    "Update dependencies to latest versions",
    "Design new dashboard layout",
    "Optimize image loading performance",
    "Add email notification system",
  ][i % 10]!,
  status: (["backlog", "todo", "in-progress", "done", "canceled"] as const)[i % 5]!,
  priority: (["low", "medium", "high"] as const)[i % 3]!,
  label: (["bug", "feature", "docs"] as const)[i % 3]!,
}))

const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Task" />
    ),
    cell: ({ row }) => <span className="w-[80px]">{row.getValue("id")}</span>,
    enableSorting: false,
    enableHiding: false,
    size: 80,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Badge variant="outline">{row.original.label}</Badge>
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("title")}
        </span>
      </div>
    ),
    size: 400,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.getValue("status"))
      if (!status) return null
      return (
        <div className="flex w-[100px] items-center">
          {status.icon && <status.icon className="mr-2 size-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    size: 120,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find((p) => p.value === row.getValue("priority"))
      if (!priority) return null
      return (
        <div className="flex items-center">
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    size: 100,
  },
]

export default function DataTableDemoPage() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  })

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>DataTable</PageHeaderHeading>
        <PageHeaderDescription>
          A full-featured data table with sorting, filtering, pagination, and column visibility.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper flex-1 pb-12">
        <div className="container space-y-4">
          <DataTable table={table} />
        </div>
      </div>
    </div>
  )
}
