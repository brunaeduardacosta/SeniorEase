import { useState, type InputHTMLAttributes } from "react";
import { useTheme } from "../../../styles/theme/useTheme";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, id, ...props }: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Gera um ID consistente para ligar o Label e a mensagem de Erro ao Input
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = `${inputId}-error`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.xs,
        width: "100%",
      }}
    >
      {label && (
        <label
          htmlFor={inputId} // Crucial para o idoso poder clicar no texto do label e focar o input
          style={{
            fontSize: "20px", // Aumentado para melhor reconhecimento visual do campo
            fontWeight: 700,
            color: theme.colors.text,
          }}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        aria-invalid={!!error} // Avisa o leitor de tela que o campo possui um valor inválido
        aria-describedby={error ? errorId : undefined} // Vincula o áudio do erro ao focar o campo
        
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        style={{
          padding: theme.spacing.sm,
          fontSize: "18px", // Perfeito para leitura e digitação sem zoom indesejado no iOS
          borderRadius: theme.radius.md,
          
          // CORRIGIDO: Ordem de prioridade visual: Foco > Erro > Borda Comum
          border: isFocused
            ? `2px solid ${theme.colors.primary}`
            : error
            ? `2px solid ${theme.colors.danger}`
            : `2px solid ${theme.colors.border}`,
          
          outline: "none",
          minHeight: theme.components.buttonHeight || "56px", // Alinhado ao grid de botões do seu tema
          boxSizing: "border-box",
          background: theme.colors.surface,
          color: theme.colors.text,
          fontFamily: "inherit",
          transition: "border-color .2s ease, box-shadow .2s ease",
          
          // Adiciona uma leve sombra colorida no foco para aumentar a percepção do campo ativo
          boxShadow: isFocused 
            ? `0 0 0 3px ${theme.colors.primary}20` 
            : "none",
          
          ...style,
        }}
      />

      {error && (
        <span
          id={errorId}
          role="alert" // Força o leitor de tela a ditar o erro assim que ele aparecer
          style={{
            color: theme.colors.danger,
            fontSize: theme.typography.body || "18px", // Elevado para 18px garantindo leitura do aviso
            fontWeight: 700,
            marginTop: "2px",
          }}
        >
          ⚠️ {error} {/* Adicionado o emoji para reforço visual além da cor */}
        </span>
      )}
    </div>
  );
}