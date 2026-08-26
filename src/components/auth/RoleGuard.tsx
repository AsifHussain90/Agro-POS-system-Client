import { Navigate, Outlet } from "react-router";
import type { UserRole } from "@/types";
import { useCurrentUser } from "@/hooks/useAuth";

export function RoleGuard({ roles }: { roles: UserRole[] }) {
  const user = useCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
