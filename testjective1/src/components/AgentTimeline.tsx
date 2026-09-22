import { cn } from "@/lib/utils";
import type { AgentStep } from "@/services/aiAgent";

/** Reusable vertical AI execution timeline used across the whole product. */
export function AgentTimeline({ steps, title }: { steps: AgentStep[]; title?: string }) {
  if (!steps.length) return null;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      {title ? (
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {title}
        </p>
      ) : null}
      <ol className="relative space-y-4 border-l border-border pl-6">
        {steps.map((step, i) => (
          <li key={step.label} className="relative">
            <span
              className={cn(
                "absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold",
                step.status === "done" && "border-success bg-success text-white",
                step.status === "running" &&
                  "border-primary bg-primary-soft text-accent-foreground",
                step.status === "waiting" && "border-border bg-card text-muted-foreground",
              )}
            >
              {step.status === "done" ? "✓" : i + 1}
            </span>
            <p
              className={cn(
                "text-sm font-medium",
                step.status === "waiting" && "text-muted-foreground",
              )}
            >
              {step.label}
              {step.status === "running" ? "..." : ""}
            </p>
            <p
              className={cn(
                "text-xs",
                step.status === "done" && "text-success",
                step.status === "running" && "text-primary",
                step.status === "waiting" && "text-muted-foreground",
              )}
            >
              {step.status === "done"
                ? "Завершено"
                : step.status === "running"
                  ? "Загрузка..."
                  : "Ожидание"}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
