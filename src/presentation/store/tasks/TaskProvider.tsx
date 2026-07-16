import { useEffect, useState } from "react";
import type { Task } from "../../../domain/entities/Task";
import { TaskContext } from "./TaskContext";
import { loadTasks, saveTasks } from "../../../infrastructure/storage/taskStorage";

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  // salvar automaticamente
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTaskById(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function editTask(id: string, title: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
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