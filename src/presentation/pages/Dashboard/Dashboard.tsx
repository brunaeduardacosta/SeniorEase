import { useNavigate } from "react-router-dom";

import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/ui/Card/Card";
import { ActionCard } from "../../components/ui/ActionCard/ActionCard";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { ProgressBar } from "../../components/ui/ProgressBar/ProgressBar";
import { Clock } from "../../components/ui/Clock/Clock";
import { theme } from "../../styles/theme/theme";
import { useTasks } from "../../store/tasks/useTasks";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";

export function Dashboard() {
  const navigate = useNavigate();
  const { tasks } = useTasks();
  const { simplifiedMode } = useAccessibility();

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  return (
    <MainLayout>
      <PageTitle
        title="Bem-vindo ao SeniorEase 👋"
        subtitle={
          simplifiedMode
            ? "Veja suas tarefas principais."
            : "Organize suas tarefas de forma simples e acessível."
        }
      />

      {/* RESUMO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.lg,
        }}
      >
        <Card>
          <h3
            style={{
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
          >
            Total de tarefas
          </h3>
          <strong style={{ fontSize: 42, color: theme.colors.primary }}>
            {tasks.length}
          </strong>
        </Card>

        <Card>
          <h3
            style={{
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
          >
            Concluídas
          </h3>
          <strong style={{ fontSize: 42, color: theme.colors.success }}>
            {completed}
          </strong>
        </Card>

        <Card>
          <h3
            style={{
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
          >
            Pendentes
          </h3>
          <strong style={{ fontSize: 42, color: theme.colors.warning }}>
            {pending}
          </strong>
        </Card>
      </div>

      {/* PROGRESSO */}
      {!simplifiedMode && (
        <Card>
          <h2>Progresso</h2>
          <ProgressBar value={progress} />
          <p
            style={{
              marginTop: theme.spacing.sm,
              color: theme.colors.textSecondary,
              fontSize: 18,
            }}
          >
            {progress}% das tarefas concluídas.
          </p>
        </Card>
      )}

      {/* TAREFAS + RELÓGIO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: simplifiedMode ? "1fr" : "2fr 1fr",
          gap: theme.spacing.sm,
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Card>
          <h2>Últimas tarefas</h2>
          {tasks.length === 0 ? (
            <p style={{ color: theme.colors.textSecondary }}>
              Nenhuma tarefa cadastrada.
            </p>
          ) : (
            tasks
              .slice(-5)
              .reverse()
              .map((task) => (
                <p
                  key={task.id}
                  style={{ fontSize: 18, color: theme.colors.text }}
                >
                  {task.completed ? "✅" : "⏳"} {task.title}
                </p>
              ))
          )}
        </Card>

        {!simplifiedMode && <Clock />}
      </div>

      {/* AÇÕES */}
      <h2
        style={{
          marginBottom: theme.spacing.sm,
          color: theme.colors.text,
        }}
      >
        Acesso rápido
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: theme.spacing.sm,
        }}
      >
        <ActionCard
          icon="📝"
          title="Minhas tarefas"
          description="Adicionar, editar e acompanhar suas atividades."
          onClick={() => navigate("/dashboard/tasks")}
        />

        <ActionCard
          icon="⚙️"
          title="Configurações"
          description="Personalize fonte, contraste e acessibilidade."
          onClick={() => navigate("/settings")}
        />

        <ActionCard
          icon="👤"
          title="Meu perfil"
          description="Visualize seus dados pessoais."
          onClick={() => alert("Em desenvolvimento")}
        />
      </div>
    </MainLayout>
  );
}