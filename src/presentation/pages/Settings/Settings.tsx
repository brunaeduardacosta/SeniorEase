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
  } = useAccessibility();

  return (
    <MainLayout>
      <PageTitle
        title="Configurações de acessibilidade"
        subtitle={
          simplifiedMode
            ? "Ajuste o visual do aplicativo."
            : "Personalize o SeniorEase para uma experiência mais confortável e adequada à sua visão."
        }
      />

      <div style={{ maxWidth: "800px" }}>
        <FontSizeSetting />
        
        <SpacingSetting />

        <ToggleSetting
          icon="👁️"
          title="Alto contraste"
          description="Ativa cores em preto e branco com bordas fortes para máxima legibilidade visual."
          isActive={highContrast}
          onToggle={setHighContrast}
        />

        <ToggleSetting
          icon="🖱️"
          title="Cursor grande"
          description="Aumenta o tamanho do cursor do mouse, facilitando identificar onde você está na tela."
          isActive={largeCursor}
          onToggle={setLargeCursor}
        />

        <ToggleSetting
          icon="🎯"
          title="Modo simplificado"
          description="Remove textos e decorações não essenciais para ajudar a manter o foco no que importa."
          isActive={simplifiedMode}
          onToggle={setSimplifiedMode}
        />
      </div>
    </MainLayout>
  );
}