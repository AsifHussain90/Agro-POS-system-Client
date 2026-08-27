import { type ColumnDef } from "@tanstack/react-table";
import { useOrders } from "@/hooks/useApi";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { Order } from "@/types";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";

export function AdminOrdersPage() {
  const { data } = useOrders("admin");
  const orders = data?.data ?? [];

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "trackingCode",
      header: "Tracking ID",
      cell: ({ row }) => (
        <span className="font-mono font-bold text-xs text-primary">
          #{row.original.trackingCode}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Order Date",
      cell: ({ row }) => (
        <span className="text-xs text-on-surface-variant">
          {formatDateTime(row.original.createdAt)}
        </span>
      ),
    },
    {
      accessorKey: "items",
      header: "Produce Items",
      cell: ({ row }) => (
        <div className="space-y-0.5">
          {row.original.items.map((item) => (
            <p key={item.id} className="text-xs text-on-surface">
              {item.productName} <span className="text-on-surface-variant font-medium">({item.quantity}x)</span>
            </p>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "shippingAddress",
      header: "Destination",
      cell: ({ row }) => (
        <span className="text-xs text-on-surface">
          {row.original.shippingAddress?.city || "Direct Delivery"}
        </span>
      ),
    },
    {
      accessorKey: "total",
      header: "Total Amount",
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
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Orders Ledger"
        description="Comprehensive audit trail and tracking for all transactions across the Agro marketplace"
      />

      <DataTable columns={columns} data={orders} emptyMessage="No orders recorded yet." />
    </div>
  );
}
