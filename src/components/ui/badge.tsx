import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-container text-white shadow-sm",
        secondary:
          "border-transparent bg-secondary-container text-on-secondary-container",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive",
        outline:
          "border-outline-variant bg-surface-container-low text-on-surface",
        success:
          "border-secondary/20 bg-secondary-container text-on-secondary-container",
        warning: "border-amber-300 bg-amber-50 text-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
