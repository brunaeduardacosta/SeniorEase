import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

export function FontSizeSetting() {
  const { fontSize, setFontSize, highContrast } = useAccessibility();

  const cardStyle = {
    background: "#FFF",
    border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
    borderRadius: "24px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: highContrast ? "none" : "0 10px 25px rgba(0, 0, 0, 0.04)",
  };

  const options = [
    { value: 14, label: "Normal" },
    { value: 18, label: "Maior" },
    { value: 22, label: "Muito grande" },
  ];

  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: fontSize + 6, fontWeight: 800, color: highContrast ? "#000" : "#1E293B", margin: "0 0 8px 0" }}>
        🔤 Tamanho da Fonte
      </h2>
      <p style={{ fontSize, color: highContrast ? "#000" : "#64748B", margin: "0 0 20px 0", lineHeight: 1.5 }}>
        Escolha um tamanho que deixe a leitura mais confortável.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {options.map((option) => {
          const isActive = fontSize === option.value;

          return (
            <button
              key={option.value}
              onClick={() => setFontSize(option.value)}
              style={{
                flex: "1 1 110px",
                padding: "12px 14px",
                borderRadius: "14px",
                border: highContrast ? "2px solid #000" : "1px solid #CBD5E1",
                background: isActive ? (highContrast ? "#000" : "#2563EB") : "#F8FAFC",
                color: isActive ? "#FFF" : (highContrast ? "#000" : "#334155"),
                fontSize: fontSize - 2,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "16px", fontWeight: 700, fontSize: fontSize, color: highContrast ? "#000" : "#2563EB" }}>
        Tamanho atual: {fontSize}px
      </div>
    </div>
  );
}
