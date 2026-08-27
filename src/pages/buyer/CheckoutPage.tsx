import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Check, MapPin, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAddresses, useCheckout, useSaveAddress } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { AddressForm } from "@/components/forms/AddressForm";
import type { AddressPayload } from "@/types/api";

export function CheckoutPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const { data: addresses = [], isLoading: loadingAddresses } = useAddresses();
  const saveAddressMutation = useSaveAddress();
  const checkoutMutation = useCheckout();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Default address or first address
  const activeAddressId =
    selectedAddressId ??
    addresses.find((a) => a.isDefault)?.id ??
    addresses[0]?.id;

  const shippingFee = items.length > 0 ? 150 : 0;
  const total = subtotal + shippingFee;

  const handleCreateAddress = (values: AddressPayload) => {
    saveAddressMutation.mutate(values, {
      onSuccess: (saved) => {
        setIsAddressModalOpen(false);
        if (saved && "id" in saved) {
          setSelectedAddressId((saved as { id: string }).id);
        }
      },
    });
  };

  const handlePlaceOrder = () => {
    if (!activeAddressId) return;
    checkoutMutation.mutate(
      {
        addressId: activeAddressId,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      },
      {
        onSuccess: (order) => {
          clear();
          if (order && "trackingCode" in order) {
            void navigate(`/track-order`);
          } else {
            void navigate("/buyer/orders");
          }
        },
      },
    );
  };

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <PageHeader
          title="Shopping Cart & Checkout"
          crumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
        />
        <EmptyState
          title="Your cart is empty"
          description="Browse our fresh produce catalog to add vegetables, fruits, and grains."
          action={
            <Button asChild className="mt-4">
              <Link to="/products">Explore Marketplace</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <PageHeader
        title="Checkout"
        description="Review your basket, choose delivery location, and confirm order"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Marketplace", href: "/products" },
          { label: "Checkout" },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Items and Address */}
        <div className="space-y-6 lg:col-span-8">
          {/* Cart items */}
          <Card className="shadow-level-1 border-outline-variant">
            <CardHeader className="pb-3 border-b border-outline-variant/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-base font-semibold">Order Items ({items.length})</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={clear} className="text-xs text-destructive hover:bg-destructive/10">
                  Clear all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-outline-variant/60 p-0">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover border border-outline-variant/60 shrink-0"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-surface-container flex items-center justify-center shrink-0">
                        <ShoppingBag className="h-6 w-6 text-on-surface-variant/40" />
                      </div>
                    )}
                    <div className="truncate">
                      <p className="font-semibold text-sm text-on-surface truncate">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {formatCurrency(item.price)} / {item.unit}
                      </p>
                      <p className="text-xs font-semibold text-secondary mt-1">
                        Subtotal: {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.productId, qty)}
                      max={item.stock}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-on-surface-variant hover:text-destructive"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="shadow-level-1 border-outline-variant">
            <CardHeader className="pb-3 border-b border-outline-variant/60 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-base font-semibold">Delivery Address</CardTitle>
                </div>
                <CardDescription className="text-xs mt-0.5">
                  Select destination address for farm delivery
                </CardDescription>
              </div>

              <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    Add Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Delivery Address</DialogTitle>
                    <DialogDescription>Enter delivery details for receiving farm orders</DialogDescription>
                  </DialogHeader>
                  <AddressForm
                    onSubmit={handleCreateAddress}
                    isSubmitting={saveAddressMutation.isPending}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>

            <CardContent className="p-4">
              {loadingAddresses ? (
                <p className="text-xs text-on-surface-variant">Loading addresses...</p>
              ) : addresses.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm font-medium text-on-surface">No address found</p>
                  <p className="text-xs text-on-surface-variant mt-1">Please add a shipping address to proceed.</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {addresses.map((addr) => {
                    const isSelected = addr.id === activeAddressId;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`cursor-pointer rounded-lg border p-4 transition-all ${
                          isSelected
                            ? "border-secondary bg-secondary-container/30 shadow-level-1"
                            : "border-outline-variant bg-surface-lowest hover:bg-surface-container"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-on-surface">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="rounded bg-surface-container px-1.5 py-0.5 text-[10px] font-medium text-on-surface-variant">
                                Default
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs font-medium text-on-surface">{addr.fullName}</p>
                        <p className="text-xs text-on-surface-variant">{addr.phone}</p>
                        <p className="mt-1 text-xs text-on-surface-variant line-clamp-2">
                          {addr.line1}, {addr.city}, {addr.state}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24 shadow-level-2 border-outline-variant">
            <CardHeader className="pb-3 border-b border-outline-variant/60">
              <CardTitle className="text-base font-semibold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-semibold text-on-surface">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-on-surface">{formatCurrency(shippingFee)}</span>
                </div>
                <div className="border-t border-outline-variant/60 pt-2 flex justify-between text-base font-bold text-on-surface">
                  <span>Total</span>
                  <span className="text-secondary">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="rounded-md border border-outline-variant bg-surface-container-low p-3 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-secondary">
                  <Truck className="h-4 w-4" />
                  <span>Farm Dispatch Guarantee</span>
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Produce is harvested upon order confirmation to ensure maximum freshness.
                </p>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={!activeAddressId || checkoutMutation.isPending}
                className="w-full h-11 text-base shadow-level-2"
              >
                {checkoutMutation.isPending ? "Placing Order..." : "Confirm & Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
