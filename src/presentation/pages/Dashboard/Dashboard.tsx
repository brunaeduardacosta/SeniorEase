import { useNavigate } from "react-router-dom";

import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/ui/Card/Card";
import { StatsCard } from "../../components/ui/StatsCard/StatsCard";
import { ActionCard } from "../../components/ui/ActionCard/ActionCard";
import { ProgressBar } from "../../components/ui/ProgressBar/ProgressBar";
import { Clock } from "../../components/ui/Clock/Clock";

import { useTasks } from "../../store/tasks/useTasks";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../styles/theme/useTheme";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { UpcomingMedicine } from "./components/UpcomingMedicine";

export function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { tasks } = useTasks();
  const { fontSize, highContrast, simplifiedMode } = useAccessibility();

  const size = Math.max(fontSize, 18);

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  const progress =
    tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  const today = new Date().toISOString().split("T")[0];
  const createdToday = tasks.filter((task) =>
    task.createdAt?.startsWith(today)
  ).length;

  function progressMessage() {
    if (progress === 100) {
      return "Parabéns! Todas as tarefas foram concluídas 🎉";
    }
    if (progress >= 50) {
      return "Você está indo muito bem. Continue assim!";
    }
    return "Comece organizando suas próximas atividades.";
  }

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.lg,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* SUBTÍTULO DE CONTEXTO */}
        {!simplifiedMode && (
          <p
            style={{
              margin: 0,
              fontSize: `${size}px`,
              fontWeight: 600,
              color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
            }}
          >
            Confira o seu resumo de tarefas e lembretes para hoje.
          </p>
        )}

        {/* ESTATÍSTICAS RÁPIDAS */}
        <section aria-label="Estatísticas Gerais">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: theme.spacing.md,
            }}
          >
            <StatsCard icon="📋" title="Total de tarefas" value={tasks.length} />
            <StatsCard icon="✅" title="Concluídas" value={completed} />
            <StatsCard icon="⏳" title="Pendentes" value={pending} />
            <StatsCard icon="📅" title="Criadas hoje" value={createdToday} />
          </div>
        </section>

        {/* COMPROMISSOS E MEDICAMENTOS */}
        <section
          aria-label="Lembretes e Avisos Importantes"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: theme.spacing.md,
          }}
        >
          <UpcomingEvents />
          <UpcomingMedicine />
        </section>

        {/* PROGRESSO DAS TAREFAS */}
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.sm,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: `${size + 4}px`,
                  fontWeight: 800,
                  color: highContrast ? "#FFFFFF" : theme.colors.text,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📊 Progresso das Tarefas
              </h2>

              <span
                style={{
                  fontSize: `${size + 2}px`,
                  fontWeight: 800,
                  color: highContrast ? "#FFFF00" : theme.colors.primary,
                  background: highContrast ? "#000000" : `${theme.colors.primary}15`,
                  padding: "4px 12px",
                  borderRadius: theme.radius.md,
                  border: highContrast ? "1px solid #FFFF00" : "none",
                }}
              >
                {progress}%
              </span>
            </div>

            <ProgressBar value={progress} />

            <p
              style={{
                margin: 0,
                marginTop: theme.spacing.xs,
                fontSize: `${size}px`,
                fontWeight: 700,
                color: highContrast ? "#FFFF00" : theme.colors.primary,
              }}
            >
              {progressMessage()}
            </p>
          </div>
        </Card>

        {/* ÚLTIMAS TAREFAS + RELÓGIO HARMONIZADOS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: theme.spacing.md,
            alignItems: "stretch",
          }}
        >
          <Card>
            <h2
              style={{
                margin: `0 0 ${theme.spacing.md} 0`,
                fontSize: `${size + 4}px`,
                fontWeight: 800,
                color: highContrast ? "#FFFFFF" : theme.colors.text,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📝 Últimas Tarefas
            </h2>

            {tasks.length === 0 ? (
              <div
                style={{
                  padding: theme.spacing.md,
                  textAlign: "center",
                  background: highContrast ? "#111111" : "rgba(0,0,0,0.02)",
                  borderRadius: theme.radius.md,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: `${size}px`,
                    fontWeight: 600,
                    color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
                  }}
                >
                  Nenhuma tarefa cadastrada.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {tasks
                  .slice(-5)
                  .reverse()
                  .map((task) => (
                    <div
                      key={task.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        borderRadius: theme.radius.md,
                        background: highContrast
                          ? "#000000"
                          : task.completed
                          ? "rgba(22, 163, 74, 0.06)"
                          : "rgba(0, 0, 0, 0.03)",
                        border: highContrast
                          ? "1px solid #FFFFFF"
                          : `1px solid ${
                              task.completed
                                ? "rgba(22, 163, 74, 0.2)"
                                : "transparent"
                            }`,
                        fontSize: `${size}px`,
                        fontWeight: 600,
                        color: highContrast ? "#FFFFFF" : theme.colors.text,
                      }}
                    >
                      <span style={{ fontSize: `${size + 2}px` }}>
                        {task.completed ? "✅" : "⏳"}
                      </span>
                      <span
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          opacity: task.completed ? 0.7 : 1,
                          flex: 1,
                        }}
                      >
                        {task.title}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </Card>

          {/* RELÓGIO ALINHADO AO LADO DE ÚLTIMAS TAREFAS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Clock />
          </div>
        </div>

        {/* ACESSO RÁPIDO (ACTIONCARDS ORIGINAIS COM O MESMO GRID DOS CARDS DE EVENTOS) */}
        <section aria-label="Acesso Rápido">
          <h2
            style={{
              margin: `0 0 ${theme.spacing.md} 0`,
              fontSize: `${size + 4}px`,
              fontWeight: 800,
              color: highContrast ? "#FFFFFF" : theme.colors.text,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🚀 Acesso Rápido
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: theme.spacing.md,
            }}
          >
            <ActionCard
              icon="📝"
              title="Minhas tarefas"
              description="Adicionar, editar e acompanhar suas atividades."
              onClick={() => navigate("/dashboard/tasks")}
            />
            <ActionCard
              icon="📅"
              title="Agenda e Lembretes"
              description="Visualize consultas e compromissos do mês."
              onClick={() => navigate("/dashboard/calendar")}
            />
            <ActionCard
              icon="💊"
              title="Medicamentos"
              description="Cadastre e acompanhe seus horários de remédios."
              onClick={() => navigate("/medicines")}
            />
            <ActionCard
              icon="⚙️"
              title="Configurações"
              description="Personalize fonte, contraste e acessibilidade."
              onClick={() => navigate("/settings")}
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}