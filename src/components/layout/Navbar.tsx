import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount: totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Products", to: "/products" },
    { label: "Platform", to: "/#features" },
    { label: "Enterprise", to: "/#solutions" },
    { label: "Resources", to: "/track-order" },
  ];

  return (
    <header className="bg-surface/95 backdrop-blur-md w-full sticky top-0 z-50 transition-all duration-300 border-b border-surface-container">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-[1440px] mx-auto h-20">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-xl">
          <Link
            to="/"
            className="text-headline-md text-primary flex items-center gap-sm group"
          >
            <Leaf className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            Agro
          </Link>

          <nav className="hidden lg:flex gap-lg ml-md">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-md">
          {isAuthenticated ? (
            <>
              <Link
                to={
                  user?.role === "ADMIN"
                    ? "/admin"
                    : user?.role === "FARMER"
                      ? "/farmer"
                      : "/buyer/orders"
                }
                className="text-on-surface-variant font-label-md hover:text-primary transition-colors px-md py-2 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/checkout"
                className="relative text-on-surface-variant hover:text-primary transition-colors p-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-on-surface-variant" />
                <span className="font-label-sm text-on-surface-variant">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-on-surface-variant hover:text-primary"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-on-surface-variant font-label-md hover:text-primary transition-colors px-md py-2"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-primary border border-primary/20 bg-surface-container-lowest font-label-md px-6 py-2.5 rounded-full hover:bg-surface-container transition-colors"
              >
                Join as Farmer
              </Link>
              <Link
                to="/register"
                className="bg-primary text-on-primary font-label-md px-6 py-2.5 rounded-full hover:bg-primary-container transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary p-xs hover:bg-surface-container rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-surface-container px-margin-mobile py-md">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-label-md text-on-surface-variant hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-surface-container"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-surface-container my-2" />
            {isAuthenticated ? (
              <>
                <Link
                  to="/checkout"
                  className="font-label-md text-on-surface-variant hover:text-primary py-3 px-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart ({totalItems})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="font-label-md text-error text-left py-3 px-2 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-label-md text-on-surface-variant hover:text-primary py-3 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-on-primary font-label-md px-6 py-3 rounded-full text-center mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
