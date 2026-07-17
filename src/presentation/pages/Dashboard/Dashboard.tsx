import { useNavigate } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { ProgressBar } from "../../components/ui/ProgressBar/ProgressBar";
import { Clock } from "../../components/ui/Clock/Clock";
import { useTasks } from "../../store/tasks/useTasks";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import { useUser } from "../../contexts/user/useUser";

export function Dashboard() {
  const navigate = useNavigate();
  const { tasks } = useTasks();
  const { simplifiedMode, fontSize, highContrast } = useAccessibility();
  const { name } = useUser();

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;
  const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  const card = {
    background: "#FFF",
    border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: highContrast ? "none" : "0 10px 25px rgba(0,0,0,0.04)",
  };

  const metricColors = [
    { label: "Total de tarefas", value: tasks.length, color: highContrast ? "#000" : "#2563EB", bg: highContrast ? "#FFF" : "#EFF6FF" },
    { label: "Concluídas", value: completed, color: highContrast ? "#000" : "#16A34A", bg: highContrast ? "#FFF" : "#F0FDF4" },
    { label: "Pendentes", value: pending, color: highContrast ? "#000" : "#D97706", bg: highContrast ? "#FFF" : "#FFFBEB" },
  ];

  const quickActions = [
    { icon: "📝", title: "Minhas Tarefas", description: "Adicionar, editar e acompanhar suas atividades.", route: "/dashboard/tasks", color: "#2563EB" },
    { icon: "⚙️", title: "Configurações", description: "Personalize fonte, contraste e acessibilidade.", route: "/settings", color: "#7C3AED" },
    { icon: "👤", title: "Meu Perfil", description: "Visualize e edite seus dados pessoais.", route: "/profile", color: "#0EA5E9" },
  ];

  const greeting = name ? `Olá, ${name.split(" ")[0]}!` : "Bem-vindo ao SeniorEase";

  return (
    <MainLayout>
      <PageTitle
        title={greeting}
        subtitle={
          simplifiedMode
            ? "Veja suas tarefas principais."
            : "Organize suas tarefas de forma simples e acessível."
        }
      />

      {/* MÉTRICAS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        {metricColors.map((m) => (
          <div key={m.label} style={{ ...card, background: highContrast ? "#FFF" : m.bg, textAlign: "center" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: Math.max(fontSize, 15), fontWeight: 700, color: highContrast ? "#000" : "#334155" }}>
              {m.label}
            </p>
            <strong style={{ fontSize: "52px", fontWeight: 900, color: m.color, lineHeight: 1 }}>
              {m.value}
            </strong>
          </div>
        ))}
      </div>

      {/* PROGRESSO */}
      {!simplifiedMode && (
        <div style={{ ...card, marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <h2 style={{ margin: 0, fontSize: fontSize + 4, fontWeight: 800, color: highContrast ? "#000" : "#1E293B" }}>
              Progresso do Dia
            </h2>
            <span style={{ fontSize: fontSize + 4, fontWeight: 900, color: highContrast ? "#000" : "#2563EB" }}>
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} />
          <p style={{ margin: "12px 0 0 0", fontSize: Math.max(fontSize, 15), color: highContrast ? "#000" : "#334155" }}>
            {completed} de {tasks.length} tarefas concluídas.
          </p>
        </div>
      )}

      {/* ÚLTIMAS TAREFAS + RELÓGIO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: simplifiedMode ? "1fr" : "2fr 1fr",
          gap: "20px",
          marginBottom: "28px",
          alignItems: "start",
        }}
      >
        <div style={card}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: fontSize + 4, fontWeight: 800, color: highContrast ? "#000" : "#1E293B" }}>
            Tarefas recentes
          </h2>
          {tasks.length === 0 ? (
            <p style={{ fontSize: Math.max(fontSize, 15), color: highContrast ? "#000" : "#334155", textAlign: "center", padding: "20px 0" }}>
              Nenhuma tarefa cadastrada ainda.
            </p>
          ) : (
            tasks.slice(-5).reverse().map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 12px",
                  borderRadius: "14px",
                  marginBottom: "8px",
                  borderBottom: "none",
                  background: highContrast ? "#FFF" : "#F8FAFC",
                }}
              >
                <span style={{ fontSize: fontSize + 4 }}>{task.completed ? "✅" : "⏳"}</span>
                <span
                  style={{
                    fontSize: Math.max(fontSize + 2, 16),
                    fontWeight: 600,
                    color: highContrast ? "#000" : "#1E293B",
                    textDecoration: task.completed ? "line-through" : "none",
                    opacity: task.completed ? 0.6 : 1,
                    flex: 1,
                  }}
                >
                  {task.title}
                </span>
              </div>
            ))
          )}
        </div>

        {!simplifiedMode && <Clock />}
      </div>

      {/* ACESSO RÁPIDO */}
      <h2 style={{ margin: "0 0 20px 0", fontSize: fontSize + 4, fontWeight: 800, color: highContrast ? "#000" : "#1E293B" }}>
        Acesso Rápido
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        {quickActions.map((action) => (
          <button
            key={action.route}
            onClick={() => navigate(action.route)}
            style={{
              background: "#FFF",
              border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
              borderRadius: "24px",
              padding: "28px 24px",
              boxShadow: highContrast ? "none" : "0 10px 25px rgba(0,0,0,0.04)",
              cursor: "pointer",
              textAlign: "left",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!highContrast) {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 35px rgba(0,0,0,0.09)";
              }
            }}
            onMouseLeave={(e) => {
              if (!highContrast) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.04)";
              }
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: highContrast ? "#000" : action.color + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                marginBottom: "16px",
                border: highContrast ? "2px solid #FFF" : "none",
              }}
            >
              {action.icon}
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: fontSize + 2, fontWeight: 800, color: highContrast ? "#000" : "#1E293B" }}>
              {action.title}
            </h3>
            <p style={{ margin: 0, fontSize: Math.max(fontSize, 15), color: highContrast ? "#000" : "#334155", lineHeight: 1.5 }}>
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </MainLayout>
  );
}