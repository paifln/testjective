import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
        variant === "primary" &&
          "brand-grad text-primary-foreground shadow-card hover:brightness-110 active:scale-[0.98]",
        variant === "secondary" &&
          "border border-border bg-card text-foreground hover:bg-secondary",
        variant === "ghost" && "text-muted-foreground hover:bg-secondary hover:text-foreground",
        variant === "danger" && "bg-danger-soft text-danger hover:brightness-95",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "success" | "warning" | "danger" | "brand";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "bg-secondary text-secondary-foreground",
        tone === "success" && "bg-success-soft text-success",
        tone === "warning" && "bg-warning-soft text-warning",
        tone === "danger" && "bg-danger-soft text-danger",
        tone === "brand" && "bg-primary-soft text-accent-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function masteryTone(value: number) {
  if (value >= 75) return "success" as const;
  if (value >= 50) return "warning" as const;
  return "danger" as const;
}

export function MasteryBar({ label, value }: { label: string; value: number }) {
  const tone = masteryTone(value);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          {label}
          {value < 50 ? <span className="text-warning">⚠</span> : null}
        </span>
        <span className="tabular-nums text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            tone === "success" && "bg-success",
            tone === "warning" && "bg-warning",
            tone === "danger" && "bg-danger",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "neutral" | "warning";
}) {
  return (
    <Card className="animate-rise">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-2 text-3xl font-semibold tracking-tight",
          tone === "warning" && "text-warning",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </Card>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-secondary", className)} />;
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-[oklch(0.21_0.03_265)] p-4 text-sm leading-relaxed text-[oklch(0.95_0.01_265)]">
      <code>{code}</code>
    </pre>
  );
}
