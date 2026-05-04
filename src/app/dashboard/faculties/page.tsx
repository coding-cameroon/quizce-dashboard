"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { AddFacultySheet } from "@/components/AddFacultySheet";

import { Faculty } from "@/types";
import {
  useDeleteFaculty,
  useGetAllFaculties,
} from "@/hooks/use-faculties";

export default function FacultiesPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const { data: faculties } = useGetAllFaculties();
  const { mutate: deleteFaculty } = useDeleteFaculty();

  const handleDeleteFaculty = (facultyId: string) => {
    deleteFaculty(facultyId);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setSheetOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) setSelectedFaculty(null);
  };

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
        columns={columns(handleDeleteFaculty, handleEditFaculty)}
        data={faculties ?? []}
        filterColumn="name"
        filterPlaceholder="Filter by faculty..."
      />

      <AddFacultySheet
        open={sheetOpen}
        onOpenChange={handleOpenChange}
        faculty={selectedFaculty}
      />
    </div>
  );
}