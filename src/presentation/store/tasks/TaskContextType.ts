import type {
  Task,
  TaskCategory,
  TaskPriority,
} from "../../../domain/entities/Task";


export interface TaskContextType {

  tasks: Task[];


  addTask: (
    title: string,
    category: TaskCategory,
    priority: TaskPriority
  ) => void;



  toggleTaskById: (
    id: string
  ) => void;



  editTask: (
    id: string,
    title: string,
    category: TaskCategory,
    priority: TaskPriority
  ) => void;



  deleteTask: (
    id: string
  ) => void;

}