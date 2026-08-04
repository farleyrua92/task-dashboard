import { Task, TaskAttachment, TaskStatus } from "./types";

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  attachment?: TaskAttachment;
}

const SIMULATED_DELAY_MS = 1800;
const SIMULATED_FAILURE_RATE = 0.2;

/** Simulates a network request to create a task. */
export function createTask(input: CreateTaskInput): Promise<Task> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < SIMULATED_FAILURE_RATE) {
        reject(new Error("Could not save the task. Please try again."));
        return;
      }

      resolve({
        id: crypto.randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
      });
    }, SIMULATED_DELAY_MS);
  });
}
