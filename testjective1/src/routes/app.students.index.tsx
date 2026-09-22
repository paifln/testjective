import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui";
import { StudentsTable } from "./app.classes.$classId";
import { students } from "@/lib/data";

export const Route = createFileRoute("/app/students/")({
  head: () => ({
    meta: [
      { title: "Students — EduPilot AI" },
      { name: "description", content: "Every student with overall mastery, key skills and risk status." },
      { property: "og:title", content: "Students — EduPilot AI" },
      { property: "og:description", content: "Spot at-risk students before the next lesson." },
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
        title="Students"
        subtitle={`${students.length} students · Class 8A · click a name to open the profile`}
      />
      <StudentsTable />
    </div>
  );
}
