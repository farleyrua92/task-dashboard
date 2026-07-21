"use client";

import { useState } from "react";
import { TaskTable } from "@/components/tasks/TaskTable";
import { TaskForm } from "@/components/tasks/TaskForm";
import { Task } from "@/lib/types";
import { TaskFormValues } from "@/hooks/useTaskForm";

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Set up Next.js project",
    description: "Dashboard base with Tailwind v4",
    status: "done",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Create reusable components",
    description: "Button, Input, TaskTable",
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
];

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleCreate(values: TaskFormValues) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...values,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  return (
    <div className="flex flex-col gap-8">
      <TaskForm onCreate={handleCreate} />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Tasks ({tasks.length})</h2>
        <TaskTable tasks={tasks} />
      </section>
    </div>
  );
}
