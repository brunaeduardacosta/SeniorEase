import { useMedicine } from "../../../contexts/medicine/useMedicine";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";

export function UpcomingMedicine() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { medicines } = useMedicine();

  const size = Math.max(fontSize, 18);

  // Ordena os remédios por horário (HH:mm)
  const sortedMedicines = [...medicines].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  // Descobre o horário atual no formato HH:mm
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  // Busca o primeiro remédio que ainda vai vencer hoje, ou pega o primeiro de amanhã
  const nextMedicine =
    sortedMedicines.find((med) => med.time >= currentTime) ||
    sortedMedicines[0];

  return (
    <div
      style={{
        background: highContrast ? "#000000" : theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        border: highContrast
          ? "3px solid #FFFF00"
          : `1px solid ${theme.colors.border}`,
        borderLeft: highContrast
          ? "10px solid #FFFF00"
          : `8px solid ${theme.colors.primary}`,
        boxShadow: highContrast ? "none" : theme.shadows.card,
        maxWidth: "600px",
      }}
    >
      <h2
        style={{
          margin: `0 0 ${theme.spacing.xs} 0`,
          fontSize: `${size + 4}px`,
          fontWeight: 800,
          color: highContrast ? "#FFFFFF" : theme.colors.text,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        💊 Próximo Medicamento
      </h2>

      {!nextMedicine ? (
        <p
          style={{
            margin: 0,
            fontSize: `${size}px`,
            color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
          }}
        >
          Nenhum medicamento cadastrado no momento.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: theme.spacing.xs,
          }}
        >
          {/* NOME DO REMÉDIO */}
          <h3
            style={{
              margin: 0,
              fontSize: `${size + 6}px`,
              fontWeight: 800,
              color: highContrast ? "#FFFF00" : theme.colors.primary,
            }}
          >
            {nextMedicine.name}
          </h3>

          {/* DESTaque DE HORÁRIO */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: theme.radius.md,
              background: highContrast ? "#FFFFFF" : `${theme.colors.primary}15`,
              color: highContrast ? "#000000" : theme.colors.primary,
              fontWeight: 800,
              fontSize: `${size + 2}px`,
              width: "fit-content",
            }}
          >
            ⏰ Horário: {nextMedicine.time}
          </div>

          {/* DOSAGEM */}
          {nextMedicine.dosage && (
            <p
              style={{
                margin: 0,
                fontSize: `${size}px`,
                fontWeight: 600,
                color: highContrast ? "#FFFFFF" : theme.colors.text,
              }}
            >
              💉 <strong>Dosagem:</strong> {nextMedicine.dosage}
            </p>
          )}

          {/* FREQUÊNCIA */}
          {nextMedicine.frequency && (
            <p
              style={{
                margin: 0,
                fontSize: `${Math.max(size - 2, 16)}px`,
                color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
              }}
            >
              📅 <strong>Frequência:</strong> {nextMedicine.frequency}
            </p>
          )}
        </div>
      )}
    </div>
  );
}