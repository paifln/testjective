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
      { title: "Class 8A — EduPilot AI" },
      { name: "description", content: "Class 8A overview: skills, students, assessments and AI insights." },
      { property: "og:title", content: "Class 8A — EduPilot AI" },
      { property: "og:description", content: "Skill mastery, student statuses and AI-detected gaps for Class 8A." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClassPage,
});

const tabs = ["Overview", "Students", "Skills", "Assessments", "AI Insights"] as const;

function ClassPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const rangePct = Math.round((studentsStrugglingWithRange.length / students.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{classRecord.name}</h1>
          <p className="mt-1.5 text-muted-foreground">
            {classRecord.subject} · {classRecord.unit} · Current topic: {classRecord.topic}
          </p>
        </div>
        <Badge tone="warning">2 learning gaps</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Students" value={students.length} />
        <Stat label="Average Score" value={`${classStats.averageMastery}%`} />
        <Stat label="Learning Gaps" value="range(), Nested Loops" tone="warning" />
        <Stat label="Recent Assessments" value={recentAssessments.length} />
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              tab === t ? "bg-primary-soft text-accent-foreground" : "text-muted-foreground hover:bg-secondary",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card>
            <SectionTitle title="Class mastery overview" />
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
                title: "AI detected problem",
                description: `${rangePct}% of the class misunderstand how range() works.`,
                confidence: 0.94,
              }}
              actions={
                <Link to="/app/agent">
                  <Button size="sm">Ask AI Agent</Button>
                </Link>
              }
            />
            <InsightCard insight={insights[3]} />
          </div>
        </div>
      ) : null}

      {tab === "Students" ? <StudentsTable /> : null}

      {tab === "Skills" ? (
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((s) => (
            <Card key={s.id}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{s.name}</p>
                {s.classMastery < 50 ? <span className="text-warning">⚠</span> : null}
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{s.classMastery}%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {students.filter((st) => st.skills[s.id] < 50).length} students below 50%
              </p>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "Assessments" ? (
        <Card>
          <SectionTitle title="Recent assessments" />
          <div className="divide-y divide-border">
            {recentAssessments.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.topic} · {a.date} · {a.completed} completed
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={a.average >= 75 ? "success" : "warning"}>{a.average}% avg</Badge>
                  <Link to="/app/assessments/results">
                    <Button size="sm" variant="secondary">
                      View results
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === "AI Insights" ? (
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
            {["Name", "Overall Mastery", "Loops", "range()", "Last Score", "Status"].map((h) => (
              <th key={h} className="px-5 py-3 font-medium">
                {h}
              </th>
            ))}
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
                    s.status === "On Track"
                      ? "success"
                      : s.status === "Needs Attention"
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
