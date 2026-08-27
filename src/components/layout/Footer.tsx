import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. Fresh produce from local farms.
        </p>
        <p>Buyer · Farmer · Admin marketplace</p>
      </div>
    </footer>
  );
}
