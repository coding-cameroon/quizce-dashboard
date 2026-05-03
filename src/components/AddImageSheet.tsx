"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { GalleryVerticalEndIcon, Loader2 } from "lucide-react";

// Mock API call function
const mockApiCall = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const AddImageSheet = ({
  open,
  onOpenChange,
  initialData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
}) => {
  const isEdit = !!initialData;
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleCloseSheet = () => {
    setPreviews([]);
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await mockApiCall(2000);
      console.log(isEdit ? "Image Updated" : "Images Added");
      onOpenChange(false);
    } catch (error) {
      console.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Image" : "Add New Image"}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-6">
          {/* Select Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s1">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="y1">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Question</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1">Q1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            {/* File Upload */}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {/* 4. Custom button that triggers the hidden input */}
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <GalleryVerticalEndIcon className="mr-2 h-4 w-4" />
              Select image(s)
            </Button>
          </div>

          {/* Preview Section */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previews.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="Preview"
                  className="w-full h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              disabled={loading}
              onClick={handleCloseSheet}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={loading}
              onClick={() => handleSubmit()}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit
                ? loading
                  ? "Updating..."
                  : "Update Image"
                : loading
                  ? "Adding..."
                  : "Add Images"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
