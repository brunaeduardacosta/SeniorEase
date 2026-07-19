import type { TaskCategory, TaskPriority } from "../../../../domain/entities/Task";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type TaskEditFormProps = {
  editingText: string;
  setEditingText: (value: string) => void;
  category: TaskCategory;
  setCategory: (value: TaskCategory) => void;
  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function TaskEditForm({
  editingText,
  setEditingText,
  category,
  setCategory,
  priority,
  setPriority,
  onSave,
  onCancel,
}: TaskEditFormProps) {
  const { fontSize, highContrast } = useAccessibility();

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "25px",
        border: highContrast ? "3px solid #000" : "1px solid #E2E8F0"
      }}
    >
      <h3 style={{ fontSize: fontSize + 4, marginBottom: 20 }}>
        ✏️ Editar tarefa
      </h3>

      <input
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #CBD5E1",
          fontSize,
          marginBottom: 15,
          boxSizing: "border-box"
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as TaskCategory)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          fontSize,
          marginBottom: 15
        }}
      >
        <option value="Estudo">📚 Estudo</option>
        <option value="Trabalho">💼 Trabalho</option>
        <option value="Pessoal">🏠 Pessoal</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          fontSize,
          marginBottom: 20
        }}
      >
        <option value="Alta">🔴 Alta prioridade</option>
        <option value="Média">🟡 Média prioridade</option>
        <option value="Baixa">🟢 Baixa prioridade</option>
      </select>

      <div style={{ display: "flex", gap: 15 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>

        <button
          onClick={onSave}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#2563EB",
            color: "#FFFFFF",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}