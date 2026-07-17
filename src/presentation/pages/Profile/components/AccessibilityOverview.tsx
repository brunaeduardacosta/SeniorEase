import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

export function AccessibilityOverview() {
  const { fontSize, highContrast, simplifiedMode } = useAccessibility();

  const itemStyle = {
    background: highContrast ? "#FFF" : "#F8FAFC",
    border: highContrast ? "2px solid #000" : "1px solid #E2E8F0",
    padding: "16px 20px",
    borderRadius: "16px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: "10px",
  };

  const labelStyle = {
    fontSize: fontSize,
    color: highContrast ? "#000" : "#475569",
    fontWeight: 600,
  };

  const valueStyle = {
    fontSize: fontSize + 2,
    color: highContrast ? "#000" : "#1E293B",
    fontWeight: 800,
  };

  return (
    <div
      style={{
        background: "#FFF",
        border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
        borderRadius: "24px",
        padding: "28px",
        boxShadow: highContrast ? "none" : "0 10px 25px rgba(0, 0, 0, 0.04)",
      }}
    >
      <h3 style={{ fontSize: fontSize + 4, margin: "0 0 20px 0", color: highContrast ? "#000" : "#1E293B" }}>
        Resumo de Acessibilidade
      </h3>

      <div style={itemStyle}>
        <span style={labelStyle}>🔤 Tamanho da fonte</span>
        <span style={valueStyle}>{fontSize}px</span>
      </div>

      <div style={itemStyle}>
        <span style={labelStyle}>👁️ Alto contraste</span>
        <span style={valueStyle}>{highContrast ? "Ativado" : "Desativado"}</span>
      </div>

      <div style={itemStyle}>
        <span style={labelStyle}>🧩 Modo simplificado</span>
        <span style={valueStyle}>{simplifiedMode ? "Ativado" : "Desativado"}</span>
      </div>
    </div>
  );
}
