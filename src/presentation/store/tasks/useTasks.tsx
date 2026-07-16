import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks deve ser usado dentro do TaskProvider");
  }

  return context;
}