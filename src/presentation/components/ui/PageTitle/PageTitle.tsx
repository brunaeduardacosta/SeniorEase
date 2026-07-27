import { useTheme } from "../../../styles/theme/useTheme";

type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  const theme = useTheme();

  return (
    <header
      style={{
        marginBottom: theme.spacing.lg,
        width: "100%",
      }}
    >
      <h1
        style={{
          // CORRIGIDO: Consome o tamanho de título dinâmico do design system
          fontSize: theme.typography.title || "36px",
          color: theme.colors.secondary,
          margin: 0,
          fontWeight: 800, // Mantém o peso visual forte para identificação imediata da página
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            // CORRIGIDO: Vinculado aos 18px mínimos e confortáveis para o público idoso
            fontSize: theme.typography.body || "18px",
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.xs,
            marginBottom: 0,
            lineHeight: 1.5, // Espaçamento entre linhas ideal para leitura contínua
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}