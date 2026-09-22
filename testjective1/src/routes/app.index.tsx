import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Badge, Button, Card, MasteryBar, SectionTitle, Stat } from "@/components/ui";
import { InsightCard } from "@/components/InsightCard";
import { AgentTimeline } from "@/components/AgentTimeline";
import { useAgentRun } from "@/components/useAgentRun";
import { ANALYSIS_STEPS, agentSummary } from "@/services/aiAgent";
import { classRecord, classStats, insights, skills, students, teacher } from "@/lib/data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Кабинет учителя — EduPilot AI" },
      {
        name: "description",
        content: "Освоение навыков, пробелы в знаниях и выводы ИИ для ваших классов.",
      },
      { property: "og:title", content: "Кабинет учителя — EduPilot AI" },
      {
        property: "og:description",
        content: "Следите за освоением навыков, пробелами в знаниях и рекомендациями ИИ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const agent = useAgentRun(ANALYSIS_STEPS);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Доброе утро, {teacher.name}</h1>
        <p className="mt-1.5 text-muted-foreground">
          ИИ-агент проанализировал вчерашний тест и подготовил рекомендации на завтра.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Всего учеников" value={classStats.totalStudents} hint="Во всех классах" />
        <Stat
          label="Активные классы"
          value={classStats.activeClasses}
          hint="Информатика, 8-й класс"
        />
        <Stat
          label="Средний уровень освоения"
          value={`${classStats.averageMastery}%`}
          hint="+4% за неделю"
        />
        <Stat
          label="Пробелы в знаниях"
          value={classStats.learningGaps}
          tone="warning"
          hint="range(), Вложенные циклы"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <SectionTitle
            title={classRecord.name}
            subtitle={`${classRecord.subject} · ${students.length} учеников`}
            action={<Badge tone="brand">Текущая тема: {classRecord.topic}</Badge>}
          />
          <div className="space-y-3.5">
            {skills.map((s) => (
              <MasteryBar key={s.id} label={s.name} value={s.classMastery} />
            ))}
          </div>
          <div className="mt-5">
            <Link to="/app/classes/$classId" params={{ classId: classRecord.id }}>
              <Button variant="secondary" size="sm">
                Открыть класс →
              </Button>
            </Link>
          </div>
        </Card>

        <div className="space-y-4">
          <InsightCard
            insight={insights[0]}
            actions={
              <>
                <Button size="sm" disabled={agent.running} onClick={() => agent.start()}>
                  {agent.running ? "Анализ..." : "Проанализировать класс"}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate({ to: "/app/agent" })}
                >
                  Спросить ИИ-агента
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate({ to: "/app/analytics" })}
                >
                  Создать урок для устранения пробелов
                </Button>
              </>
            }
          />
          {agent.steps.length ? (
            <AgentTimeline steps={agent.steps} title="ИИ-агент анализирует класс" />
          ) : null}
          {agent.done ? (
            <Card>
              <p className="text-sm font-semibold">Анализ завершён</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{agentSummary}</p>
            </Card>
          ) : null}
        </div>
      </div>

      <div>
        <SectionTitle title="Другие выводы ИИ" subtitle="На основе последних результатов класса" />
        <div className="grid gap-4 md:grid-cols-3">
          {insights.slice(1).map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
