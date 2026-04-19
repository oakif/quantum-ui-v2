import './styles.css'

// Re-export everything from the generated style output (new architecture)
export * from '~ui/index'

// Legacy data-table (not yet migrated to ui/components/)
// These resolve via ~ui/ fallback to upstream/registry/coss-ui/
export { DataTable } from '~ui/data-table/data-table'
export { DataTableColumnHeader } from '~ui/data-table/data-table-column-header'
export { DataTableToolbar } from '~ui/data-table/data-table-toolbar'
export { DataTablePagination } from '~ui/data-table/data-table-pagination'
export { DataTableSkeleton } from '~ui/data-table/data-table-skeleton'
export { DataTableFacetedFilter } from '~ui/data-table/data-table-faceted-filter'
export { DataTableViewOptions } from '~ui/data-table/data-table-view-options'
export { useDataGrid, DataGridProvider, DataGrid, DataGridContainer } from '~ui/data-table/data-grid'
export { DataGridScrollArea } from '~ui/data-table/data-grid-scroll-area'
export { DataGridTable } from '~ui/data-table/data-grid-table'
export { dataTableConfig, type DataTableConfig, type FilterVariant } from '~ui/data-table/types'
