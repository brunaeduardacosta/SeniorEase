import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type ToggleSettingProps = {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: (val: boolean) => void;
  icon?: string;
};

export function ToggleSetting({ title, description, isActive, onToggle, icon }: ToggleSettingProps) {
  const { fontSize, highContrast } = useAccessibility();

  const cardStyle = {
    background: "#FFF",
    border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
    borderRadius: "24px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: highContrast ? "none" : "0 10px 25px rgba(0, 0, 0, 0.04)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap" as const,
  };

  const toggleBg = isActive ? (highContrast ? "#000" : "#16A34A") : (highContrast ? "#FFF" : "#E2E8F0");
  const toggleBorder = highContrast ? "3px solid #000" : "none";
  const circlePos = isActive ? "calc(100% - 34px)" : "4px";

  return (
    <div style={cardStyle}>
      <div style={{ flex: "1 1 250px" }}>
        <h2 style={{ fontSize: fontSize + 6, fontWeight: 800, color: highContrast ? "#000" : "#1E293B", margin: "0 0 8px 0" }}>
          {icon && <span style={{ marginRight: "10px" }}>{icon}</span>}
          {title}
        </h2>
        <p style={{ fontSize, color: highContrast ? "#000" : "#64748B", margin: 0, lineHeight: 1.5 }}>
          {description}
        </p>
      </div>

      <button
        onClick={() => onToggle(!isActive)}
        style={{
          width: "74px",
          height: "42px",
          borderRadius: "40px",
          background: toggleBg,
          border: toggleBorder,
          position: "relative",
          cursor: "pointer",
          transition: "background 0.3s ease",
          padding: 0,
          flexShrink: 0,
          boxShadow: isActive && !highContrast ? "0 4px 12px rgba(22, 163, 74, 0.3)" : "none",
        }}
        aria-pressed={isActive}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            background: isActive && highContrast ? "#FFF" : (highContrast ? "#000" : "#FFF"),
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: circlePos,
            transition: "left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            boxShadow: highContrast ? "none" : "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />
      </button>
    </div>
  );
}
