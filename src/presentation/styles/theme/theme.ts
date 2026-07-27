export const lightTheme = {
  colors: {
    // Cor de destaque / ações principais (Laranja quente para botões)
    primary: "#D97706",

    // Navegação e áreas estruturais (Cor fria de apoio)
    secondary: "#1E3A5F",

    // Fundo geral da aplicação (Cinza suave para reduzir brilho)
    background: "#F1F5F9",

    // Cards e superfícies de primeiro plano
    // CORRIGIDO: Branco controlado para criar separação nítida sobre o fundo cinza
    surface: "#FFFFFF",

    // Agrupamento de elementos secundários (Recomendação da pesquisa)
    group: "#E5E7EB",

    // Texto principal com alto contraste de claridade (Tons de preto)
    text: "#111827",

    // Texto secundário / Legendas
    // CORRIGIDO: Tom escurecido para atingir contraste seguro de leitura
    textSecondary: "#475569",

    // Bordas e divisores demarcados
    border: "#CBD5E1",

    // Estados e Feedbacks visuais
    success: "#15803D",
    warning: "#D97706",
    danger: "#B91C1C",
  },

  radius: {
    sm: "8px",
    md: "14px",
    lg: "20px",
  },

  spacing: {
    xs: "8px",
    sm: "16px",
    md: "24px", // Alinhado com o padrão de 24px/25px das telas
    lg: "32px",
    xl: "48px",
  },

  typography: {
    // Tamanhos robustos respeitando o limite mínimo de 12px da pesquisa
    body: "18px",
    small: "16px",
    title: "32px",
  },

  components: {
    // Altura ideal para clique confortável e sem erros
    buttonHeight: "56px",
  },

  shadows: {
    card: "0 4px 12px rgba(15,23,42,0.08)",
  },
};

export type AppTheme = typeof lightTheme;

export const highContrastTheme: AppTheme = {
  colors: {
    primary: "#FFD700",       // Amarelo puro
    secondary: "#FFFFFF",     // Branco puro

    background: "#000000",    // Fundo preto absoluto
    surface: "#111111",       // Superfície escura de suporte
    group: "#1F1F1F",

    text: "#FFFFFF",          // Texto branco puro
    textSecondary: "#FACC15", // Texto secundário amarelo vibrante

    border: "#FFFFFF",        // Divisores nítidos e demarcados

    success: "#00FF00",       // Verde puro
    warning: "#FFD700",       // Amarelo puro
    danger: "#FF4444",        // Vermelho puro
  },
  radius: lightTheme.radius,
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
  components: lightTheme.components,
  shadows: {
    card: "none", // No alto contraste eliminamos sombras e usamos apenas bordas fortes
  },
};