import { useState } from "react";
import { Link } from "react-router";
import { Lock, MapPin, Plus } from "lucide-react";
import { useCurrentUser } from "@/hooks/useAuth";
import { useAddresses, useSaveAddress } from "@/hooks/useApi";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { AddressForm } from "@/components/forms/AddressForm";
import type { AddressPayload } from "@/types/api";

export function BuyerProfilePage() {
  const user = useCurrentUser();
  const { data: addresses = [], isLoading: loadingAddresses } = useAddresses();
  const saveAddressMutation = useSaveAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateAddress = (values: AddressPayload) => {
    saveAddressMutation.mutate(values, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <div className="container py-10 space-y-8">
      <PageHeader
        title="Account Profile"
        description="Manage personal credentials, security, and saved delivery locations"
        crumbs={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* User Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-level-1 border-outline-variant">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-container text-white text-2xl font-bold shadow-level-2 mb-2">
                {user?.name?.[0] ?? "U"}
              </div>
              <CardTitle className="text-lg">{user?.name}</CardTitle>
              <CardDescription className="text-xs">{user?.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-2 border-t border-outline-variant/60">
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-on-surface-variant">Account Type</span>
                <span className="font-semibold rounded bg-secondary-container px-2 py-0.5 text-on-secondary-container">
                  {user?.role}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-on-surface-variant">Member Since</span>
                <span className="font-medium text-on-surface">
                  {user?.createdAt ? formatDate(user.createdAt) : "Active Member"}
                </span>
              </div>

              <div className="pt-4 border-t border-outline-variant/60">
                <Button asChild variant="outline" className="w-full justify-center gap-2 text-xs">
                  <Link to="/change-password">
                    <Lock className="h-3.5 w-3.5" />
                    Change Password
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Addresses Management */}
        <div className="lg:col-span-8">
          <Card className="shadow-level-1 border-outline-variant">
            <CardHeader className="pb-3 border-b border-outline-variant/60 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-base font-semibold">Saved Delivery Addresses</CardTitle>
                </div>
                <CardDescription className="text-xs mt-0.5">
                  Addresses used for 1-click checkout and farm shipment delivery
                </CardDescription>
              </div>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1.5 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    New Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                    <DialogDescription>Save a new delivery location to your profile</DialogDescription>
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
                <div className="text-center py-8">
                  <p className="text-sm font-medium text-on-surface">No addresses configured</p>
                  <p className="text-xs text-on-surface-variant mt-1">Add your primary delivery address to speed up ordering.</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="rounded-lg border border-outline-variant bg-surface-lowest p-4 space-y-1 hover:border-outline transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-on-surface">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="rounded bg-secondary-container px-1.5 py-0.5 text-[10px] font-semibold text-on-secondary-container">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-on-surface pt-1">{addr.fullName}</p>
                      <p className="text-xs text-on-surface-variant">{addr.phone}</p>
                      <p className="text-xs text-on-surface-variant line-clamp-2">
                        {addr.line1}
                        {addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} - {addr.postalCode}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
