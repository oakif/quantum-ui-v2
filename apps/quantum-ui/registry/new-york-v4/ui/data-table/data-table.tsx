"use client"

import * as React from "react"
import { type Table as TanstackTable } from "@tanstack/react-table"

import { DataGrid, DataGridContainer, type DataGridProps } from "@/registry/new-york-v4/ui/data-table/data-grid"
import { DataGridScrollArea } from "@/registry/new-york-v4/ui/data-table/data-grid-scroll-area"
import { DataGridTable } from "@/registry/new-york-v4/ui/data-table/data-grid-table"
import { DataTablePagination } from "@/registry/new-york-v4/ui/data-table/data-table-pagination"
import { cn } from "@/lib/utils"

interface DataTableProps<TData extends object> {
  table: TanstackTable<TData>
  recordCount?: number
  actionBar?: React.ReactNode
  children?: React.ReactNode
  className?: string
  resizable?: boolean
  stickyHeader?: boolean
  stickyFooter?: boolean
  height?: string
  footerContent?: React.ReactNode
  tableLayoutOverrides?: DataGridProps<TData>["tableLayout"]
}

export function DataTable<TData extends object>({
  table,
  recordCount,
  actionBar,
  children,
  className,
  resizable = false,
  stickyHeader = false,
  stickyFooter = false,
  height,
  footerContent,
  tableLayoutOverrides,
}: DataTableProps<TData>) {
  return (
    <DataGrid
      table={table}
      recordCount={recordCount ?? table.getFilteredRowModel().rows.length}
      tableLayout={{
        columnsResizable: resizable,
        columnsResizeMode: "onEnd",
        headerSticky: stickyHeader,
        footerSticky: stickyFooter,
        headerBorder: true,
        rowBorder: true,
        ...tableLayoutOverrides,
      }}
    >
      <div className={cn("flex w-full flex-col gap-2.5", className)}>
        {children}
        <DataGridContainer>
          <DataGridScrollArea className={height}>
            <DataGridTable footerContent={footerContent} />
          </DataGridScrollArea>
        </DataGridContainer>
        <div className="flex flex-col gap-2.5">
          <DataTablePagination table={table} />
          {actionBar &&
            table.getFilteredSelectedRowModel().rows.length > 0 &&
            actionBar}
        </div>
      </div>
    </DataGrid>
  )
}
