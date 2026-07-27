import { useTheme } from "../../styles/theme/useTheme";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import { MainLayout } from "../../layouts/MainLayout";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";

import { MonthCalendar } from "./components/MonthCalendar";
import { EventForm } from "./components/EventForm";
import { EventList } from "./components/EventList";

export function Calendar() {
  const theme = useTheme();
  const { highContrast } = useAccessibility();

  return (
    <MainLayout>
      {/* Cabeçalho da Página */}
      <PageTitle
        title="Agenda e Compromissos"
        subtitle="Organize seus lembretes, consultas e atividades diárias com facilidade."
      />

      {/* Container de Conteúdo Organizacional */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.lg,
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {/* VISUALIZAÇÃO MENSAL (NOVO COMPONENTE) */}
        <section
          aria-labelledby="section-month-calendar"
          style={{
            background: highContrast ? "#000000" : theme.colors.surface,
            padding: theme.spacing.md,
            borderRadius: theme.radius.lg,
            border: highContrast ? "3px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
            boxShadow: highContrast ? "none" : theme.shadows.card,
          }}
        >
          <MonthCalendar />
        </section>

        {/* SEÇÃO 1: FORMULÁRIO DE CADASTRO */}
        <section
          aria-labelledby="section-new-event"
          style={{
            background: highContrast ? "#000000" : theme.colors.surface,
            padding: theme.spacing.md,
            borderRadius: theme.radius.lg,
            border: highContrast ? "3px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
            boxShadow: highContrast ? "none" : theme.shadows.card,
          }}
        >
          <h2
            id="section-new-event"
            style={{
              margin: `0 0 ${theme.spacing.sm} 0`,
              fontSize: "22px",
              fontWeight: 700,
              color: highContrast ? "#FFFFFF" : theme.colors.text,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ➕ Adicionar Novo Compromisso
          </h2>

          <EventForm />
        </section>

        {/* SEÇÃO 2: LISTAGEM DOS EVENTOS AGENDADOS */}
        <section
          aria-labelledby="section-event-list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.sm,
          }}
        >
          <h2
            id="section-event-list"
            style={{
              margin: `0 0 ${theme.spacing.xs} 0`,
              fontSize: "22px",
              fontWeight: 700,
              color: highContrast ? "#FFFFFF" : theme.colors.text,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            📅 Seus Lembretes e Atividades
          </h2>

          <EventList />
        </section>
      </div>
    </MainLayout>
  );
}