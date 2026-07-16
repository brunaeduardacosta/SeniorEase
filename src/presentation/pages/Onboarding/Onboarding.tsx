// src/presentation/pages/Onboarding/Onboarding.tsx

import { useNavigate } from "react-router-dom";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import { saveAppSettings } from "../../../infrastructure/storage/appStorage";

export function Onboarding() {
  const navigate = useNavigate();

  const {
    setFontSize,
    setHighContrast,
    setSimplifiedMode,
  } = useAccessibility();

  function selectSimpleMode() {
    setFontSize(20);
    setHighContrast(true);
    setSimplifiedMode(true);

    saveAppSettings({ firstAccess: false });

    navigate("/tasks");
  }

  function selectStandardMode() {
    setFontSize(16);
    setHighContrast(false);
    setSimplifiedMode(false);

    saveAppSettings({ firstAccess: false });

    navigate("/tasks");
  }

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Bem-vindo ao SeniorEase</h1>

      <p>Escolha como você prefere usar o sistema:</p>

      <button onClick={selectSimpleMode} style={{ margin: 10, padding: 20 }}>
        👴 Modo Simples (Recomendado)
      </button>

      <button onClick={selectStandardMode} style={{ margin: 10, padding: 20 }}>
        💻 Modo Padrão
      </button>
    </div>
  );
}