export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ✔ importante: string para localStorage
};