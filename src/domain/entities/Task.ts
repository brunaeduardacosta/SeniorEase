export type TaskPriority =
  | "Alta"
  | "Média"
  | "Baixa";

export interface Task {
  id: string;

  title: string;

  description: string;

  category: string;

  priority: TaskPriority;

  completed: boolean;

  createdAt: string;

  dueDate?: string;
}