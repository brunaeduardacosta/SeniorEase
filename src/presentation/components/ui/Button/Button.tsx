import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useTheme } from "../../../styles/theme/useTheme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
};

export function Button({
  children,
  variant = "primary",
  size = "medium",
  style,
  disabled, // Extraído para facilitar a estilização condicional
  ...props
}: ButtonProps) {
  const theme = useTheme();

  // Detecta se o tema ativo é o de Alto Contraste baseado em uma cor única dele (ex: background preto)
  const isHighContrast = theme.colors.background === "#000000";

  const colors = {
    primary: {
      background: theme.colors.primary,
      color: isHighContrast ? "#000000" : theme.colors.surface, // No alto contraste, texto preto no fundo amarelo/ciano gera mais leitura
      borderColor: theme.colors.primary,
    },
    secondary: {
      // No alto contraste, o secundário vira um botão "vazado" (outline) para diferenciar nitidamente do primário
      background: isHighContrast ? "transparent" : theme.colors.border,
      color: theme.colors.text,
      borderColor: theme.colors.border,
    },
    danger: {
      background: theme.colors.danger,
      color: isHighContrast ? "#000000" : theme.colors.surface,
      borderColor: theme.colors.danger,
    },
  };

  const sizes = {
    small: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: "16px",
    },
    medium: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: "18px",
    },
    large: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: "20px",
    },
  };

  // Estilos aplicados quando o botão estiver desativado (ex: salvando dados)
  const disabledStyles = disabled
    ? {
        backgroundColor: isHighContrast ? "transparent" : "#E2E8F0",
        color: isHighContrast ? "#888888" : "#94A3B8",
        borderColor: isHighContrast ? "#888888" : "#CBD5E1",
        cursor: "not-allowed",
        opacity: isHighContrast ? 0.6 : 1,
      }
    : {};

  return (
    <button
      disabled={disabled}
      {...props}
      style={{
        width: "100%",
        minHeight: "56px",
        border: "2px solid",
        borderRadius: theme.radius.md,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all .2s ease-in-out",
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.xs,
        outline: "none", // Remove o outline padrão para usarmos uma borda estilizada no Focus abaixo

        ...colors[variant],
        ...sizes[size],
        ...disabledStyles, // Sobrescreve as cores caso esteja disabled
        ...style,
      }}
      // Feedback visual para navegação via teclado ou foco (essencial para acessibilidade)
      onFocus={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `0 0 0 4px ${isHighContrast ? "#FFFFFF" : theme.colors.primary + "40"}`; 
          e.currentTarget.style.transform = "scale(1.01)";
        }
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}