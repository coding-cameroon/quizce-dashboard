"use client";

import {
  MoreVertical,
  Copy,
  Trash2,
  Calendar,
  BookOpen,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Image as ImageType } from "@/types/image";

interface ImageCardProps {
  image: ImageType;
  onEdit: (image: any) => void;
  onDelete: (id: string) => void;
}

export const ImageCard = ({ image, onEdit, onDelete }: ImageCardProps) => {
  // Extracting context info from the nested image object
  const questionNumber = image.question?.number ?? "N/A";
  const yearName = image.question?.year?.name ?? "Unknown";
  const subjectName = image.question?.year?.subject?.name ?? "No Subject";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-border">
      <CardContent className="p-0 relative">
        {/* Image Display */}
        <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
          <Image
            src={image.imageUrl}
            alt={`Question ${questionNumber}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        {/* Action Overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/90 backdrop-blur shadow-sm hover:bg-white"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(image.id)}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(image.questionId)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      <CardFooter className="p-3 bg-muted/30 grid gap-2 text-xs">
        <div className="flex items-center gap-2 text-foreground font-medium truncate">
          <BookOpen className="h-3.5 w-3.5 text-primary shrink-0" />
          {subjectName}
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">Q. {questionNumber}</div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {yearName.split("-").pop()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
