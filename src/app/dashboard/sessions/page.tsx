"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { AddSessionSheet } from "@/components/AddSessionSheet";
import { useDeleteYear, useGetAllYears } from "@/hooks/use-years";
import { useGetAllSubjects } from "@/hooks/use-subjects";
import { Year } from "@/types/year";

export default function YearsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: years } = useGetAllYears();
  const { data: subjects } = useGetAllSubjects();
  const { mutateAsync: deleteYear } = useDeleteYear();
  const [editingYear, setEditingYear] = useState<Year | null>(null);

  const handleEdit = (year: Year) => {
    setEditingYear(year);
    setSheetOpen(true);
  };

  const handleDelete = async (yearId: string) => {
    await deleteYear(yearId);
  };

  console.log(JSON.stringify(years));

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Years / Papers
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage past paper years across subjects.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Year
        </Button>
      </div>

      <DataTable
        onDelete={handleDelete}
        onEdit={handleEdit}
        data={years ?? []}
        subjects={subjects ?? []}
      />

      <AddSessionSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setEditingYear(null);
        }}
        subjects={subjects ?? []}
        initialData={editingYear}
      />
    </div>
  );
}
