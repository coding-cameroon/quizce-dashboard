"use client";

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BookOpen, Loader2, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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
import { columns } from "./columns";
import { Question } from "@/types/question";
import { Year } from "@/types/year";

type DataTableProps = {
  data: Question[];
  sessions: Year[];
  onDelete: (questionId: string) => void;
  isDeletingId?: string | null;
};

export function DataTable({
  data,
  sessions,
  onDelete,
  isDeletingId,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<Question[]>([]);

  useEffect(() => {
    if (!selectedSession) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setFilteredData(data.filter((q) => q.yearId === selectedSession));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedSession, data]);

  const table = useReactTable({
    data: filteredData,
    columns: columns(onDelete, isDeletingId),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting },
    initialState: { pagination: { pageSize } },
  });

  const selectedSessionName = sessions.find(
    (s) => s.id === selectedSession,
  )?.name;

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* ── TOOLBAR ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger className="h-8 w-52 text-xs">
              <SelectValue placeholder="Select a session..." />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSessionName && !loading && (
            <span className="text-xs text-muted-foreground">
              {filteredData.length} question
              {filteredData.length !== 1 ? "s" : ""} in{" "}
              <span className="font-medium text-foreground">
                {selectedSessionName}
              </span>
            </span>
          )}
        </div>

        {selectedSession && !loading && filteredData.length > 0 && (
          <div className="flex items-center gap-2">
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
        )}
      </div>

      {/* ── BODY ── */}
      {!selectedSession ? (
        <div className="flex flex-col items-center justify-center h-56 gap-3 text-center px-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Select a session to get questions
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Choose a year session from the dropdown above to view its
              questions.
            </p>
          </div>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center h-56 gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading questions...</p>
        </div>
      ) : (
        <>
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
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No questions found for this session.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

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
        </>
      )}
    </div>
  );
}

