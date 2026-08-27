import { Outlet } from "react-router";
import { Sidebar } from "@/components/layout/Sidebar";

export function DashboardLayout() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] gap-0 px-0 md:px-4">
      <Sidebar />
      <div className="min-w-0 flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
}
