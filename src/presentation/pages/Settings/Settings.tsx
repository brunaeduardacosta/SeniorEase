import { MainLayout } from "../../layouts/MainLayout";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import { FontSizeSetting } from "./components/FontSizeSetting";
import { SpacingSetting } from "./components/SpacingSetting";
import { ToggleSetting } from "./components/ToggleSetting";

export function Settings() {
  const {
    highContrast,
    setHighContrast,
    simplifiedMode,
    setSimplifiedMode,
    largeCursor,
    setLargeCursor,
    extraConfirmation,
    setExtraConfirmation,
    elementSpacing, // 1. Resgatamos a preferência de espaçamento do usuário aqui
  } = useAccessibility();

  // 2. Mapeamos o estado de espaçamento para valores reais em pixels adaptados para o Grid
  const gapSizes = {
    small: "16px",
    medium: "25px",  /* Mantém os 25px padrão do perfil como o nível médio */
    large: "40px",   /* Afasta bem mais para evitar cliques falsos/mãos trêmulas */
  };

  return (
    <MainLayout>
      <PageTitle
        title="Configurações de acessibilidade"
        subtitle={
          simplifiedMode
            ? "Ajuste o visual do aplicativo do seu jeito."
            : "Personalize o SeniorEase para uma experiência mais confortável e adequada à sua visão ou coordenação."
        }
      />

      {/* CORRIGIDO: Agora o contêiner usa Grid, mantém o limite de 900 de largura, 
          mas o gap (espaço entre os itens) reage dinamicamente à escolha do idoso! */}
      <div 
        style={{ 
          display: "grid", 
          maxWidth: 900, 
          gap: gapSizes[elementSpacing] || "25px", /* Se der erro, cai no padrão de 25px */
        }}
      >
        <FontSizeSetting />
        <SpacingSetting />

        <ToggleSetting
          icon="👁️"
          title="Alto contraste"
          description={
            simplifiedMode
              ? "Deixa a tela escura com letras brancas fáceis de ler."
              : "Ativa cores em preto, branco e amarelo com contornos fortes para máxima legibilidade visual."
          }
          isActive={highContrast}
          onToggle={setHighContrast}
        />

        <ToggleSetting
          icon="🖱️"
          title="Cursor grande"
          description={
            simplifiedMode
              ? "Deixa a seta do mouse bem maior."
              : "Aumenta o tamanho do cursor do mouse, facilitando identificar onde você está mexendo na tela."
          }
          isActive={largeCursor}
          onToggle={setLargeCursor}
        />

        <ToggleSetting
          icon="🎯"
          title="Modo simplificado"
          description={
            simplifiedMode
              ? "Desative para voltar a ver todas as explicações longas."
              : "Esconde textos explicativos longos e decorações para focar apenas nas ações principais."
          }
          isActive={simplifiedMode}
          onToggle={setSimplifiedMode}
        />

        <ToggleSetting
          icon="⚠️"
          title="Confirmação antes de ações importantes"
          description={
            simplifiedMode
              ? "Pergunta 'Tem certeza?' antes de apagar coisas."
              : "Solicita uma confirmação extra na tela antes de excluir tarefas ou realizar ações irreversíveis."
          }
          isActive={extraConfirmation}
          onToggle={setExtraConfirmation}
        />
      </div>
    </MainLayout>
  );
}