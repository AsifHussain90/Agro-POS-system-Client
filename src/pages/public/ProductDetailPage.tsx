import { useState } from "react";
import { useParams } from "react-router";
import { formatCurrency } from "@/lib/utils";
import { useProduct } from "@/hooks/useApi";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { EmptyState } from "@/components/shared/EmptyState";

export function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { addProduct } = useCart();
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <EmptyState title="Product not found" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <PageHeader
        title={product.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Marketplace", href: "/products" },
          { label: product.name },
        ]}
      />
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-80 w-full rounded-xl object-cover"
        />
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {product.farmerName} · {product.category}
          </p>
          <p className="text-3xl font-bold">{formatCurrency(product.price)}</p>
          <p>per {product.unit}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-sm">In stock: {product.stock}</p>
          <QuantityStepper value={qty} onChange={setQty} max={product.stock} />
          <Button onClick={() => addProduct(product, qty)}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
