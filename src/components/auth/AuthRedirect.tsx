import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useCurrentUser } from "@/hooks/useAuth";

export function AuthRedirect({ children }: { children: ReactNode }) {
  const user = useCurrentUser();

  if (!user) {
    return children;
  }

  if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
  if (user.role === "FARMER") return <Navigate to="/farmer" replace />;
  if (user.role === "BUYER") return <Navigate to="/products" replace />;
  return <Navigate to="/requests" replace />;
}
