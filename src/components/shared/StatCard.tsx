import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
}

export function StatCard({ title, value, hint, icon: Icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-level-2 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          {title}
        </CardTitle>
        {Icon ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-on-surface">{value}</div>
        {hint ? <p className="mt-1 text-xs text-on-surface-variant/80">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
