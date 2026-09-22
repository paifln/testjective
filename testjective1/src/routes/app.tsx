import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { teacher } from "@/lib/data";
import { InformaticsQuizDialog } from "@/components/InformaticsQuizDialog";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav = [
  { to: "/app", label: "Обзор", icon: "▦", exact: true },
  { to: "/app/classes", label: "Мои классы", icon: "▤" },
  { to: "/app/lessons", label: "Уроки", icon: "✎" },
  { to: "/app/students", label: "Ученики", icon: "☰" },
  { to: "/app/assessments", label: "Тесты", icon: "✓" },
  { to: "/app/analytics", label: "Аналитика", icon: "◫" },
  { to: "/app/agent", label: "ИИ-агент", icon: "✦" },
  { to: "/app/settings", label: "Настройки", icon: "⚙" },
] as const;

function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar px-4 py-6 transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="brand-grad flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground">
            EP
          </span>
          <span className="font-semibold tracking-tight">EduPilot AI</span>
        </Link>

        <nav className="space-y-1">
          {nav.map((item) => {
            const active =
              "exact" in item && item.exact ? path === item.to : path.startsWith(item.to);
            const link = (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-accent-foreground"
                    : "text-sidebar-foreground hover:bg-secondary",
                )}
              >
                <span className="w-4 text-center opacity-70">{item.icon}</span>
                {item.label}
              </Link>
            );
            return item.to === "/app/assessments" ? (
              <InformaticsQuizDialog key={item.to}>{link}</InformaticsQuizDialog>
            ) : (
              link
            );
          })}
        </nav>

        <div className="absolute inset-x-4 bottom-6 rounded-2xl border border-border bg-card p-4">
          <p className="text-sm font-medium">{teacher.name}</p>
          <p className="text-xs text-muted-foreground">Учитель · Информатика</p>
          <Link to="/quiz" className="mt-3 block text-xs font-medium text-accent-foreground">
            Открыть кабинет ученика →
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-5 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border px-3 py-1.5 text-sm"
          >
            ☰
          </button>
          <span className="font-semibold">EduPilot AI</span>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
