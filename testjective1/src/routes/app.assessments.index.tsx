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
      { title: "Create Assessment — EduPilot AI" },
      { name: "description", content: "Generate quizzes with multiple choice, code and short answer questions." },
      { property: "og:title", content: "Create Assessment — EduPilot AI" },
      { property: "og:description", content: "Build and publish an assessment in seconds, mapped to skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentGenerator,
});

const types = ["Multiple Choice", "Short Answer", "Code Question", "True / False"];

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
        title="Create Assessment"
        subtitle="Questions are mapped to skills so results feed straight into analytics."
        action={
          <Link to="/app/assessments/results">
            <Button variant="secondary" size="sm">
              View latest results
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Class</span>
            <select className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm">
              <option>8A</option>
              <option>8B</option>
              <option>9A</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Topic</span>
            <input
              defaultValue="Python Loops"
              className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Number of questions</span>
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
            <span className="mb-1.5 block text-sm font-medium">Difficulty</span>
            <select className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm">
              <option>Mixed</option>
              <option>Easy</option>
              <option>Hard</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Question types</p>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => {
              const on = selected.includes(t);
              return (
                <button
                  key={t}
                  onClick={() =>
                    setSelected((s) => (on ? s.filter((x) => x !== t) : [...s, t]))
                  }
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
            {agent.running ? "Generating..." : "Generate Assessment"}
          </Button>
        </div>
      </Card>

      {agent.steps.length ? (
        <AgentTimeline steps={agent.steps} title="AI agent writing your assessment" />
      ) : null}

      {questions && agent.done ? (
        <Card>
          <SectionTitle
            title="Assessment — Python Loops"
            subtitle={`${questions.length} questions`}
            action={
              published ? (
                <Badge tone="success">Published to Class 8A</Badge>
              ) : (
                <Button size="sm" onClick={() => setPublished(true)}>
                  Publish Assessment
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
                  <span className="font-medium text-success">Correct answer:</span> {q.answer}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuestions((qs) => qs!.filter((x) => x.text !== q.text))}
                  >
                    Delete
                  </Button>
                  <Button size="sm" variant="ghost" onClick={run}>
                    Regenerate
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
              Add Question
            </Button>
          </div>
        </Card>
      ) : null}

      <Card>
        <SectionTitle title="Recent assessments" />
        <div className="divide-y divide-border">
          {recentAssessments.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
              <span>
                {a.title} <span className="text-muted-foreground">· {a.date}</span>
              </span>
              <div className="flex items-center gap-3">
                <Badge tone={a.average >= 75 ? "success" : "warning"}>{a.average}% avg</Badge>
                <Link to="/app/assessments/results" className="text-xs font-medium text-accent-foreground">
                  Results →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
