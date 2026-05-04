"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Subject } from "@/types/subject";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Copy,
  MoreHorizontal,
  SquarePen,
  Trash2,
} from "lucide-react";

const facultyColorMap: Record<string, string> = {
  ARTS: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  SCIENCE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  COMMERCIAL: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export const columns = (
  onDelete: (subjectId: string) => void,
  onEdit: (subject: Subject) => void,
): ColumnDef<Subject>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="gap-2 px-0 font-semibold"
      >
        Subject
        <ArrowUpDown className="h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono text-xs">
        {row.getValue("slug")}
      </Badge>
    ),
  },
  {
    id: "faculty",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="gap-2 px-0 font-semibold"
      >
        Faculty
        <ArrowUpDown className="h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const faculty = row.original.faculty?.name;
      return (
        <Badge
          variant="outline"
          className={`text-xs font-semibold ${facultyColorMap[faculty]}`}
        >
          {faculty}
        </Badge>
      );
    },
  },
  {
    id: "level",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="gap-2 px-0 font-semibold"
      >
        Level
        <ArrowUpDown className="h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {row.original.faculty?.level?.name}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="gap-2 px-0 font-semibold"
      >
        Created At
        <ArrowUpDown className="h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-muted-foreground text-sm">
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const subject = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(subject.id)}
              >
                <Copy /> Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(subject)}>
                <SquarePen /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(subject.id)}
              >
                <Trash2 color="#ff6467" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
