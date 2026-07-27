import { useTheme } from "../../../styles/theme/useTheme";

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  const theme = useTheme();

  // Garante que o valor fique estritamente entre 0 e 100
  const progressValue = Math.min(100, Math.max(0, value));

  return (
    <div 
      style={{ 
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.xs // Espaçamento entre a barra e o texto indicador
      }}
    >
      {/* CONTAINER DO TRILHO (Track) */}
      <div
        role="progressbar"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
        // Texto descritivo explícito para o leitor de tela
        aria-valuetext={`${progressValue} por cento concluído`} 
        style={{
          width: "100%",
          height: "28px", // CORRIGIDO: Aumentado de 18px para 28px para excelente visibilidade
          background: theme.colors.group || theme.colors.border, // Fundo ligeiramente mais visível
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${theme.colors.border}`, // Borda de segurança isoladora
          boxSizing: "border-box"
        }}
      >
        {/* BARRA DE PREENCHIMENTO (Fill) */}
        <div
          style={{
            width: `${progressValue}%`,
            height: "100%",
            background: theme.colors.primary,
            transition: "width .4s cubic-bezier(0.4, 0, 0.2, 1)", // Transição mais suave
            borderRadius: "14px",
          }}
        />
      </div>

      {/* TEXTO DE APOIO: Fundamental para idosos não dependerem apenas da estimativa visual */}
      <span
        style={{
          fontSize: theme.typography.body || "18px", // Mínimo de 18px para leitura sênior
          fontWeight: 700,
          color: theme.colors.text,
          alignSelf: "flex-end", // Alinha à direita para seguir o fluxo da conclusão
        }}
      >
        {progressValue}%
      </span>
    </div>
  );
}