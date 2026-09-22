import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge, Button, Card, MasteryBar, SectionTitle } from "@/components/ui";
import { classRecord, classStats, skills, students } from "@/lib/data";

export const Route = createFileRoute("/app/classes/")({
  head: () => ({
    meta: [
      { title: "My Classes — EduPilot AI" },
      { name: "description", content: "All your classes, their current topics and mastery levels." },
      { property: "og:title", content: "My Classes — EduPilot AI" },
      { property: "og:description", content: "Track topic mastery across every class you teach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Classes,
});

const others = [
  { id: "8b", name: "Class 8B", subject: "Informatics", topic: "Conditions", students: 24, avg: 74 },
  { id: "9a", name: "Class 9A", subject: "Informatics", topic: "Functions", students: 22, avg: 81 },
];

function Classes() {
  return (
    <div className="space-y-6">
      <SectionTitle title="My Classes" subtitle={`${classStats.activeClasses} active classes`} />

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{classRecord.name}</h3>
            <p className="text-sm text-muted-foreground">
              {classRecord.subject} · {students.length} students · {classRecord.unit}
            </p>
          </div>
          <Badge tone="brand">Current topic: {classRecord.topic}</Badge>
        </div>
        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          {skills.map((s) => (
            <MasteryBar key={s.id} label={s.name} value={s.classMastery} />
          ))}
        </div>
        <div className="mt-5">
          <Link to="/app/classes/$classId" params={{ classId: classRecord.id }}>
            <Button size="sm">Open class</Button>
          </Link>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {others.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.subject} · {c.students} students
                </p>
              </div>
              <Badge>{c.avg}% avg</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Current topic: {c.topic}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              Detailed analytics available after the next assessment.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
