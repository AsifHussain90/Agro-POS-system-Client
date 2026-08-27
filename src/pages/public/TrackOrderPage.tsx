import { useState } from "react";
import { useTrackOrder } from "@/hooks/useApi";
import { formatDateTime, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function TrackOrderPage() {
  const [code, setCode] = useState("AGRO-1001");
  const [submitted, setSubmitted] = useState("AGRO-1001");
  const { data, isFetching } = useTrackOrder(submitted);

  return (
    <div className="container max-w-2xl py-8">
      <PageHeader
        title="Track order"
        description="Enter your tracking code to see shipment status"
      />
      <form
        className="mb-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(code);
        }}
      >
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="AGRO-1001" />
        <Button type="submit" disabled={isFetching}>
          Track
        </Button>
      </form>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {data.trackingCode}
              <StatusBadge status={data.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Placed {formatDateTime(data.createdAt)}</p>
            <p>Total {formatCurrency(data.total)}</p>
            <ul className="list-disc pl-4">
              {data.items.map((item) => (
                <li key={item.id}>
                  {item.productName} × {item.quantity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
