import { useState } from "react";
import { useCalendar } from "../../../contexts/calendar/useCalendar";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";

export function MonthCalendar() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { events } = useCalendar();

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const size = Math.max(fontSize, 18);

  const monthName = currentDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // HELPER: Converte string YYYY-MM-DD para ano, mês e dia local (evita bug de timezone)
  function parseLocalDate(dateString: string) {
    const [y, m, d] = dateString.split("-").map(Number);
    return { year: y, month: m - 1, day: d };
  }

  // Verifica se há evento no dia
  function hasEvent(day: number) {
    return events.some((event) => {
      if (!event.date) return false;
      const parsed = parseLocalDate(event.date);
      return parsed.day === day && parsed.month === month && parsed.year === year;
    });
  }

  // Filtra eventos do dia selecionado
  function getEventsFromDay(day: number) {
    return events.filter((event) => {
      if (!event.date) return false;
      const parsed = parseLocalDate(event.date);
      return parsed.day === day && parsed.month === month && parsed.year === year;
    });
  }

  return (
    <div
      style={{
        background: highContrast ? "#000000" : theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
      }}
    >
      {/* CABEÇALHO DO MÊS E NAVEGAÇÃO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing.md,
        }}
      >
        <button
          type="button"
          aria-label="Mês anterior"
          onClick={() => {
            setCurrentDate(new Date(year, month - 1, 1));
            setSelectedDay(null);
          }}
          style={{
            padding: "12px 20px",
            fontSize: `${size + 2}px`,
            fontWeight: 800,
            borderRadius: theme.radius.md,
            cursor: "pointer",
            border: highContrast ? "3px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
            background: highContrast ? "#000000" : theme.colors.background,
            color: highContrast ? "#FFFFFF" : theme.colors.text,
            minHeight: "48px",
          }}
        >
          ◀
        </button>

        <h2
          style={{
            margin: 0,
            fontSize: `${size + 4}px`,
            fontWeight: 800,
            textTransform: "capitalize",
            color: highContrast ? "#FFFFFF" : theme.colors.text,
          }}
        >
          📅 {monthName}
        </h2>

        <button
          type="button"
          aria-label="Próximo mês"
          onClick={() => {
            setCurrentDate(new Date(year, month + 1, 1));
            setSelectedDay(null);
          }}
          style={{
            padding: "12px 20px",
            fontSize: `${size + 2}px`,
            fontWeight: 800,
            borderRadius: theme.radius.md,
            cursor: "pointer",
            border: highContrast ? "3px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
            background: highContrast ? "#000000" : theme.colors.background,
            color: highContrast ? "#FFFFFF" : theme.colors.text,
            minHeight: "48px",
          }}
        >
          ▶
        </button>
      </div>

      {/* GRADE DO CALENDÁRIO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "8px",
        }}
      >
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <strong
            key={day}
            style={{
              textAlign: "center",
              padding: "8px 0",
              fontSize: `${Math.max(size - 2, 16)}px`,
              color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
            }}
          >
            {day}
          </strong>
        ))}

        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} />;
          }

          const isSelected = selectedDay === day;
          const dayHasEvents = hasEvent(day);

          return (
            <button
              type="button"
              key={index}
              onClick={() => setSelectedDay(day)}
              style={{
                minHeight: "64px",
                padding: "8px",
                borderRadius: theme.radius.md,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: `${size}px`,
                fontWeight: isSelected ? 800 : 600,
                border: isSelected
                  ? highContrast
                    ? "3px solid #FFFF00"
                    : `3px solid ${theme.colors.primary}`
                  : dayHasEvents
                  ? highContrast
                    ? "2px solid #FFFFFF"
                    : `2px solid ${theme.colors.primary}`
                  : highContrast
                  ? "1px solid #555555"
                  : `1px solid ${theme.colors.border}`,
                background: isSelected
                  ? highContrast
                    ? "#FFFFFF"
                    : `${theme.colors.primary}20`
                  : highContrast
                  ? "#000000"
                  : theme.colors.background,
                color: isSelected
                  ? highContrast
                    ? "#000000"
                    : theme.colors.primary
                  : highContrast
                  ? "#FFFFFF"
                  : theme.colors.text,
              }}
            >
              <span>{day}</span>
              {dayHasEvents && (
                <span style={{ fontSize: "12px", marginTop: "2px" }}>📌</span>
              )}
            </button>
          );
        })}
      </div>

      {/* DETALHAMENTO DOS COMPROMISSOS DO DIA SELECIONADO */}
      {selectedDay && (
        <div
          style={{
            marginTop: theme.spacing.lg,
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
            background: highContrast ? "#000000" : theme.colors.background,
            border: highContrast ? "3px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: `${size + 2}px`,
              color: highContrast ? "#FFFFFF" : theme.colors.text,
            }}
          >
            📅 Compromissos do dia {selectedDay}
          </h3>

          {getEventsFromDay(selectedDay).length === 0 ? (
            <p
              style={{
                marginTop: theme.spacing.xs,
                fontSize: `${size}px`,
                color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
              }}
            >
              Nenhum compromisso neste dia.
            </p>
          ) : (
            getEventsFromDay(selectedDay).map((event) => {
              const categoryColor = event.color || theme.colors.primary;

              return (
                <div
                  key={event.id}
                  style={{
                    padding: theme.spacing.sm,
                    marginTop: theme.spacing.xs,
                    borderRadius: theme.radius.md,
                    background: highContrast ? "#000000" : theme.colors.surface,
                    borderLeft: `6px solid ${categoryColor}`,
                    border: highContrast ? "2px solid #FFFFFF" : undefined,
                    borderLeftWidth: highContrast ? "8px" : "6px",
                    borderLeftColor: categoryColor,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <strong
                    style={{
                      fontSize: `${size}px`,
                      color: highContrast ? "#FFFFFF" : theme.colors.text,
                    }}
                  >
                    {event.title}
                  </strong>
                  <div
                    style={{
                      display: "flex",
                      gap: theme.spacing.md,
                      fontSize: `${Math.max(size - 2, 15)}px`,
                      color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
                    }}
                  >
                    <span>⏰ {event.time || "Sem horário"}</span>
                    <span>📌 {event.category}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}