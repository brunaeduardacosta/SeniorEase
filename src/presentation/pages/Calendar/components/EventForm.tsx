import { useState } from "react";
import { useCalendar } from "../../../contexts/calendar/useCalendar";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";
import type { CalendarEvent } from "../../../../domain/entities/CalendarEvent";

// Sugestões rápidas de horários mais comuns no dia a dia sênior
const QUICK_TIMES = [
  { label: "🌅 Manhã (08:00)", value: "08:00" },
  { label: "☀️ Meio-dia (12:00)", value: "12:00" },
  { label: "☕ Tarde (14:00)", value: "14:00" },
  { label: "🌙 Noite (19:00)", value: "19:00" },
];

// Mapeamento de Categorias com cores e emojis dedicados
const CATEGORIES: Array<{
  value: CalendarEvent["category"];
  label: string;
  color: string;
  icon: string;
}> = [
  { value: "Saúde", label: "Saúde", color: "#DC2626", icon: "🏥" },
  { value: "Estudo", label: "Estudo", color: "#2563EB", icon: "📚" },
  { value: "Pessoal", label: "Pessoal", color: "#16A34A", icon: "👤" },
  { value: "Outro", label: "Outro", color: "#64748B", icon: "📌" },
];

export function EventForm() {
  const theme = useTheme();
  const { fontSize, highContrast } = useAccessibility();
  const { addEvent } = useCalendar();

  const size = Math.max(fontSize, 18);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("08:00");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [category, setCategory] = useState<CalendarEvent["category"]>("Outro");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim() || !date) return;

    // Descobre a cor baseada na categoria selecionada
    const selectedCategoryObj = CATEGORIES.find((c) => c.value === category);
    const categoryColor = selectedCategoryObj ? selectedCategoryObj.color : "#64748B";

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: title.trim(),
      date,
      time,
      category,
      color: categoryColor,
      createdAt: new Date().toISOString(),
    };

    addEvent(newEvent);

    // Reseta o formulário mantendo os padrões
    setTitle("");
    setDate("");
    setTime("08:00");
    setCategory("Outro");
    setIsCustomTime(false);
  }

  const labelStyle = {
    fontSize: `${size}px`,
    fontWeight: 700,
    color: highContrast ? "#FFFFFF" : theme.colors.text,
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
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
      <h2 style={{ margin: 0, fontSize: `${size + 4}px`, fontWeight: 800, color: highContrast ? "#FFFFFF" : theme.colors.text }}>
        📅 Novo compromisso
      </h2>

      {/* TÍTULO DO COMPROMISSO */}
      <label style={labelStyle}>
        <span>
          Nome do compromisso <strong style={{ color: theme.colors.danger }}>*</strong>
        </span>
        <input
          type="text"
          required
          placeholder="Ex: Consulta médica, Tomar remédio..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
      </label>

      {/* DATA */}
      <label style={labelStyle}>
        <span>
          Data <strong style={{ color: theme.colors.danger }}>*</strong>
        </span>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />
      </label>

      {/* SELETOR DE CATEGORIA (Botões de Toque Amplo) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={labelStyle}>📁 Categoria do compromisso</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                style={{
                  padding: "12px 8px",
                  fontSize: `${Math.max(size - 2, 15)}px`,
                  fontWeight: 700,
                  borderRadius: theme.radius.md,
                  cursor: "pointer",
                  minHeight: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  border: isSelected
                    ? highContrast ? "3px solid #FFFF00" : `3px solid ${cat.color}`
                    : highContrast ? "2px solid #FFFFFF" : `1px solid ${theme.colors.border}`,
                  background: isSelected
                    ? highContrast ? "#FFFFFF" : `${cat.color}15` // Fundo levemente colorido
                    : highContrast ? "#000000" : theme.colors.background,
                  color: isSelected
                    ? highContrast ? "#000000" : cat.color
                    : highContrast ? "#FFFFFF" : theme.colors.text,
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELETOR DE HORÁRIO */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={labelStyle}>⏰ Horário do compromisso</span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "8px",
          }}
        >
          {QUICK_TIMES.map((item) => {
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
                  padding: "12px 10px",
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
                  minHeight: "52px",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

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
          <div style={{ marginTop: "8px" }}>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle}
            />
          </div>
        )}
      </div>

      {/* BOTÃO DE ENVIAR */}
      <button
        type="submit"
        style={{
          marginTop: theme.spacing.xs,
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
        ➕ Adicionar compromisso
      </button>
    </form>
  );
}