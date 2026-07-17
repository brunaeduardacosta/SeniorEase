import { NavLink, useNavigate } from "react-router-dom";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useUser } from "../../../contexts/user/useUser";

const navItems = [
  { to: "/dashboard",       icon: "🏠", label: "Dashboard"      },
  { to: "/dashboard/tasks", icon: "📝", label: "Minhas Tarefas"  },
  { to: "/settings",        icon: "⚙️", label: "Configurações"   },
  { to: "/profile",         icon: "👤", label: "Meu Perfil"      },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { fontSize, highContrast } = useAccessibility();
  const { name } = useUser();

  const navFontSize = Math.max(fontSize, 16);

  return (
    <aside
      className="sidebar"
      style={{
        background: highContrast ? "#0F172A" : "linear-gradient(180deg, #1D4ED8 0%, #2563EB 58%, #3B82F6 100%)",
        boxShadow: highContrast ? "0 16px 36px rgba(15, 23, 42, 0.35)" : "0 16px 36px rgba(37, 99, 235, 0.18)",
      }}
    >

      {/* Logo / Brand */}
      <div style={{ marginBottom: "36px", padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "14px",
            background: highContrast ? "#FFF" : "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", flexShrink: 0,
            border: highContrast ? "2px solid #FFF" : "1px solid rgba(255,255,255,0.2)",
          }}>
            🌿
          </div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#FFF", letterSpacing: "-0.5px" }}>
            SeniorEase
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: "13px", color: highContrast ? "#FFF" : "rgba(255,255,255,0.7)", paddingLeft: "54px" }}>
          Simples · Seguro · Acessível
        </p>
      </div>

      {/* Avatar rápido do usuário */}
      {name && (
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: highContrast ? "#FFF" : "rgba(255,255,255,0.12)",
          border: highContrast ? "2px solid #FFF" : "1px solid rgba(255,255,255,0.2)",
          borderRadius: "16px", padding: "12px 14px", marginBottom: "28px",
        }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: highContrast ? "#000" : "#3B82F6",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "17px", fontWeight: 800, color: "#FFF", flexShrink: 0,
            border: highContrast ? "2px solid #000" : "none",
          }}>
            {name.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: highContrast ? "#000" : "#FFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {name}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: highContrast ? "#000" : "rgba(255,255,255,0.55)" }}>
              Usuário SeniorEase
            </p>
          </div>
        </div>
      )}

      {/* Divisor */}
      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: highContrast ? "#FFF" : "rgba(255,255,255,0.4)", marginBottom: "12px", paddingLeft: "4px" }}>
        Menu
      </p>

      {/* Navegação */}
      <div className="sidebar-nav-scroll">
        <nav className="sidebar-nav">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textDecoration: "none",
                color: isActive ? (highContrast ? "#000" : "#FFF") : (highContrast ? "#FFF" : "rgba(255,255,255,0.7)"),
                padding: "14px 16px",
                borderRadius: "16px",
                fontSize: navFontSize,
                fontWeight: isActive ? 700 : 500,
                background: isActive
                  ? (highContrast ? "#FFF" : "rgba(255,255,255,0.15)")
                  : "transparent",
                borderLeft: isActive
                  ? (highContrast ? "4px solid #FFF" : "4px solid #60A5FA")
                  : "4px solid transparent",
                transition: "all 0.2s ease",
              })}
            >
              <span style={{ fontSize: navFontSize + 4, lineHeight: 1 }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className="sidebar-footer"
        style={{
          background: highContrast ? "#0F172A" : "rgba(15, 23, 42, 0.14)",
          borderTop: highContrast ? "1px solid #FFF" : "1px solid rgba(255,255,255,0.16)",
          borderRadius: "16px 16px 0 0",
          paddingTop: "10px",
        }}
      >
        <div style={{ height: "1px", background: highContrast ? "#FFF" : "rgba(255,255,255,0.1)", marginBottom: "20px" }} />

        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            background: highContrast ? "#FFF" : "rgba(248,113,113,0.16)",
            color: highContrast ? "#000" : "#FDE2E2",
            border: highContrast ? "2px solid #FFF" : "1px solid rgba(255,255,255,0.26)",
            borderRadius: "14px",
            padding: "13px",
            cursor: "pointer",
            fontSize: navFontSize,
            fontWeight: 700,
            fontFamily: "inherit",
            marginBottom: "16px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = highContrast ? "#FFF" : "rgba(248,113,113,0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = highContrast ? "#FFF" : "rgba(248,113,113,0.16)";
          }}
        >
          🚪 Sair
        </button>

        <p style={{ textAlign: "center", color: highContrast ? "#FFF" : "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>
          SeniorEase v1.0
        </p>
      </div>

    </aside>
  );
}