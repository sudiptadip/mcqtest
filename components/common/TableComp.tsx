"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  FileSearch,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

interface CustomTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  renderActions?: (row: TData) => React.ReactNode;
  createUrl?: string;
}

export function TableComp<TData>({
  data,
  columns,
  renderActions,
  createUrl = "",
}: CustomTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns: useMemo(() => {
      return renderActions
        ? [
            ...columns,
            {
              id: "actions",
              header: "Actions",
              cell: ({ row }) => renderActions(row.original),
            },
          ]
        : columns;
    }, [columns, renderActions]),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg border border-gray-200">
      {/* Search Box */}
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search anything..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {createUrl && (
          <Link href={createUrl}>
            <Button className="flex gap-1.5">
              Create new <PlusIcon />{" "}
            </Button>
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-auto border border-gray-300">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 z-10 bg-gradient-to-r from-blue-100 to-purple-100 text-sm text-gray-700 font-bold shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-4 py-3 select-none hover:text-blue-600 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="text-xs">
                        {header.column.getIsSorted() === "asc"
                          ? "▲"
                          : header.column.getIsSorted() === "desc"
                          ? "▼"
                          : ""}
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-blue-50 transition duration-150 group"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-gray-800 text-sm group-hover:text-blue-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="py-6 text-center text-gray-500 text-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FileSearch className="w-6 h-6" />
                    <span>No results found.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">
          Page{" "}
          <span className="font-semibold text-gray-800">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-800">
            {table.getPageCount()}
          </span>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-full border-gray-300 hover:bg-blue-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-full border-gray-300 hover:bg-blue-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
