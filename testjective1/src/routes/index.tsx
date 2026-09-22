import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduPilot AI — Your AI Teaching Agent" },
      {
        name: "description",
        content:
          "EduPilot AI plans lessons, assesses students, detects learning gaps and adapts what you teach next.",
      },
      { property: "og:title", content: "EduPilot AI — Your AI Teaching Agent" },
      {
        property: "og:description",
        content:
          "An AI teaching agent that plans, assesses, understands and adapts for every class.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { name: "Plan", text: "Generate lessons aligned with student needs." },
  { name: "Assess", text: "Create and evaluate assessments." },
  { name: "Understand", text: "Detect misconceptions and learning gaps." },
  { name: "Adapt", text: "Automatically create personalized follow-up instruction." },
];

const cycle = ["PLAN", "TEACH", "ASSESS", "UNDERSTAND", "ADAPT"];

function Landing() {
  return (
    <div className="surface-grad min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="brand-grad flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground">
            EP
          </span>
          <span className="text-lg font-semibold tracking-tight">EduPilot AI</span>
        </div>
        <nav className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/app">
            <Button>Try Demo</Button>
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="animate-rise py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            AI Teaching Agent that plans, assesses, understands and adapts.
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
            Your AI Teaching Agent
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Plan lessons, understand your students and automatically adapt what you teach next.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/app">
              <Button>Try Demo</Button>
            </Link>
            <Link to="/auth">
              <Button variant="secondary">Sign In</Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.name}
              className="animate-rise rounded-2xl border border-border bg-card p-6 shadow-card"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="brand-grad inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{f.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-border bg-card p-8 shadow-card">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            The teaching cycle EduPilot runs for you
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {cycle.map((c, i) => (
              <div key={c} className="flex items-center gap-3">
                <span className="rounded-xl bg-primary-soft px-4 py-2 text-sm font-semibold text-accent-foreground">
                  {c}
                </span>
                <span className="text-muted-foreground">
                  {i === cycle.length - 1 ? "↺" : "→"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
