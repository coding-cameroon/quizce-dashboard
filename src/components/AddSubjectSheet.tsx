"use client";

import { useEffect, useState } from "react";
import { BookOpen, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "./ErrorMessage";
import { Input } from "@/components/ui/input";
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
import { useGetFacultiesByLevelId } from "@/hooks/use-faculties";
import { useCreateSubject, useUpdateSubject } from "@/hooks/use-subjects";
import { Subject } from "@/types/subject";

type AddSubjectSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject?: Subject | null;
};

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "_");
}

export function AddSubjectSheet({
  open,
  onOpenChange,
  subject,
}: AddSubjectSheetProps) {
  const [name, setName] = useState("");
  const [levelId, setLevelId] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const isEditing = !!subject;
  const slug = toSlug(name);

  const { data: levels, isLoading: isLoadingLevels } = useGetAllLevels();
  const { data: faculties, isLoading: isLoadingFaculties } =
    useGetFacultiesByLevelId(levelId);
  const {
    mutate: createSubject,
    isPending: isCreating,
    error: createError,
  } = useCreateSubject();
  const {
    mutate: updateSubject,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateSubject();

  const isPending = isCreating || isUpdating;
  const error = createError || updateError;

  useEffect(() => {
    if (subject) {
      setName(subject.name);
      setLevelId(subject.faculty?.level?.id ?? "");
      setFacultyId(subject.facultyId);
    } else {
      reset();
    }
  }, [subject]);

  // reset faculty when level changes
  const handleLevelChange = (val: string) => {
    setLevelId(val);
    setFacultyId("");
  };

  const handleSubmit = () => {
    if (!name || !facultyId) return;

    const payload = { name, slug, facultyId };

    if (isEditing) {
      updateSubject(
        { subjectId: subject.id, payload },
        {
          onSuccess: () => {
            reset();
            onOpenChange(false);
          },
        },
      );
    } else {
      createSubject(payload, {
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
    setFacultyId("");
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md flex flex-col">
        <SheetHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">
                {isEditing ? "Edit Subject" : "Add Subject"}
              </SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                {isEditing
                  ? "Update the selected subject."
                  : "Create a new subject under a faculty."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 py-6 px-6 space-y-5">
          {/* Level */}
          <div className="space-y-2">
            <Label>Academic Level</Label>
            <Select
              value={levelId}
              onValueChange={handleLevelChange}
              disabled={isLoadingLevels}
            >
              <SelectTrigger className="w-full">
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

          {/* Faculty */}
          <div className="space-y-2">
            <Label>Faculty</Label>
            <Select
              value={facultyId}
              onValueChange={setFacultyId}
              disabled={!levelId || isLoadingFaculties}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !levelId
                      ? "Select a level first"
                      : isLoadingFaculties
                        ? "Loading faculties..."
                        : "Select a faculty..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {faculties?.map((faculty) => (
                  <SelectItem key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject name */}
          <div className="space-y-2">
            <Label>Subject Name</Label>
            <Input
              placeholder="e.g. Mathematics, Physics..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!facultyId}
            />
            {name && (
              <p className="text-xs text-muted-foreground">
                Slug:{" "}
                <span className="font-mono bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                  {slug}
                </span>
              </p>
            )}
          </div>

          {/* Preview */}
          {name && facultyId && levelId && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Preview
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug</span>
                  <span className="font-mono text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                    {slug}
                  </span>
                </div>
              </div>
            </div>
          )}

          <ErrorMessage message={error?.message} />
        </div>

        <SheetFooter className="gap-2 flex-row px-6 pb-6">
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
            disabled={!name || !facultyId || isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
                ? "Update Subject"
                : "Add Subject"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
