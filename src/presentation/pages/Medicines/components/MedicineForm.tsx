import { useState } from "react";
import { useMedicine } from "../../../contexts/medicine/useMedicine";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";
import type { Medicine } from "../../../../domain/entities/Medicine";

// Sugestões rápidas de horários habituais para idosos
const QUICK_MED_TIMES = [
  { label: "🌅 Café da manhã (08:00)", value: "08:00" },
  { label: "☀️ Almoço (12:00)", value: "12:00" },
  { label: "☕ Jantar (19:00)", value: "19:00" },
  { label: "🌙 Ao deitar (22:00)", value: "22:00" },
];

const WEEK_DAYS = [
  { label: "Domingo", value: 0 },
  { label: "Segunda", value: 1 },
  { label: "Terça", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
  { label: "Sábado", value: 6 },
];

export function MedicineForm() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { addMedicine } = useMedicine();

  const size = Math.max(fontSize, 18);

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("08:00");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [frequency, setFrequency] = useState("Todos os dias");
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);

  function toggleDay(day: number) {
    setDaysOfWeek((previous) => {
      if (previous.includes(day)) {
        return previous.filter((item) => item !== day);
      }
      return [...previous, day];
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim()) return;

    const medicine: Medicine = {
      id: crypto.randomUUID(),
      name: name.trim(),
      dosage: dosage.trim() || "Dose padrão",
      time: time || "08:00",
      frequency,
      daysOfWeek,
      createdAt: new Date().toISOString(),
    };

    addMedicine(medicine);

    // Limpa o formulário
    setName("");
    setDosage("");
    setTime("08:00");
    setFrequency("Todos os dias");
    setDaysOfWeek([]);
    setIsCustomTime(false);
  }

  const labelStyle = {
    fontSize: `${size}px`,
    fontWeight: 700,
    color: highContrast ? "#FFFFFF" : theme.colors.text,
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    width: "100%",
  };

  const inputStyle = {
    padding: "16px",
    fontSize: `${size}px`,
    borderRadius: theme.radius.md,
    border: highContrast ? "3px solid #FFFFFF" : `2px solid ${theme.colors.border}`,
    background: highContrast ? "#000000" : theme.colors.background,
    color: highContrast ? "#FFFFFF" : theme.colors.text,
    width: "100%",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
    minHeight: "56px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        background: highContrast ? "#000000" : theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        border: highContrast ? "3px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
        boxShadow: highContrast ? "none" : theme.shadows.card,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
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
        💊 Cadastrar Medicamento
      </h2>

      {/* NOME DO MEDICAMENTO */}
      <label style={labelStyle}>
        <span>
          Nome do remédio <strong style={{ color: theme.colors.danger }}>*</strong>
        </span>
        <input
          type="text"
          required
          placeholder="Ex: Losartana, Dorflex, Dipirona..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </label>

      {/* DOSAGEM */}
      <label style={labelStyle}>
        <span>Dosagem ou instrução</span>
        <input
          type="text"
          placeholder="Ex: 50mg, 1 comprimido, 20 gotas..."
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          style={inputStyle}
        />
      </label>

      {/* HORÁRIO DO REMÉDIO */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
        <span style={labelStyle}>⏰ Horário do remédio</span>

        {/* Botões de Seleção Rápida */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
            width: "100%",
          }}
        >
          {QUICK_MED_TIMES.map((item) => {
            const isSelected = time === item.value && !isCustomTime;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setTime(item.value);
                  setIsCustomTime(false);
                }}
                style={{
                  padding: "14px 12px",
                  fontSize: `${Math.max(size - 2, 15)}px`,
                  fontWeight: 700,
                  borderRadius: theme.radius.md,
                  cursor: "pointer",
                  border: isSelected
                    ? highContrast ? "3px solid #FFFF00" : `3px solid ${theme.colors.primary}`
                    : highContrast ? "2px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
                  background: isSelected
                    ? highContrast ? "#FFFFFF" : theme.colors.primary
                    : highContrast ? "#000000" : theme.colors.background,
                  color: isSelected
                    ? highContrast ? "#000000" : "#FFFFFF"
                    : highContrast ? "#FFFFFF" : theme.colors.text,
                  minHeight: "56px",
                  width: "100%",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Digitar outro horário específico */}
        {!isCustomTime ? (
          <button
            type="button"
            onClick={() => setIsCustomTime(true)}
            style={{
              background: "transparent",
              border: "none",
              color: highContrast ? "#FFFF00" : theme.colors.primary,
              textDecoration: "underline",
              fontSize: `${Math.max(size - 2, 15)}px`,
              fontWeight: 700,
              cursor: "pointer",
              padding: "8px 0",
              textAlign: "left",
            }}
          >
            ✏️ Escolher outro horário específico
          </button>
        ) : (
          <div style={{ marginTop: "8px", width: "100%" }}>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle}
            />
          </div>
        )}
      </div>

      {/* FREQUÊNCIA */}
      <label style={labelStyle}>
        <span>Com que frequência?</span>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          style={{
            ...inputStyle,
            cursor: "pointer",
          }}
        >
          <option value="Todos os dias">Todos os dias</option>
          <option value="Apenas dias úteis">Apenas dias úteis (Seg a Sex)</option>
          <option value="Uma vez por semana">Uma vez por semana</option>
          <option value="Dias específicos">Dias específicos da semana</option>
          <option value="Se necessário / Dor">Se necessário / Quando sentir dor</option>
        </select>
      </label>

      {/* SELEÇÃO DOS DIAS DA SEMANA */}
      {(frequency === "Uma vez por semana" || frequency === "Dias específicos") && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>Escolha os dias:</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "10px",
            }}
          >
            {WEEK_DAYS.map((day) => {
              const selected = daysOfWeek.includes(day.value);
              return (
                <button
                  type="button"
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  style={{
                    padding: "12px",
                    borderRadius: theme.radius.md,
                    cursor: "pointer",
                    fontWeight: 700,
                    border: selected
                      ? highContrast ? "3px solid #FFFF00" : `3px solid ${theme.colors.primary}`
                      : highContrast ? "2px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
                    background: selected
                      ? highContrast ? "#FFFFFF" : theme.colors.primary
                      : highContrast ? "#000000" : theme.colors.background,
                    color: selected
                      ? highContrast ? "#000000" : "#FFFFFF"
                      : highContrast ? "#FFFFFF" : theme.colors.text,
                  }}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* BOTÃO SUBMIT */}
      <button
        type="submit"
        style={{
          marginTop: theme.spacing.xs,
          width: "100%",
          padding: "16px 28px",
          fontSize: `${size + 2}px`,
          fontWeight: 800,
          borderRadius: theme.radius.md,
          cursor: "pointer",
          border: highContrast ? "3px solid #FFFF00" : "none",
          background: highContrast ? "#000000" : theme.colors.primary,
          color: highContrast ? "#FFFF00" : "#FFFFFF",
          minHeight: "56px",
          boxShadow: theme.shadows.card,
          fontFamily: "inherit",
        }}
      >
        ➕ Cadastrar medicamento
      </button>
    </form>
  );
}