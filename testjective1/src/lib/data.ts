/**
 * Demo data layer.
 *
 * Shapes mirror the planned Supabase schema (users, classes, students, skills,
 * student_skills, lessons, assessments, questions, student_answers,
 * ai_insights, learning_gaps) so this module can later be swapped for real
 * queries without touching the UI.
 */

export type Status = "On Track" | "Needs Attention" | "At Risk";

export type Skill = { id: string; name: string; subject: string; classMastery: number };

export type Student = {
  id: string;
  name: string;
  classId: string;
  overall: number;
  lastScore: number;
  status: Status;
  skills: Record<string, number>;
};

export type ClassRecord = {
  id: string;
  name: string;
  grade: number;
  subject: string;
  teacher: string;
  unit: string;
  topic: string;
};

export const teacher = { id: "t1", name: "Dana", email: "dana@edupilot.ai", role: "teacher" };

export const classRecord: ClassRecord = {
  id: "8a",
  name: "Class 8A",
  grade: 8,
  subject: "Informatics",
  teacher: "Dana",
  unit: "Unit 3 — Control Flow",
  topic: "Python Loops",
};

export const skills: Skill[] = [
  { id: "variables", name: "Variables", subject: "Informatics", classMastery: 87 },
  { id: "conditions", name: "Conditions", subject: "Informatics", classMastery: 79 },
  { id: "loops", name: "Loops", subject: "Informatics", classMastery: 61 },
  { id: "range", name: "range()", subject: "Informatics", classMastery: 38 },
  { id: "nested", name: "Nested Loops", subject: "Informatics", classMastery: 32 },
];

const roster: Array<[string, number]> = [
  ["Aruzhan Serik", 78],
  ["Dias Nurlan", 65],
  ["Amina Kairat", 91],
  ["Timur Bekzat", 54],
  ["Aliya Zhanar", 84],
  ["Nursultan Adil", 49],
  ["Dana Yerlan", 76],
  ["Miras Talgat", 60],
  ["Aisha Marat", 89],
  ["Bekzat Olzhas", 88],
  ["Zhanel Askar", 87],
  ["Yerkebulan Sain", 86],
  ["Kamila Rustem", 85],
  ["Alibek Daulet", 84],
  ["Sabina Nurzhan", 90],
  ["Arman Kuat", 92],
  ["Madina Alisher", 86],
  ["Ruslan Temir", 72],
  ["Aigerim Sanzhar", 70],
  ["Daniyar Ersin", 68],
  ["Zarina Bauyrzhan", 58],
  ["Olzhas Kanat", 55],
  ["Aknur Zhandos", 62],
  ["Islam Rakhat", 74],
  ["Laura Beibit", 66],
];

const clamp = (n: number) => Math.max(5, Math.min(99, Math.round(n)));

function statusOf(overall: number): Status {
  if (overall >= 75) return "On Track";
  if (overall >= 60) return "Needs Attention";
  return "At Risk";
}

export const students: Student[] = roster.map(([name, base], i) => {
  const offset = (base - 70) * 0.9;
  const skillScores: Record<string, number> = {};
  for (const s of skills) skillScores[s.id] = clamp(s.classMastery + offset);
  return {
    id: `s${i + 1}`,
    name,
    classId: "8a",
    overall: base,
    lastScore: clamp(base + ((i % 5) - 2) * 3),
    status: statusOf(base),
    skills: skillScores,
  };
});

export const studentsStrugglingWithRange = students.filter((s) => s.skills.range < 50);

export const classStats = {
  totalStudents: students.length,
  activeClasses: 3,
  averageMastery: Math.round(students.reduce((a, s) => a + s.overall, 0) / students.length),
  learningGaps: skills.filter((s) => s.classMastery < 50).length,
};

export type Insight = {
  id: string;
  type: "gap" | "progress" | "misconception" | "attention";
  title: string;
  description: string;
  confidence: number;
};

export const insights: Insight[] = [
  {
    id: "i1",
    type: "gap",
    title: "Learning gap detected",
    description: `${studentsStrugglingWithRange.length} of ${students.length} students have difficulty understanding Python range().`,
    confidence: 0.94,
  },
  {
    id: "i2",
    type: "progress",
    title: "Loops mastery increased by 12% this week",
    description: "Practice on basic for-loops is paying off across the class.",
    confidence: 0.81,
  },
  {
    id: "i3",
    type: "misconception",
    title: "Most common misconception",
    description: "Students expect range(n) to include n and to start counting from 1.",
    confidence: 0.9,
  },
  {
    id: "i4",
    type: "attention",
    title: "5 students may need additional practice",
    description: "Nested loops mastery is below 35% for a third of the class.",
    confidence: 0.76,
  },
];

export const recentAssessments = [
  { id: "a1", title: "Quiz — Python Loops", topic: "Loops, range()", date: "Today", average: 68, completed: `${students.length}/${students.length}` },
  { id: "a2", title: "Quiz — Conditions", topic: "if / elif / else", date: "Last week", average: 79, completed: `${students.length}/${students.length}` },
  { id: "a3", title: "Practice — Variables", topic: "Variables & types", date: "2 weeks ago", average: 87, completed: `${students.length}/${students.length}` },
];

export const assessmentResults = {
  title: "Quiz — Python Loops",
  average: 68,
  completed: `${students.length}/${students.length}`,
  questions: [
    { n: 1, text: "What is a for loop used for?", correctRate: 92, skill: "Loops" },
    { n: 2, text: "How many times does `for i in range(4)` run?", correctRate: 71, skill: "Loops" },
    { n: 3, text: "What does range(3) generate?", correctRate: 44, skill: "range()" },
    { n: 4, text: "What prints from a nested loop 2×3?", correctRate: 48, skill: "Nested Loops" },
    { n: 5, text: "Which loop sums 1..N?", correctRate: 63, skill: "Loops" },
  ],
};

export const quizQuestions = [
  {
    n: 1,
    text: "What will the following code print?",
    code: "for i in range(3):\n    print(i)",
    options: ["1 2 3", "0 1 2", "0 1 2 3"],
    correct: 1,
    concept: "range()",
    feedback: "You may be assuming that range(3) starts at 1. In Python it starts at 0.",
  },
  {
    n: 2,
    text: "How many times does this loop run?",
    code: "for i in range(5):\n    print('hi')",
    options: ["4", "5", "6"],
    correct: 1,
    concept: "range()",
    feedback: "range(5) produces 5 values: 0, 1, 2, 3, 4.",
  },
  {
    n: 3,
    text: "What does range(2, 5) generate?",
    code: "print(list(range(2, 5)))",
    options: ["2 3 4", "2 3 4 5", "1 2 3 4"],
    correct: 0,
    concept: "range()",
    feedback: "The stop value is never included — range(2, 5) stops before 5.",
  },
  {
    n: 4,
    text: "What is the last number printed?",
    code: "for i in range(1, 6):\n    print(i)",
    options: ["5", "6", "4"],
    correct: 0,
    concept: "range()",
    feedback: "Counting starts at 1 here, but still stops before 6.",
  },
  {
    n: 5,
    text: "How many lines does this nested loop print?",
    code: "for i in range(2):\n    for j in range(3):\n        print(i, j)",
    options: ["5", "6", "9"],
    correct: 1,
    concept: "Nested Loops",
    feedback: "The inner loop runs fully for each outer step: 2 × 3 = 6.",
  },
];

export const studentMistakes = [
  "Selected 1,2,3 for `range(3)` on the loops quiz",
  "Wrote `for i in range(1, 5)` to print 5 numbers",
  "Confused inner and outer loop order in a nested loop task",
];

export function getStudent(id: string) {
  return students.find((s) => s.id === id);
}

export function skillName(id: string) {
  return skills.find((s) => s.id === id)?.name ?? id;
}
