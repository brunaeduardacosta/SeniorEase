import { useTheme } from "../../../styles/theme/useTheme";

type ActionCardProps = {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
};

export function ActionCard({
  icon,
  title,
  description,
  onClick,
}: ActionCardProps) {
  const theme = useTheme();

  // Tratamento para permitir que o usuário ative o card pressionando "Enter" ou "Espaço"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"           // Informa aos leitores de tela que isso age como um botão
      tabIndex={0}            // Permite que o card receba foco via tecla 'Tab'
      aria-label={`${title}. ${description}`} // Melhora a leitura contínua para o leitor de tela
      style={{
        background: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        cursor: "pointer",
        boxShadow: theme.shadows.card,
        border: `2px solid ${theme.colors.border}`, 
        transition: "transform .2s ease-in-out, box-shadow .2s ease-in-out, border-color .2s ease-in-out",
        outline: "none", 
      }}
      
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        if (theme.shadows.card !== "none") {
          e.currentTarget.style.boxShadow = "0 12px 30px rgba(15,23,42,.15)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadows.card;
      }}
      onFocus={(e) => {
        // Altera a cor de forma dinâmica usando a cor primária ativa do tema atual
        e.currentTarget.style.borderColor = theme.colors.primary;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onBlur={(e) => {
        // CORRIGIDO: Agora devolve a cor de borda correta consultando o tema atual ativo
        e.currentTarget.style.borderColor = theme.colors.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontSize: 48, 
          marginBottom: theme.spacing.sm,
          display: "inline-block"
        }}
        aria-hidden="true" 
      >
        {icon}
      </div>

      <h2
        style={{
          margin: 0,
          // CORRIGIDO: Puxa o título maior que definimos no ecossistema
          fontSize: theme.typography.title ? "24px" : "1.35rem", 
          color: theme.colors.text,
          fontWeight: 700,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: theme.colors.textSecondary,
          marginTop: theme.spacing.xs,
          // CORRIGIDO: Vinculado diretamente aos 18px confortáveis do seu design system sênior
          fontSize: theme.typography.body, 
          lineHeight: 1.6,     
        }}
      >
        {description}
      </p>
    </div>
  );
}