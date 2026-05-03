"use client";

import { Button } from "@/components/ui/button";
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
import { GraduationCap, Loader2 } from "lucide-react";
import { useState } from "react";

type AddFacultySheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const facultyColorMap: Record<string, string> = {
  ARTS: "bg-purple-500/10 text-purple-400",
  SCIENCE: "bg-blue-500/10 text-blue-400",
  COMMERCIAL: "bg-amber-500/10 text-amber-400",
};

const levelSlugMap: Record<string, string> = {
  "Ordinary Level": "o_level",
  "Advanced Level": "a_level",
};

export function AddFacultySheet({ open, onOpenChange }: AddFacultySheetProps) {
  const [name, setName] = useState("");
  const [levelName, setLevelName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !levelName) return;
    setLoading(true);
    // TODO: call your API here
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    onOpenChange(false);
    reset();
  };

  const reset = () => {
    setName("");
    setLevelName("");
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
              <SheetTitle className="text-base">Add Faculty</SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                Assign a faculty to an academic level.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* ── FORM ── */}
        <div className="flex-1 p-6 space-y-5">
          {/* Level */}
          <div className="space-y-2 ">
            <Label htmlFor="level">Academic Level</Label>
            <Select value={levelName} onValueChange={setLevelName}>
              <SelectTrigger id="level" className="w-full">
                <SelectValue placeholder="Select a level..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ordinary Level">Ordinary Level</SelectItem>
                <SelectItem value="Advanced Level">Advanced Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Faculty Name */}
          <div className="space-y-2">
            <Label htmlFor="faculty-name">Faculty Name</Label>
            <Select value={name} onValueChange={setName}>
              <SelectTrigger id="faculty-name" className="w-full">
                <SelectValue placeholder="Select a faculty..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ARTS">Arts</SelectItem>
                <SelectItem value="SCIENCE">Science</SelectItem>
                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          {name && levelName && (
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
                  <span>{levelName}</span>
                  <span className="font-mono bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                    {levelSlugMap[levelName]}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
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
            disabled={!name || !levelName || loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Adding..." : "Add Faculty"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
