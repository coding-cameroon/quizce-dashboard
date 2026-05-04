"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  StringHeaderIdentifier,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns as getColumns } from "./columns";
import { Year } from "@/types/year";
import { Subject } from "@/types/subject";

type DataTableProps = {
  data: Year[];
  subjects: Subject[];
  onEdit: (year: Year) => void;
  onDelete: (yearId: string) => void;
};

export function DataTable({
  data,
  subjects,
  onEdit,
  onDelete,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo(
    () => getColumns(onEdit, onDelete),
    [onEdit, onDelete],
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, columnFilters },
  });

  const hasActiveFilters = columnFilters.length > 0;

  const filterCols = ["levelName", "facultyName", "subjectName"] as const;

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* ── TOOLBAR ── */}
      <div className="flex flex-col gap-3 px-4 py-3 border-b border-border">
        {/* Row 1 — search + count */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search years..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              className="pl-9 h-8 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.resetColumnFilters()}
                className="h-8 gap-1.5 text-xs text-muted-foreground"
              >
                <X className="h-3 w-3" />
                Clear filters
              </Button>
            )}
            <span className="text-xs text-muted-foreground">
              {table.getFilteredRowModel().rows.length} of {data.length} paper
              {data.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Row 2 — filters + page size */}
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />

          {/* Level */}
          <Select
            value={
              (
                table.getColumn("levelName")?.getFilterValue() as string[]
              )?.[0] ?? "all"
            }
            onValueChange={(val) =>
              table
                .getColumn("levelName")
                ?.setFilterValue(val === "all" ? undefined : [val])
            }
          >
            <SelectTrigger className="h-8 w-44 text-xs">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="Ordinary Level">Ordinary Level</SelectItem>
              <SelectItem value="Advanced Level">Advanced Level</SelectItem>
            </SelectContent>
          </Select>

          {/* Faculty */}
          <Select
            value={
              (
                table.getColumn("facultyName")?.getFilterValue() as string[]
              )?.[0] ?? "all"
            }
            onValueChange={(val) =>
              table
                .getColumn("facultyName")
                ?.setFilterValue(val === "all" ? undefined : [val])
            }
          >
            <SelectTrigger className="h-8 w-44 text-xs">
              <SelectValue placeholder="All faculties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All faculties</SelectItem>
              <SelectItem value="ARTS">Arts</SelectItem>
              <SelectItem value="SCIENCE">Science</SelectItem>
              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
            </SelectContent>
          </Select>

          {/* Subject */}
          <Select
            value={
              (
                table.getColumn("subjectName")?.getFilterValue() as string[]
              )?.[0] ?? "all"
            }
            onValueChange={(val) =>
              table
                .getColumn("subjectName")
                ?.setFilterValue(val === "all" ? undefined : [val])
            }
          >
            <SelectTrigger className="h-8 w-44 text-xs">
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Active filter badges */}
          <div className="flex items-center gap-1.5 ml-1 flex-wrap">
            {filterCols.map((col) => {
              const val = (
                table.getColumn(col)?.getFilterValue() as string[]
              )?.[0];
              if (!val) return null;
              return (
                <Badge
                  key={col}
                  variant="secondary"
                  className="text-xs gap-1 pr-1"
                >
                  {val}
                  <button
                    onClick={() =>
                      table.getColumn(col)?.setFilterValue(undefined)
                    }
                    className="ml-0.5 hover:text-foreground"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              );
            })}
          </div>

          {/* Page size */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Show</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(val) => {
                const size = Number(val);
                setPageSize(size);
                table.setPageSize(size);
              }}
            >
              <SelectTrigger className="h-8 w-20 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">rows</span>
          </div>
        </div>
      </div>

      {/* ── TABLE ── */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                No years found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ── PAGINATION ── */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="flex gap-2">
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
