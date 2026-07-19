import { useEffect, useState } from "react";
import type { Task, TaskCategory, TaskPriority } from "../../../domain/entities/Task";
import { TaskContext } from "./TaskContext";
import { loadTasks, saveTasks } from "../../../infrastructure/storage/taskStorage";
import {
  createTask,
  toggleTask,
  editTask as editTaskUseCase,
  deleteTask as deleteTaskUseCase,
} from "../../../domain/usecases/taskUseCases";

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(title: string, category: TaskCategory, priority: TaskPriority) {
    const newTask = createTask(title, category, priority);
    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTaskById(id: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? toggleTask(task) : task))
    );
  }

  function editTask(id: string, title: string, category: TaskCategory, priority: TaskPriority) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? editTaskUseCase(task, title, category, priority) : task))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => deleteTaskUseCase(prev, id));
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskById,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}