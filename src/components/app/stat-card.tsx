import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  change,
  trend = "up",
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  return (
    <Card className="shadow-card">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-semibold">{value}</p>
          <p
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              trend === "up" ? "text-success" : "text-destructive",
            )}
          >
            <TrendIcon className="size-3.5" aria-hidden="true" />
            {change}
          </p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </CardContent>
    </Card>
  );
}
