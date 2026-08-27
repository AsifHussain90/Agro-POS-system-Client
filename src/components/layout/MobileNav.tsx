import { NavLink } from "react-router";
import { Home, Package, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useAuth";

export function MobileNav() {
  const user = useCurrentUser();
  if (!user) return null;

  const items =
    user.role === "ADMIN"
      ? [
          { to: "/admin", label: "Home", icon: Home },
          { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
          { to: "/admin/users", label: "Users", icon: User },
        ]
      : user.role === "FARMER"
        ? [
            { to: "/farmer", label: "Home", icon: Home },
            { to: "/farmer/products", label: "Stock", icon: Package },
            { to: "/farmer/orders", label: "Orders", icon: ShoppingBag },
          ]
        : [
            { to: "/", label: "Home", icon: Home },
            { to: "/products", label: "Shop", icon: Package },
            { to: "/buyer/orders", label: "Orders", icon: ShoppingBag },
            { to: "/buyer/profile", label: "Me", icon: User },
          ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/80 bg-surface/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 sm:grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 py-2 text-xs font-medium text-on-surface-variant transition-colors",
                isActive && "font-bold text-secondary",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
