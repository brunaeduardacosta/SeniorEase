import { useState } from "react";
import { useCalendar } from "../../../contexts/calendar/useCalendar";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";
import type { CalendarEvent } from "../../../../domain/entities/CalendarEvent";

export function EventList() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { events, removeEvent, updateEvent } = useCalendar();

  // ID do evento que está sendo editado no momento
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const size = Math.max(fontSize, 18);

  // Inicia o modo de edição para um evento
  function handleStartEdit(event: CalendarEvent) {
    setEditingId(event.id);
    setEditTitle(event.title);
  }

  // Salva a alteração do título
  function handleSaveEdit(event: CalendarEvent) {
    if (editTitle.trim()) {
      updateEvent({
        ...event,
        title: editTitle.trim(),
      });
    }
    setEditingId(null);
  }

  // ESTADO VAZIO: Nenhum compromisso agendado
  if (events.length === 0) {
    return (
      <div
        style={{
          marginTop: theme.spacing.md,
          padding: theme.spacing.lg,
          background: highContrast ? "#000000" : theme.colors.background,
          border: highContrast ? "3px solid #FFFFFF" : `2px dashed ${theme.colors.border}`,
          borderRadius: theme.radius.lg,
          textAlign: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: `${size + 2}px`,
            color: highContrast ? "#FFFFFF" : theme.colors.text,
          }}
        >
          📅 Nenhum compromisso agendado
        </h3>
        <p
          style={{
            margin: `${theme.spacing.xs} 0 0 0`,
            fontSize: `${size}px`,
            color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
          }}
        >
          Seus próximos lembretes e atividades aparecerão nesta lista.
        </p>
      </div>
    );
  }

  // ORDENAÇÃO CRONOLÓGICA (Data + Hora)
  const sortedEvents = [...events].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time || "00:00"}`).getTime();
    const dateTimeB = new Date(`${b.date}T${b.time || "00:00"}`).getTime();
    return dateTimeA - dateTimeB;
  });

  return (
    <div
      style={{
        marginTop: theme.spacing.md,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: `${size + 4}px`,
          fontWeight: 800,
          color: highContrast ? "#FFFFFF" : theme.colors.text,
        }}
      >
        📋 Próximos compromissos ({sortedEvents.length})
      </h2>

      {sortedEvents.map((event) => {
        const isEditing = editingId === event.id;
        const categoryColor = event.color || "#64748B";

        return (
          <div
            key={event.id}
            style={{
              background: highContrast ? "#000000" : theme.colors.surface,
              padding: theme.spacing.md,
              borderRadius: theme.radius.lg,
              border: highContrast ? "3px solid #FFFFFF" : `2px solid ${categoryColor}`,
              boxShadow: highContrast ? "none" : theme.shadows.card,
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.sm,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: theme.spacing.sm,
              }}
            >
              {/* CONTEÚDO DO EVENTO */}
              <div style={{ flex: 1, minWidth: "240px" }}>
                {/* BADGE DE CATEGORIA */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: `${Math.max(size - 4, 14)}px`,
                    fontWeight: 700,
                    marginBottom: "8px",
                    background: highContrast ? "#000000" : `${categoryColor}20`,
                    color: highContrast ? "#FFFFFF" : categoryColor,
                    border: highContrast ? "2px solid #FFFFFF" : `1px solid ${categoryColor}`,
                  }}
                >
                  📌 {event.category}
                </span>

                {/* TÍTULO OU CAMPO DE EDIÇÃO */}
                {isEditing ? (
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{
                        padding: "10px",
                        fontSize: `${size}px`,
                        borderRadius: theme.radius.md,
                        border: highContrast ? "2px solid #FFFFFF" : `2px solid ${theme.colors.primary}`,
                        background: highContrast ? "#000000" : theme.colors.background,
                        color: highContrast ? "#FFFFFF" : theme.colors.text,
                        width: "100%",
                      }}
                    />
                    <button
                      onClick={() => handleSaveEdit(event)}
                      style={{
                        padding: "10px 16px",
                        borderRadius: theme.radius.md,
                        background: highContrast ? "#FFFFFF" : theme.colors.success,
                        color: highContrast ? "#000000" : "#FFFFFF",
                        fontWeight: 700,
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      💾 OK
                    </button>
                  </div>
                ) : (
                  <h3
                    style={{
                      margin: 0,
                      fontSize: `${size + 2}px`,
                      fontWeight: 800,
                      color: highContrast ? "#FFFFFF" : theme.colors.text,
                    }}
                  >
                    {event.title}
                  </h3>
                )}

                {/* DATA E HORA */}
                <div
                  style={{
                    display: "flex",
                    gap: theme.spacing.md,
                    marginTop: "8px",
                    fontSize: `${size}px`,
                    fontWeight: 600,
                    color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
                  }}
                >
                  <span>📅 {event.date}</span>
                  {event.time && <span>⏰ {event.time}</span>}
                </div>
              </div>

              {/* BOTÕES DE AÇÃO */}
              <div
                style={{
                  display: "flex",
                  gap: theme.spacing.xs,
                  width: "100%",
                  maxWidth: "280px",
                }}
              >
                {/* BOTÃO EDITAR */}
                {!isEditing && (
                  <button
                    onClick={() => handleStartEdit(event)}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: theme.radius.md,
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: `${Math.max(size - 2, 15)}px`,
                      minHeight: "48px",
                      background: highContrast ? "#000000" : "#DBEAFE",
                      color: highContrast ? "#FFFFFF" : "#1E40AF",
                      border: highContrast ? "2px solid #FFFFFF" : "1px solid #BFDBFE",
                    }}
                  >
                    ✏️ Editar
                  </button>
                )}

                {/* BOTÃO EXCLUIR */}
                <button
                  onClick={() => removeEvent(event.id)}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: theme.radius.md,
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: `${Math.max(size - 2, 15)}px`,
                    minHeight: "48px",
                    background: highContrast ? "#000000" : "#7F1D1D",
                    color: highContrast ? "#FF3333" : "#FFFFFF",
                    border: highContrast ? "2px solid #FF0000" : "none",
                  }}
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}