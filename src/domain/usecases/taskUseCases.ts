import type { Task, TaskCategory, TaskPriority } from "../entities/Task";

export function createTask(
  title: string,
  category: TaskCategory = "Pessoal",
  priority: TaskPriority = "Média"
): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    category,
    priority,
  };
}

export function toggleTask(task: Task): Task {
  return {
    ...task,
    completed: !task.completed,
  };
}

export function editTask(
  task: Task,
  newTitle: string,
  category: TaskCategory,
  priority: TaskPriority
): Task {
  return {
    ...task,
    title: newTitle,
    category,
    priority,
  };
}

export function deleteTask(tasks: Task[], idToDelete: string): Task[] {
  return tasks.filter((task) => task.id !== idToDelete);
}