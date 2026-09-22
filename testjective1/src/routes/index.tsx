import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui";
import { LoginDialog } from "@/components/LoginDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduPilot AI — Ваш ИИ-помощник учителя" },
      {
        name: "description",
        content:
          "EduPilot AI планирует уроки, оценивает знания учеников, выявляет пробелы и адаптирует дальнейшее обучение.",
      },
      { property: "og:title", content: "EduPilot AI — Ваш ИИ-помощник учителя" },
      {
        property: "og:description",
        content:
          "ИИ-помощник учителя, который планирует, оценивает, анализирует и адаптирует обучение для каждого класса.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { name: "Планировать", text: "Создавайте уроки с учётом потребностей учеников." },
  { name: "Оценивать", text: "Создавайте тесты и оценивайте результаты." },
  { name: "Анализировать", text: "Выявляйте ошибочные представления и пробелы в знаниях." },
  {
    name: "Адаптировать",
    text: "Автоматически готовьте индивидуальные материалы для дальнейшего обучения.",
  },
];

const cycle = ["ПЛАНИРОВАНИЕ", "ОБУЧЕНИЕ", "ОЦЕНКА", "АНАЛИЗ", "АДАПТАЦИЯ"];

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
          <LoginDialog variant="ghost" />
          <Link to="/app">
            <Button>Попробовать демо</Button>
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="animate-rise py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            ИИ-помощник учителя: планирует, оценивает, анализирует и адаптирует.
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
            Серикбол Питер ПАРКЕР
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Планируйте уроки, понимайте трудности учеников и автоматически адаптируйте дальнейшее
            обучение.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/app">
              <Button>Попробовать демо</Button>
            </Link>
            <LoginDialog />
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
            Учебный цикл с EduPilot
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {cycle.map((c, i) => (
              <div key={c} className="flex items-center gap-3">
                <span className="rounded-xl bg-primary-soft px-4 py-2 text-sm font-semibold text-accent-foreground">
                  {c}
                </span>
                <span className="text-muted-foreground">{i === cycle.length - 1 ? "↺" : "→"}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
