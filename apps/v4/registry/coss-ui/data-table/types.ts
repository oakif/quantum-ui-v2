import type { RowData } from "@tanstack/react-table";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  filterVariants: [
    "text",
    "number",
    "range",
    "date",
    "dateRange",
    "boolean",
    "select",
    "multiSelect",
  ] as const,
  operators: [
    "iLike",
    "notILike",
    "eq",
    "ne",
    "inArray",
    "notInArray",
    "isEmpty",
    "isNotEmpty",
    "lt",
    "lte",
    "gt",
    "gte",
    "isBetween",
    "isRelativeToToday",
  ] as const,
  joinOperators: ["and", "or"] as const,
};

export type FilterVariant = DataTableConfig["filterVariants"][number];

export interface Option {
  label: string;
  value: string;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: TData is used in the ColumnMeta interface
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
}
