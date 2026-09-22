import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — EduPilot AI" },
      { name: "description", content: "Sign in or create a teacher or student account on EduPilot AI." },
      { property: "og:title", content: "Sign in — EduPilot AI" },
      { property: "og:description", content: "Access your AI teaching agent and class analytics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"teacher" | "student">("teacher");

  return (
    <div className="surface-grad flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="brand-grad flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground">
            EP
          </span>
          <span className="text-lg font-semibold tracking-tight">EduPilot AI</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-lg py-2 text-sm font-medium transition-colors",
                  mode === m ? "bg-card shadow-card" : "text-muted-foreground",
                )}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: role === "teacher" ? "/app" : "/quiz" });
            }}
          >
            {mode === "signup" ? <Field label="Full name" placeholder="Dana Yerlan" /> : null}
            <Field label="Email" type="email" placeholder="dana@school.kz" />
            <Field label="Password" type="password" placeholder="••••••••" />

            <div>
              <p className="mb-2 text-sm font-medium">I am a</p>
              <div className="grid grid-cols-2 gap-2">
                {(["teacher", "student"] as const).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-colors",
                      role === r
                        ? "border-primary bg-primary-soft text-accent-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full" type="submit">
              {mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> demo access
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2">
            <Button variant="secondary" className="w-full" onClick={() => navigate({ to: "/app" })}>
              Continue as Demo Teacher
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => navigate({ to: "/quiz" })}>
              Continue as Demo Student
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo teacher opens pre-filled Class 8A · Informatics
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}
