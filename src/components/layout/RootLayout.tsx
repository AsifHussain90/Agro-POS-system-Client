import { Outlet } from "react-router";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface font-body-md antialiased">
      <Navbar />
      <main className="flex-1 w-full pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
