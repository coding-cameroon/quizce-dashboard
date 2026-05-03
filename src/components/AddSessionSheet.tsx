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
import { CalendarDays, Loader2 } from "lucide-react";
import { useState } from "react";

type AddYearSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjects: string[];
};

export function AddSessionSheet({
  open,
  onOpenChange,
  subjects,
}: AddYearSheetProps) {
  const [subjectName, setSubjectName] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !subjectName) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    onOpenChange(false);
    reset();
  };

  const reset = () => {
    setName("");
    setSubjectName("");
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
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">Add Year / Paper</SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                Add a past paper year under a subject.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 p-6 space-y-5">
          {/* Subject */}
          <div className="space-y-2">
            <Label>Subject</Label>
            <Select value={subjectName} onValueChange={setSubjectName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year name */}
          <div className="space-y-2">
            <Label>Year</Label>
            <Input
              placeholder="e.g. 2023, June 2022..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!subjectName}
            />
            <p className="text-xs text-muted-foreground">
              Enter the year or session name for this paper.
            </p>
          </div>

          {/* Preview */}
          {name && subjectName && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Preview
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject</span>
                  <span>{subjectName}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="gap-2 flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 gap-2"
            onClick={handleSubmit}
            disabled={!name || !subjectName || loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Adding..." : "Add Year"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
