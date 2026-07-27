import { MainLayout } from "../../layouts/MainLayout";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { useMedicine } from "../../contexts/medicine/useMedicine";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../styles/theme/useTheme";

export function MedicinesHistory() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { history } = useMedicine();

  const size = Math.max(fontSize, 18);

  // Ordena o histórico para mostrar o registro mais recente primeiro
  const reversedHistory = [...history].reverse();

  return (
    <MainLayout>
      <PageTitle
        title="Histórico de Medicamentos"
        subtitle="Veja os medicamentos que você já confirmou e tomou."
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.lg,
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {reversedHistory.length === 0 ? (
          <section
            style={{
              background: highContrast ? "#000000" : theme.colors.surface,
              padding: theme.spacing.md,
              borderRadius: theme.radius.lg,
              border: highContrast
                ? "3px solid #FFFFFF"
                : `1px solid ${theme.colors.border}`,
              boxShadow: highContrast ? "none" : theme.shadows.card,
            }}
          >
            <h2
              style={{
                margin: `0 0 ${theme.spacing.xs} 0`,
                fontSize: `${size + 4}px`,
                fontWeight: 800,
                color: highContrast ? "#FFFFFF" : theme.colors.text,
              }}
            >
              📋 Nenhum registro ainda
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: `${size}px`,
                color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
              }}
            >
              Quando você confirmar que tomou um remédio, o registro aparecerá aqui.
            </p>
          </section>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.md,
            }}
          >
            {reversedHistory.map((item) => (
              <div
                key={item.id}
                style={{
                  background: highContrast ? "#000000" : theme.colors.surface,
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.lg,
                  borderLeft: highContrast
                    ? "10px solid #00FF00"
                    : "8px solid #16A34A",
                  border: highContrast
                    ? "3px solid #FFFFFF"
                    : `1px solid ${theme.colors.border}`,
                  borderLeftWidth: highContrast ? "10px" : "8px",
                  boxShadow: highContrast ? "none" : theme.shadows.card,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: `${size + 2}px`,
                    fontWeight: 800,
                    color: highContrast ? "#FFFFFF" : theme.colors.text,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  ✓ {item.medicineName}
                </h2>

                <div
                  style={{
                    display: "flex",
                    gap: theme.spacing.md,
                    flexWrap: "wrap",
                    fontSize: `${size}px`,
                    color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
                  }}
                >
                  <span>📅 <strong>Data:</strong> {item.date}</span>
                  <span>⏰ <strong>Horário:</strong> {item.time}</span>
                </div>

                <span
                  style={{
                    marginTop: "4px",
                    fontSize: `${size}px`,
                    fontWeight: 800,
                    color: highContrast ? "#00FF00" : "#16A34A",
                  }}
                >
                  Medicamento tomado
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}