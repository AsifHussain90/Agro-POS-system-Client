import { Link } from "react-router";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="container flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center text-center py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container mb-4 shadow-level-1">
        <Compass className="h-8 w-8 text-secondary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-on-surface">Page Not Found</h1>
      <p className="mt-2 text-sm text-on-surface-variant max-w-md">
        The farm plot or page you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
        <Button asChild className="gap-2">
          <Link to="/products">Browse Marketplace</Link>
        </Button>
      </div>
    </div>
  );
}
