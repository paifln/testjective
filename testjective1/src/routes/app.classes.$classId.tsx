import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, MasteryBar, SectionTitle, Stat } from "@/components/ui";
import { InsightCard } from "@/components/InsightCard";
import { cn } from "@/lib/utils";
import {
  classRecord,
  classStats,
  insights,
  recentAssessments,
  skills,
  students,
  studentsStrugglingWithRange,
} from "@/lib/data";

export const Route = createFileRoute("/app/classes/$classId")({
  head: () => ({
    meta: [
      { title: "Класс 8А — EduPilot AI" },
      { name: "description", content: "Обзор класса 8А: навыки, ученики, тесты и выводы ИИ." },
      { property: "og:title", content: "Класс 8А — EduPilot AI" },
      {
        property: "og:description",
        content: "Освоение навыков, успеваемость учеников и выявленные ИИ пробелы в классе 8А.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClassPage,
});

const tabs = ["Обзор", "Ученики", "Навыки", "Тесты", "Выводы ИИ"] as const;

function ClassPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Обзор");
  const rangePct = Math.round((studentsStrugglingWithRange.length / students.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{classRecord.name}</h1>
          <p className="mt-1.5 text-muted-foreground">
            {classRecord.subject} · {classRecord.unit} · Текущая тема: {classRecord.topic}
          </p>
        </div>
        <Badge tone="warning">2 пробела в знаниях</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Ученики" value={students.length} />
        <Stat label="Средний результат" value={`${classStats.averageMastery}%`} />
        <Stat label="Пробелы в знаниях" value="range(), Вложенные циклы" tone="warning" />
        <Stat label="Последние тесты" value={recentAssessments.length} />
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              tab === t
                ? "bg-primary-soft text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Обзор" ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card>
            <SectionTitle title="Освоение навыков в классе" />
            <div className="space-y-3.5">
              {skills.map((s) => (
                <MasteryBar key={s.id} label={s.name} value={s.classMastery} />
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            <InsightCard
              insight={{
                id: "detected",
                type: "gap",
                title: "ИИ выявил проблему",
                description: `${rangePct}% класса не понимают, как работает range().`,
                confidence: 0.94,
              }}
              actions={
                <Link to="/app/agent">
                  <Button size="sm">Спросить ИИ-агента</Button>
                </Link>
              }
            />
            <InsightCard insight={insights[3]} />
          </div>
        </div>
      ) : null}

      {tab === "Ученики" ? <StudentsTable /> : null}

      {tab === "Навыки" ? (
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((s) => (
            <Card key={s.id}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{s.name}</p>
                {s.classMastery < 50 ? <span className="text-warning">⚠</span> : null}
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{s.classMastery}%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {students.filter((st) => st.skills[s.id] < 50).length} учеников с уровнем ниже 50%
              </p>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "Тесты" ? (
        <Card>
          <SectionTitle title="Последние тесты" />
          <div className="divide-y divide-border">
            {recentAssessments.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.topic} · {a.date} · {a.completed} завершили
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={a.average >= 75 ? "success" : "warning"}>
                    {a.average}% в среднем
                  </Badge>
                  <Link to="/app/assessments/results">
                    <Button size="sm" variant="secondary">
                      Посмотреть результаты
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === "Выводы ИИ" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {insights.map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function StudentsTable() {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            {["Имя", "Общее освоение", "Циклы", "range()", "Последний результат", "Статус"].map(
              (h) => (
                <th key={h} className="px-5 py-3 font-medium">
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {students.map((s) => (
            <tr key={s.id} className="transition-colors hover:bg-secondary/60">
              <td className="px-5 py-3 font-medium">
                <Link
                  to="/app/students/$studentId"
                  params={{ studentId: s.id }}
                  className="hover:text-accent-foreground"
                >
                  {s.name}
                </Link>
              </td>
              <td className="px-5 py-3 tabular-nums">{s.overall}%</td>
              <td className="px-5 py-3 tabular-nums">{s.skills.loops}%</td>
              <td
                className={cn(
                  "px-5 py-3 tabular-nums",
                  s.skills.range < 50 && "font-medium text-danger",
                )}
              >
                {s.skills.range}%
              </td>
              <td className="px-5 py-3 tabular-nums">{s.lastScore}%</td>
              <td className="px-5 py-3">
                <Badge
                  tone={
                    s.status === "Всё в порядке"
                      ? "success"
                      : s.status === "Требуется внимание"
                        ? "warning"
                        : "danger"
                  }
                >
                  {s.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
