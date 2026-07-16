import type { Task } from "../../domain/entities/Task";

const KEY = "seniorEase:tasks";

export function loadTasks(): Task[] {
  const data = localStorage.getItem(KEY);
  if (!data) return [];

  return JSON.parse(data);
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}