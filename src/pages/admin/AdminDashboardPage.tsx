import { Link } from "react-router";
import { ClipboardList, DollarSign, Package, Users } from "lucide-react";
import { useBuyers, useFarmerRequests, useOrders, useProducts, useUsers } from "@/hooks/useApi";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function AdminDashboardPage() {
  const { data: usersData } = useUsers();
  const { data: buyersData } = useBuyers();
  const { data: requestsData } = useFarmerRequests();
  const { data: ordersData } = useOrders("admin");
  const { data: productsData } = useProducts();

  const users = usersData?.data ?? [];
  const buyers = buyersData?.data ?? [];
  const requests = requestsData?.data ?? [];
  const orders = ordersData?.data ?? [];
  const products = productsData?.data ?? [];

  const pendingRequests = requests.filter((r) => r.status === "PENDING");
  const totalVolume = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Control Center"
        description="Marketplace ecosystem oversight, verification queues, and system metrics"
      />

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Marketplace GMV"
          value={formatCurrency(totalVolume)}
          hint="Gross merchandise volume"
          icon={DollarSign}
        />
        <StatCard
          title="Total Users"
          value={users.length}
          hint={`${buyers.length} registered buyers`}
          icon={Users}
        />
        <StatCard
          title="Verification Queue"
          value={pendingRequests.length}
          hint="Pending farmer onboarding"
          icon={ClipboardList}
        />
        <StatCard
          title="Catalog Listings"
          value={products.length}
          hint="Active produce listings"
          icon={Package}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Farmer Approvals */}
        <Card className="shadow-level-1 border-outline-variant">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-outline-variant/60">
            <div>
              <CardTitle className="text-base font-semibold">Farmer Verification Requests</CardTitle>
              <CardDescription className="text-xs">Applicants awaiting approval to sell</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="text-xs">
              <Link to="/admin/requests">Review All</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {requests.length === 0 ? (
              <div className="py-8 text-center text-sm text-on-surface-variant">
                No farmer requests in queue.
              </div>
            ) : (
              <div className="divide-y divide-outline-variant/60">
                {requests.slice(0, 4).map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-4 hover:bg-surface-container-low/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-on-surface">{req.farmName}</p>
                        <StatusBadge status={req.status} />
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        By {req.userName} · {req.location}
                      </p>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="text-xs">
                      <Link to="/admin/requests">View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Global Orders */}
        <Card className="shadow-level-1 border-outline-variant">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-outline-variant/60">
            <div>
              <CardTitle className="text-base font-semibold">Recent Global Orders</CardTitle>
              <CardDescription className="text-xs">Platform-wide order activities</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="text-xs">
              <Link to="/admin/orders">All Orders</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {orders.length === 0 ? (
              <div className="py-8 text-center text-sm text-on-surface-variant">
                No orders recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-outline-variant/60">
                {orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-surface-container-low/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-xs text-primary">
                          #{order.trackingCode}
                        </span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        {order.items.length} item(s) · {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-secondary">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
