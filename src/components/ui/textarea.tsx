import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-outline-variant bg-surface-lowest px-3.5 py-2.5 text-sm text-on-surface transition-all placeholder:text-on-surface-variant/50 focus-visible:border-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-container-high",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
