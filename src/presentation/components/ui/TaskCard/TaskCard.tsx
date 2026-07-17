import type { Task } from "../../../../domain/entities/Task";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

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
        shadow: "none",
        badgeBg: task.completed ? "#000" : "#FFF",
        badgeText: task.completed ? "#FFF" : "#000",
        badgeBorder: "#000",
      }
    : {
        background: "#FFFFFF",
        text: "#1E293B",
        border: "transparent",
        shadow: "0 10px 25px rgba(0, 0, 0, 0.04)",
        badgeBg: task.completed ? "#DCFCE7" : "#F1F5F9",
        badgeText: task.completed ? "#166534" : "#475569",
        badgeBorder: "transparent",
      };

  return (
    <div
      style={{
        background: currentTheme.background,
        border: highContrast ? `3px solid ${currentTheme.border}` : `1px solid #F1F5F9`,
        borderRadius: "24px",
        padding: "28px",
        marginBottom: "24px",
        boxShadow: currentTheme.shadow,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!highContrast) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!highContrast) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = currentTheme.shadow;
        }
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ flex: "1 1 200px" }}>
          <span
            style={{
              display: "inline-block",
              background: currentTheme.badgeBg,
              color: currentTheme.badgeText,
              border: `1px solid ${currentTheme.badgeBorder}`,
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: fontSize - 2,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "12px",
            }}
          >
            {task.completed ? "Concluída" : "Pendente"}
          </span>
          
          <h2
            style={{
              margin: 0,
              fontSize: fontSize + 8,
              fontWeight: 800,
              color: currentTheme.text,
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.6 : 1,
              lineHeight: 1.3,
            }}
          >
            {task.title}
          </h2>
        </div>

        <button
          onClick={onToggle}
          style={{
            padding: "16px 28px",
            fontSize: fontSize + 2,
            fontWeight: 700,
            borderRadius: "16px",
            border: highContrast ? "3px solid #000" : "none",
            cursor: "pointer",
            background: task.completed ? (highContrast ? "#000" : "#16A34A") : (highContrast ? "#FFF" : "#2563EB"),
            color: task.completed && highContrast ? "#FFF" : (!task.completed && highContrast ? "#000" : "#FFF"),
            flex: "0 1 auto",
            boxShadow: !highContrast ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!highContrast) e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            if (!highContrast) e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {task.completed ? "✓ Desfazer" : "Concluir Tarefa"}
        </button>
      </div>

      <div style={{ height: "1px", background: highContrast ? "#000" : "#E2E8F0", width: "100%" }} />

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button onClick={onEdit} style={{ ...actionButtonStyle, fontSize }}>
          ✏️ Editar
        </button>

        <button
          onClick={onDelete}
          style={{
            ...actionButtonStyle,
            fontSize,
            color: highContrast ? "#000" : "#DC2626",
            background: highContrast ? "#FFF" : "#FEF2F2",
          }}
        >
          🗑 Excluir
        </button>
      </div>
    </div>
  );
}

const actionButtonStyle = {
  padding: "12px 20px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  background: "#F1F5F9",
  color: "#475569",
  fontWeight: 600,
  flex: "1 1 120px",
  transition: "all 0.2s ease",
};