import { useEffect, useState } from "react";
import type { Task } from "../../../domain/entities/Task";
import { TaskContext } from "./TaskContext";
import { loadTasks, saveTasks } from "../../../infrastructure/storage/taskStorage";
import { createTask, toggleTask, editTask as useCaseEditTask, deleteTask as useCaseDeleteTask } from "../../../domain/usecases/taskUseCases";

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  // salvar automaticamente
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(title: string) {
    const newTask = createTask(title);
    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTaskById(id: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? toggleTask(task) : task))
    );
  }

  function editTask(id: string, title: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? useCaseEditTask(task, title) : task))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => useCaseDeleteTask(prev, id));
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