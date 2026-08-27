import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "PKR") {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value: string | Date, pattern = "dd MMM yyyy") {
  return format(new Date(value), pattern);
}

export function formatDateTime(value: string | Date) {
  return format(new Date(value), "dd MMM yyyy, hh:mm a");
}
