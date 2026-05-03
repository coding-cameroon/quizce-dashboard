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
import { BookOpen, Loader2 } from "lucide-react";
import { useState } from "react";

type AddSubjectSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "_");
}

const facultyByLevel: Record<string, string[]> = {
  "Ordinary Level": ["ARTS", "SCIENCE", "COMMERCIAL"],
  "Advanced Level": ["ARTS", "SCIENCE", "COMMERCIAL"],
};

export function AddSubjectSheet({ open, onOpenChange }: AddSubjectSheetProps) {
  const [levelName, setLevelName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const slug = toSlug(name);

  const handleSubmit = async () => {
    if (!name || !levelName || !facultyName) return;
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
    setFacultyName("");
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  // Reset faculty when level changes
  const handleLevelChange = (val: string) => {
    setLevelName(val);
    setFacultyName("");
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
              <SheetTitle className="text-base">Add Subject</SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                Create a new subject under a faculty.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 p-6 space-y-5">
          {/* Level */}
          <div className="space-y-2">
            <Label>Academic Level</Label>
            <Select value={levelName} onValueChange={handleLevelChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a level..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ordinary Level">Ordinary Level</SelectItem>
                <SelectItem value="Advanced Level">Advanced Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Faculty */}
          <div className="space-y-2">
            <Label>Faculty</Label>
            <Select
              value={facultyName}
              onValueChange={setFacultyName}
              disabled={!levelName}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    levelName ? "Select a faculty..." : "Select a level first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {(facultyByLevel[levelName] ?? []).map((f) => (
                  <SelectItem key={f} value={f}>
                    {f.charAt(0) + f.slice(1).toLowerCase()}
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
              disabled={!facultyName}
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
          {name && facultyName && levelName && (
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faculty</span>
                  <span>{facultyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span>{levelName}</span>
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
            disabled={!name || !levelName || !facultyName || loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Adding..." : "Add Subject"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
