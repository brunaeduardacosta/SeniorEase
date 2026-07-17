import { describe, it, expect } from 'vitest';
import { createTask, toggleTask, editTask, deleteTask } from './taskUseCases';

describe('taskUseCases', () => {
  it('should create a task with default values', () => {
    const task = createTask('Estudar React');
    expect(task.title).toBe('Estudar React');
    expect(task.completed).toBe(false);
    expect(task.id).toBeDefined();
    expect(task.createdAt).toBeDefined();
  });

  it('should toggle a task completed status', () => {
    const task = createTask('Limpar a casa');
    expect(task.completed).toBe(false);
    
    const toggledTask = toggleTask(task);
    expect(toggledTask.completed).toBe(true);
    
    const toggledAgain = toggleTask(toggledTask);
    expect(toggledAgain.completed).toBe(false);
  });

  it('should edit the task title', () => {
    const task = createTask('Tomar remédio');
    const editedTask = editTask(task, 'Tomar remédio às 10h');
    
    expect(editedTask.title).toBe('Tomar remédio às 10h');
    expect(editedTask.id).toBe(task.id);
  });

  it('should delete a task from the list', () => {
    const task1 = createTask('Tarefa 1');
    const task2 = createTask('Tarefa 2');
    const task3 = createTask('Tarefa 3');
    const tasks = [task1, task2, task3];

    const result = deleteTask(tasks, task2.id);
    
    expect(result).toHaveLength(2);
    expect(result.find(t => t.id === task2.id)).toBeUndefined();
    expect(result.find(t => t.id === task1.id)).toBeDefined();
    expect(result.find(t => t.id === task3.id)).toBeDefined();
  });
});
