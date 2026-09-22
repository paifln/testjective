/**
 * Demo data layer.
 *
 * Shapes mirror the planned Supabase schema (users, classes, students, skills,
 * student_skills, lessons, assessments, questions, student_answers,
 * ai_insights, learning_gaps) so this module can later be swapped for real
 * queries without touching the UI.
 */

export type Status = "Всё в порядке" | "Требуется внимание" | "В группе риска";

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

export const teacher = { id: "t1", name: "Дана", email: "dana@edupilot.ai", role: "teacher" };

export const classRecord: ClassRecord = {
  id: "8a",
  name: "Класс 8А",
  grade: 8,
  subject: "Информатика",
  teacher: "Дана",
  unit: "Раздел 3 — управление потоком выполнения",
  topic: "Циклы Python",
};

export const skills: Skill[] = [
  { id: "variables", name: "Переменные", subject: "Информатика", classMastery: 87 },
  { id: "conditions", name: "Условия", subject: "Информатика", classMastery: 79 },
  { id: "loops", name: "Циклы", subject: "Информатика", classMastery: 61 },
  { id: "range", name: "range()", subject: "Информатика", classMastery: 38 },
  { id: "nested", name: "Вложенные циклы", subject: "Информатика", classMastery: 32 },
];

const roster: Array<[string, number]> = [
  ["Аружан Серик", 78],
  ["Диас Нурлан", 65],
  ["Амина Кайрат", 91],
  ["Тимур Бекзат", 54],
  ["Алия Жанар", 84],
  ["Нурсултан Адиль", 49],
  ["Дана Ерлан", 76],
  ["Мирас Талгат", 60],
  ["Айша Марат", 89],
  ["Бекзат Олжас", 88],
  ["Жанель Аскар", 87],
  ["Еркебулан Саин", 86],
  ["Камила Рустем", 85],
  ["Алибек Даулет", 84],
  ["Сабина Нуржан", 90],
  ["Арман Куат", 92],
  ["Мадина Алишер", 86],
  ["Руслан Темир", 72],
  ["Айгерим Санжар", 70],
  ["Данияр Ерсин", 68],
  ["Зарина Бауыржан", 58],
  ["Олжас Канат", 55],
  ["Акнур Жандос", 62],
  ["Ислам Рахат", 74],
  ["Лаура Бейбит", 66],
];

const clamp = (n: number) => Math.max(5, Math.min(99, Math.round(n)));

function statusOf(overall: number): Status {
  if (overall >= 75) return "Всё в порядке";
  if (overall >= 60) return "Требуется внимание";
  return "В группе риска";
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
    title: "Обнаружен пробел в знаниях",
    description: `${studentsStrugglingWithRange.length} из ${students.length} учеников испытывают трудности с пониманием range() в Python.`,
    confidence: 0.94,
  },
  {
    id: "i2",
    type: "progress",
    title: "Освоение циклов выросло на 12% за неделю",
    description: "Практика простых циклов for улучшает результаты всего класса.",
    confidence: 0.81,
  },
  {
    id: "i3",
    type: "misconception",
    title: "Самое частое заблуждение",
    description: "Ученики ожидают, что range(n) включает n и начинает отсчёт с 1.",
    confidence: 0.9,
  },
  {
    id: "i4",
    type: "attention",
    title: "5 ученикам может понадобиться дополнительная практика",
    description: "У трети класса уровень освоения вложенных циклов ниже 35%.",
    confidence: 0.76,
  },
];

export const recentAssessments = [
  {
    id: "a1",
    title: "Тест — циклы Python",
    topic: "Циклы, range()",
    date: "Сегодня",
    average: 68,
    completed: `${students.length}/${students.length}`,
  },
  {
    id: "a2",
    title: "Тест — условия",
    topic: "if / elif / else",
    date: "На прошлой неделе",
    average: 79,
    completed: `${students.length}/${students.length}`,
  },
  {
    id: "a3",
    title: "Практика — переменные",
    topic: "Переменные и типы",
    date: "2 недели назад",
    average: 87,
    completed: `${students.length}/${students.length}`,
  },
];

export const assessmentResults = {
  title: "Тест — циклы Python",
  average: 68,
  completed: `${students.length}/${students.length}`,
  questions: [
    { n: 1, text: "Для чего нужен цикл for?", correctRate: 92, skill: "Циклы" },
    { n: 2, text: "Сколько раз выполнится `for i in range(4)`?", correctRate: 71, skill: "Циклы" },
    { n: 3, text: "Какие значения создаёт range(3)?", correctRate: 44, skill: "range()" },
    { n: 4, text: "Что выведет вложенный цикл 2×3?", correctRate: 48, skill: "Вложенные циклы" },
    { n: 5, text: "Какой цикл вычисляет сумму чисел от 1 до N?", correctRate: 63, skill: "Циклы" },
  ],
};

export const quizQuestions = [
  {
    n: 1,
    text: "Что выведет следующий код?",
    code: "for i in range(3):\n    print(i)",
    options: ["1 2 3", "0 1 2", "0 1 2 3"],
    correct: 1,
    concept: "range()",
    feedback: "Возможно, вы думаете, что range(3) начинается с 1. В Python отсчёт начинается с 0.",
  },
  {
    n: 2,
    text: "Сколько раз выполнится этот цикл?",
    code: "for i in range(5):\n    print('hi')",
    options: ["4", "5", "6"],
    correct: 1,
    concept: "range()",
    feedback: "range(5) создаёт 5 значений: 0, 1, 2, 3, 4.",
  },
  {
    n: 3,
    text: "Какие значения создаёт range(2, 5)?",
    code: "print(list(range(2, 5)))",
    options: ["2 3 4", "2 3 4 5", "1 2 3 4"],
    correct: 0,
    concept: "range()",
    feedback: "Конечное значение не включается: range(2, 5) заканчивается перед 5.",
  },
  {
    n: 4,
    text: "Какое число будет выведено последним?",
    code: "for i in range(1, 6):\n    print(i)",
    options: ["5", "6", "4"],
    correct: 0,
    concept: "range()",
    feedback: "Здесь отсчёт начинается с 1, но по-прежнему заканчивается перед 6.",
  },
  {
    n: 5,
    text: "Сколько строк выведет этот вложенный цикл?",
    code: "for i in range(2):\n    for j in range(3):\n        print(i, j)",
    options: ["5", "6", "9"],
    correct: 1,
    concept: "Вложенные циклы",
    feedback: "Внутренний цикл выполняется полностью на каждом шаге внешнего: 2 × 3 = 6.",
  },
];

export const studentMistakes = [
  "В тесте по циклам выбран ответ 1,2,3 для `range(3)`",
  "Для вывода 5 чисел записано `for i in range(1, 5)`",
  "В задании на вложенные циклы перепутан порядок внутреннего и внешнего циклов",
];

export function getStudent(id: string) {
  return students.find((s) => s.id === id);
}

export function skillName(id: string) {
  return skills.find((s) => s.id === id)?.name ?? id;
}
