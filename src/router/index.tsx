import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthRedirect } from "@/components/auth/AuthRedirect";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Public pages
import { HomePage } from "@/pages/public/HomePage";
import { ProductListPage } from "@/pages/public/ProductListPage";
import { ProductDetailPage } from "@/pages/public/ProductDetailPage";
import { TrackOrderPage } from "@/pages/public/TrackOrderPage";

// Auth pages
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ChangePasswordPage } from "@/pages/auth/ChangePasswordPage";

// Buyer pages
import { CheckoutPage } from "@/pages/buyer/CheckoutPage";
import { BuyerOrdersPage } from "@/pages/buyer/BuyerOrdersPage";
import { BuyerProfilePage } from "@/pages/buyer/BuyerProfilePage";

// Farmer pages
import { FarmerDashboardPage } from "@/pages/farmer/FarmerDashboardPage";
import { FarmerProductsPage } from "@/pages/farmer/FarmerProductsPage";
import { FarmerOrdersPage } from "@/pages/farmer/FarmerOrdersPage";

// Admin pages
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "@/pages/admin/AdminUsersPage";
import { AdminBuyersPage } from "@/pages/admin/AdminBuyersPage";
import { AdminRequestsPage } from "@/pages/admin/AdminRequestsPage";
import { AdminOrdersPage } from "@/pages/admin/AdminOrdersPage";

// User / Requests pages
import { FarmerRequestPage } from "@/pages/user/FarmerRequestPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  // Full-screen auth routes (no Navbar / Footer)
  {
    path: "login",
    element: (
      <AuthRedirect>
        <LoginPage />
      </AuthRedirect>
    ),
  },
  {
    path: "register",
    element: (
      <AuthRedirect>
        <RegisterPage />
      </AuthRedirect>
    ),
  },

  // Main app routes (with Navbar & Footer)
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public marketplace routes
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "track-order", element: <TrackOrderPage /> },

      // Authenticated general routes
      {
        element: <AuthGuard />,
        children: [
          { path: "change-password", element: <ChangePasswordPage /> },
          { path: "requests", element: <FarmerRequestPage /> },
          { path: "checkout", element: <CheckoutPage /> },

          // Buyer specific routes
          {
            path: "buyer",
            element: <RoleGuard roles={["BUYER", "ADMIN", "USER", "FARMER"]} />,
            children: [
              { path: "orders", element: <BuyerOrdersPage /> },
              { path: "profile", element: <BuyerProfilePage /> },
            ],
          },

          // Farmer dashboard routes
          {
            path: "farmer",
            element: <RoleGuard roles={["FARMER", "ADMIN"]} />,
            children: [
              {
                element: <DashboardLayout />,
                children: [
                  { index: true, element: <FarmerDashboardPage /> },
                  { path: "products", element: <FarmerProductsPage /> },
                  { path: "orders", element: <FarmerOrdersPage /> },
                ],
              },
            ],
          },

          // Admin dashboard routes
          {
            path: "admin",
            element: <RoleGuard roles={["ADMIN"]} />,
            children: [
              {
                element: <DashboardLayout />,
                children: [
                  { index: true, element: <AdminDashboardPage /> },
                  { path: "users", element: <AdminUsersPage /> },
                  { path: "buyers", element: <AdminBuyersPage /> },
                  { path: "requests", element: <AdminRequestsPage /> },
                  { path: "orders", element: <AdminOrdersPage /> },
                ],
              },
            ],
          },
        ],
      },

      // Catch-all
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

