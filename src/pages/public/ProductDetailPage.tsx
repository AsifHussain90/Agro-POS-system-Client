import { useState } from "react";
import { Link, useParams } from "react-router";
import { CheckCircle2, ShieldCheck, ShoppingCart, Tractor, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useProduct } from "@/hooks/useApi";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12">
        <EmptyState
          title="Product not found"
          description="The requested crop listing does not exist or has ended its harvest season."
          action={
            <Button asChild className="mt-4">
              <Link to="/products">Return to Marketplace</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8">
      <PageHeader
        title={product.name}
        description={`Harvested and packed by ${product.farmerName}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Marketplace", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Product Image */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest shadow-level-2">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-96 w-full object-cover sm:h-[420px]"
            />
          </div>
        </div>

        {/* Product Details & Ordering */}
        <div className="space-y-6 lg:col-span-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant={product.isActive ? "success" : "destructive"}>
                {product.isActive ? "In Season / Available" : "Sold Out"}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <Tractor className="h-4 w-4 text-secondary" />
              <span>Farm Producer: <strong className="text-on-surface font-semibold">{product.farmerName}</strong></span>
              <CheckCircle2 className="h-4 w-4 text-secondary" />
            </div>
          </div>

          <div className="rounded-lg border border-outline-variant bg-surface-container-low/70 p-5 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Farm Price
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-secondary">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm font-medium text-on-surface-variant">
                / {product.unit}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Harvest Description
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 pt-2 border-t border-outline-variant/60">
            <div className="flex items-center justify-between text-sm">
              <span className="text-on-surface-variant font-medium">Available Harvest Stock:</span>
              <span className="font-bold text-on-surface">
                {product.stock} {product.unit}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Quantity ({product.unit})
                </label>
                <QuantityStepper value={qty} onChange={setQty} max={product.stock} />
              </div>

              <div className="flex-1 pt-5">
                <Button
                  onClick={() => addProduct(product, qty)}
                  disabled={product.stock <= 0}
                  className="w-full h-11 gap-2 text-base shadow-level-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart ({formatCurrency(product.price * qty)})
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-md border border-outline-variant bg-surface-lowest p-3 flex items-center gap-2.5">
              <Truck className="h-5 w-5 text-secondary shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-on-surface">Direct Dispatch</p>
                <p className="text-on-surface-variant text-[11px]">Shipped directly from grower</p>
              </div>
            </div>
            <div className="rounded-md border border-outline-variant bg-surface-lowest p-3 flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-on-surface">Quality Checked</p>
                <p className="text-on-surface-variant text-[11px]">Verified produce standard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
