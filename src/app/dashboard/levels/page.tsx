"use client";

import { DataTable } from "./data-table";
import { columns, Level } from "./columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddLevelSheet } from "@/components/AddLevelSheet";
import { useState } from "react";

const dummyLevels: Level[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Ordinary Level",
    slug: "o_level",
    createdAt: new Date("2024-01-15T08:00:00Z"),
    updatedAt: new Date("2024-03-10T12:30:00Z"),
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    name: "Advanced Level",
    slug: "a_level",
    createdAt: new Date("2024-01-15T08:05:00Z"),
    updatedAt: new Date("2024-04-22T09:15:00Z"),
  },
];

export default function LevelsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

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
          onClick={() => setSheetOpen(!sheetOpen)}
        >
          <Plus className="h-4 w-4" />
          Add Level
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={dummyLevels}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />

      <AddLevelSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
