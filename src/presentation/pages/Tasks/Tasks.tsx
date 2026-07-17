import { useState } from "react";

import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/ui/Card/Card";
import { TaskCard } from "../../components/ui/TaskCard/TaskCard";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { useTasks } from "../../store/tasks/useTasks";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";

import { TaskDeleteModal } from "./components/TaskDeleteModal";
import { TaskCreationWizard } from "./components/TaskCreationWizard";
import { TaskTabs } from "./components/TaskTabs";
import { TaskEditForm } from "./components/TaskEditForm";
import { TaskFeedbackToast } from "./components/TaskFeedbackToast";

export function Tasks() {
  const { tasks, addTask, toggleTaskById, editTask, deleteTask } = useTasks();
  const { simplifiedMode } = useAccessibility();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [showHistory, setShowHistory] = useState<boolean>(false);

  function showFeedback(msg: string) {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  }

  function handleConfirmCreate(title: string) {
    addTask(title);
    showFeedback("Tarefa adicionada com sucesso!");
    setShowHistory(false);
  }

  function startEdit(id: string, text: string) {
    setEditingId(id);
    setEditingText(text);
  }

  function saveEdit() {
    if (!editingId || !editingText.trim()) return;
    editTask(editingId, editingText);
    setEditingId(null);
    setEditingText("");
    showFeedback("Tarefa alterada com sucesso!");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  function handleToggle(id: string) {
    toggleTaskById(id);
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      showFeedback("Tarefa concluída!");
    } else {
      showFeedback("Tarefa reaberta.");
    }
  }

  function confirmDelete() {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
      showFeedback("Tarefa excluída com sucesso!");
    }
  }

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const tasksToDisplay = showHistory ? completedTasks : pendingTasks;

  return (
    <MainLayout>
      <PageTitle
        title={showHistory ? "Histórico de Tarefas" : "Minhas tarefas"}
        subtitle={
          simplifiedMode
            ? (showHistory ? "Tarefas já feitas." : "Gerencie suas atividades.")
            : (showHistory ? "Veja tudo o que você já concluiu." : "Crie, organize e acompanhe suas tarefas.")
        }
      />

      <TaskFeedbackToast message={feedbackMessage} />

      <TaskTabs showHistory={showHistory} setShowHistory={setShowHistory} />

      {!showHistory && (
        <TaskCreationWizard 
          onConfirmCreate={handleConfirmCreate} 
          showFeedback={showFeedback} 
        />
      )}

      <div style={{ marginTop: 30 }}>
        {tasksToDisplay.length === 0 ? (
          <Card>
            <p>{showHistory ? "Nenhuma tarefa concluída no histórico." : "Você não tem nenhuma tarefa pendente no momento!"}</p>
          </Card>
        ) : (
          tasksToDisplay.map((task) => (
            <div key={task.id}>
              {editingId === task.id ? (
                <TaskEditForm 
                  editingText={editingText}
                  setEditingText={setEditingText}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                />
              ) : (
                <TaskCard
                  task={task}
                  onToggle={() => handleToggle(task.id)}
                  onEdit={() => startEdit(task.id, task.title)}
                  onDelete={() => setTaskToDelete(task.id)}
                />
              )}
            </div>
          ))
        )}
      </div>

      {taskToDelete && (
        <TaskDeleteModal 
          onCancel={() => setTaskToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </MainLayout>
  );
}