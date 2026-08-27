import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}

export function ImageUpload({ value, onChange, max = 5 }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(value);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next = [...previews];
    Array.from(files).forEach((file) => {
      if (next.length >= max) return;
      next.push(URL.createObjectURL(file));
    });
    setPreviews(next);
    onChange(next);
  };

  const remove = (index: number) => {
    const next = previews.filter((_, i) => i !== index);
    setPreviews(next);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {previews.map((src, index) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-md border">
            <img src={src} alt="" className="h-full w-full object-cover" />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute right-1 top-1 h-6 w-6"
              onClick={() => remove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {previews.length < max && (
          <label
            className={cn(
              "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed text-muted-foreground hover:bg-accent",
            )}
          >
            <ImagePlus className="h-5 w-5" />
            <span className="text-xs">Upload</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        )}
      </div>
    </div>
  );
}
