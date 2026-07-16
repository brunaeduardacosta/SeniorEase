import { NavLink, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: "270px",
        height: "100vh",
        background: "#1E3A8A",
        color: "#FFFFFF",
        padding: "30px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        boxShadow: "3px 0 12px rgba(0,0,0,.15)",
      }}
    >
      <div style={{ marginBottom: 45 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700 }}>
          SeniorEase
        </h1>
        <p style={{ marginTop: 8, color: "#CBD5E1", fontSize: 15 }}>
          Simples • Seguro • Acessível
        </p>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563EB" : "transparent",
          })}
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/tasks"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563EB" : "transparent",
          })}
        >
          📝 Minhas tarefas
        </NavLink>

        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            ...menuStyle,
            background: isActive ? "#2563EB" : "transparent",
          })}
        >
          ⚙️ Configurações
        </NavLink>

        <button onClick={() => navigate("/profile")} style={menuButton}>
          👤 Meu perfil
        </button>
      </nav>

      <div style={{ flex: 1 }} />

      <button onClick={() => navigate("/")} style={logoutButton}>
        🚪 Sair
      </button>

      <div style={{ textAlign: "center", color: "#CBD5E1", fontSize: 14 }}>
        SeniorEase v1.0
      </div>
    </aside>
  );
}

const menuStyle = {
  display: "block",
  textDecoration: "none",
  color: "#FFFFFF",
  padding: "15px 18px",
  borderRadius: "12px",
  fontSize: "18px",
  fontWeight: 500,
  transition: "0.2s",
};

const menuButton = {
  background: "transparent",
  border: "none",
  color: "#FFFFFF",
  textAlign: "left" as const,
  padding: "15px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: 500,
  fontFamily: "inherit",
  transition: "0.2s",
};

const logoutButton = {
  background: "#DC2626",
  color: "#FFFFFF",
  border: "none",
  borderRadius: 12,
  padding: "15px",
  cursor: "pointer",
  fontSize: 17,
  fontWeight: 600,
  marginBottom: 20,
  fontFamily: "inherit",
};