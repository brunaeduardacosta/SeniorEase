import { useUser } from "../../../contexts/user/useUser";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

export function Header() {
  const { name } = useUser();
  const { fontSize, highContrast } = useAccessibility();

  const displayName = name?.trim() ? name : "Usuário";

  return (
    <header
      style={{
        height: "80px",
        background: "#FFFFFF",
        borderBottom: highContrast ? "2px solid #000" : "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        boxSizing: "border-box",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: highContrast ? "#000" : "#1E293B",
            fontSize: fontSize + 8,
          }}
        >
          Olá, {displayName} 👋
        </h2>

        <span
          style={{
            color: highContrast ? "#000" : "#64748B",
            fontSize,
          }}
        >
          Bem-vindo ao SeniorEase
        </span>
      </div>

      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: highContrast ? "#000" : "#2563EB",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fontSize + 4,
          fontWeight: 700,
        }}
      >
        {displayName.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}