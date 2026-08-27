import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { ProductCategory } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useProducts } from "@/hooks/useApi";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { EmptyState } from "@/components/shared/EmptyState";

export function ProductListPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const { data, isLoading } = useProducts({
    q: search || undefined,
    category: category === "ALL" ? undefined : category,
  });
  const { addProduct } = useCart();

  const products = data?.data ?? [];

  return (
    <div className="container py-10 space-y-8">
      <PageHeader
        title="Produce Marketplace"
        description="Fresh vegetables, orchard fruits, whole grains, and dairy straight from vetted regional farmers"
        crumbs={[{ label: "Home", href: "/" }, { label: "Marketplace" }]}
      />

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by produce name or harvest keyword..."
        filterValue={category}
        onFilterChange={setCategory}
        filters={[
          { label: "All Harvests", value: "ALL" },
          ...Object.values(ProductCategory).map((c) => ({ label: c, value: c })),
        ]}
      />

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="No produce found"
          description="Try adjusting your search criteria or selecting another produce category."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-outline-variant bg-surface-lowest shadow-level-1 transition-all duration-200 hover:border-secondary/40 hover:shadow-level-2 flex flex-col justify-between"
            >
              <div>
                <Link to={`/products/${product.id}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 shadow-sm" variant="secondary">
                    {product.category}
                  </Badge>
                </Link>

                <CardContent className="space-y-2.5 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-bold text-base text-on-surface hover:text-secondary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3 text-secondary" />
                        {product.farmerName}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-base text-secondary">
                        {formatCurrency(product.price)}
                      </span>
                      <p className="text-[11px] text-on-surface-variant">per {product.unit}</p>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">Available Stock</span>
                    <span className="font-semibold text-on-surface">
                      {product.stock} {product.unit}
                    </span>
                  </div>
                </CardContent>
              </div>

              <div className="p-5 pt-0">
                <Button
                  onClick={() => addProduct(product, 1)}
                  className="w-full gap-2 text-xs h-9 shadow-level-1"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to Basket
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
