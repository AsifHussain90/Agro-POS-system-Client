import { type ColumnDef } from "@tanstack/react-table";
import { ShoppingBag } from "lucide-react";
import { useBuyers } from "@/hooks/useApi";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";

export function AdminBuyersPage() {
  const { data } = useBuyers();
  const buyers = data?.data ?? [];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Buyer Name",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-sm text-on-surface">{u.name}</p>
              <p className="text-xs text-on-surface-variant">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <span className="text-xs text-on-surface-variant">
          {row.original.phone || "Not provided"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Joined Date",
      cell: ({ row }) => (
        <span className="text-xs text-on-surface-variant">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Account",
      cell: () => <Badge variant="success">Verified Buyer</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buyer Accounts"
        description="Directory of verified retail and commercial buyers on Agro marketplace"
      />

      <DataTable columns={columns} data={buyers} emptyMessage="No buyer accounts found." />
    </div>
  );
}
