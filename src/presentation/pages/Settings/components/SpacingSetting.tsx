import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

export function SpacingSetting() {
  const { elementSpacing, setElementSpacing, fontSize, highContrast } = useAccessibility();

  const options = [
    { value: "small", label: "Pequeno" },
    { value: "medium", label: "Médio" },
    { value: "large", label: "Grande" },
  ];

  const cardStyle = {
    background: "#FFF",
    border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
    borderRadius: "24px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: highContrast ? "none" : "0 10px 25px rgba(0, 0, 0, 0.04)",
  };

  const containerBg = highContrast ? "#FFF" : "#F1F5F9";
  const activeBg = highContrast ? "#000" : "#2563EB";
  const activeColor = "#FFF";
  const inactiveColor = highContrast ? "#000" : "#64748B";

  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: fontSize + 6, fontWeight: 800, color: highContrast ? "#000" : "#1E293B", margin: "0 0 8px 0" }}>
        📏 Espaçamento da Tela
      </h2>
      <p style={{ fontSize, color: highContrast ? "#000" : "#64748B", margin: "0 0 24px 0", lineHeight: 1.5 }}>
        Ajuste a distância entre os botões e textos para evitar cliques acidentais.
      </p>

      <div
        style={{
          display: "flex",
          background: containerBg,
          padding: "6px",
          borderRadius: "20px",
          gap: "8px",
          boxShadow: highContrast ? "none" : "inset 0 2px 4px rgba(0,0,0,0.05)",
          border: highContrast ? "2px solid #000" : "none",
          flexWrap: "wrap",
        }}
      >
        {options.map((opt) => {
          const isActive = elementSpacing === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setElementSpacing(opt.value as any)}
              style={{
                flex: 1,
                minWidth: "100px",
                padding: "14px 16px",
                borderRadius: "14px",
                border: isActive ? "none" : (highContrast ? "2px solid #000" : "1px solid #CBD5E1"),
                background: isActive ? activeBg : (highContrast ? "#FFF" : "#F8FAFC"),
                color: isActive ? activeColor : inactiveColor,
                fontSize: fontSize,
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
