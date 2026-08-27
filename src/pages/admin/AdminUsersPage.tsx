import { type ColumnDef } from "@tanstack/react-table";
import { useUsers } from "@/hooks/useApi";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";

export function AdminUsersPage() {
  const { data } = useUsers();
  const users = data?.data ?? [];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-white font-bold text-xs">
              {u.name[0]}
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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        const variant =
          role === "ADMIN"
            ? "default"
            : role === "FARMER"
              ? "secondary"
              : role === "BUYER"
                ? "outline"
                : "outline";
        return (
          <Badge variant={variant} className="text-xs">
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Registered On",
      cell: ({ row }) => (
        <span className="text-xs text-on-surface-variant">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="All registered platform users across Buyer, Farmer, and Administrator roles"
      />

      <DataTable columns={columns} data={users} emptyMessage="No users found." />
    </div>
  );
}
