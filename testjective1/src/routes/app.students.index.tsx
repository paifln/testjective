import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui";
import { StudentsTable } from "./app.classes.$classId";
import { students } from "@/lib/data";

export const Route = createFileRoute("/app/students/")({
  head: () => ({
    meta: [
      { title: "Ученики — EduPilot AI" },
      {
        name: "description",
        content:
          "Список учеников с общим уровнем освоения, ключевыми навыками и статусом успеваемости.",
      },
      { property: "og:title", content: "Ученики — EduPilot AI" },
      {
        property: "og:description",
        content: "Определите учеников, которым нужна помощь, до следующего урока.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentsPage,
});

function StudentsPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Ученики"
        subtitle={`${students.length} учеников · Класс 8А · нажмите на имя, чтобы открыть профиль`}
      />
      <StudentsTable />
    </div>
  );
}
