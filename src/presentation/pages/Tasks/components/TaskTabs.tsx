import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type TaskTabsProps = {
  showHistory: boolean;
  setShowHistory: (val: boolean) => void;
};

export function TaskTabs({ showHistory, setShowHistory }: TaskTabsProps) {
  const { fontSize, highContrast } = useAccessibility();

  const activeBg = highContrast ? "#000" : "#2563EB";
  const activeColor = "#FFF";
  const inactiveBg = highContrast ? "#FFF" : "#F1F5F9";
  const inactiveColor = highContrast ? "#000" : "#64748B";

  return (
    <div
      style={{
        display: "flex",
        background: inactiveBg,
        padding: "6px",
        borderRadius: "20px",
        marginBottom: "30px",
        gap: "8px",
        boxShadow: highContrast ? "none" : "inset 0 2px 4px rgba(0,0,0,0.05)",
        border: highContrast ? "2px solid #000" : "none",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => setShowHistory(false)}
        style={{
          flex: 1,
          minWidth: "160px",
          padding: "16px 24px",
          borderRadius: "16px",
          border: "none",
          background: !showHistory ? activeBg : "transparent",
          color: !showHistory ? activeColor : inactiveColor,
          fontSize: fontSize + 2,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: !showHistory && !highContrast ? "0 4px 10px rgba(37, 99, 235, 0.2)" : "none",
        }}
      >
        📝 Tarefas Pendentes
      </button>

      <button
        onClick={() => setShowHistory(true)}
        style={{
          flex: 1,
          minWidth: "160px",
          padding: "16px 24px",
          borderRadius: "16px",
          border: "none",
          background: showHistory ? activeBg : "transparent",
          color: showHistory ? activeColor : inactiveColor,
          fontSize: fontSize + 2,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: showHistory && !highContrast ? "0 4px 10px rgba(37, 99, 235, 0.2)" : "none",
        }}
      >
        🕰️ Histórico de Concluídas
      </button>
    </div>
  );
}
