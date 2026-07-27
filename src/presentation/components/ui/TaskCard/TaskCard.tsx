import type { Task } from "../../../../domain/entities/Task";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";

type TaskCardProps = {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();

  // Escala de tamanho segura
  const size = Math.max(fontSize, 18);

  // Paleta de prioridades calculada defendendo o contraste WCAG AAA
  const priorityTheme = highContrast
    ? {
        Alta: { border: "#FF0000", background: "#000000", text: "#FF3333", label: "🔴 Alta" },
        Média: { border: "#FFFF00", background: "#000000", text: "#FFFF00", label: "🟡 Média" },
        Baixa: { border: "#00FF00", background: "#000000", text: "#00FF00", label: "🟢 Baixa" },
      }
    : {
        Alta: { border: theme.colors.danger, background: "#FEF2F2", text: "#991B1B", label: "🔴 Alta" },
        Média: { border: theme.colors.warning, background: "#FFFBEB", text: "#92400E", label: "🟡 Média" },
        Baixa: { border: theme.colors.success, background: "#F0FDF4", text: "#166534", label: "🟢 Baixa" },
      };

  const priority = priorityTheme[task.priority] ?? priorityTheme["Média"];

  // Configuração mestre do container do Card
  const cardStyles = highContrast
    ? {
        background: "#000000",
        text: "#FFFFFF",
        border: "#FFFFFF",
        shadow: "none",
      }
    : {
        background: theme.colors.surface,
        text: theme.colors.text,
        border: priority.border,
        shadow: theme.shadows.card,
      };

  return (
    <div
      style={{
        background: cardStyles.background,
        border: `3px solid ${cardStyles.border}`,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        boxShadow: cardStyles.shadow,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: theme.spacing.md, // Aumentado para dar respiro quando quebrar linha
        }}
      >
        <div style={{ flex: 1, minWidth: "250px" }}>
          {/* TAGS INDICADORAS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: theme.spacing.xs,
              marginBottom: theme.spacing.sm,
            }}
          >
            {/* Status da Tarefa */}
            <span
              style={{
                background: task.completed
                  ? highContrast ? "#00FF00" : theme.colors.success
                  : highContrast ? "#FFFFFF" : theme.colors.border,
                color: task.completed
                  ? "#000000"
                  : highContrast ? "#000000" : theme.colors.text,
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: `${Math.max(size - 2, 14)}px`,
                fontWeight: 700,
                border: highContrast ? "1px solid #FFFFFF" : "none",
              }}
            >
              {task.completed ? "✓ Concluída" : "⏳ Pendente"}
            </span>

            {/* Prioridade */}
            <span
              style={{
                background: priority.background,
                color: priority.text,
                border: `2px solid ${priority.border}`,
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: `${Math.max(size - 2, 14)}px`,
                fontWeight: 700,
              }}
            >
              {priority.label}
            </span>

            {/* Categoria */}
            <span
              style={{
                background: highContrast ? "#000000" : theme.colors.background,
                color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
                border: highContrast ? "2px solid #FFFFFF" : "none",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: `${Math.max(size - 2, 14)}px`,
                fontWeight: 600,
              }}
            >
              📁 {task.category}
            </span>
          </div>

          {/* TÍTULO DA TAREFA */}
          <h2
            style={{
              margin: 0,
              fontSize: `${size + 4}px`,
              fontWeight: 800,
              color: task.completed && !highContrast ? theme.colors.textSecondary : cardStyles.text,
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed && !highContrast ? 0.6 : 1,
              lineHeight: 1.3,
            }}
          >
            {task.title}
          </h2>
        </div>

        {/* BOTÃO MESTRE: CONCLUIR / DESFAZER */}
        <button
          onClick={onToggle}
          style={{
            padding: "16px 28px",
            fontSize: `${size}px`,
            fontWeight: 700,
            borderRadius: theme.radius.md,
            cursor: "pointer",
            boxSizing: "border-box",
            minHeight: "56px",
            // Ajuste estrito de cor para botões de ação principal
            background: highContrast
              ? "#000000"
              : task.completed
              ? theme.colors.success
              : theme.colors.primary,
            color: highContrast ? "#FFFF00" : "#FFFFFF",
            border: highContrast ? "3px solid #FFFF00" : "none",
            flex: "1 1 auto",
            textAlign: "center",
          }}
        >
          {task.completed ? "✓ Desfazer" : "Concluir"}
        </button>
      </div>

      <div style={{ height: "2px", background: highContrast ? "#FFFFFF" : theme.colors.border }} />

      {/* BOTÕES DE GERENCIAMENTO (EDITAR / EXCLUIR) */}
      <div style={{ display: "flex", gap: theme.spacing.sm, flexWrap: "wrap" }}>
        <button
          onClick={onEdit}
          style={{
            padding: "14px 20px",
            borderRadius: theme.radius.md,
            cursor: "pointer",
            fontWeight: 700,
            flex: 1,
            minWidth: "120px",
            minHeight: "48px",
            background: highContrast ? "#000000" : theme.colors.background,
            color: highContrast ? "#FFFFFF" : theme.colors.text,
            border: highContrast ? "2px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
          }}
        >
          ✏️ Editar
        </button>

        <button
          onClick={onDelete}
          style={{
            padding: "14px 20px",
            borderRadius: theme.radius.md,
            cursor: "pointer",
            fontWeight: 700,
            flex: 1,
            minWidth: "120px",
            minHeight: "48px",
            // CORRIGIDO: Cores com contraste robusto para destruição de dados
            background: highContrast ? "#000000" : "#7F1D1D", 
            color: highContrast ? "#FF3333" : "#FFFFFF",
            border: highContrast ? "2px solid #FF0000" : "none",
          }}
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}