import { NavLink } from "react-router";
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useAuth";

const farmerNav = [
  { to: "/farmer", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/farmer/products", label: "Products", icon: Package },
  { to: "/farmer/orders", label: "Orders", icon: ShoppingBag },
];

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/buyers", label: "Buyers", icon: UserPlus },
  { to: "/admin/requests", label: "Farmer requests", icon: ClipboardList },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export function Sidebar() {
  const user = useCurrentUser();
  const items = user?.role === "ADMIN" ? adminNav : farmerNav;

  return (
    <aside className="hidden w-60 shrink-0 border-r bg-card md:block">
      <nav className="flex flex-col gap-1 p-4">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
                isActive && "bg-accent text-foreground",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
