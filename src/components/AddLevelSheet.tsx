"use client";

import { useEffect, useState } from "react";
import { Layers, Loader2 } from "lucide-react";

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
import { ErrorMessage } from "./ErrorMessage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useCreateLevel, useUpdateLevel } from "@/hooks/use-levels";
import { Level } from "@/types/levels";

type AddLevelSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: Level | null;
};

export function AddLevelSheet({
  open,
  onOpenChange,
  level,
}: AddLevelSheetProps) {
  const [name, setName] = useState<
    "Ordinary Level" | "Advanced Level" | undefined
  >(undefined);

  const {
    mutate: createLevel,
    isPending: isCreating,
    error: createError,
  } = useCreateLevel();
  const {
    mutate: updateLevel,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateLevel();

  const isEditing = !!level;
  const isPending = isCreating || isUpdating;
  const error = createError || updateError;

  useEffect(() => {
    if (level) {
      setName(level.name);
    } else {
      setName(undefined);
    }
  }, [level]);

  const handleSubmit = () => {
    if (!name) return;

    const payload = {
      name,
      slug: name === "Ordinary Level" ? "o_level" : "a_level",
    } as {
      name: "Ordinary Level" | "Advanced Level";
      slug: "o_level" | "a_level";
    };

    if (isEditing) {
      updateLevel(
        { levelId: level.id, payload },
        {
          onSuccess: () => {
            setName(undefined);
            onOpenChange(false);
          },
        },
      );
    } else {
      createLevel(payload, {
        onSuccess: () => {
          setName(undefined);
          onOpenChange(false);
        },
      });
    }
  };

  const handleClose = () => {
    setName(undefined);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md flex flex-col">
        <SheetHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">
                {isEditing ? "Edit Academic Level" : "Add Academic Level"}
              </SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                {isEditing
                  ? "Update the selected academic level."
                  : "Select a level to add to the hierarchy."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 p-6">
          <div className="space-y-2">
            <Label htmlFor="level-name">Level Name</Label>
            <Select
              value={name}
              onValueChange={(val) =>
                setName(val as "Ordinary Level" | "Advanced Level")
              }
            >
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

          <div className="mt-4">
            <ErrorMessage message={error?.message} />
          </div>
        </div>

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
            disabled={!name || isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
                ? "Update Level"
                : "Add Level"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
