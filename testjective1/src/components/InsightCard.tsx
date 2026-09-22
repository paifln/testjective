import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Insight } from "@/lib/data";

const icons: Record<Insight["type"], string> = {
  gap: "⚠",
  progress: "↗",
  misconception: "◎",
  attention: "◑",
};

export function InsightCard({
  insight,
  actions,
}: {
  insight: Insight;
  actions?: ReactNode;
}) {
  return (
    <div className="surface-grad animate-rise rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base",
            insight.type === "gap" && "bg-warning-soft text-warning",
            insight.type === "progress" && "bg-success-soft text-success",
            insight.type === "misconception" && "bg-primary-soft text-accent-foreground",
            insight.type === "attention" && "bg-danger-soft text-danger",
          )}
        >
          {icons[insight.type]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{insight.title}</p>
            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
              AI Insight · {Math.round(insight.confidence * 100)}% confidence
            </span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{insight.description}</p>
          {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}
