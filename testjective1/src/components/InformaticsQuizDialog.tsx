import { useId, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const questions = [
  {
    id: "processor",
    text: "Какое устройство выполняет вычисления и команды программ?",
    options: ["Монитор", "Процессор", "Клавиатура", "Принтер"],
    correct: 1,
    explanation: "Процессор обрабатывает данные и выполняет команды программ.",
  },
  {
    id: "bit",
    text: "Как называется минимальная единица измерения информации?",
    options: ["Байт", "Килобайт", "Бит", "Мегабайт"],
    correct: 2,
    explanation: "Бит может принимать одно из двух значений: 0 или 1. Один байт содержит 8 бит.",
  },
  {
    id: "algorithm",
    text: "Что такое алгоритм?",
    options: [
      "Устройство для хранения данных",
      "Любой текстовый документ",
      "Название компьютерной сети",
      "Точная последовательность действий для решения задачи",
    ],
    correct: 3,
    explanation: "Алгоритм задаёт понятные и упорядоченные шаги решения задачи.",
  },
  {
    id: "input",
    text: "Какое из перечисленных устройств предназначено для ввода информации?",
    options: ["Клавиатура", "Монитор", "Колонки", "Принтер"],
    correct: 0,
    explanation: "Клавиатура позволяет вводить текст и команды в компьютер.",
  },
  {
    id: "python",
    text: "Какие числа выведет цикл Python: for i in range(3): print(i)?",
    options: ["1, 2, 3", "0, 1, 2, 3", "0, 1, 2", "Только 3"],
    correct: 2,
    explanation: "range(3) создаёт значения от 0 до 2: правая граница 3 не включается.",
  },
];

export function InformaticsQuizDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border-border bg-card sm:rounded-2xl">
        <DialogHeader className="pr-6">
          <DialogTitle className="text-2xl">Тест по информатике</DialogTitle>
          <DialogDescription>
            Пять вопросов об устройстве компьютера, информации, алгоритмах и Python. В каждом
            вопросе выберите один ответ.
          </DialogDescription>
        </DialogHeader>
        <QuizForm />
      </DialogContent>
    </Dialog>
  );
}

function QuizForm() {
  const formId = useId();
  const progressRef = useRef<HTMLParagraphElement>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const answeredCount = questions.filter((question) => answers[question.id] !== undefined).length;
  const score = questions.filter((question) => answers[question.id] === question.correct).length;

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (answeredCount === questions.length) setSubmitted(true);
      }}
    >
      <p
        ref={progressRef}
        tabIndex={-1}
        className="text-sm text-muted-foreground"
        aria-live="polite"
      >
        Отвечено: {answeredCount} из {questions.length}
      </p>
      {questions.map((question, index) => (
        <fieldset
          key={question.id}
          disabled={submitted}
          className="min-w-0 rounded-xl border border-border p-4"
        >
          <legend className="max-w-full px-1 text-sm font-semibold">
            {index + 1}. {question.text}
          </legend>
          <div className="mt-1 space-y-2">
            {question.options.map((option, optionIndex) => (
              <label
                key={option}
                className="flex items-start gap-3 rounded-lg border border-transparent px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary-soft has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
              >
                <input
                  type="radio"
                  name={`${formId}-${question.id}`}
                  value={optionIndex}
                  required
                  checked={answers[question.id] === optionIndex}
                  onChange={() =>
                    setAnswers((current) => ({ ...current, [question.id]: optionIndex }))
                  }
                  className="mt-0.5 shrink-0 accent-primary"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {submitted ? (
            <p className="mt-3 text-sm">
              <span
                className={
                  answers[question.id] === question.correct
                    ? "font-semibold text-success"
                    : "font-semibold text-danger"
                }
              >
                {answers[question.id] === question.correct ? "Верно. " : "Неверно. "}
              </span>
              Правильный ответ: {question.options[question.correct]}. {question.explanation}
            </p>
          ) : null}
        </fieldset>
      ))}
      {submitted ? (
        <div className="space-y-4">
          <div role="status" className="rounded-xl bg-primary-soft p-4 text-center">
            <p className="text-lg font-semibold">
              Ваш результат: {score} из {questions.length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {score === questions.length
                ? "Отлично! Все ответы правильные."
                : "Посмотрите объяснения к вопросам и попробуйте ещё раз."}
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              progressRef.current?.focus();
              progressRef.current?.scrollIntoView({ block: "start" });
            }}
          >
            Пройти ещё раз
          </Button>
        </div>
      ) : (
        <Button type="submit" className="w-full" disabled={answeredCount !== questions.length}>
          Проверить ответы
        </Button>
      )}
    </form>
  );
}
