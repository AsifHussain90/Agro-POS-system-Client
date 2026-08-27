import { type ColumnDef } from "@tanstack/react-table";
import { Check, Tractor, X } from "lucide-react";
import { useFarmerRequests } from "@/hooks/useApi";
import { formatDateTime } from "@/lib/utils";
import type { FarmerRequest } from "@/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { toast } from "sonner";

export function AdminRequestsPage() {
  const { data } = useFarmerRequests();
  const requests = data?.data ?? [];

  const handleDecision = (_reqId: string, decision: "APPROVED" | "REJECTED") => {
    toast.success(`Farmer application ${decision.toLowerCase()} successfully`);
  };

  const columns: ColumnDef<FarmerRequest>[] = [
    {
      accessorKey: "farmName",
      header: "Farm & Applicant",
      cell: ({ row }) => {
        const req = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
              <Tractor className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-sm text-on-surface">{req.farmName}</p>
              <p className="text-xs text-on-surface-variant">Applicant: {req.userName}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <span className="text-xs font-medium text-on-surface">
          {row.original.location}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Farm Overview",
      cell: ({ row }) => (
        <p className="text-xs text-on-surface-variant max-w-xs line-clamp-2">
          {row.original.description}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Applied Date",
      cell: ({ row }) => (
        <span className="text-xs text-on-surface-variant">
          {formatDateTime(row.original.createdAt)}
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
      header: "Review Actions",
      cell: ({ row }) => {
        const req = row.original;
        if (req.status !== "PENDING") {
          return (
            <span className="text-xs text-on-surface-variant font-medium">Processed</span>
          );
        }
        return (
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={() => handleDecision(req.id, "APPROVED")}
            >
              <Check className="h-3 w-3" /> Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={() => handleDecision(req.id, "REJECTED")}
            >
              <X className="h-3 w-3" /> Reject
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farmer Verification Requests"
        description="Verify land deeds, agricultural documents, and onboard vetted farm producers"
      />

      <DataTable
        columns={columns}
        data={requests}
        emptyMessage="No pending farmer verification requests."
      />
    </div>
  );
}
