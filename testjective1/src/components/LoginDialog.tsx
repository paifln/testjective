import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LoginDialog({ variant = "secondary" }: { variant?: "ghost" | "secondary" }) {
  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={variant}>
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-border bg-card p-6 sm:rounded-2xl sm:p-8">
        <DialogHeader className="pr-6">
          <DialogTitle className="text-2xl">Вход в EduPilot AI</DialogTitle>
          <DialogDescription>
            Введите электронную почту и пароль. Пока доступен только демонстрационный вход.
          </DialogDescription>
        </DialogHeader>
        <form
          className="mt-2 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            void navigate({ to: "/app" });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block min-w-0">
              <span className="mb-1.5 block text-sm font-medium">Электронная почта</span>
              <input
                name="email"
                type="email"
                autoComplete="username"
                placeholder="name@example.com"
                required
                className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
              />
            </label>
            <label className="block min-w-0">
              <span className="mb-1.5 block text-sm font-medium">Пароль</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Введите пароль"
                required
                className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
              />
            </label>
          </div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
