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
import { Question } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Copy,
  Loader2,
  MoreHorizontal,
  PenSquare,
  Trash2,
} from "lucide-react";

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

export const columns = (
  onDelete: (questionId: string) => void,
  isDeletingId?: string | null,
): ColumnDef<Question>[] => [
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
      return q ? (
        <MathText className="text-sm line-clamp-2 max-w-sm">{q}</MathText>
      ) : (
        <span className="text-muted-foreground italic text-sm">Image only</span>
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
      const isDeleting = isDeletingId === question.id;
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
              <DropdownMenuItem
                disabled={isDeleting}
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(question.id)}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 color="#ff6467" /> Delete
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
