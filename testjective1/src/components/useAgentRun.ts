import { useCallback, useState } from "react";
import { initialSteps, runSteps, type AgentStep } from "@/services/aiAgent";

export function useAgentRun(labels: string[]) {
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const start = useCallback(
    async (after?: () => void | Promise<void>) => {
      setDone(false);
      setRunning(true);
      setSteps(initialSteps(labels));
      await runSteps(labels, setSteps);
      await after?.();
      setRunning(false);
      setDone(true);
    },
    [labels],
  );

  const reset = useCallback(() => {
    setSteps([]);
    setDone(false);
  }, []);

  return { steps, running, done, start, reset };
}
