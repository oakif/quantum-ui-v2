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
import {
  DataGridTableFootRow,
  DataGridTableFootRowCell,
} from "@/registry/new-york-v4/ui/data-table/data-grid-table"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { Switch } from "@/registry/new-york-v4/ui/switch"
import { Label } from "@/registry/new-york-v4/ui/label"

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

const TITLES = [
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
  "Set up CI/CD pipeline for staging",
  "Create user onboarding flow",
  "Implement rate limiting on API",
  "Add search functionality to dashboard",
  "Fix memory leak in WebSocket handler",
  "Redesign settings page layout",
  "Add export to CSV feature",
  "Implement two-factor authentication",
  "Fix timezone handling in scheduler",
  "Add real-time collaboration support",
]

const data: Task[] = Array.from({ length: 100 }, (_, i) => ({
  id: `TASK-${1000 + i}`,
  title: TITLES[i % TITLES.length]!,
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
    enableResizing: false,
    enablePinning: false,
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
    meta: {
      label: "Search titles...",
      variant: "text" as const,
    },
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
    meta: {
      label: "Status",
      variant: "multiSelect" as const,
      options: statuses.map((s) => ({ label: s.label, value: s.value })),
    },
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
    meta: {
      label: "Priority",
      variant: "multiSelect" as const,
      options: priorities.map((p) => ({ label: p.label, value: p.value })),
    },
    size: 100,
  },
]

function TotalsFooter({ table }: { table: ReturnType<typeof useReactTable<Task>> }) {
  const filtered = table.getFilteredRowModel().rows
  const doneCount = filtered.filter((r) => r.original.status === "done").length
  const highCount = filtered.filter((r) => r.original.priority === "high").length

  return (
    <DataGridTableFootRow>
      <DataGridTableFootRowCell />
      <DataGridTableFootRowCell>
        <span className="font-semibold">{filtered.length} tasks</span>
      </DataGridTableFootRowCell>
      <DataGridTableFootRowCell />
      <DataGridTableFootRowCell>
        <span>{doneCount} done</span>
      </DataGridTableFootRowCell>
      <DataGridTableFootRowCell>
        <span>{highCount} high</span>
      </DataGridTableFootRowCell>
    </DataGridTableFootRow>
  )
}

function ToggleSwitch({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

export default function DataTableDemoPage() {
  const [sorting, setSorting] = React.useState<{ id: string; desc: boolean }[]>([])
  const [columnFilters, setColumnFilters] = React.useState<{ id: string; value: unknown }[]>([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnPinning, setColumnPinning] = React.useState({})
  const [columnOrder, setColumnOrder] = React.useState<string[]>([])

  // Layout toggles (ReUI tableLayout props)
  const [dense, setDense] = React.useState(false)
  const [stripedRows, setStripedRows] = React.useState(false)
  const [cellBorders, setCellBorders] = React.useState(false)
  const [rowBorders, setRowBorders] = React.useState(true)
  const [rowRounded, setRowRounded] = React.useState(false)
  const [headerBackground, setHeaderBackground] = React.useState(true)
  const [stickyFooter, setStickyFooter] = React.useState(true)
  const [columnsPinnable, setColumnsPinnable] = React.useState(false)
  const [columnsMovable, setColumnsMovable] = React.useState(false)
  const [resizable, setResizable] = React.useState(true)

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: resizable,
    enableColumnPinning: columnsPinnable,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnPinning,
      columnOrder,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: { pageSize: 20 },
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
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ToggleSwitch id="dense" label="Dense" checked={dense} onCheckedChange={setDense} />
            <ToggleSwitch id="striped" label="Striped rows" checked={stripedRows} onCheckedChange={setStripedRows} />
            <ToggleSwitch id="cell-borders" label="Cell borders" checked={cellBorders} onCheckedChange={setCellBorders} />
            <ToggleSwitch id="row-borders" label="Row borders" checked={rowBorders} onCheckedChange={setRowBorders} />
            <ToggleSwitch id="row-rounded" label="Rounded rows" checked={rowRounded} onCheckedChange={setRowRounded} />
            <ToggleSwitch id="header-bg" label="Header background" checked={headerBackground} onCheckedChange={setHeaderBackground} />
            <ToggleSwitch id="sticky-footer" label="Sticky footer" checked={stickyFooter} onCheckedChange={setStickyFooter} />
            <ToggleSwitch id="pinnable" label="Column pinning" checked={columnsPinnable} onCheckedChange={setColumnsPinnable} />
            <ToggleSwitch id="resizable" label="Resizable" checked={resizable} onCheckedChange={setResizable} />
            <ToggleSwitch id="movable" label="Column reorder" checked={columnsMovable} onCheckedChange={setColumnsMovable} />
          </div>

          <DataTable
            table={table}
            resizable={resizable}
            stickyHeader
            stickyFooter={stickyFooter}
            height="h-[600px]"
            tableLayoutOverrides={{
              dense,
              stripped: stripedRows,
              cellBorder: cellBorders,
              rowBorder: rowBorders,
              rowRounded,
              headerBackground,
              columnsPinnable,
              columnsMovable,
            }}
            footerContent={<TotalsFooter table={table} />}
          >
            <DataTableToolbar table={table} />
          </DataTable>
        </div>
      </div>
    </div>
  )
}
