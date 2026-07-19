export type TaskCategory =
  | "Estudo"
  | "Trabalho"
  | "Pessoal";


export type TaskPriority =
  | "Alta"
  | "Média"
  | "Baixa";


export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  category: TaskCategory;
  priority: TaskPriority;
}