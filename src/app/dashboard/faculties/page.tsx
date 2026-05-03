"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { columns, Faculty } from "./columns";
import { AddFacultySheet } from "@/components/AddFacultySheet";
import { DataTable } from "@/components/DataTable";

const dummyFaculties: Faculty[] = [
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    name: "SCIENCE",
    levelId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-02-01T08:00:00Z"),
    updatedAt: new Date("2024-03-15T10:00:00Z"),
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    name: "ARTS",
    levelId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-02-01T08:10:00Z"),
    updatedAt: new Date("2024-03-15T10:05:00Z"),
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    name: "COMMERCIAL",
    levelId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-02-01T08:20:00Z"),
    updatedAt: new Date("2024-03-15T10:10:00Z"),
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    name: "SCIENCE",
    levelId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    levelName: "Advanced Level",
    createdAt: new Date("2024-02-02T08:00:00Z"),
    updatedAt: new Date("2024-04-01T09:00:00Z"),
  },
  {
    id: "a7b8c9d0-e1f2-3456-abcd-567890123456",
    name: "ARTS",
    levelId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    levelName: "Advanced Level",
    createdAt: new Date("2024-02-02T08:10:00Z"),
    updatedAt: new Date("2024-04-01T09:05:00Z"),
  },
];

export default function FacultiesPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Faculties</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage faculties across academic levels.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Faculty
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={dummyFaculties}
        filterColumn="name"
        filterPlaceholder="Filter by faculty..."
      />

      <AddFacultySheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
