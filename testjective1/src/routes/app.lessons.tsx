import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, CodeBlock, SectionTitle, Skeleton } from "@/components/ui";
import { AgentTimeline } from "@/components/AgentTimeline";
import { useAgentRun } from "@/components/useAgentRun";
import {
  LESSON_STEPS,
  generateDifferentiatedExercises,
  generateLessonPlan,
  type Exercises,
  type Lesson,
} from "@/services/aiAgent";

export const Route = createFileRoute("/app/lessons")({
  head: () => ({
    meta: [
      { title: "Create Lesson — EduPilot AI" },
      { name: "description", content: "Generate a full lesson plan with differentiated exercises and an exit quiz." },
      { property: "og:title", content: "Create Lesson — EduPilot AI" },
      { property: "og:description", content: "An AI agent builds the lesson from your class's real performance data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LessonGenerator,
});

function LessonGenerator() {
  const agent = useAgentRun(LESSON_STEPS);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exercises, setExercises] = useState<Exercises | null>(null);
  const [topic, setTopic] = useState("Python For Loops");
  const [editing, setEditing] = useState(false);

  const run = () =>
    agent.start(async () => {
      setLesson(await generateLessonPlan(topic));
      setExercises(await generateDifferentiatedExercises());
    });

  const regenLevel = async (level: keyof Exercises) =>
    setExercises(await generateDifferentiatedExercises(level));

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Create Lesson"
        subtitle="The agent uses your class mastery data to shape every section."
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Class" defaultValue="8A" />
          <Field label="Grade" defaultValue="8" />
          <Field label="Subject" defaultValue="Informatics" />
          <Field label="Topic" value={topic} onChange={setTopic} />
          <Field label="Lesson duration" defaultValue="45 minutes" />
          <Select label="Difficulty" options={["Mixed (differentiated)", "Beginner", "Advanced"]} />
          <div className="md:col-span-3">
            <Field
              label="Learning objective"
              defaultValue="Students can predict what range(start, stop) produces."
            />
          </div>
        </div>
        <div className="mt-5">
          <Button disabled={agent.running} onClick={run}>
            {agent.running ? "Generating..." : "Generate Lesson with AI"}
          </Button>
        </div>
      </Card>

      {agent.steps.length ? (
        <AgentTimeline steps={agent.steps} title="AI agent generating your lesson" />
      ) : null}

      {agent.running && !lesson ? (
        <Card>
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </Card>
      ) : null}

      {lesson && agent.done ? (
        <>
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Badge tone="brand">Lesson prepared</Badge>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{lesson.title}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{lesson.objective}</p>
              </div>
              <Badge>{lesson.duration}</Badge>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="mb-2 text-sm font-semibold">Required materials</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {lesson.materials.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">Lesson structure</p>
                <ol className="relative space-y-3 border-l border-border pl-5">
                  {lesson.structure.map((s) => (
                    <li key={s.time}>
                      <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p className="text-sm font-medium">
                        <span className="text-muted-foreground">{s.time}</span> — {s.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{s.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => setEditing((v) => !v)}>
                {editing ? "Done editing" : "Edit Lesson"}
              </Button>
              <Button size="sm" variant="secondary" disabled={agent.running} onClick={run}>
                Regenerate
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => regenLevel("intermediate")}
              >
                Generate Exercises
              </Button>
              <Link to="/app/assessments">
                <Button size="sm" variant="secondary">
                  Generate Quiz
                </Button>
              </Link>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.print()}
              >
                Export
              </Button>
            </div>

            {editing ? (
              <textarea
                className="mt-4 h-40 w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                defaultValue={lesson.structure.map((s) => `${s.time} ${s.label}: ${s.detail}`).join("\n")}
              />
            ) : null}
          </Card>

          {exercises ? (
            <div className="grid gap-4 lg:grid-cols-3">
              {(["beginner", "intermediate", "advanced"] as const).map((level) => (
                <Card key={level}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold capitalize">{level}</p>
                    <Button size="sm" variant="ghost" onClick={() => regenLevel(level)}>
                      Regenerate
                    </Button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {exercises[level].map((task) => {
                      const [text, ...codeLines] = task.split("\n\n");
                      return (
                        <div key={task} className="rounded-xl bg-secondary/60 p-3">
                          <p className="text-sm">{text}</p>
                          {codeLines.length ? <div className="mt-2"><CodeBlock code={codeLines.join("\n\n")} /></div> : null}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function Field({
  label,
  defaultValue,
  value,
  onChange,
}: {
  label: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        defaultValue={defaultValue}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
