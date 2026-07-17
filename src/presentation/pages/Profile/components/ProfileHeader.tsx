import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type ProfileHeaderProps = {
  name: string;
};

export function ProfileHeader({ name }: ProfileHeaderProps) {
  const { fontSize, highContrast } = useAccessibility();

  return (
    <div
      style={{
        background: "#FFF",
        border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
        borderRadius: "24px",
        padding: "28px",
        marginBottom: "24px",
        boxShadow: highContrast ? "none" : "0 10px 25px rgba(0, 0, 0, 0.04)",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: highContrast ? "#000" : "#2563EB",
          color: "#FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          fontWeight: 700,
          border: highContrast ? "3px solid #FFF" : "none",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>

      <div>
        <h2 style={{ margin: "0 0 4px 0", fontSize: fontSize + 10, fontWeight: 800, color: highContrast ? "#000" : "#1E293B" }}>
          {name}
        </h2>
        <p style={{ margin: 0, fontSize: fontSize, color: highContrast ? "#000" : "#64748B", fontWeight: 500 }}>
          Usuário SeniorEase
        </p>
      </div>
    </div>
  );
}
