import type { ReactNode, CSSProperties } from "react";
import { useTheme } from "../../../styles/theme/useTheme";

type CardProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  icon?: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};

export function Card({
  children,
  title,
  description,
  icon,
  onClick,
  style,
}: CardProps) {
  const theme = useTheme();

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (!onClick) return;

    if (event.key === "Enter" || event.key === " ") {
      // Previne o comportamento padrão da barra de espaço (dar scroll na página) 
      // quando o usuário estiver tentando ativar o botão
      event.preventDefault();
      onClick();
    }
  }

  // Funções reaproveitáveis para dar feedback tanto para mouse quanto para teclado
  function aplicarEfeitoAtivo(target: HTMLElement) {
    if (!onClick) return;
    target.style.transform = "translateY(-4px)";
    target.style.boxShadow = "0 12px 30px rgba(15,23,42,0.15)";
  }

  function removerEfeitoAtivo(target: HTMLElement) {
    if (!onClick) return;
    target.style.transform = "translateY(0)";
    target.style.boxShadow = theme.shadows.card;
  }

  return (
    <section
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      
      // Sincroniza o teclado para dar o mesmo feedback visual do mouse
      onFocus={(event) => aplicarEfeitoAtivo(event.currentTarget)}
      onBlur={(event) => removerEfeitoAtivo(event.currentTarget)}
      
      onMouseEnter={(event) => aplicarEfeitoAtivo(event.currentTarget)}
      onMouseLeave={(event) => removerEfeitoAtivo(event.currentTarget)}
      
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,
        boxShadow: theme.shadows.card,
        border: `1px solid ${theme.colors.border}`,
        transition: "transform .2s ease, box-shadow .2s ease, outline .1s ease",
        cursor: onClick ? "pointer" : "default",
        
        // Garante que o contorno de foco por teclado use nossa cor acessível
        outlineColor: theme.colors.primary,
        outlineOffset: "4px",
        
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: "42px",
            marginBottom: theme.spacing.sm,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
      )}

      {title && (
        <h2
          style={{
            margin: 0,
            marginBottom: theme.spacing.xs,
            fontSize: "24px",
            color: theme.colors.text,
            fontWeight: 700, // Força peso visual para leitura clara
          }}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          style={{
            margin: 0,
            // CORRIGIDO: Agora usa os 18px do seu padrão de tipografia sênior
            fontSize: theme.typography.body, 
            lineHeight: 1.5,
            color: theme.colors.textSecondary,
          }}
        >
          {description}
        </p>
      )}

      {children}
    </section>
  );
}