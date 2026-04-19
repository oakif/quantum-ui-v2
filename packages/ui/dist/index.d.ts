import { Accordion as Accordion_2 } from 'radix-ui';
import { AlertDialog as AlertDialog_2 } from 'radix-ui';
import { AspectRatio as AspectRatio_2 } from 'radix-ui';
import { Avatar as Avatar_2 } from 'radix-ui';
import { Button as Button_2 } from '../new-york-v4/ui/button';
import { Checkbox as Checkbox_2 } from 'radix-ui';
import { ClassProp } from 'class-variance-authority/types';
import { cn } from '../../../apps/v4/lib/utils';
import { Collapsible as Collapsible_2 } from 'radix-ui';
import { Column } from '@tanstack/react-table';
import { ComponentProps } from 'react';
import { Dialog as Dialog_2 } from 'radix-ui';
import { DropdownMenu as DropdownMenu_2 } from 'radix-ui';
import { HoverCard as HoverCard_2 } from 'radix-ui';
import { HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Label as Label_2 } from '../new-york-v4/ui/label';
import { Label as Label_3 } from 'radix-ui';
import { Popover as Popover_2 } from 'radix-ui';
import { Progress as Progress_2 } from 'radix-ui';
import { RadioGroup as RadioGroup_2 } from 'radix-ui';
import * as React_2 from 'react';
import { ReactNode } from 'react';
import { ScrollArea as ScrollArea_2 } from 'radix-ui';
import { Select as Select_2 } from 'radix-ui';
import { Separator as Separator_2 } from '../new-york-v4/ui/separator';
import { Separator as Separator_3 } from 'radix-ui';
import { Slider as Slider_2 } from 'radix-ui';
import { Switch as Switch_2 } from 'radix-ui';
import { Table as Table_2 } from '@tanstack/react-table';
import { Tabs as Tabs_2 } from 'radix-ui';
import { Toggle as Toggle_2 } from 'radix-ui';
import { ToggleGroup as ToggleGroup_2 } from 'radix-ui';
import { toggleVariants as toggleVariants_2 } from '../new-york-v4/ui/toggle';
import { Tooltip as Tooltip_2 } from 'radix-ui';
import { VariantProps } from 'class-variance-authority';

export declare function Accordion({ ...props }: React_2.ComponentProps<typeof Accordion_2.Root>): JSX.Element;

export declare function AccordionContent({ className, children, ...props }: React_2.ComponentProps<typeof Accordion_2.Content>): JSX.Element;

export declare function AccordionItem({ className, ...props }: React_2.ComponentProps<typeof Accordion_2.Item>): JSX.Element;

export declare function AccordionTrigger({ className, children, ...props }: React_2.ComponentProps<typeof Accordion_2.Trigger>): JSX.Element;

export declare function Alert({ className, variant, ...props }: React_2.ComponentProps<"div"> & VariantProps<typeof alertVariants>): JSX.Element;

export declare function AlertDescription({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function AlertDialog({ ...props }: React_2.ComponentProps<typeof AlertDialog_2.Root>): JSX.Element;

export declare function AlertDialogAction({ className, variant, size, ...props }: React_2.ComponentProps<typeof AlertDialog_2.Action> & Pick<React_2.ComponentProps<typeof Button_2>, "variant" | "size">): JSX.Element;

export declare function AlertDialogCancel({ className, variant, size, ...props }: React_2.ComponentProps<typeof AlertDialog_2.Cancel> & Pick<React_2.ComponentProps<typeof Button_2>, "variant" | "size">): JSX.Element;

export declare function AlertDialogContent({ className, size, ...props }: React_2.ComponentProps<typeof AlertDialog_2.Content> & {
    size?: "default" | "sm";
}): JSX.Element;

export declare function AlertDialogDescription({ className, ...props }: React_2.ComponentProps<typeof AlertDialog_2.Description>): JSX.Element;

export declare function AlertDialogFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function AlertDialogHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function AlertDialogMedia({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function AlertDialogOverlay({ className, ...props }: React_2.ComponentProps<typeof AlertDialog_2.Overlay>): JSX.Element;

export declare function AlertDialogPortal({ ...props }: React_2.ComponentProps<typeof AlertDialog_2.Portal>): JSX.Element;

export declare function AlertDialogTitle({ className, ...props }: React_2.ComponentProps<typeof AlertDialog_2.Title>): JSX.Element;

export declare function AlertDialogTrigger({ ...props }: React_2.ComponentProps<typeof AlertDialog_2.Trigger>): JSX.Element;

export declare function AlertTitle({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatio_2.Root>): JSX.Element;

export declare function Avatar({ className, size, ...props }: React_2.ComponentProps<typeof Avatar_2.Root> & {
    size?: "default" | "sm" | "lg";
}): JSX.Element;

export declare function AvatarFallback({ className, ...props }: React_2.ComponentProps<typeof Avatar_2.Fallback>): JSX.Element;

export declare function AvatarImage({ className, ...props }: React_2.ComponentProps<typeof Avatar_2.Image>): JSX.Element;

export declare function Badge({ className, variant, asChild, ...props }: React_2.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare const badgeVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Breadcrumb({ ...props }: React_2.ComponentProps<"nav">): JSX.Element;

export declare function BreadcrumbEllipsis({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function BreadcrumbItem({ className, ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function BreadcrumbLink({ asChild, className, ...props }: React_2.ComponentProps<"a"> & {
    asChild?: boolean;
}): JSX.Element;

export declare function BreadcrumbList({ className, ...props }: React_2.ComponentProps<"ol">): JSX.Element;

export declare function BreadcrumbPage({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function BreadcrumbSeparator({ children, className, ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function Button({ className, variant, size, asChild, loading, disabled, children, ...props }: React_2.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
}): JSX.Element;

export declare function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>): JSX.Element;

declare const buttonGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Card({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardAction({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardContent({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardDescription({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function CardTitle({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function Checkbox({ className, ...props }: React_2.ComponentProps<typeof Checkbox_2.Root>): JSX.Element;

export { cn }

export declare function Collapsible({ ...props }: React.ComponentProps<typeof Collapsible_2.Root>): JSX.Element;

export declare function CollapsibleContent({ ...props }: React.ComponentProps<typeof Collapsible_2.CollapsibleContent>): JSX.Element;

export declare function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof Collapsible_2.CollapsibleTrigger>): JSX.Element;

export declare function DataGrid<TData extends object>({ children, table, ...props }: DataGridProps<TData>): JSX.Element;

export declare function DataGridContainer({ children, className, border, }: {
    children: ReactNode;
    className?: string;
    border?: boolean;
}): JSX.Element;

declare interface DataGridContextProps<TData extends object> {
    props: DataGridProps<TData>;
    table: Table_2<TData>;
    recordCount: number;
    isLoading: boolean;
}

declare interface DataGridProps<TData extends object> {
    className?: string;
    table?: Table_2<TData>;
    recordCount: number;
    children?: ReactNode;
    onRowClick?: (row: TData) => void;
    isLoading?: boolean;
    loadingMode?: "skeleton" | "spinner";
    loadingMessage?: ReactNode | string;
    fetchingMoreMessage?: ReactNode | string;
    allRowsLoadedMessage?: ReactNode | string;
    emptyMessage?: ReactNode | string;
    tableLayout?: {
        dense?: boolean;
        cellBorder?: boolean;
        rowBorder?: boolean;
        rowRounded?: boolean;
        stripped?: boolean;
        headerBackground?: boolean;
        headerBorder?: boolean;
        headerSticky?: boolean;
        footerSticky?: boolean;
        width?: "auto" | "fixed";
        columnsVisibility?: boolean;
        columnsResizable?: boolean;
        columnsResizeMode?: "onChange" | "onEnd";
        columnsPinnable?: boolean;
        columnsMovable?: boolean;
        columnsDraggable?: boolean;
        rowsDraggable?: boolean;
        rowsPinnable?: boolean;
    };
    tableClassNames?: {
        base?: string;
        header?: string;
        headerRow?: string;
        headerSticky?: string;
        footerSticky?: string;
        body?: string;
        bodyRow?: string;
        footer?: string;
        edgeCell?: string;
    };
}

export declare function DataGridProvider<TData extends object>({ children, table, ...props }: DataGridProps<TData> & {
    table: Table_2<TData>;
}): JSX.Element;

export declare function DataGridScrollArea({ children, className, orientation, ...props }: DataGridScrollAreaProps): JSX.Element;

declare type DataGridScrollAreaOrientation = "horizontal" | "vertical" | "both";

declare type DataGridScrollAreaProps = Omit<ComponentProps<typeof ScrollArea_2.Root>, "children"> & {
    children: ReactNode;
    orientation?: DataGridScrollAreaOrientation;
};

export declare function DataGridTable<TData>({ footerContent, renderHeader, }: {
    footerContent?: ReactNode;
    renderHeader?: boolean;
}): JSX.Element;

export declare function DataTable<TData extends object>({ table, recordCount, actionBar, children, className, resizable, stickyHeader, stickyFooter, height, footerContent, tableLayoutOverrides, }: DataTableProps<TData>): JSX.Element;

export declare const DataTableColumnHeader: typeof DataTableColumnHeaderInner;

declare function DataTableColumnHeaderInner<TData, TValue>({ column, label, icon, className, filter, visibility, }: DataTableColumnHeaderProps<TData, TValue>): JSX.Element;

declare interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    /** Displayed label. Falls back to meta.headerTitle, then string header, then column.id. */
    label?: string;
    icon?: ReactNode;
    pinnable?: boolean;
    filter?: ReactNode;
    visibility?: boolean;
}

export declare type DataTableConfig = typeof dataTableConfig;

export declare const dataTableConfig: {
    filterVariants: readonly ["text", "number", "range", "date", "dateRange", "boolean", "select", "multiSelect"];
    operators: readonly ["iLike", "notILike", "eq", "ne", "inArray", "notInArray", "isEmpty", "isNotEmpty", "lt", "lte", "gt", "gte", "isBetween", "isRelativeToToday"];
    joinOperators: readonly ["and", "or"];
};

export declare function DataTableFacetedFilter<TData, TValue>({ column, title, options, multiple, }: DataTableFacetedFilterProps<TData, TValue>): JSX.Element;

declare interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
    options: Option_2[];
    multiple?: boolean;
}

export declare function DataTablePagination<TData>({ table, pageSizeOptions, className, ...props }: DataTablePaginationProps<TData>): JSX.Element;

declare interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
    table: Table_2<TData>;
    pageSizeOptions?: number[];
}

declare interface DataTableProps<TData extends object> {
    table: Table_2<TData>;
    recordCount?: number;
    actionBar?: React_2.ReactNode;
    children?: React_2.ReactNode;
    className?: string;
    resizable?: boolean;
    stickyHeader?: boolean;
    stickyFooter?: boolean;
    height?: string;
    footerContent?: React_2.ReactNode;
    tableLayoutOverrides?: DataGridProps<TData>["tableLayout"];
}

export declare function DataTableSkeleton({ columnCount, rowCount, filterCount, cellWidths, withViewOptions, withPagination, shrinkZero, className, ...props }: DataTableSkeletonProps): JSX.Element;

declare interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
    columnCount: number;
    rowCount?: number;
    filterCount?: number;
    cellWidths?: string[];
    withViewOptions?: boolean;
    withPagination?: boolean;
    shrinkZero?: boolean;
}

export declare function DataTableToolbar<TData>({ table, children, className, ...props }: DataTableToolbarProps<TData>): JSX.Element;

declare interface DataTableToolbarProps<TData> extends React_2.ComponentProps<"div"> {
    table: Table_2<TData>;
}

export declare function DataTableViewOptions<TData>({ table, disabled, ...props }: DataTableViewOptionsProps<TData>): JSX.Element;

declare interface DataTableViewOptionsProps<TData> extends React_2.ComponentProps<typeof PopoverContent> {
    table: Table_2<TData>;
    disabled?: boolean;
}

export declare function Dialog({ ...props }: React_2.ComponentProps<typeof Dialog_2.Root>): JSX.Element;

export declare function DialogClose({ ...props }: React_2.ComponentProps<typeof Dialog_2.Close>): JSX.Element;

export declare function DialogContent({ className, children, showCloseButton, ...props }: React_2.ComponentProps<typeof Dialog_2.Content> & {
    showCloseButton?: boolean;
}): JSX.Element;

export declare function DialogDescription({ className, ...props }: React_2.ComponentProps<typeof Dialog_2.Description>): JSX.Element;

export declare function DialogFooter({ className, showCloseButton, children, ...props }: React_2.ComponentProps<"div"> & {
    showCloseButton?: boolean;
}): JSX.Element;

export declare function DialogHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function DialogOverlay({ className, ...props }: React_2.ComponentProps<typeof Dialog_2.Overlay>): JSX.Element;

export declare function DialogPortal({ ...props }: React_2.ComponentProps<typeof Dialog_2.Portal>): JSX.Element;

export declare function DialogTitle({ className, ...props }: React_2.ComponentProps<typeof Dialog_2.Title>): JSX.Element;

export declare function DialogTrigger({ ...props }: React_2.ComponentProps<typeof Dialog_2.Trigger>): JSX.Element;

export declare function DropdownMenu({ ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Root>): JSX.Element;

export declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.CheckboxItem>): JSX.Element;

export declare function DropdownMenuContent({ className, sideOffset, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Content>): JSX.Element;

export declare function DropdownMenuGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Group>): JSX.Element;

export declare function DropdownMenuItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): JSX.Element;

export declare function DropdownMenuLabel({ className, inset, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Label> & {
    inset?: boolean;
}): JSX.Element;

export declare function DropdownMenuPortal({ ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Portal>): JSX.Element;

export declare function DropdownMenuRadioGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenu_2.RadioGroup>): JSX.Element;

export declare function DropdownMenuRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.RadioItem>): JSX.Element;

export declare function DropdownMenuSeparator({ className, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Separator>): JSX.Element;

export declare function DropdownMenuShortcut({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function DropdownMenuSub({ ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Sub>): JSX.Element;

export declare function DropdownMenuSubContent({ className, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.SubContent>): JSX.Element;

export declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof DropdownMenu_2.SubTrigger> & {
    inset?: boolean;
}): JSX.Element;

export declare function DropdownMenuTrigger({ ...props }: React_2.ComponentProps<typeof DropdownMenu_2.Trigger>): JSX.Element;

export declare function Empty({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function EmptyContent({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function EmptyDescription({ className, ...props }: React.ComponentProps<"p">): JSX.Element;

export declare function EmptyHeader({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function EmptyMedia({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>): JSX.Element;

declare const emptyMediaVariants: (props?: ({
    variant?: "default" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function EmptyTitle({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function Field({ className, orientation, ...props }: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>): JSX.Element;

export declare function FieldContent({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function FieldDescription({ className, ...props }: React.ComponentProps<"p">): JSX.Element;

export declare function FieldError({ className, children, errors, ...props }: React.ComponentProps<"div"> & {
    errors?: Array<{
        message?: string;
    } | undefined>;
}): JSX.Element | null;

export declare function FieldGroup({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label_2>): JSX.Element;

export declare function FieldLegend({ className, variant, ...props }: React.ComponentProps<"legend"> & {
    variant?: "legend" | "label";
}): JSX.Element;

export declare function FieldSeparator({ children, className, ...props }: React.ComponentProps<"div"> & {
    children?: React.ReactNode;
}): JSX.Element;

export declare function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">): JSX.Element;

export declare function FieldTitle({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

declare const fieldVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | "responsive" | null | undefined;
} & ClassProp) | undefined) => string;

export declare type FilterVariant = DataTableConfig["filterVariants"][number];

export declare function HoverCard({ ...props }: React_2.ComponentProps<typeof HoverCard_2.Root>): JSX.Element;

export declare function HoverCardContent({ className, align, sideOffset, ...props }: React_2.ComponentProps<typeof HoverCard_2.Content>): JSX.Element;

export declare function HoverCardTrigger({ ...props }: React_2.ComponentProps<typeof HoverCard_2.Trigger>): JSX.Element;

export declare function Input({ className, type, size, ...props }: Omit<React_2.ComponentProps<"input">, "size"> & VariantProps<typeof inputWrapperVariants>): JSX.Element;

export declare function InputGroup({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function InputGroupAddon({ className, align, ...props }: React_2.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>): JSX.Element;

declare const inputGroupAddonVariants: (props?: ({
    align?: "inline-start" | "inline-end" | "block-start" | "block-end" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function InputGroupButton({ className, type, variant, size, ...props }: Omit<React_2.ComponentProps<typeof Button_2>, "size"> & VariantProps<typeof inputGroupButtonVariants>): JSX.Element;

declare const inputGroupButtonVariants: (props?: ({
    size?: "xs" | "sm" | "icon-xs" | "icon-sm" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function InputGroupInput({ className, ...props }: React_2.ComponentProps<"input">): JSX.Element;

export declare function InputGroupText({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function InputGroupTextarea({ className, ...props }: React_2.ComponentProps<"textarea">): JSX.Element;

declare const inputWrapperVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Item({ className, variant, size, asChild, ...props }: React_2.ComponentProps<"div"> & VariantProps<typeof itemVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare function ItemActions({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function ItemContent({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function ItemDescription({ className, ...props }: React_2.ComponentProps<"p">): JSX.Element;

export declare function ItemFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function ItemGroup({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function ItemHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function ItemMedia({ className, variant, ...props }: React_2.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>): JSX.Element;

declare const itemMediaVariants: (props?: ({
    variant?: "image" | "default" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function ItemSeparator({ className, ...props }: React_2.ComponentProps<typeof Separator_2>): JSX.Element;

export declare function ItemTitle({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

declare const itemVariants: (props?: ({
    variant?: "default" | "outline" | "muted" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Kbd({ className, ...props }: React.ComponentProps<"kbd">): JSX.Element;

export declare function Label({ className, ...props }: React_2.ComponentProps<typeof Label_3.Root>): JSX.Element;

export declare function NativeSelect({ className, size, ...props }: Omit<React_2.ComponentProps<"select">, "size"> & {
    size?: "sm" | "default";
}): JSX.Element;

export declare function NativeSelectOptGroup({ className, ...props }: React_2.ComponentProps<"optgroup">): JSX.Element;

export declare function NativeSelectOption({ ...props }: React_2.ComponentProps<"option">): JSX.Element;

declare interface Option_2 {
    label: string;
    value: string;
    count?: number;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
export { Option_2 as Option }

export declare function Pagination({ className, ...props }: React_2.ComponentProps<"nav">): JSX.Element;

export declare function PaginationContent({ className, ...props }: React_2.ComponentProps<"ul">): JSX.Element;

export declare function PaginationEllipsis({ className, ...props }: React_2.ComponentProps<"span">): JSX.Element;

export declare function PaginationItem({ ...props }: React_2.ComponentProps<"li">): JSX.Element;

export declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): JSX.Element;

declare type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React_2.ComponentProps<typeof Button_2>, "size"> & React_2.ComponentProps<"a">;

export declare function PaginationNext({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX.Element;

export declare function PaginationPrevious({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX.Element;

export declare function Popover({ ...props }: React_2.ComponentProps<typeof Popover_2.Root>): JSX.Element;

export declare function PopoverContent({ className, align, sideOffset, ...props }: React_2.ComponentProps<typeof Popover_2.Content>): JSX.Element;

export declare function PopoverTrigger({ ...props }: React_2.ComponentProps<typeof Popover_2.Trigger>): JSX.Element;

export declare function Progress({ className, value, ...props }: React_2.ComponentProps<typeof Progress_2.Root>): JSX.Element;

export declare function RadioGroup({ className, ...props }: React_2.ComponentProps<typeof RadioGroup_2.Root>): JSX.Element;

export declare function RadioGroupItem({ className, ...props }: React_2.ComponentProps<typeof RadioGroup_2.Item>): JSX.Element;

export declare function ScrollArea({ className, children, ...props }: React_2.ComponentProps<typeof ScrollArea_2.Root>): JSX.Element;

export declare function ScrollBar({ className, orientation, ...props }: React_2.ComponentProps<typeof ScrollArea_2.ScrollAreaScrollbar>): JSX.Element;

export declare function Select({ ...props }: React_2.ComponentProps<typeof Select_2.Root>): JSX.Element;

export declare function SelectContent({ className, children, position, align, ...props }: React_2.ComponentProps<typeof Select_2.Content>): JSX.Element;

export declare function SelectGroup({ ...props }: React_2.ComponentProps<typeof Select_2.Group>): JSX.Element;

export declare function SelectItem({ className, children, ...props }: React_2.ComponentProps<typeof Select_2.Item>): JSX.Element;

export declare function SelectLabel({ className, ...props }: React_2.ComponentProps<typeof Select_2.Label>): JSX.Element;

export declare function SelectScrollDownButton({ className, ...props }: React_2.ComponentProps<typeof Select_2.ScrollDownButton>): JSX.Element;

export declare function SelectScrollUpButton({ className, ...props }: React_2.ComponentProps<typeof Select_2.ScrollUpButton>): JSX.Element;

export declare function SelectSeparator({ className, ...props }: React_2.ComponentProps<typeof Select_2.Separator>): JSX.Element;

export declare function SelectTrigger({ className, children, ...props }: React_2.ComponentProps<typeof Select_2.Trigger>): JSX.Element;

export declare function SelectValue({ ...props }: React_2.ComponentProps<typeof Select_2.Value>): JSX.Element;

export declare function Separator({ className, orientation, decorative, ...props }: React_2.ComponentProps<typeof Separator_3.Root>): JSX.Element;

export declare function Sheet({ ...props }: React_2.ComponentProps<typeof Dialog_2.Root>): JSX.Element;

export declare function SheetClose({ ...props }: React_2.ComponentProps<typeof Dialog_2.Close>): JSX.Element;

export declare function SheetContent({ className, children, side, showCloseButton, ...props }: React_2.ComponentProps<typeof Dialog_2.Content> & {
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
}): JSX.Element;

export declare function SheetDescription({ className, ...props }: React_2.ComponentProps<typeof Dialog_2.Description>): JSX.Element;

export declare function SheetFooter({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SheetHeader({ className, ...props }: React_2.ComponentProps<"div">): JSX.Element;

export declare function SheetTitle({ className, ...props }: React_2.ComponentProps<typeof Dialog_2.Title>): JSX.Element;

export declare function SheetTrigger({ ...props }: React_2.ComponentProps<typeof Dialog_2.Trigger>): JSX.Element;

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

export declare function Skeleton({ className, ...props }: React.ComponentProps<"div">): JSX.Element;

export declare function Slider({ className, defaultValue, value, min, max, ...props }: React_2.ComponentProps<typeof Slider_2.Root>): JSX.Element;

export declare function Spinner({ className, ...props }: React.ComponentProps<"svg">): JSX.Element;

export declare function Switch({ className, label, description, card, ...props }: React_2.ComponentProps<typeof Switch_2.Root> & {
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

export declare function Tabs({ className, orientation, ...props }: React_2.ComponentProps<typeof Tabs_2.Root>): JSX.Element;

export declare function TabsContent({ className, ...props }: React_2.ComponentProps<typeof Tabs_2.Content>): JSX.Element;

export declare function TabsList({ className, variant, ...props }: React_2.ComponentProps<typeof Tabs_2.List> & VariantProps<typeof tabsListVariants>): JSX.Element;

export declare const tabsListVariants: (props?: ({
    variant?: "line" | "default" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function TabsTrigger({ className, ...props }: React_2.ComponentProps<typeof Tabs_2.Trigger>): JSX.Element;

export declare function Textarea({ className, ...props }: React_2.ComponentProps<"textarea">): JSX.Element;

export declare function Toggle({ className, variant, size, ...props }: React_2.ComponentProps<typeof Toggle_2.Root> & VariantProps<typeof toggleVariants>): JSX.Element;

export declare function ToggleGroup({ className, variant, size, spacing, children, ...props }: React_2.ComponentProps<typeof ToggleGroup_2.Root> & VariantProps<typeof toggleVariants_2> & {
    spacing?: number;
}): JSX.Element;

export declare function ToggleGroupItem({ className, children, variant, size, ...props }: React_2.ComponentProps<typeof ToggleGroup_2.Item> & VariantProps<typeof toggleVariants_2>): JSX.Element;

export declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Tooltip({ ...props }: React_2.ComponentProps<typeof Tooltip_2.Root>): JSX.Element;

export declare function TooltipContent({ className, sideOffset, children, ...props }: React_2.ComponentProps<typeof Tooltip_2.Content>): JSX.Element;

export declare function TooltipProvider({ delayDuration, ...props }: React_2.ComponentProps<typeof Tooltip_2.Provider>): JSX.Element;

export declare function TooltipTrigger({ ...props }: React_2.ComponentProps<typeof Tooltip_2.Trigger>): JSX.Element;

export declare function useDataGrid(): DataGridContextProps<any>;

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
