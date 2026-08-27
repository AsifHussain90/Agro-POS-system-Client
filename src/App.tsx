import { RouterProvider } from "react-router";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { router } from "@/router";

export function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
