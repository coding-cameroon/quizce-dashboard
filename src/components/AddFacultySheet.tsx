"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "./ErrorMessage";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetAllLevels } from "@/hooks/use-levels";
import { useCreateFaculty, useUpdateFaculty } from "@/hooks/use-faculties";
import { Faculty } from "@/types/faculty";
import { GraduationCap, Loader2 } from "lucide-react";

type AddFacultySheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty?: Faculty | null;
};

const facultyColorMap: Record<string, string> = {
  ARTS: "bg-purple-500/10 text-purple-400",
  SCIENCE: "bg-blue-500/10 text-blue-400",
  COMMERCIAL: "bg-amber-500/10 text-amber-400",
};

export function AddFacultySheet({
  open,
  onOpenChange,
  faculty,
}: AddFacultySheetProps) {
  const [name, setName] = useState<"ARTS" | "SCIENCE" | "COMMERCIAL" | "">("");
  const [levelId, setLevelId] = useState("");

  const isEditing = !!faculty;

  const { data: levels, isLoading: isLoadingLevels } = useGetAllLevels();
  const {
    mutate: createFaculty,
    isPending: isCreating,
    error: createError,
  } = useCreateFaculty();
  const {
    mutate: updateFaculty,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateFaculty();

  const isPending = isCreating || isUpdating;
  const error = createError || updateError;
  const selectedLevel = levels?.find((l) => l.id === levelId);

  // pre-fill when editing
  useEffect(() => {
    if (faculty) {
      setName(faculty.name);
      setLevelId(faculty.levelId);
    } else {
      reset();
    }
  }, [faculty]);

  const handleSubmit = () => {
    if (!name || !levelId) return;

    const payload = {
      name: name as "ARTS" | "SCIENCE" | "COMMERCIAL",
      levelId,
    };

    if (isEditing) {
      updateFaculty(
        { facultyId: faculty.id, payload },
        {
          onSuccess: () => {
            reset();
            onOpenChange(false);
          },
        },
      );
    } else {
      createFaculty(payload, {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      });
    }
  };

  const reset = () => {
    setName("");
    setLevelId("");
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md flex flex-col">
        {/* ── HEADER ── */}
        <SheetHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">
                {isEditing ? "Edit Faculty" : "Add Faculty"}
              </SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                {isEditing
                  ? "Update the selected faculty."
                  : "Assign a faculty to an academic level."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* ── FORM ── */}
        <div className="flex-1 p-6 space-y-5">
          {/* Level */}
          <div className="space-y-2">
            <Label htmlFor="level">Academic Level</Label>
            <Select
              value={levelId}
              onValueChange={setLevelId}
              disabled={isLoadingLevels}
            >
              <SelectTrigger id="level" className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingLevels ? "Loading levels..." : "Select a level..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {levels?.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Faculty Name */}
          <div className="space-y-2">
            <Label htmlFor="faculty-name">Faculty Name</Label>
            <Select
              value={name}
              onValueChange={(val) =>
                setName(val as "ARTS" | "SCIENCE" | "COMMERCIAL")
              }
              disabled={!levelId}
            >
              <SelectTrigger id="faculty-name" className="w-full">
                <SelectValue
                  placeholder={
                    !levelId ? "Select a level first" : "Select a faculty..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ARTS">Arts</SelectItem>
                <SelectItem value="SCIENCE">Science</SelectItem>
                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          {name && levelId && selectedLevel && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Preview
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-md ${facultyColorMap[name]}`}
                >
                  {name}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{selectedLevel.name}</span>
                  <span className="font-mono bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                    {selectedLevel.slug}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          <ErrorMessage message={error?.message} />
        </div>

        {/* ── FOOTER ── */}
        <SheetFooter className="gap-2 flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 gap-2"
            onClick={handleSubmit}
            disabled={!name || !levelId || isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
                ? "Update Faculty"
                : "Add Faculty"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
