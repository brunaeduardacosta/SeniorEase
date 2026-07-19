import { useState } from "react";

import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/ui/Card/Card";
import { TaskCard } from "../../components/ui/TaskCard/TaskCard";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { Input } from "../../components/ui/Input/Input";

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
  const [showHistory, setShowHistory] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "old" | "az" | "za">("recent");

  function showFeedback(message: string) {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
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
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (!task.completed) {
      showFeedback("Tarefa concluída!");
    } else {
      showFeedback("Tarefa reaberta.");
    }
  }

  function confirmDelete() {
    if (!taskToDelete) return;

    deleteTask(taskToDelete);
    setTaskToDelete(null);
    showFeedback("Tarefa excluída com sucesso!");
  }

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const tasksToDisplay = (showHistory ? completedTasks : pendingTasks).filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const orderedTasks = [...tasksToDisplay].sort((a, b) => {
    switch (sortBy) {
      case "old":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <MainLayout>
      <PageTitle
        title={showHistory ? "Histórico de tarefas" : "Minhas tarefas"}
        subtitle={
          simplifiedMode
            ? showHistory
              ? "Tarefas já concluídas."
              : "Gerencie suas atividades."
            : showHistory
            ? "Veja todas as tarefas concluídas."
            : "Crie, organize e acompanhe suas tarefas."
        }
      />

      <TaskFeedbackToast message={feedbackMessage} />

      <TaskTabs showHistory={showHistory} setShowHistory={setShowHistory} />

      <div
        style={{
          display: "flex",
          gap: 15,
          marginTop: 20,
          marginBottom: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <Input
            placeholder="Pesquisar tarefa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "recent" | "old" | "az" | "za")}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #CBD5E1",
            minWidth: "180px",
          }}
        >
          <option value="recent">Mais recentes</option>
          <option value="old">Mais antigas</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {!showHistory && (
        <TaskCreationWizard
          onConfirmCreate={handleConfirmCreate}
          showFeedback={showFeedback}
        />
      )}

      <div style={{ marginTop: 30 }}>
        {orderedTasks.length === 0 ? (
          <Card>
            <p>
              {search.trim()
                ? "Nenhuma tarefa encontrada."
                : showHistory
                ? "Nenhuma tarefa concluída no histórico."
                : "Você não possui tarefas pendentes."}
            </p>
          </Card>
        ) : (
          orderedTasks.map((task) => (
            <div key={task.id} style={{ marginBottom: 15 }}>
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