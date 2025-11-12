"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  History,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const data: Store[] = [
  {
    id: "m5gr84i9",
    location: "Kejetia",
    status: "active",
    createdAt: "22/09/2020",
    storeType: "Warehouse",
    storeName: "Main Store",
    businessCategory: "Electronics",
  },
  {
    id: "3u1reuv4",
    location: "Ahodwo",
    status: "inactive",
    createdAt: "20/03/2012",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Agribusiness",
  },
  {
    id: "3u1reuv4",
    location: "Ahodwo",
    status: "inactive",
    createdAt: "02/03/2023",
    storeType: "Retail",
    storeName: "MiT Store",
    businessCategory: "Agribusiness",
  },
  {
    id: "5kma53ae",
    location: "Ahodwo",
    status: "inactive",
    createdAt: "20/03/2012",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Agribusiness",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
  {
    id: "bhqecj4p",
    location: "Kwadaso",
    status: "active",
    createdAt: "11/11/2019",
    storeType: "Retail",
    storeName: "KT Store",
    businessCategory: "Pharmaceuticals",
  },
];

export type Store = {
  id: string;
  location: string;
  status: "active" | "inactive";
  createdAt: string;
  storeType: string;
  storeName: string;
  businessCategory: string;
};

export const columns: ColumnDef<Store>[] = [
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
  },
  {
    enableHiding: false,
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") === "active" ? (
          <Badge
            variant="outline"
            className="bg-blue-400 text-white dark:bg-blue-400"
          >
            active
          </Badge>
        ) : (
          <Badge
            variant="destructive"
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          >
            inactive
          </Badge>
        )}
      </div>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "storeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowDownNarrowWide />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        <Link
          href={`/storeroom/details/${row.original.id}`}
          className="underline"
        >
          {row.getValue("storeName")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: () => <div className="text-right">Location</div>,
    cell: ({ row }) => {
      //   const amount = parseFloat(row.getValue("amount"));

      //   // Format the amount as a dollar amount
      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //   }).format(amount);

      return (
        <div className="text-right font-medium">{row.getValue("location")}</div>
      );
    },
  },
  {
    accessorKey: "storeType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store Type
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("storeType")}</div>
    ),
  },
  {
    accessorKey: "businessCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowDownNarrowWide />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("businessCategory")}</div>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <History />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("createdAt")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const store = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(store.storeName)}
            >
              Copy store name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/storeroom/details/${store.id}`}>
              <DropdownMenuItem>View store</DropdownMenuItem>
            </Link>
            <Link href={`/storeroom/edit/${store.id}`}>
              <DropdownMenuItem>Edit store details</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={
            (table.getColumn("storeName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("storeName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
