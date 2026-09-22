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
  "Analyzing class performance",
  "Detecting knowledge gaps",
  "Reading curriculum objectives",
  "Creating lesson structure",
  "Generating differentiated activities",
  "Creating exit quiz",
];

export const INTERVENTION_STEPS = [
  "Analyzing misconception",
  "Creating explanation",
  "Creating practice exercises",
  "Creating mini quiz",
];

export const ASSESSMENT_STEPS = [
  "Reading topic and objectives",
  "Selecting question types",
  "Writing questions",
  "Attaching skills and answer keys",
];

export const ANALYSIS_STEPS = [
  "Retrieving class data",
  "Retrieving student performance",
  "Detecting learning gaps",
  "Checking curriculum requirements",
  "Deciding next teaching action",
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
    "Use for loops to repeat actions a fixed number of times",
    "Explain how range(start, stop) produces values",
    "Combine loops with conditions to solve problems",
  ],
});

export const analyzeLearningGaps = async () => [
  {
    skill: "range()",
    mastery: 38,
    affected: studentsStrugglingWithRange.length,
    total: students.length,
  },
  { skill: "Nested Loops", mastery: 32, affected: 12, total: students.length },
];

/* --------------------------------- outputs -------------------------------- */

export type Lesson = {
  title: string;
  objective: string;
  duration: string;
  materials: string[];
  structure: { time: string; label: string; detail: string }[];
};

export const generateLessonPlan = async (topic = "Python For Loops"): Promise<Lesson> => ({
  title: `${topic} — Understanding range() Before Nesting`,
  objective:
    "Students can predict the exact values produced by range(start, stop) and use a for loop to repeat an action a known number of times.",
  duration: "45 minutes",
  materials: ["Projector / live coding editor", "Printed worksheet", "Exit quiz (5 questions)"],
  structure: [
    { time: "0–5 min", label: "Warm-up", detail: "Quick poll: what does range(5) print? Reveal the class split from yesterday's quiz." },
    { time: "5–12 min", label: "Concept explanation", detail: "Number-line visual of range(): starts at 0, stops before the stop value." },
    { time: "12–20 min", label: "Teacher live coding", detail: "Trace three loops together, printing each iteration variable." },
    { time: "20–32 min", label: "Student practice", detail: "Differentiated worksheet — beginner / intermediate / advanced tracks." },
    { time: "32–40 min", label: "Challenge exercise", detail: "Sum of numbers 1..N with an accumulator variable." },
    { time: "40–45 min", label: "Exit quiz", detail: "5 questions targeting range() boundaries." },
  ],
});

export type Exercises = { beginner: string[]; intermediate: string[]; advanced: string[] };

export const generateDifferentiatedExercises = async (
  level?: keyof Exercises,
): Promise<Exercises> => {
  const pools: Record<keyof Exercises, string[][]> = {
    beginner: [
      ["What numbers will this code print?\n\nfor i in range(5):\n    print(i)", "Fill the gap: print numbers 0 to 3 using range(__)."],
      ["What numbers will this code print?\n\nfor i in range(4):\n    print(i)", "True or false: range(3) includes 3."],
    ],
    intermediate: [
      ["Write a program that prints numbers from 1 to 10 using a for loop.", "Print only the even numbers from 0 to 20."],
      ["Print the numbers from 10 down to 1 using range().", "Print every third number between 0 and 30."],
    ],
    advanced: [
      ["Write a program that calculates the sum of numbers from 1 to N using a for loop.", "Print a 3×3 multiplication grid using nested loops."],
      ["Compute the factorial of N with a for loop.", "Print a right-angled triangle of stars of height N."],
    ],
  };
  const pick = (k: keyof Exercises) => pools[k][level === k ? 1 : 0];
  return { beginner: pick("beginner"), intermediate: pick("intermediate"), advanced: pick("advanced") };
};

export type QuizQuestion = {
  text: string;
  type: "Multiple Choice" | "Short Answer" | "Code Question" | "True / False";
  options?: string[];
  answer: string;
  skill: string;
};

export const generateAssessment = async (count = 5): Promise<QuizQuestion[]> => {
  const bank: QuizQuestion[] = [
    { text: "What does range(3) generate?", type: "Multiple Choice", options: ["1,2,3", "0,1,2", "0,1,2,3"], answer: "B — 0,1,2", skill: "range()" },
    { text: "How many times does `for i in range(6)` repeat?", type: "Multiple Choice", options: ["5", "6", "7"], answer: "B — 6", skill: "Loops" },
    { text: "range(2, 6) includes the number 6.", type: "True / False", answer: "False", skill: "range()" },
    { text: "Write a loop that prints numbers 1 to 5.", type: "Code Question", answer: "for i in range(1, 6): print(i)", skill: "Loops" },
    { text: "In your own words, where does range() start counting?", type: "Short Answer", answer: "At 0 unless a start value is given.", skill: "range()" },
    { text: "How many lines does a 2×3 nested loop print?", type: "Multiple Choice", options: ["5", "6", "9"], answer: "B — 6", skill: "Nested Loops" },
  ];
  return bank.slice(0, count);
};

export const gradeStudentAnswer = async (correct: boolean, feedback: string) => ({
  correct,
  title: correct ? "Correct!" : "Not quite.",
  explanation: correct ? "You traced every iteration properly." : feedback,
});

export const detectMisconception = async () => ({
  concept: "range()",
  statement: "Students believe range(n) starts from 1 and includes n.",
  evidence: `${studentsStrugglingWithRange.length} students selected 1,2,3 instead of 0,1,2 on question 3.`,
  confidence: 0.94,
});

export const updateStudentMastery = async (studentId: string, skillId: string, delta: number) => ({
  studentId,
  skillId,
  delta,
});

export const generateStudentLearningPlan = async (name: string) => ({
  title: `Personal learning plan — ${name}`,
  steps: [
    "5-minute visual recap of range() on a number line",
    "3 guided tracing exercises with printed output",
    "2 short coding tasks using range(start, stop)",
    "Mini quiz to confirm the boundary rule",
  ],
});

export const generateClassInsight = async () => insights[0];

export const generateInterventionLesson = async () => ({
  title: "Intervention Lesson — range() boundaries",
  goal: "Correct misunderstanding of Python range().",
  duration: "10 minutes",
  content: [
    { label: "Visual explanation", detail: "Number line from 0, highlight that the stop value is excluded." },
    { label: "Teacher example", detail: "Trace range(5) and range(1, 5) side by side on the board." },
    { label: "Guided exercise", detail: "Class predicts output of four range() calls before running them." },
    { label: "Student practice", detail: "Three short tasks with immediate answer reveal." },
    { label: "Mini quiz", detail: "Two questions on start and stop boundaries." },
  ],
});

export const generateNextLessonRecommendation = async () =>
  "Review range() before introducing nested loops.";

/* --------------------- high-level agent entry points ---------------------- */

export const analyzeClass = getClassResults;
export const generateLesson = generateLessonPlan;
export const generateQuiz = generateAssessment;
export const gradeAnswer = gradeStudentAnswer;
export const generateIntervention = generateInterventionLesson;

export const agentSummary = `I analyzed the most recent assessment. ${studentsStrugglingWithRange.length} of ${students.length} students struggle with range(). I recommend reviewing range() before introducing nested loops.`;
