import type { Task } from "../../../domain/entities/Task";

export type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskById: (id: string) => void;
  editTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
};