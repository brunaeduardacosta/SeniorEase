export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Cria uma nova tarefa com valores padrão.
 * Usa crypto.randomUUID() nativo para gerar IDs únicos.
 */
export function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date(),
  };
}

/**
 * Altera o status de conclusão da tarefa de forma imutável.
 */
export function toggleTask(task: Task): Task {
  return {
    ...task,
    completed: !task.completed,
  };
}

/**
 * Altera o título de uma tarefa existente de forma imutável.
 */
export function editTask(task: Task, newTitle: string): Task {
  return {
    ...task,
    title: newTitle,
  };
}

/**
 * Remove uma tarefa da lista filtrando pelo ID.
 * Retorna uma nova lista sem modificar a array original.
 */
export function deleteTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}