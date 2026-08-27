import { Link } from "react-router";
import { DollarSign, Plus, ShoppingBag, Sprout, Truck } from "lucide-react";
import { useOrders, useProducts } from "@/hooks/useApi";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function FarmerDashboardPage() {
  const { data: productsData } = useProducts();
  const { data: ordersData } = useOrders("farmer");

  const products = productsData?.data ?? [];
  const orders = ordersData?.data ?? [];

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "CANCELLED" ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING" || o.status === "CONFIRMED");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Farm Operations Dashboard"
        description="Monitor harvest listings, stock inventories, and pending fulfillment orders"
        actions={
          <div className="flex gap-2">
            <Button asChild size="sm" className="gap-2">
              <Link to="/farmer/products">
                <Plus className="h-4 w-4" />
                Manage Crops
              </Link>
            </Button>
          </div>
        }
      />

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Harvest Revenue"
          value={formatCurrency(totalRevenue)}
          hint="From all completed farm orders"
          icon={DollarSign}
        />
        <StatCard
          title="Active Listings"
          value={products.length}
          hint="Live in the marketplace"
          icon={Sprout}
        />
        <StatCard
          title="Orders to Fulfill"
          value={pendingOrders.length}
          hint="Pending harvest or packaging"
          icon={ShoppingBag}
        />
        <StatCard
          title="Total Shipments"
          value={orders.filter((o) => o.status === "DELIVERED").length}
          hint="Delivered to buyers"
          icon={Truck}
        />
      </div>

      {/* Recent Orders Section */}
      <Card className="shadow-level-1 border-outline-variant">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-outline-variant/60">
          <div>
            <CardTitle className="text-base font-semibold">Recent Fulfillment Orders</CardTitle>
            <CardDescription className="text-xs">
              Orders requiring harvesting, packing, or dispatch
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link to="/farmer/orders">View All Orders</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-sm text-on-surface-variant">
              No orders placed yet for your farm listings.
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/60">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 hover:bg-surface-container-low/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-on-surface">
                        Order #{order.trackingCode}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      {order.items.map((i) => `${i.productName} (${i.quantity}x)`).join(", ")}
                    </p>
                    <p className="text-[11px] text-on-surface-variant/70">
                      {formatDateTime(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-sm text-secondary">{formatCurrency(order.total)}</p>
                    <Button asChild variant="ghost" size="sm" className="text-xs h-7 mt-1">
                      <Link to="/farmer/orders">Process</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
