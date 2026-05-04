"use client";

import { Button } from "@/components/ui/button";
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
import { useCreateYear, useUpdateYear } from "@/hooks/use-years";
import { Subject } from "@/types/subject";
import { Year } from "@/types/year";
import { CalendarDays, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ErrorMessage } from "./ErrorMessage";

type AddYearSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjects: Subject[];
  initialData?: Year | null; // Added for Edit mode
};

export function AddSessionSheet({
  open,
  onOpenChange,
  subjects,
  initialData,
}: AddYearSheetProps) {
  const [subjectId, setSubjectId] = useState("");
  const [names, setNames] = useState("");

  const {
    mutateAsync: createYear,
    isPending: isCreating,
    error: createError,
  } = useCreateYear();
  const {
    mutateAsync: updateYear,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateYear();

  const isPending = isCreating || isUpdating;
  const error = createError || updateError;

  // Sync state when initialData changes
  useEffect(() => {
    if (initialData) {
      setNames(initialData.name.split("-")[1]);
      setSubjectId(initialData.subjectId);
    } else {
      reset();
    }
  }, [initialData, open]);

  const selectedSubject = subjects.find((s) => s.id === subjectId);

  const handleSubmit = async () => {
    if (!names || !subjectId) return;

    const payload = { name: names, subjectId };

    if (initialData) {
      await updateYear({ yearId: initialData.id, payload });
    } else {
      await createYear({ names, subjectId });
    }
    onOpenChange(false);
  };

  const reset = () => {
    setNames("");
    setSubjectId("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md flex flex-col">
        <SheetHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">
                {initialData ? "Edit Year / Paper" : "Add Year / Paper"}
              </SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                {initialData
                  ? "Update the year details."
                  : "Add a past paper year under a subject."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 p-6 space-y-5">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}{" "}
                    <p className="text-xs">
                      ({s.faculty.level.name} {s.faculty.name})
                    </p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Year</Label>
            <Input
              placeholder="e.g. 2023, 2022..."
              value={names}
              onChange={(e) => setNames(e.target.value)}
              disabled={!subjectId}
            />
          </div>

          {names && selectedSubject && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Preview
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{names}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject</span>
                  <span>{selectedSubject.name}</span>
                </div>
              </div>
            </div>
          )}
          <ErrorMessage message={error?.message} />
        </div>

        <SheetFooter className="gap-2 flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 gap-2"
            onClick={handleSubmit}
            disabled={!names || !subjectId || isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : initialData ? "Update Year" : "Add Year"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
