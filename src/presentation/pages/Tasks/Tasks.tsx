import { useState } from "react";

import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/ui/Card/Card";
import { TaskCard } from "../../components/ui/TaskCard/TaskCard";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { useTasks } from "../../store/tasks/useTasks";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";

export function Tasks() {
  const { tasks, addTask, toggleTaskById, editTask, deleteTask } = useTasks();
  const { simplifiedMode } = useAccessibility();

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  function handleSubmit() {
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
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
  }

  return (
    <MainLayout>
      <PageTitle
        title="Minhas tarefas"
        subtitle={
          simplifiedMode
            ? "Gerencie suas atividades."
            : "Crie, organize e acompanhe suas tarefas."
        }
      />

      {/* NOVA TAREFA */}
      <Card>
        <h2>Nova tarefa</h2>

        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 250 }}>
            <Input
              placeholder="Digite uma tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Button type="button" onClick={handleSubmit}>
            Adicionar
          </Button>
        </div>
      </Card>

      {/* LISTA DE TAREFAS */}
      <div style={{ marginTop: 30 }}>
        {tasks.length === 0 ? (
          <Card>
            <p>Nenhuma tarefa cadastrada.</p>
          </Card>
        ) : (
          tasks.map((task) => (
            <div key={task.id}>
              {editingId === task.id ? (
                <Card>
                  <h2>Editar tarefa</h2>
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div style={{ marginTop: 20 }}>
                    <Button onClick={saveEdit}>Salvar</Button>
                  </div>
                </Card>
              ) : (
                <TaskCard
                  task={task}
                  onToggle={() => toggleTaskById(task.id)}
                  onEdit={() => startEdit(task.id, task.title)}
                  onDelete={() => deleteTask(task.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}