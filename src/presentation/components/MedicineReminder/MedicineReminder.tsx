import { useEffect, useState } from "react";
import { useMedicine } from "../../contexts/medicine/useMedicine";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../styles/theme/useTheme";
import { useCalendar } from "../../contexts/calendar/useCalendar";
import type { Medicine } from "../../../domain/entities/Medicine";

export function MedicineReminder() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { medicines, takeMedicine } = useMedicine();
  const { events } = useCalendar();

  // Estados do componente
  const [reminder, setReminder] = useState<Medicine | null>(null);
  const [takenMedicines, setTakenMedicines] = useState<string[]>([]);

  const size = Math.max(fontSize, 18);

  // Reset do histórico de confirmados no dia à meia-noite
  useEffect(() => {
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    const msToMidnight = night.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setTakenMedicines([]);
    }, msToMidnight);

    return () => clearTimeout(timer);
  }, [takenMedicines]);

  // Monitoramento do horário dos medicamentos
  useEffect(() => {
    function checkMedicineTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${hours}:${minutes}`;

      // Encontra o remédio do horário atual IGNORANDO os que já foram confirmados
      const medicineToTake = medicines.find(
        (item) => item.time === currentTime && !takenMedicines.includes(item.id)
      );

      if (medicineToTake && reminder?.id !== medicineToTake.id) {
        setReminder(medicineToTake);

        // Feedback sonoro acessível
        if ("speechSynthesis" in window) {
          const message = new SpeechSynthesisUtterance(
            `Atenção! Hora de tomar o medicamento: ${medicineToTake.name}`
          );
          message.lang = "pt-BR";
          window.speechSynthesis.speak(message);
        }
      }
    }

    checkMedicineTime();
    const interval = setInterval(checkMedicineTime, 10000);

    return () => clearInterval(interval);
  }, [medicines, reminder, takenMedicines]);

  if (!reminder) return null;

  return (
    <aside
      aria-live="assertive"
      role="dialog"
      aria-label="Alerta de Horário de Medicamento"
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        width: "90%",
        maxWidth: "380px",
        background: highContrast ? "#000000" : theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        boxShadow: highContrast
          ? "none"
          : "0 12px 32px rgba(0,0,0,0.25)",
        border: highContrast
          ? "4px solid #FFFF00"
          : `3px solid ${theme.colors.primary}`,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: `${size + 4}px`,
          fontWeight: 800,
          color: highContrast ? "#FFFF00" : theme.colors.primary,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        ⏰ Hora do Remédio!
      </h2>

      <h3
        style={{
          margin: 0,
          fontSize: `${size + 2}px`,
          fontWeight: 800,
          color: highContrast ? "#FFFFFF" : theme.colors.text,
        }}
      >
        💊 {reminder.name}
      </h3>

      {reminder.dosage && (
        <p
          style={{
            margin: 0,
            fontSize: `${size}px`,
            fontWeight: 700,
            color: highContrast ? "#FFFFFF" : theme.colors.textSecondary,
          }}
        >
          💉 Dosagem: {reminder.dosage}
        </p>
      )}

      {/* BOTÃO "JÁ TOMEI" INTEGRADO COM O HISTÓRICO E O CALENDÁRIO */}
      <button
        type="button"
        onClick={() => {
          const medicineEvent = events.find(
            (event) =>
              event.medicineId === reminder.id &&
              event.date === new Date().toLocaleDateString("pt-BR") &&
              event.time === reminder.time
          );

          takeMedicine(
            reminder,
            medicineEvent?.id
          );

          setTakenMedicines((previous) => [
            ...previous,
            reminder.id
          ]);

          setReminder(null);
        }}
        style={{
          marginTop: theme.spacing.xs,
          width: "100%",
          padding: "16px",
          borderRadius: theme.radius.md,
          border: highContrast ? "3px solid #FFFFFF" : "none",
          background: highContrast ? "#000000" : "#16A34A",
          color: highContrast ? "#FFFFFF" : "#FFFFFF",
          fontSize: `${size}px`,
          fontWeight: 800,
          cursor: "pointer",
          minHeight: "56px",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        ✓ Já tomei meu remédio
      </button>
    </aside>
  );
}