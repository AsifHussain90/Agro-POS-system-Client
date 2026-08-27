import { Link } from "react-router";
import { ExternalLink, Package, Truck } from "lucide-react";
import { useOrders } from "@/hooks/useApi";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";

export function BuyerOrdersPage() {
  const { data, isLoading } = useOrders("mine");
  const orders = data?.data ?? [];

  return (
    <div className="container py-10">
      <PageHeader
        title="My Orders"
        description="View purchase history, order statuses, and farm shipment tracking"
        crumbs={[{ label: "Home", href: "/" }, { label: "My Orders" }]}
        actions={
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/track-order">
              <Truck className="h-4 w-4" />
              Live Order Tracker
            </Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="You haven't placed any farm produce orders yet."
          action={
            <Button asChild className="mt-4">
              <Link to="/products">Shop Produce</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="shadow-level-1 border-outline-variant hover:shadow-level-2 transition-shadow">
              <CardHeader className="pb-3 border-b border-outline-variant/60">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold tracking-tight">
                        Order #{order.trackingCode}
                      </CardTitle>
                      <p className="text-xs text-on-surface-variant">
                        Placed on {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={order.status} />
                    <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
                      <Link to={`/track-order?code=${order.trackingCode}`}>
                        Track <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-12 md:items-center">
                  <div className="space-y-2 md:col-span-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Items Ordered
                    </p>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-on-surface">
                            {item.productName} <span className="text-on-surface-variant text-xs">× {item.quantity}</span>
                          </span>
                          <span className="font-semibold text-xs text-on-surface">
                            {formatCurrency(item.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-outline-variant/60 pt-3 md:border-t-0 md:border-l md:pl-6 md:pt-0 md:col-span-4 space-y-1 text-right md:text-right">
                    <p className="text-xs text-on-surface-variant">Total Amount</p>
                    <p className="text-xl font-bold text-secondary">{formatCurrency(order.total)}</p>
                    <p className="text-[11px] text-on-surface-variant">
                      Ship to: {order.shippingAddress?.city ?? "Direct Farm Delivery"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
