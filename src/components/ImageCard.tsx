"use client";

import { IKImage } from "imagekitio-react";
import { MoreVertical, Copy, Trash2, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ImageCardProps {
  image: {
    id: string;
    publicId: string;
    optionIndex: number | null;
  };
  onEdit: (image: any) => void;
  onDelete: (id: string) => void;
}

export const ImageCard = ({ image, onEdit, onDelete }: ImageCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0 relative group">
        <div className="aspect-square w-full bg-slate-100 relative">
          <IKImage
            urlEndpoint={process.env.NEXT_PUBLIC_IK_ENDPOINT}
            path={image.publicId}
            transformation={[
              { height: "300", width: "300", cropMode: "extract" },
            ]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/90 backdrop-blur"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(image.publicId)}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(image)}>
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(image.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
