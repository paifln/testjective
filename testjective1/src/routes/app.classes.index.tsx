import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge, Button, Card, MasteryBar, SectionTitle } from "@/components/ui";
import { classRecord, classStats, skills, students } from "@/lib/data";

export const Route = createFileRoute("/app/classes/")({
  head: () => ({
    meta: [
      { title: "Мои классы — EduPilot AI" },
      { name: "description", content: "Все ваши классы, текущие темы и уровни освоения." },
      { property: "og:title", content: "Мои классы — EduPilot AI" },
      { property: "og:description", content: "Следите за освоением тем во всех ваших классах." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Classes,
});

const others = [
  { id: "8b", name: "Класс 8Б", subject: "Информатика", topic: "Условия", students: 24, avg: 74 },
  { id: "9a", name: "Класс 9А", subject: "Информатика", topic: "Функции", students: 22, avg: 81 },
];

function Classes() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Мои классы" subtitle={`${classStats.activeClasses} активных класса`} />

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{classRecord.name}</h3>
            <p className="text-sm text-muted-foreground">
              {classRecord.subject} · {students.length} учеников · {classRecord.unit}
            </p>
          </div>
          <Badge tone="brand">Текущая тема: {classRecord.topic}</Badge>
        </div>
        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          {skills.map((s) => (
            <MasteryBar key={s.id} label={s.name} value={s.classMastery} />
          ))}
        </div>
        <div className="mt-5">
          <Link to="/app/classes/$classId" params={{ classId: classRecord.id }}>
            <Button size="sm">Открыть класс</Button>
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
                  {c.subject} · Учеников: {c.students}
                </p>
              </div>
              <Badge>{c.avg}% в среднем</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Текущая тема: {c.topic}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              Подробная аналитика появится после следующего теста.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
