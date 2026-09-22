/**
 * AI agent service layer.
 *
 * Every function here is a mock that mimics the shape of a future
 * server-side OpenAI agent call. When real integration lands, each function
 * should call a server function (createServerFn) that talks to the model —
 * no API keys ever reach the browser.
 */

import {
  classRecord,
  insights,
  skills,
  students,
  studentsStrugglingWithRange,
  assessmentResults,
  getStudent,
} from "@/lib/data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ---------------------------------- steps --------------------------------- */

export type StepStatus = "waiting" | "running" | "done";
export type AgentStep = { label: string; status: StepStatus };

export const LESSON_STEPS = [
  "Анализ успеваемости класса",
  "Выявление пробелов в знаниях",
  "Изучение целей учебной программы",
  "Создание структуры урока",
  "Создание заданий разного уровня",
  "Создание итогового теста",
];

export const INTERVENTION_STEPS = [
  "Анализ ошибочного представления",
  "Подготовка объяснения",
  "Создание практических упражнений",
  "Создание мини-теста",
];

export const ASSESSMENT_STEPS = [
  "Изучение темы и целей",
  "Выбор типов вопросов",
  "Составление вопросов",
  "Привязка навыков и правильных ответов",
];

export const ANALYSIS_STEPS = [
  "Получение данных класса",
  "Получение результатов учеников",
  "Выявление пробелов в знаниях",
  "Проверка требований учебной программы",
  "Выбор следующего шага обучения",
];

export function initialSteps(labels: string[]): AgentStep[] {
  return labels.map((label) => ({ label, status: "waiting" as StepStatus }));
}

/** Runs the labels sequentially, reporting step state after each transition. */
export async function runSteps(
  labels: string[],
  onUpdate: (steps: AgentStep[]) => void,
  pace = 750,
) {
  const steps = initialSteps(labels);
  for (let i = 0; i < steps.length; i++) {
    steps[i].status = "running";
    onUpdate([...steps.map((s) => ({ ...s }))]);
    await delay(pace);
    steps[i].status = "done";
    onUpdate([...steps.map((s) => ({ ...s }))]);
    await delay(120);
  }
}

/* ----------------------------- data retrieval ----------------------------- */

export const getClassResults = async () => ({ class: classRecord, assessment: assessmentResults });
export const getStudentProfile = async (id: string) => getStudent(id);
export const getSkillMastery = async () => skills;
export const getCurriculum = async () => ({
  unit: classRecord.unit,
  objectives: [
    "Использовать циклы for для повторения действий заданное число раз",
    "Объяснять, как range(start, stop) создаёт значения",
    "Сочетать циклы с условиями для решения задач",
  ],
});

export const analyzeLearningGaps = async () => [
  {
    skill: "range()",
    mastery: 38,
    affected: studentsStrugglingWithRange.length,
    total: students.length,
  },
  { skill: "Вложенные циклы", mastery: 32, affected: 12, total: students.length },
];

/* --------------------------------- outputs -------------------------------- */

export type Lesson = {
  title: string;
  objective: string;
  duration: string;
  materials: string[];
  structure: { time: string; label: string; detail: string }[];
};

export const generateLessonPlan = async (topic = "Циклы for в Python"): Promise<Lesson> => ({
  title: `${topic} — Изучаем range() перед вложенными циклами`,
  objective:
    "Ученики умеют точно определять значения range(start, stop) и использовать цикл for для повторения действия заданное число раз.",
  duration: "45 минут",
  materials: [
    "Проектор / редактор для демонстрации кода",
    "Распечатанный рабочий лист",
    "Итоговый тест (5 вопросов)",
  ],
  structure: [
    {
      time: "0–5 мин",
      label: "Разминка",
      detail:
        "Быстрый опрос: какие значения создаёт range(5)? Покажите распределение ответов во вчерашнем тесте.",
    },
    {
      time: "5–12 мин",
      label: "Объяснение понятия",
      detail:
        "Покажите range() на числовой прямой: начинается с 0, заканчивается перед конечным значением.",
    },
    {
      time: "12–20 мин",
      label: "Демонстрация кода учителем",
      detail: "Разберите вместе три цикла, выводя значение переменной на каждом шаге.",
    },
    {
      time: "20–32 мин",
      label: "Практика учеников",
      detail: "Рабочий лист с заданиями начального, среднего и продвинутого уровней.",
    },
    {
      time: "32–40 мин",
      label: "Задание повышенной сложности",
      detail: "Сумма чисел от 1 до N с использованием переменной-накопителя.",
    },
    { time: "40–45 мин", label: "Итоговый тест", detail: "5 вопросов о границах range()." },
  ],
});

export type Exercises = { beginner: string[]; intermediate: string[]; advanced: string[] };

export const generateDifferentiatedExercises = async (
  level?: keyof Exercises,
): Promise<Exercises> => {
  const pools: Record<keyof Exercises, string[][]> = {
    beginner: [
      [
        "Какие числа выведет этот код?\n\nfor i in range(5):\n    print(i)",
        "Заполните пропуск: выведите числа от 0 до 3 с помощью range(__).",
      ],
      [
        "Какие числа выведет этот код?\n\nfor i in range(4):\n    print(i)",
        "Верно или неверно: range(3) включает 3.",
      ],
    ],
    intermediate: [
      [
        "Напишите программу, которая выводит числа от 1 до 10 с помощью цикла for.",
        "Выведите только чётные числа от 0 до 20.",
      ],
      [
        "Выведите числа от 10 до 1 в обратном порядке с помощью range().",
        "Выведите каждое третье число от 0 до 30.",
      ],
    ],
    advanced: [
      [
        "Напишите программу, которая вычисляет сумму чисел от 1 до N с помощью цикла for.",
        "Выведите таблицу умножения 3×3 с помощью вложенных циклов.",
      ],
      [
        "Вычислите факториал N с помощью цикла for.",
        "Выведите прямоугольный треугольник из звёздочек высотой N.",
      ],
    ],
  };
  const pick = (k: keyof Exercises) => pools[k][level === k ? 1 : 0];
  return {
    beginner: pick("beginner"),
    intermediate: pick("intermediate"),
    advanced: pick("advanced"),
  };
};

export type QuizQuestion = {
  text: string;
  type: "Выбор ответа" | "Краткий ответ" | "Задание на код" | "Верно / неверно";
  options?: string[];
  answer: string;
  skill: string;
};

export const generateAssessment = async (count = 5): Promise<QuizQuestion[]> => {
  const bank: QuizQuestion[] = [
    {
      text: "Какие значения создаёт range(3)?",
      type: "Выбор ответа",
      options: ["1,2,3", "0,1,2", "0,1,2,3"],
      answer: "B — 0,1,2",
      skill: "range()",
    },
    {
      text: "Сколько раз повторится `for i in range(6)`?",
      type: "Выбор ответа",
      options: ["5", "6", "7"],
      answer: "B — 6",
      skill: "Циклы",
    },
    {
      text: "range(2, 6) включает число 6.",
      type: "Верно / неверно",
      answer: "Неверно",
      skill: "range()",
    },
    {
      text: "Напишите цикл, который выводит числа от 1 до 5.",
      type: "Задание на код",
      answer: "for i in range(1, 6): print(i)",
      skill: "Циклы",
    },
    {
      text: "Объясните своими словами, с какого значения range() начинает отсчёт.",
      type: "Краткий ответ",
      answer: "С 0, если начальное значение не задано.",
      skill: "range()",
    },
    {
      text: "Сколько строк выведет вложенный цикл 2×3?",
      type: "Выбор ответа",
      options: ["5", "6", "9"],
      answer: "B — 6",
      skill: "Вложенные циклы",
    },
  ];
  return bank.slice(0, count);
};

export const gradeStudentAnswer = async (correct: boolean, feedback: string) => ({
  correct,
  title: correct ? "Верно!" : "Не совсем.",
  explanation: correct ? "Вы правильно разобрали все шаги цикла." : feedback,
});

export const detectMisconception = async () => ({
  concept: "range()",
  statement: "Ученики считают, что range(n) начинается с 1 и включает n.",
  evidence: `${studentsStrugglingWithRange.length} учеников выбрали 1,2,3 вместо 0,1,2 в вопросе 3.`,
  confidence: 0.94,
});

export const updateStudentMastery = async (studentId: string, skillId: string, delta: number) => ({
  studentId,
  skillId,
  delta,
});

export const generateStudentLearningPlan = async (name: string) => ({
  title: `Индивидуальный учебный план — ${name}`,
  steps: [
    "5 минут повторения range() на числовой прямой",
    "3 упражнения на пошаговый разбор кода с выводом результата и подсказками",
    "2 небольших задания на код с использованием range(start, stop)",
    "Мини-тест для закрепления правила границ",
  ],
});

export const generateClassInsight = async () => insights[0];

export const generateInterventionLesson = async () => ({
  title: "Урок для устранения пробелов — границы range()",
  goal: "Устранить ошибочное понимание range() в Python.",
  duration: "10 минут",
  content: [
    {
      label: "Наглядное объяснение",
      detail: "Покажите числовую прямую от 0 и подчеркните, что конечное значение не включается.",
    },
    { label: "Пример учителя", detail: "Разберите range(5) и range(1, 5) рядом на доске." },
    {
      label: "Упражнение с подсказками",
      detail: "Класс определяет результат четырёх вызовов range() до запуска кода.",
    },
    { label: "Практика учеников", detail: "Три коротких задания с немедленным показом ответа." },
    { label: "Мини-тест", detail: "Два вопроса о начальной и конечной границах." },
  ],
});

export const generateNextLessonRecommendation = async () =>
  "Повторите range() перед изучением вложенных циклов.";

/* --------------------- high-level agent entry points ---------------------- */

export const analyzeClass = getClassResults;
export const generateLesson = generateLessonPlan;
export const generateQuiz = generateAssessment;
export const gradeAnswer = gradeStudentAnswer;
export const generateIntervention = generateInterventionLesson;

export const agentSummary = `Я проанализировал последний тест. ${studentsStrugglingWithRange.length} из ${students.length} учеников испытывают трудности с range(). Рекомендую повторить range() перед изучением вложенных циклов.`;
