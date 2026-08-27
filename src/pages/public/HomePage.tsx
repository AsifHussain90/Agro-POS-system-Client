import { Link } from "react-router";
import { Leaf, ShieldCheck, Tractor, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/utils";

export function HomePage() {
  const { data, isLoading } = useProducts();

  return (
    <div>
      <section className="bg-accent">
        <div className="container grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary">Farm to table marketplace</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Fresh produce, direct from farmers
            </h1>
            <p className="text-muted-foreground">
              Browse seasonal vegetables, fruits, grains, and dairy. Track orders from packing to
              delivery.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link to="/products">Shop marketplace</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/register">Sell as a farmer</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Tractor, title: "Local farms" },
              { icon: Leaf, title: "Seasonal crops" },
              { icon: Truck, title: "Order tracking" },
              { icon: ShieldCheck, title: "Verified sellers" },
            ].map(({ icon: Icon, title }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured produce</h2>
          <Button variant="link" asChild>
            <Link to="/products">View all</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))
            : data?.data.slice(0, 3).map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Card className="overflow-hidden hover:shadow-md">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-40 w-full object-cover"
                    />
                    <CardContent className="space-y-1 pt-4">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.farmerName}</p>
                      <p className="font-semibold">{formatCurrency(product.price)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}
