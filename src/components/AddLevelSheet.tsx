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
import { Layers, Loader2 } from "lucide-react";
import { useState } from "react";

type AddLevelSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddLevelSheet({ open, onOpenChange }: AddLevelSheetProps) {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name) return;
    setLoading(true);
    // TODO: call your API here
    await new Promise((r) => setTimeout(r, 1000)); // simulate request
    setLoading(false);
    onOpenChange(false);
    setName("");
  };

  const handleClose = () => {
    setName("");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md flex flex-col">
        {/* ── HEADER ── */}
        <SheetHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">Add Academic Level</SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                Select a level to add to the hierarchy.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* ── FORM ── */}
        <div className="flex-1/2 p-6">
          <div className="space-y-2">
            <Label htmlFor="level-name">Level Name</Label>
            <Select value={name} onValueChange={setName}>
              <SelectTrigger id="level-name" className="w-full">
                <SelectValue placeholder="Select a level..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ordinary Level">Ordinary Level</SelectItem>
                <SelectItem value="Advanced Level">Advanced Level</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground pt-1">
              The slug will be generated automatically from the level name.
            </p>
          </div>

          {/* Preview */}
          {name && (
            <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Preview
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{name}</span>
                <span className="font-mono text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                  {name === "Ordinary Level" ? "o_level" : "a_level"}
                </span>
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
            disabled={!name || loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Adding..." : "Add Level"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
