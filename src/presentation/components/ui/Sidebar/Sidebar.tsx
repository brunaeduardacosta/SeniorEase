import { NavLink, useNavigate } from "react-router-dom";

import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";

const navItems = [
  {
    to: "/dashboard",
    icon: "🏠",
    label: "Início",
    description: "Resumo das suas atividades",
  },
  {
    to: "/calendar",
    icon: "📅",
    label: "Agenda",
    description: "Seus compromissos",
  },
  {
    to: "/dashboard/tasks",
    icon: "📝",
    label: "Tarefas",
    description: "Organize suas atividades",
  },
  {
    to: "/medicines",
    icon: "💊",
    label: "Medicamentos",
    description: "Gerencie seus remédios",
  },
  {
    to: "/medicines/history",
    icon: "📋",
    label: "Histórico",
    description: "Medicamentos tomados",
  },
  {
    to: "/settings",
    icon: "⚙️",
    label: "Acessibilidade",
    description: "Ajuste sua experiência",
  },
  {
    to: "/profile",
    icon: "👤",
    label: "Meu Perfil",
    description: "Seus dados pessoais",
  },
];

export function Sidebar() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { fontSize, highContrast, simplifiedMode } = useAccessibility();

  const size = Math.max(fontSize, 18);

  return (
    <aside
      style={{
        position: "sticky",
        top: 0,
        width: "280px",
        minWidth: "280px",
        height: "100vh",
        padding: theme.spacing.sm,
        display: "flex",
        flexDirection: "column",
        background: highContrast
          ? theme.colors.text
          : `linear-gradient(
              180deg,
              ${theme.colors.primary},
              ${theme.colors.secondary}
            )`,
        boxShadow: theme.shadows.card,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.xs,
          marginBottom: theme.spacing.md,
        }}
      >
        <div style={{ fontSize: 32 }}>🌿</div>

        <div>
          <h1
            style={{
              margin: 0,
              color: theme.colors.surface,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            SeniorEase
          </h1>

          <p
            style={{
              margin: 0,
              color: theme.colors.surface,
              opacity: 0.85,
              fontSize: 12,
            }}
          >
            Tecnologia acessível
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.xs,
          marginBottom: theme.spacing.md,
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            style={({ isActive }) => ({
              textDecoration: "none",
              padding: "12px 14px",
              borderRadius: theme.radius.md,
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.xs,
              background: isActive
                ? highContrast
                  ? theme.colors.surface
                  : "rgba(255,255,255,.25)"
                : "transparent",
              color:
                isActive && highContrast
                  ? theme.colors.text
                  : theme.colors.surface,
              fontSize: size,
              fontWeight: 700,
              border: isActive
                ? `2px solid ${theme.colors.surface}`
                : "2px solid transparent",
            })}
          >
            <span style={{ fontSize: size + 4 }}>{item.icon}</span>

            <div>
              <div>{item.label}</div>

              {!simplifiedMode && (
                <small
                  style={{
                    opacity: 0.8,
                    fontWeight: 400,
                    display: "block",
                    fontSize: size - 4,
                  }}
                >
                  {item.description}
                </small>
              )}
            </div>
          </NavLink>
        ))}
      </nav>

      {/* RODAPÉ */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.xs,
        }}
      >
        <button
          style={{
            padding: theme.spacing.sm,
            borderRadius: theme.radius.md,
            border: highContrast ? `2px solid ${theme.colors.surface}` : "none",
            fontSize: size,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            background: highContrast
              ? theme.colors.text
              : theme.colors.surface,
            color: highContrast ? theme.colors.surface : theme.colors.text,
          }}
        >
          ❓ Preciso de ajuda
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: theme.spacing.sm,
            borderRadius: theme.radius.md,
            border: highContrast ? `2px solid ${theme.colors.surface}` : "none",
            fontSize: size,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            background: highContrast ? theme.colors.text : "#FEE2E2",
            color: highContrast
              ? theme.colors.surface
              : theme.colors.danger,
          }}
        >
          🚪 Sair
        </button>
      </div>

      <p
        style={{
          color: theme.colors.surface,
          textAlign: "center",
          fontSize: 11,
          marginTop: theme.spacing.sm,
          opacity: 0.7,
          marginBottom: 0,
        }}
      >
        SeniorEase v1.0
      </p>
    </aside>
  );
}