import { useEffect, useState } from "react";
import { useTheme } from "../../../styles/theme/useTheme";

export function Clock() {
  const theme = useTheme();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // CORRIGIDO: Atualiza a cada 1 segundo (1000ms) para evitar que o relógio 
    // pareça travado ao carregar a página nos segundos finais de um minuto
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeLabel = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const rawDateLabel = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  // CORRIGIDO: Garante que a primeira letra do dia da semana seja sempre 
  // maiúscula (ex: "Domingo, 19 de julho"), facilitando o reconhecimento visual rápido
  const dateLabel = rawDateLabel.charAt(0).toUpperCase() + rawDateLabel.slice(1);

  return (
    <div
      role="time" // Informa semanticamente aos leitores de tela que esta área indica tempo/horário
      style={{
        background: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadows.card,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <h3
        style={{
          margin: `0 0 ${theme.spacing.xs} 0`,
          // Sincronizado com o tamanho padrão mínimo seguro
          fontSize: theme.typography.body, 
          color: theme.colors.text,
          fontWeight: 600,
        }}
      >
        Data e hora
      </h3>

      <h2
        style={{
          margin: `0 0 ${theme.spacing.xs} 0`,
          fontSize: "36px", // Aumentado ligeiramente para dar o destaque merecido ao relógio
          color: theme.colors.primary,
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        {timeLabel}
      </h2>

      <p
        style={{
          margin: 0,
          // CORRIGIDO: Elevado para os 18px confortáveis determinados pela pesquisa sênior
          fontSize: theme.typography.body, 
          color: theme.colors.textSecondary,
          lineHeight: 1.5,
        }}
      >
        {dateLabel}
      </p>
    </div>
  );
}