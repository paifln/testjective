import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, SectionTitle } from "@/components/ui";
import { AgentTimeline } from "@/components/AgentTimeline";
import { useAgentRun } from "@/components/useAgentRun";
import { ASSESSMENT_STEPS, generateAssessment, type QuizQuestion } from "@/services/aiAgent";
import { recentAssessments } from "@/lib/data";

export const Route = createFileRoute("/app/assessments/")({
  head: () => ({
    meta: [
      { title: "Создать тест — EduPilot AI" },
      {
        name: "description",
        content: "Создавайте тесты с выбором ответа, заданиями на код и краткими ответами.",
      },
      { property: "og:title", content: "Создать тест — EduPilot AI" },
      {
        property: "og:description",
        content: "Создавайте и публикуйте тесты с привязкой вопросов к навыкам.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentGenerator,
});

const types = ["Выбор ответа", "Краткий ответ", "Задание на код", "Верно / неверно"];

function AssessmentGenerator() {
  const agent = useAgentRun(ASSESSMENT_STEPS);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [count, setCount] = useState(5);
  const [selected, setSelected] = useState<string[]>(types.slice(0, 2));
  const [published, setPublished] = useState(false);

  const run = () =>
    agent.start(async () => {
      setPublished(false);
      setQuestions(await generateAssessment(count));
    });

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Создать тест"
        subtitle="Вопросы связаны с навыками, поэтому результаты сразу попадают в аналитику."
        action={
          <Link to="/app/assessments/results">
            <Button variant="secondary" size="sm">
              Последние результаты
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Класс</span>
            <select className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm">
              <option>8А</option>
              <option>8Б</option>
              <option>9А</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Тема</span>
            <input
              defaultValue="Циклы Python"
              className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Количество вопросов</span>
            <input
              type="number"
              min={1}
              max={6}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Сложность</span>
            <select className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm">
              <option>Смешанная</option>
              <option>Лёгкая</option>
              <option>Сложная</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Типы вопросов</p>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => {
              const on = selected.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => setSelected((s) => (on ? s.filter((x) => x !== t) : [...s, t]))}
                  className={
                    on
                      ? "rounded-xl border border-primary bg-primary-soft px-3 py-1.5 text-xs font-medium text-accent-foreground"
                      : "rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary"
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <Button disabled={agent.running} onClick={run}>
            {agent.running ? "Создание..." : "Создать тест"}
          </Button>
        </div>
      </Card>

      {agent.steps.length ? (
        <AgentTimeline steps={agent.steps} title="ИИ-агент составляет тест" />
      ) : null}

      {questions && agent.done ? (
        <Card>
          <SectionTitle
            title="Тест — циклы Python"
            subtitle={`Количество вопросов: ${questions.length}`}
            action={
              published ? (
                <Badge tone="success">Опубликовано для класса 8А</Badge>
              ) : (
                <Button size="sm" onClick={() => setPublished(true)}>
                  Опубликовать тест
                </Button>
              )
            }
          />
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={q.text} className="rounded-xl border border-border p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium">
                    {i + 1}. {q.text}
                  </p>
                  <div className="flex gap-2">
                    <Badge>{q.type}</Badge>
                    <Badge tone="brand">{q.skill}</Badge>
                  </div>
                </div>
                {q.options ? (
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {q.options.map((o, oi) => (
                      <li key={o}>
                        {String.fromCharCode(65 + oi)}: {o}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-3 text-sm">
                  <span className="font-medium text-success">Правильный ответ:</span> {q.answer}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="ghost">
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuestions((qs) => qs!.filter((x) => x.text !== q.text))}
                  >
                    Удалить
                  </Button>
                  <Button size="sm" variant="ghost" onClick={run}>
                    Создать заново
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                const extra = await generateAssessment(6);
                setQuestions((qs) => [...qs!, extra[extra.length - 1]]);
              }}
            >
              Добавить вопрос
            </Button>
          </div>
        </Card>
      ) : null}

      <Card>
        <SectionTitle title="Последние тесты" />
        <div className="divide-y divide-border">
          {recentAssessments.map((a) => (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
            >
              <span>
                {a.title} <span className="text-muted-foreground">· {a.date}</span>
              </span>
              <div className="flex items-center gap-3">
                <Badge tone={a.average >= 75 ? "success" : "warning"}>{a.average}% в среднем</Badge>
                <Link
                  to="/app/assessments/results"
                  className="text-xs font-medium text-accent-foreground"
                >
                  Результаты →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
