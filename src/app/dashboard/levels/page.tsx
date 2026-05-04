"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { AddLevelSheet } from "@/components/AddLevelSheet";
import { Level } from "@/types/levels";
import { useDeleteLevel, useGetAllLevels } from "@/hooks/use-levels";

export default function LevelsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const { data: levels } = useGetAllLevels();
  const { mutateAsync: deleteLevel, error } = useDeleteLevel();

  const handleEdit = (level: Level) => {
    setSelectedLevel(level);
    setSheetOpen(true);
  };

  const handleDelete = async (levelId: string) => {
    setIsDeleting(true);
    await deleteLevel(levelId);
    setIsDeleting(false);
  };

  console.log(levels);

  const handleOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) setSelectedLevel(null); // reset on close
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Academic Levels
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure the academic level hierarchy.
          </p>
        </div>
        <Button
          className="gap-2 cursor-pointer"
          onClick={() => setSheetOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Level
        </Button>
      </div>

      <DataTable
        data={levels ?? []}
        columns={columns(handleEdit, handleDelete, isDeleting)} // pass handleEdit into columns
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />

      <AddLevelSheet
        open={sheetOpen}
        onOpenChange={handleOpenChange}
        level={selectedLevel}
      />
    </div>
  );
}
