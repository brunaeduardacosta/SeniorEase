import { useNavigate } from "react-router-dom";

import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/ui/Card/Card";
import { StatsCard } from "../../components/ui/StatsCard/StatsCard";
import { ActionCard } from "../../components/ui/ActionCard/ActionCard";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { ProgressBar } from "../../components/ui/ProgressBar/ProgressBar";
import { Clock } from "../../components/ui/Clock/Clock";

import { useTasks } from "../../store/tasks/useTasks";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";

export function Dashboard() {
  const navigate = useNavigate();
  const { tasks } = useTasks();
  const { simplifiedMode } = useAccessibility();

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  const progress = tasks.length === 0 
    ? 0 
    : Math.round((completed / tasks.length) * 100);

  const today = new Date().toISOString().split("T")[0];
  const createdToday = tasks.filter((task) => task.createdAt.startsWith(today)).length;

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
      <PageTitle
        title="Bem-vindo ao SeniorEase 👋"
        subtitle={
          simplifiedMode
            ? "Veja seu progresso."
            : "Organize suas tarefas de forma simples e acessível."
        }
      />

      {/* ESTATÍSTICAS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <StatsCard icon="📋" title="Total de tarefas" value={tasks.length} />
        <StatsCard icon="✅" title="Concluídas" value={completed} />
        <StatsCard icon="⏳" title="Pendentes" value={pending} />
        <StatsCard icon="📅" title="Criadas hoje" value={createdToday} />
      </div>

      {/* PROGRESSO */}
      <Card>
        <h2>Progresso das tarefas</h2>
        <ProgressBar value={progress} />
        <p style={{ marginTop: 15, color: "#64748B", fontSize: 18 }}>
          {progress}% concluído.
        </p>
        <p style={{ color: "#1E3A8A", fontWeight: 600 }}>
          {progressMessage()}
        </p>
      </Card>

      {/* TAREFAS + RELÓGIO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          marginTop: 30,
          marginBottom: 40,
        }}
      >
        <Card>
          <h2>Últimas tarefas</h2>
          {tasks.length === 0 ? (
            <p>Nenhuma tarefa cadastrada.</p>
          ) : (
            tasks
              .slice(-5)
              .reverse()
              .map((task) => (
                <p key={task.id} style={{ fontSize: 18, color: "#334155" }}>
                  {task.completed ? "✅" : "⏳"} {task.title}
                </p>
              ))
          )}
        </Card>

        <Clock />
      </div>

      {/* AÇÕES */}
      <h2 style={{ marginBottom: 20 }}>Acesso rápido</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
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
          onClick={() => navigate("/profile")}
        />
      </div>
    </MainLayout>
  );
}