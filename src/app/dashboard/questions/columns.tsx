"use client";

import { MathText } from "@/components/MathJaxText";
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
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Copy,
  MoreHorizontal,
  PenSquare,
  Trash2,
} from "lucide-react";

export type Question = {
  id: string;
  number: number;
  question: string | null;
  options: string[];
  imageType: "none" | "question_image" | "option_images";
  correctOption: string;
  explanation: string;
  yearId: string;
  yearName: string;
  createdAt: Date;
  updatedAt: Date;
};

const imageTypeBadge: Record<
  Question["imageType"],
  { label: string; class: string }
> = {
  none: {
    label: "None",
    class: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  },
  question_image: {
    label: "Question Image",
    class: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  option_images: {
    label: "Option Images",
    class: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
};

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="gap-2 px-0 font-semibold"
      >
        #
        <ArrowUpDown className="h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {String(row.getValue("number")).padStart(2, "0")}
      </span>
    ),
  },
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => {
      const q: string | null = row.getValue("question");
      return (
        <span className="text-sm line-clamp-2 max-w-sm">
          {q ? (
            <MathText className="text-sm line-clamp-2 max-w-sm">{q}</MathText>
          ) : (
            <span className="text-muted-foreground italic">Image only</span>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => {
      const options: string[] = row.getValue("options");
      return (
        <span className="text-xs text-muted-foreground">
          {options.length} option{options.length !== 1 ? "s" : ""}
        </span>
      );
    },
  },
  {
    accessorKey: "imageType",
    header: "Image Type",
    cell: ({ row }) => {
      const type: Question["imageType"] = row.getValue("imageType");
      const badge = imageTypeBadge[type];
      return (
        <Badge variant="outline" className={`text-xs ${badge.class}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "correctOption",
    header: "Answer",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono text-xs">
        {row.getValue("correctOption")}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const question = row.original;
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
                onClick={() => navigator.clipboard.writeText(question.id)}
              >
                <Copy /> Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PenSquare /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 color="#ff6467" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
