import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import { DataGrid } from '../generated/coss/data-table/data-grid';
import { DataGridContainer } from '../generated/coss/data-table/data-grid';
import { DataGridProvider } from '../generated/coss/data-table/data-grid';
import { DataGridScrollArea } from '../generated/coss/data-table/data-grid-scroll-area';
import { DataGridTable } from '../generated/coss/data-table/data-grid-table';
import { DataTable } from '../generated/coss/data-table/data-table';
import { DataTableColumnHeader } from '../generated/coss/data-table/data-table-column-header';
import { DataTableConfig } from '../generated/coss/data-table/types';
import { dataTableConfig } from '../generated/coss/data-table/types';
import { DataTableFacetedFilter } from '../generated/coss/data-table/data-table-faceted-filter';
import { DataTablePagination } from '../generated/coss/data-table/data-table-pagination';
import { DataTableSkeleton } from '../generated/coss/data-table/data-table-skeleton';
import { DataTableToolbar } from '../generated/coss/data-table/data-table-toolbar';
import { DataTableViewOptions } from '../generated/coss/data-table/data-table-view-options';
import { FilterVariant } from '../generated/coss/data-table/types';
import { JSX } from 'react/jsx-runtime';
import * as React_2 from 'react';
import { Select as Select_2 } from 'radix-ui';
import { Switch as Switch_2 } from 'radix-ui';
import { useDataGrid } from '../generated/coss/data-table/data-grid';
import { VariantProps } from 'class-variance-authority';

export declare function Badge({ className, variant, asChild, ...props }: React_2.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "success" | "warning" | "info" | "success-light" | "warning-light" | "info-light" | "destructive-light" | "success-outline" | "warning-outline" | "info-outline" | "destructive-outline" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Button({ className, variant, size, asChild, ...props }: React_2.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare const buttonVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Card({ className, size, ...props }: React_2.ComponentProps<"div"> & {
    size?: "default" | "sm";
}): JSX.Element;

export declare function CardAction({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardContent({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardDescription({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardTitle({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function cn(...inputs: ClassValue[]): string;

export { DataGrid }

export { DataGridContainer }

export { DataGridProvider }

export { DataGridScrollArea }

export { DataGridTable }

export { DataTable }

export { DataTableColumnHeader }

export { DataTableConfig }

export { dataTableConfig }

export { DataTableFacetedFilter }

export { DataTablePagination }

export { DataTableSkeleton }

export { DataTableToolbar }

export { DataTableViewOptions }

export { FilterVariant }

export declare function Input({ className, type, ...props }: React_2.ComponentProps<"input">): JSX.Element;

export declare function Select({ ...props }: React_2.ComponentProps<typeof Select_2.Root>): JSX.Element;

export declare function SelectContent({ className, children, position, align, ...props }: React_2.ComponentProps<typeof Select_2.Content>): JSX.Element;

export declare function SelectGroup({ className, ...props }: React_2.ComponentProps<typeof Select_2.Group>): JSX.Element;

export declare function SelectItem({ className, children, ...props }: React_2.ComponentProps<typeof Select_2.Item>): JSX.Element;

export declare function SelectLabel({ className, ...props }: React_2.ComponentProps<typeof Select_2.Label>): JSX.Element;

export declare function SelectScrollDownButton({ className, ...props }: React_2.ComponentProps<typeof Select_2.ScrollDownButton>): JSX.Element;

export declare function SelectScrollUpButton({ className, ...props }: React_2.ComponentProps<typeof Select_2.ScrollUpButton>): JSX.Element;

export declare function SelectSeparator({ className, ...props }: React_2.ComponentProps<typeof Select_2.Separator>): JSX.Element;

export declare function SelectTrigger({ className, size, children, ...props }: React_2.ComponentProps<typeof Select_2.Trigger> & {
    size?: "sm" | "default";
}): JSX.Element;

export declare function SelectValue({ ...props }: React_2.ComponentProps<typeof Select_2.Value>): JSX.Element;

export declare function SimpleSelect({ options, value, onChange, placeholder, disabled, className, }: {
    options: {
        value: string;
        label: string;
    }[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}): JSX.Element;

export declare function Switch({ className, size, label, description, card, ...props }: React_2.ComponentProps<typeof Switch_2.Root> & {
    size?: "sm" | "default";
    label?: string;
    description?: string;
    card?: boolean;
}): JSX.Element;

export declare function Table({ className, ...props }: React_2.ComponentProps<"table">): JSX.Element;

export declare function TableBody({ className, ...props }: React_2.ComponentProps<"tbody">): JSX.Element;

export declare function TableCaption({ className, ...props }: React_2.ComponentProps<"caption">): JSX.Element;

export declare function TableCell({ className, ...props }: React_2.ComponentProps<"td">): JSX.Element;

export declare function TableFooter({ className, ...props }: React_2.ComponentProps<"tfoot">): JSX.Element;

export declare function TableHead({ className, ...props }: React_2.ComponentProps<"th">): JSX.Element;

export declare function TableHeader({ className, ...props }: React_2.ComponentProps<"thead">): JSX.Element;

export declare function TableRow({ className, ...props }: React_2.ComponentProps<"tr">): JSX.Element;

/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx
 */
/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
export declare function useCallbackRef<T extends (...args: never[]) => unknown>(callback: T | undefined): T;

export { useDataGrid }

/**
 * @see https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-debounced-callback/use-debounced-callback.ts
 */
export declare function useDebouncedCallback<T extends (...args: never[]) => unknown>(callback: T, delay: number): (...args: Parameters<T>) => void;

export { }


declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        headerTitle?: string;
        headerClassName?: string;
        cellClassName?: string;
        skeleton?: ReactNode;
        expandedContent?: (row: TData) => ReactNode;
    }
}


declare module "@tanstack/react-table" {
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


declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        queryKeys?: QueryKeys;
    }
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
