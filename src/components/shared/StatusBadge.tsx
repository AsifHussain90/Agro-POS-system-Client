import { Badge } from "@/components/ui/badge";
import type { OrderStatus, RequestStatus } from "@/types";

const orderMap: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "success" | "warning" }> = {
  PENDING: { label: "Pending", variant: "warning" },
  CONFIRMED: { label: "Confirmed", variant: "secondary" },
  PACKED: { label: "Packed", variant: "secondary" },
  SHIPPED: { label: "Shipped", variant: "default" },
  DELIVERED: { label: "Delivered", variant: "success" },
  CANCELLED: { label: "Cancelled", variant: "destructive" },
};

const requestMap: Record<RequestStatus, { label: string; variant: "warning" | "success" | "destructive" }> = {
  PENDING: { label: "Pending", variant: "warning" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "destructive" },
};

export function StatusBadge({
  status,
}: {
  status: OrderStatus | RequestStatus;
}) {
  const config = status in orderMap
    ? orderMap[status as OrderStatus]
    : requestMap[status as RequestStatus];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
