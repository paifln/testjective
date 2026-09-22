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
      { title: "Teacher Dashboard — EduPilot AI" },
      { name: "description", content: "Class mastery, learning gaps and AI insights for your classes." },
      { property: "og:title", content: "Teacher Dashboard — EduPilot AI" },
      { property: "og:description", content: "See mastery, gaps and what your AI agent recommends next." },
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
        <h1 className="text-3xl font-semibold tracking-tight">Good morning, {teacher.name}</h1>
        <p className="mt-1.5 text-muted-foreground">
          Your AI agent reviewed yesterday's quiz and has a recommendation for tomorrow.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total Students" value={classStats.totalStudents} hint="Across all classes" />
        <Stat label="Active Classes" value={classStats.activeClasses} hint="Informatics, Grade 8" />
        <Stat label="Average Mastery" value={`${classStats.averageMastery}%`} hint="+4% this week" />
        <Stat label="Learning Gaps" value={classStats.learningGaps} tone="warning" hint="range(), Nested Loops" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <SectionTitle
            title={classRecord.name}
            subtitle={`${classRecord.subject} · ${students.length} students`}
            action={<Badge tone="brand">Current topic: {classRecord.topic}</Badge>}
          />
          <div className="space-y-3.5">
            {skills.map((s) => (
              <MasteryBar key={s.id} label={s.name} value={s.classMastery} />
            ))}
          </div>
          <div className="mt-5">
            <Link to="/app/classes/$classId" params={{ classId: classRecord.id }}>
              <Button variant="secondary" size="sm">
                Open class →
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
                  {agent.running ? "Analyzing..." : "Analyze Class"}
                </Button>
                <Button size="sm" variant="secondary" onClick={() => navigate({ to: "/app/agent" })}>
                  Ask AI Agent
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate({ to: "/app/analytics" })}
                >
                  Generate Intervention
                </Button>
              </>
            }
          />
          {agent.steps.length ? (
            <AgentTimeline steps={agent.steps} title="AI agent running class analysis" />
          ) : null}
          {agent.done ? (
            <Card>
              <p className="text-sm font-semibold">Analysis complete</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{agentSummary}</p>
            </Card>
          ) : null}
        </div>
      </div>

      <div>
        <SectionTitle title="More AI insights" subtitle="Generated from the latest class activity" />
        <div className="grid gap-4 md:grid-cols-3">
          {insights.slice(1).map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
