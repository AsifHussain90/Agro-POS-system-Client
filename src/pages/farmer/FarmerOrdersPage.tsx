import { type ColumnDef } from "@tanstack/react-table";
import { CheckCircle } from "lucide-react";
import { useOrders } from "@/hooks/useApi";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { toast } from "sonner";

export function FarmerOrdersPage() {
  const { data } = useOrders("farmer");
  const orders = data?.data ?? [];

  const handleUpdateStatus = (_orderId: string, nextStatus: string) => {
    toast.success(`Order status updated to ${nextStatus}`);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "trackingCode",
      header: "Tracking ID",
      cell: ({ row }) => (
        <span className="font-mono font-bold text-xs text-primary">
          {row.original.trackingCode}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date Placed",
      cell: ({ row }) => (
        <span className="text-xs text-on-surface-variant">
          {formatDateTime(row.original.createdAt)}
        </span>
      ),
    },
    {
      accessorKey: "items",
      header: "Harvest Items",
      cell: ({ row }) => (
        <div className="space-y-0.5">
          {row.original.items.map((item) => (
            <p key={item.id} className="text-xs text-on-surface">
              {item.productName} <span className="text-on-surface-variant font-medium">× {item.quantity}</span>
            </p>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-bold text-sm text-secondary">
          {formatCurrency(row.original.total)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Fulfillment Actions",
      cell: ({ row }) => {
        const order = row.original;
        if (order.status === "DELIVERED") {
          return (
            <span className="inline-flex items-center gap-1 text-xs text-secondary font-medium">
              <CheckCircle className="h-3.5 w-3.5" /> Completed
            </span>
          );
        }
        if (order.status === "SHIPPED") {
          return (
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => handleUpdateStatus(order.id, "DELIVERED")}
            >
              Mark Delivered
            </Button>
          );
        }
        return (
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => handleUpdateStatus(order.id, "PACKED")}
            >
              Pack
            </Button>
            <Button
              size="sm"
              className="text-xs h-8"
              onClick={() => handleUpdateStatus(order.id, "SHIPPED")}
            >
              Ship
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fulfillment & Dispatch Orders"
        description="Process crop harvest orders, prepare shipping parcels, and update buyer statuses"
      />

      <DataTable
        columns={columns}
        data={orders}
        emptyMessage="No orders requiring fulfillment at this time."
      />
    </div>
  );
}
