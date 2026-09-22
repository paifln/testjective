import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, EmptyState, MasteryBar, SectionTitle, Stat } from "@/components/ui";
import { InsightCard } from "@/components/InsightCard";
import { AgentTimeline } from "@/components/AgentTimeline";
import { useAgentRun } from "@/components/useAgentRun";
import { INTERVENTION_STEPS, generateStudentLearningPlan } from "@/services/aiAgent";
import { getStudent, recentAssessments, skills, studentMistakes } from "@/lib/data";

export const Route = createFileRoute("/app/students/$studentId")({
  head: () => ({
    meta: [
      { title: "Профиль ученика — EduPilot AI" },
      {
        name: "description",
        content: "Освоение навыков, последние ошибки и рекомендации ИИ для ученика.",
      },
      { property: "og:title", content: "Профиль ученика — EduPilot AI" },
      {
        property: "og:description",
        content: "Узнайте, что вызывает трудности у ученика и как ему помочь.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentProfile,
});

function StudentProfile() {
  const { studentId } = useParams({ from: "/app/students/$studentId" });
  const student = getStudent(studentId);
  const agent = useAgentRun(INTERVENTION_STEPS);
  const [plan, setPlan] = useState<{ title: string; steps: string[] } | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  if (!student) {
    return <EmptyState title="Ученик не найден" hint="Выберите ученика из списка класса." />;
  }

  const firstName = student.name.split(" ")[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/app/students" className="text-sm text-muted-foreground hover:text-foreground">
            ← Все ученики
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{student.name}</h1>
          <p className="mt-1 text-muted-foreground">Класс 8А · Информатика</p>
        </div>
        <Badge
          tone={
            student.status === "Всё в порядке"
              ? "success"
              : student.status === "Требуется внимание"
                ? "warning"
                : "danger"
          }
        >
          {student.status}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Общее освоение" value={`${student.overall}%`} />
        <Stat label="Последний результат" value={`${student.lastScore}%`} />
        <Stat
          label="Навык с наименьшим освоением"
          value={`range() ${student.skills.range}%`}
          tone="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <SectionTitle title="Освоение навыков" />
          <div className="space-y-3.5">
            {skills.map((s) => (
              <MasteryBar key={s.id} label={s.name} value={student.skills[s.id]} />
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle title="Последние ошибки" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              {studentMistakes.map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="text-danger">•</span>
                  {m}
                </li>
              ))}
            </ul>
          </Card>

          <InsightCard
            insight={{
              id: "rec",
              type: "misconception",
              title: "Типичная ошибка и рекомендация",
              description: `${firstName} пока не понимает, что range(5) в Python начинается с 0 и не включает 5. Перед изучением вложенных циклов повторите правило границ на числовой прямой.`,
              confidence: 0.91,
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button disabled={agent.running} onClick={() => agent.start()}>
          {agent.running ? "Создание..." : "Создать практику"}
        </Button>
        <Button
          variant="secondary"
          disabled={agent.running}
          onClick={() =>
            agent.start(async () => setPlan(await generateStudentLearningPlan(firstName)))
          }
        >
          Создать индивидуальный учебный план
        </Button>
        <Button variant="secondary" onClick={() => setShowHistory((v) => !v)}>
          История тестов
        </Button>
      </div>

      {agent.steps.length ? (
        <AgentTimeline steps={agent.steps} title="ИИ-агент готовит индивидуальные материалы" />
      ) : null}

      {plan && agent.done ? (
        <Card>
          <SectionTitle title={plan.title} subtitle="Подготовлено ИИ-помощником учителя" />
          <ol className="space-y-2 text-sm">
            {plan.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="font-semibold text-accent-foreground">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </Card>
      ) : null}

      {showHistory ? (
        <Card>
          <SectionTitle title="История тестов" />
          <div className="divide-y divide-border">
            {recentAssessments.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 text-sm">
                <span>
                  {a.title} <span className="text-muted-foreground">· {a.date}</span>
                </span>
                <Badge tone={student.overall >= 75 ? "success" : "warning"}>
                  {Math.max(20, Math.min(99, student.overall + (a.average - 70)))}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
