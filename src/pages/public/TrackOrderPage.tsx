import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Check, CheckCircle2, Clock, MapPin, Package, Search, ShoppingBag, Truck } from "lucide-react";
import { useTrackOrder } from "@/hooks/useApi";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

const timelineSteps: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: "PENDING", label: "Order Received", icon: Clock },
  { status: "CONFIRMED", label: "Harvest Confirmed", icon: CheckCircle2 },
  { status: "PACKED", label: "Crops Packed", icon: Package },
  { status: "SHIPPED", label: "In Farm Transit", icon: Truck },
  { status: "DELIVERED", label: "Delivered to Buyer", icon: Check },
];

export function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get("code") || "AGRO-1001";

  const [code, setCode] = useState(initialCode);
  const [submitted, setSubmitted] = useState(initialCode);

  useEffect(() => {
    const urlCode = searchParams.get("code");
    if (urlCode) {
      setCode(urlCode);
      setSubmitted(urlCode);
    }
  }, [searchParams]);

  const { data: order, isFetching } = useTrackOrder(submitted);

  const getStepIndex = (currentStatus?: OrderStatus) => {
    if (!currentStatus || currentStatus === "CANCELLED") return -1;
    return timelineSteps.findIndex((s) => s.status === currentStatus);
  };

  const activeIndex = getStepIndex(order?.status);

  return (
    <div className="container max-w-3xl py-10 space-y-8">
      <PageHeader
        title="Live Shipment Tracker"
        description="Monitor real-time harvest dispatch, parcel handling, and estimated arrival"
        crumbs={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
      />

      {/* Tracking input form */}
      <Card className="shadow-level-1 border-outline-variant">
        <CardContent className="pt-6">
          <form
            className="flex gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (code.trim()) setSubmitted(code.trim());
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/60" />
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter tracking code (e.g. AGRO-1001)"
                className="pl-10 uppercase font-mono"
              />
            </div>
            <Button type="submit" disabled={isFetching} className="shadow-level-1">
              {isFetching ? "Tracking..." : "Track Shipment"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order Status Display */}
      {order && (
        <div className="space-y-6">
          {/* Progress Timeline */}
          <Card className="shadow-level-2 border-outline-variant">
            <CardHeader className="pb-4 border-b border-outline-variant/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Tracking Number
                  </span>
                  <CardTitle className="text-xl font-bold tracking-tight text-primary">
                    #{order.trackingCode}
                  </CardTitle>
                </div>
                <StatusBadge status={order.status} />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {order.status === "CANCELLED" ? (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-center text-sm font-semibold text-destructive">
                  This order has been cancelled.
                </div>
              ) : (
                <div className="relative py-4">
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {timelineSteps.map((step, idx) => {
                      const isComplete = idx <= activeIndex;
                      const isCurrent = idx === activeIndex;
                      const Icon = step.icon;

                      return (
                        <div key={step.status} className="flex flex-col items-center gap-2">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                              isComplete
                                ? "border-secondary bg-secondary-container text-on-secondary-container shadow-level-1"
                                : "border-outline-variant bg-surface-container text-on-surface-variant/40",
                              isCurrent && "ring-4 ring-secondary/20 font-bold",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span
                            className={cn(
                              "text-[11px] font-medium leading-tight",
                              isComplete ? "text-on-surface font-semibold" : "text-on-surface-variant/60",
                            )}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details breakdown */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="shadow-level-1 border-outline-variant">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-secondary" />
                  Produce Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm pt-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 border-b border-outline-variant/40 last:border-0">
                    <span className="text-on-surface">
                      {item.productName} <span className="text-on-surface-variant text-xs">× {item.quantity}</span>
                    </span>
                    <span className="font-semibold text-xs text-on-surface">{formatCurrency(item.total)}</span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-bold text-sm text-secondary">
                  <span>Order Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-level-1 border-outline-variant">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" />
                  Delivery Destination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs text-on-surface-variant pt-2">
                <p className="font-semibold text-on-surface">{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.line1}</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                </p>
                <p className="pt-2 text-[11px] text-on-surface-variant/70">
                  Ordered on {formatDateTime(order.createdAt)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
