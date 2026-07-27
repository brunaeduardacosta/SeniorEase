import { useCalendar } from "../../../contexts/calendar/useCalendar";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";

export function UpcomingEvents() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { events } = useCalendar();

  const size = Math.max(fontSize, 18);

  // Helper para converter a string "YYYY-MM-DD" e "HH:mm" em um objeto Date Local correto
  function getEventLocalDate(dateStr: string, timeStr?: string) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr ? timeStr.split(":").map(Number) : [23, 59];
    
    // Mês no JS é base 0 (Janeiro = 0)
    return new Date(year, month - 1, day, hours, minutes);
  }

  // Data e Hora de agora para comparação rigorosa
  const now = new Date();
  
  // Para considerar eventos do dia de hoje (início do dia: 00:00:00)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Filtra eventos futuros (incluindo os de hoje) e ordena por data + hora
  const upcomingEvents = [...events]
    .filter((event) => {
      if (!event.date) return false;
      const eventDate = getEventLocalDate(event.date, event.time);
      // Mantém compromissos de hoje em diante
      return eventDate >= startOfToday;
    })
    .sort((a, b) => {
      const dateA = getEventLocalDate(a.date, a.time).getTime();
      const dateB = getEventLocalDate(b.date, b.time).getTime();
      return dateA - dateB;
    });

  const nextEvent = upcomingEvents[0];

  // Formata a data para leitura simples (ex: "26/07/2026")
  function formatDateToBR(dateStr: string) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div
      style={{
        background: highContrast ? "#000000" : theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        border: highContrast ? "3px solid #FFFFFF" : `2px solid ${theme.colors.border}`,
        boxShadow: highContrast ? "none" : theme.shadows.card,
      }}
    >
      <h2
        style={{
          margin: `0 0 ${theme.spacing.sm} 0`,
          fontSize: `${size + 4}px`,
          fontWeight: 800,
          color: highContrast ? "#FFFFFF" : theme.colors.text,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        ⏰ Próximo compromisso
      </h2>

      {!nextEvent ? (
        <p
          style={{
            margin: 0,
            fontSize: `${size}px`,
            color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
          }}
        >
          Nenhum compromisso agendado para os próximos dias.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: theme.spacing.sm,
            borderRadius: theme.radius.md,
            background: highContrast ? "#000000" : theme.colors.background,
            borderLeft: `8px solid ${nextEvent.color || theme.colors.primary}`,
            border: highContrast ? "2px solid #FFFFFF" : undefined,
            borderLeftWidth: highContrast ? "10px" : "8px",
            borderLeftColor: nextEvent.color || theme.colors.primary,
          }}
        >
          {/* BADGE DE CATEGORIA */}
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: `${Math.max(size - 4, 14)}px`,
                fontWeight: 700,
                background: highContrast ? "#000000" : `${nextEvent.color || theme.colors.primary}20`,
                color: highContrast ? "#FFFFFF" : nextEvent.color || theme.colors.primary,
                border: highContrast ? "2px solid #FFFFFF" : `1px solid ${nextEvent.color || theme.colors.primary}`,
              }}
            >
              📌 {nextEvent.category}
            </span>
          </div>

          {/* TÍTULO DO EVENTO */}
          <h3
            style={{
              margin: 0,
              fontSize: `${size + 2}px`,
              fontWeight: 800,
              color: highContrast ? "#FFFFFF" : theme.colors.text,
            }}
          >
            {nextEvent.title}
          </h3>

          {/* DATA E HORA */}
          <div
            style={{
              display: "flex",
              gap: theme.spacing.md,
              fontSize: `${size}px`,
              fontWeight: 700,
              color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
            }}
          >
            <span>📅 {formatDateToBR(nextEvent.date)}</span>
            {nextEvent.time && <span>⏰ {nextEvent.time}</span>}
          </div>
        </div>
      )}
    </div>
  );
}