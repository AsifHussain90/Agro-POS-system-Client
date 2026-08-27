import { useState } from "react";
import { Clock, MapPin, Send, Tractor } from "lucide-react";
import { useCreateFarmerRequest, useFarmerRequests } from "@/hooks/useApi";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function FarmerRequestPage() {
  const { data: requestsData, isLoading } = useFarmerRequests();
  const createRequestMutation = useCreateFarmerRequest();

  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const requests = requestsData?.data ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName || !location || !description) return;
    createRequestMutation.mutate(
      { farmName, location, description },
      {
        onSuccess: () => {
          setFarmName("");
          setLocation("");
          setDescription("");
        },
      },
    );
  };

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <PageHeader
        title="Farmer Seller Onboarding"
        description="Apply for verified producer credentials to list and sell fresh produce directly to buyers"
        crumbs={[{ label: "Home", href: "/" }, { label: "Farmer Application" }]}
      />

      <div className="grid gap-8 md:grid-cols-12">
        {/* Application Form */}
        <div className="md:col-span-7">
          <Card className="shadow-level-1 border-outline-variant">
            <CardHeader className="pb-3 border-b border-outline-variant/60">
              <div className="flex items-center gap-2">
                <Tractor className="h-5 w-5 text-secondary" />
                <CardTitle className="text-base font-semibold">Farmer Application Form</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Submit your farm details for admin verification and listing approval
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Farm or Business Name
                  </label>
                  <Input
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. Green Valley Organic Farms"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Farm Location / Region
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/60" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Multan, Punjab"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Farm Overview & Crop Specialties
                  </label>
                  <Textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your land area, farming methods, primary produce (vegetables, grains, fruits), and harvest capacity."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={createRequestMutation.isPending}
                  className="w-full gap-2 shadow-level-1"
                >
                  <Send className="h-4 w-4" />
                  {createRequestMutation.isPending ? "Submitting Application..." : "Submit Verification Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Previous Applications / Status */}
        <div className="md:col-span-5 space-y-4">
          <Card className="shadow-level-1 border-outline-variant">
            <CardHeader className="pb-3 border-b border-outline-variant/60">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                <CardTitle className="text-base font-semibold">Your Submissions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {isLoading ? (
                <p className="text-xs text-on-surface-variant">Checking application status...</p>
              ) : requests.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-xs font-medium text-on-surface">No previous applications</p>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Fill in the form to get started.
                  </p>
                </div>
              ) : (
                requests.map((req) => (
                  <div
                    key={req.id}
                    className="rounded-lg border border-outline-variant bg-surface-lowest p-3 space-y-2 hover:border-outline transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-on-surface">{req.farmName}</span>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="text-xs text-on-surface-variant line-clamp-2">{req.description}</p>
                    <p className="text-[10px] text-on-surface-variant/70">
                      Submitted on {formatDateTime(req.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <div className="rounded-lg border border-outline-variant bg-secondary-container/30 p-4 text-xs space-y-1.5">
            <p className="font-semibold text-on-secondary-container">Verification Process</p>
            <p className="text-on-secondary-container/80 text-[11px] leading-relaxed">
              Our agricultural specialist team reviews submissions within 24-48 hours. Once approved, your account will automatically upgrade to Farmer with full listing access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
