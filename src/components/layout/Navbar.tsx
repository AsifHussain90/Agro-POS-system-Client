import { Link, NavLink, useNavigate } from "react-router";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const publicLinks = [
  { to: "/products", label: "Products" },
  { to: "/track-order", label: "Track Order" },
];

export function Navbar() {
  const user = useCurrentUser();
  const logout = useLogout();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const roleLinks =
    user?.role === "ADMIN"
      ? [{ to: "/admin", label: "Admin Console" }]
      : user?.role === "FARMER"
        ? [{ to: "/farmer", label: "Farm Management" }]
        : user?.role === "BUYER"
          ? [
              { to: "/buyer/orders", label: "My Orders" },
              { to: "/buyer/profile", label: "Profile" },
            ]
          : user
            ? [{ to: "/requests", label: "Farmer Request" }]
            : [];

  const links = [...publicLinks, ...roleLinks];

  return (
    <header className="bg-surface/95 backdrop-blur-md w-full sticky top-0 z-50 transition-all duration-300 border-b border-surface-container">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-[1440px] mx-auto h-20">
        <div className="flex items-center gap-xl">
          <Link
            to="/"
            className="text-headline-md font-headline-md text-primary flex items-center gap-sm group"
          >
            <span className="material-symbols-outlined text-[32px] text-primary group-hover:scale-110 transition-transform icon-fill">
              eco
            </span>
            {APP_NAME}
          </Link>

          <nav className="hidden lg:flex gap-lg ml-md">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "font-label-md text-label-md py-2 transition-colors",
                    isActive
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-primary",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => void navigate("/checkout")}
            className="relative rounded-full hover:bg-surface-container h-10 w-10 border border-outline-variant/60"
          >
            <ShoppingCart className="h-4 w-4 text-primary" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary-container px-1 text-[11px] font-bold text-on-secondary-container shadow-sm border border-secondary/20">
                {itemCount}
              </span>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full px-4 h-10 border-primary/20 bg-surface-container-lowest font-label-md text-label-md hover:bg-surface-container text-primary"
                >
                  <User className="h-4 w-4 text-primary" />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-card border-outline-variant">
                <DropdownMenuLabel className="font-semibold text-xs text-on-surface-variant">
                  {user.email} ({user.role})
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => void navigate("/change-password")}
                  className="rounded-xl cursor-pointer"
                >
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="rounded-xl cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                to="/login"
                className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors px-md py-2"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-primary border border-primary/20 bg-surface-container-lowest font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-surface-container transition-colors"
              >
                Join as Farmer
              </Link>
              <Link
                to="/products"
                className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-primary-container transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => void navigate("/checkout")}
            className="relative rounded-full h-10 w-10"
          >
            <ShoppingCart className="h-5 w-5 text-primary" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary-container px-1 text-[10px] font-bold text-on-secondary-container">
                {itemCount}
              </span>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <button className="text-primary p-xs hover:bg-surface-container rounded-md transition-colors">
                <span className="material-symbols-outlined text-[28px]">menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-surface border-r border-surface-container">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-primary font-headline-md">
                  <span className="material-symbols-outlined text-[28px] icon-fill">eco</span>
                  {APP_NAME}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Link to="/" className="font-label-md text-on-surface py-2 hover:text-primary">
                  Home
                </Link>
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-label-md text-on-surface py-2 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-surface-container-highest flex flex-col gap-3">
                  {user ? (
                    <>
                      <p className="text-xs text-on-surface-variant">Signed in as {user.name}</p>
                      <Button variant="outline" onClick={logout} className="rounded-full">
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-center py-2.5 font-label-md text-primary border border-primary/20 rounded-full"
                      >
                        Log In
                      </Link>
                      <Link
                        to="/register"
                        className="text-center py-2.5 font-label-md bg-primary text-on-primary rounded-full"
                      >
                        Join as Farmer
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
