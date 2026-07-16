import type { Task } from "../entities/Task";

export function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date(),
  };
}

export function toggleTask(task: Task): Task {
  return {
    ...task,
    completed: !task.completed,
  };
}