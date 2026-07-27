import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { AccessibilityContext } from "./AccessibilityContext";

type Props = {
  children: ReactNode;
};

export function AccessibilityProvider({ children }: Props) {
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? Number(saved) : 16;
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem("highContrast");
    return saved === "true";
  });

  const [simplifiedMode, setSimplifiedMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("simplifiedMode");
    return saved === "true";
  });

  const [elementSpacing, setElementSpacing] = useState<"small" | "medium" | "large">(
    () => {
      const saved = localStorage.getItem("elementSpacing");
      return (saved as "small" | "medium" | "large") || "medium";
    }
  );

  const [largeCursor, setLargeCursor] = useState<boolean>(() => {
    const saved = localStorage.getItem("largeCursor");
    return saved === "true";
  });

  const [extraConfirmation, setExtraConfirmation] = useState<boolean>(() => {
    const saved = localStorage.getItem("extraConfirmation");
    return saved === "true";
  });

  // --- PERSISTÊNCIA NO LOCALSTORAGE ---

  useEffect(() => {
    localStorage.setItem("fontSize", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("highContrast", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem("simplifiedMode", String(simplifiedMode));
  }, [simplifiedMode]);

  useEffect(() => {
    localStorage.setItem("elementSpacing", elementSpacing);
  }, [elementSpacing]);

  useEffect(() => {
    localStorage.setItem("largeCursor", String(largeCursor));
  }, [largeCursor]);

  useEffect(() => {
    localStorage.setItem("extraConfirmation", String(extraConfirmation));
  }, [extraConfirmation]);


  // --- INTEGRAÇÃO COM DOM GLOBAL (ACESSIBILIDADE) ---

  // 1. TEMA GLOBAL - ALTO CONTRASTE
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  // 2. CONTROLE DINÂMICO DE FONTE BASE
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // 3. CURSOR AMPLIADO
  useEffect(() => {
    if (largeCursor) {
      document.body.classList.add("large-cursor");
    } else {
      document.body.classList.remove("large-cursor");
    }
  }, [largeCursor]);

  // 4. NOVO: CONTROLE DINÂMICO DE ESPAÇAMENTO GLOBAL
  // Altera o valor da variável CSS no :root para que o projeto inteiro mude o gap e distâncias
  useEffect(() => {
    const spacingMap = {
      small: "16px",
      medium: "25px", // Alinhado com o padrão de 25px do perfil
      large: "40px"   // Maior espaçamento físico para evitar toques errados de idosos
    };

    const selectedSpacing = spacingMap[elementSpacing] || "25px";
    
    // Injeta a variável direto no :root (document.documentElement)
    document.documentElement.style.setProperty("--spacing-dynamic", selectedSpacing);
  }, [elementSpacing]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        simplifiedMode,
        setSimplifiedMode,
        elementSpacing,
        setElementSpacing,
        largeCursor,
        setLargeCursor,
        extraConfirmation,
        setExtraConfirmation,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}