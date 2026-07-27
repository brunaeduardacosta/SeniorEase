import { useMedicine } from "../../../contexts/medicine/useMedicine";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";

export function MedicineList() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { medicines, removeMedicine } = useMedicine();

  const size = Math.max(fontSize, 18);

  const containerStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    background: highContrast ? "#000000" : theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    border: highContrast
      ? "3px solid #FFFFFF"
      : `1px solid ${theme.colors.border}`,
    boxShadow: highContrast ? "none" : theme.shadows.card,
  };

  if (medicines.length === 0) {
    return (
      <div style={containerStyle}>
        <h2
          style={{
            margin: `0 0 ${theme.spacing.xs} 0`,
            fontSize: `${size + 4}px`,
            fontWeight: 800,
            color: highContrast ? "#FFFFFF" : theme.colors.text,
          }}
        >
          💊 Seus medicamentos
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: `${size}px`,
            color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
          }}
        >
          Nenhum medicamento cadastrado no momento.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: `${size + 4}px`,
          fontWeight: 800,
          color: highContrast ? "#FFFFFF" : theme.colors.text,
        }}
      >
        💊 Seus medicamentos
      </h2>

      {medicines.map((medicine) => (
        <div
          key={medicine.id}
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: highContrast ? "#000000" : theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.md,
            borderLeft: highContrast
              ? "10px solid #FFFF00"
              : `8px solid ${theme.colors.primary}`,
            border: highContrast ? "3px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
            borderLeftWidth: highContrast ? "10px" : "8px",
            boxShadow: highContrast ? "none" : theme.shadows.card,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: theme.spacing.md,
          }}
        >
          {/* INFORMAÇÕES DO MEDICAMENTO */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: `${size + 2}px`,
                fontWeight: 800,
                color: highContrast ? "#FFFFFF" : theme.colors.text,
              }}
            >
              💊 {medicine.name}
            </h3>

            {medicine.dosage && (
              <p
                style={{
                  margin: 0,
                  fontSize: `${size}px`,
                  fontWeight: 600,
                  color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
                }}
              >
                💉 {medicine.dosage}
              </p>
            )}

            <p
              style={{
                margin: 0,
                fontSize: `${size}px`,
                fontWeight: 700,
                color: highContrast ? "#FFFF00" : theme.colors.primary,
              }}
            >
              ⏰ {medicine.time}
            </p>

            {medicine.frequency && (
              <p
                style={{
                  margin: 0,
                  fontSize: `${Math.max(size - 2, 16)}px`,
                  color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
                }}
              >
                📅 {medicine.frequency}
              </p>
            )}
          </div>

          {/* AÇÕES */}
          <button
            onClick={() => {
              const confirmDelete = window.confirm(
                `Deseja excluir o medicamento "${medicine.name}"?`
              );
              if (confirmDelete) {
                removeMedicine(medicine.id);
              }
            }}
            style={{
              padding: "12px 20px",
              borderRadius: theme.radius.md,
              border: highContrast ? "2px solid #FFFFFF" : "none",
              background: highContrast ? "#000000" : theme.colors.danger,
              color: highContrast ? "#FF0000" : "#FFFFFF",
              fontWeight: 800,
              fontSize: `${size - 2}px`,
              cursor: "pointer",
              minHeight: "48px",
              fontFamily: "inherit",
            }}
          >
            🗑 Excluir
          </button>
        </div>
      ))}
    </div>
  );
}