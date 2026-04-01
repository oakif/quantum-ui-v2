"use client"

import * as React from "react"
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"

import { DataTablePagination } from "@/registry/new-york-v4/ui/data-table/data-table-pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import { getColumnPinningStyle } from "@/lib/data-table/utils"
import { cn } from "@/lib/utils"

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>
  actionBar?: React.ReactNode
  resizable?: boolean
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  resizable = false,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="overflow-hidden rounded-md border">
        <div className="overflow-x-auto">
          <Table
            className={resizable ? "w-auto table-fixed" : undefined}
            style={resizable ? { width: table.getTotalSize() } : undefined}
          >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="relative"
                      style={{
                        ...getColumnPinningStyle({ column: header.column }),
                        ...(resizable ? { width: header.getSize() } : {}),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {resizable && (
                        header.column.getCanResize() ? (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={cn(
                              "absolute right-0 top-2 bottom-2 z-10 w-1 translate-x-1/2 cursor-col-resize rounded-full bg-border transition-[opacity,background-color,width] duration-150 hover:w-1.5 hover:bg-muted-foreground active:bg-muted-foreground",
                              header.column.getIsResizing()
                                ? "w-1.5 bg-muted-foreground opacity-100"
                                : "opacity-40 hover:opacity-100",
                            )}
                            style={{ touchAction: "none", userSelect: "none" }}
                          />
                        ) : (
                          <div className="absolute right-0 top-2 bottom-2 z-10 w-1 translate-x-1/2 cursor-not-allowed rounded-full bg-border opacity-40" />
                        )
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getColumnPinningStyle({ column: cell.column }),
                          ...(resizable ? { width: cell.column.getSize() } : {}),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  )
}
