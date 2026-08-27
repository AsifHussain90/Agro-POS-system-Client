import { useState } from "react";
import { Link } from "react-router";
import { ProductCategory } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useProducts } from "@/hooks/useApi";
import { Card, CardContent } from "@/components/ui/card";
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

  const products = data?.data ?? [];

  return (
    <div className="container py-8">
      <PageHeader
        title="Marketplace"
        description="Browse produce from verified farmers"
        crumbs={[{ label: "Home", href: "/" }, { label: "Marketplace" }]}
      />
      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        placeholder="Search produce..."
        filterValue={category}
        onFilterChange={setCategory}
        filters={[
          { label: "All categories", value: "ALL" },
          ...Object.values(ProductCategory).map((c) => ({ label: c, value: c })),
        ]}
      />
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState title="No products found" description="Try another search or category." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card className="overflow-hidden hover:shadow-md">
                <img src={product.images[0]} alt="" className="h-44 w-full object-cover" />
                <CardContent className="space-y-1 pt-4">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.farmerName} · {product.unit}
                  </p>
                  <p className="font-semibold">{formatCurrency(product.price)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
