import { NavLink, useNavigate } from "react-router-dom";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

const navItems = [
  { to: "/dashboard", icon: "🏠", label: "Início", description: "Resumo das suas atividades" },
  { to: "/dashboard/tasks", icon: "📝", label: "Tarefas", description: "Organize suas atividades" },
  { to: "/settings", icon: "⚙️", label: "Acessibilidade", description: "Ajuste sua experiência" },
  { to: "/profile", icon: "👤", label: "Meu Perfil", description: "Seus dados pessoais" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { fontSize, highContrast, simplifiedMode } = useAccessibility();

  const size = Math.max(fontSize, 18);

  return (
    <aside
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "280px",
        minWidth: "280px",
        height: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        background: highContrast ? "#000" : "linear-gradient(180deg, #2563EB, #1D4ED8)",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ fontSize: 32 }}>🌿</div>
        <div>
          <h1 style={{ margin: 0, color: "#FFF", fontSize: 22 }}>SeniorEase</h1>
          <p style={{ margin: 0, color: "#FFF", opacity: 0.9, fontSize: 12 }}>Tecnologia acessível</p>
        </div>
      </div>

      {/* MENU */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            style={({ isActive }) => ({
              textDecoration: "none",
              padding: "10px 14px",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: isActive ? (highContrast ? "#FFF" : "rgba(255,255,255,.25)") : "transparent",
              color: isActive && highContrast ? "#000" : "#FFF",
              fontSize: size,
              fontWeight: 700,
              border: isActive ? "2px solid #FFF" : "2px solid transparent",
              boxSizing: "border-box"
            })}
          >
            <span style={{ fontSize: size + 4 }}>{item.icon}</span>
            <div>
              <div>{item.label}</div>
              {!simplifiedMode && (
                <small style={{ opacity: 0.8, fontWeight: 400, display: "block", fontSize: size - 4 }}>
                  {item.description}
                </small>
              )}
            </div>
          </NavLink>
        ))}
      </nav>

      {/* AÇÕES FIXAS NO RODAPÉ DA SIDEBAR */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
        <button
          style={{
            padding: 14,
            borderRadius: 14,
            border: highContrast ? "2px solid #FFF" : "none",
            fontSize: size,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            background: highContrast ? "#000" : "#F8FAFC",
            color: highContrast ? "#FFF" : "#1E293B"
          }}
        >
          ❓ Preciso de ajuda
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: 14,
            borderRadius: 14,
            border: highContrast ? "2px solid #FFF" : "none",
            fontSize: size,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            background: highContrast ? "#000" : "#FEE2E2",
            color: highContrast ? "#FFF" : "#991B1B"
          }}
        >
          🚪 Sair
        </button>
      </div>

      <p style={{ color: "#FFF", textAlign: "center", fontSize: 11, marginTop: 12, opacity: 0.7, marginBottom: 0 }}>
        SeniorEase v1.0
      </p>
    </aside>
  );
}