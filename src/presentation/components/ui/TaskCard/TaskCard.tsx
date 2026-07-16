import type { Task } from "../../../../domain/entities/Task";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { theme } from "../../../styles/theme/theme";

type TaskCardProps = {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const { fontSize, highContrast } = useAccessibility();

  const currentTheme = highContrast
    ? {
        background: "#FFFFFF",
        text: "#000000",
        border: "#000000",
      }
    : {
        background: "#FFFFFF",
        text: "#1E293B",
        border: "#E2E8F0",
      };

  return (
    <div
      style={{
        background: currentTheme.background,
        border: `2px solid ${currentTheme.border}`,
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        boxShadow: theme.shadows.card,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: fontSize + 6,
              color: currentTheme.text,
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </h2>

          <p style={{ fontSize, color: currentTheme.text }}>
            {task.completed ? "Concluída" : "Pendente"}
          </p>
        </div>

        <button
          onClick={onToggle}
          style={{
            padding: "14px 20px",
            fontSize: fontSize,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            background: task.completed ? "#16A34A" : "#2563EB",
            color: "#fff",
          }}
        >
          {task.completed ? "✓ Feita" : "Concluir"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 15, marginTop: 20 }}>
        <button onClick={onEdit} style={buttonStyle}>
          ✏️ Editar
        </button>

        <button
          onClick={onDelete}
          style={{
            ...buttonStyle,
            background: "#DC2626",
            color: "#fff",
          }}
        >
          🗑 Excluir
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: 12,
  border: "1px solid #CBD5E1",
  cursor: "pointer",
  background: "#F8FAFC",
  fontSize: 16,
};