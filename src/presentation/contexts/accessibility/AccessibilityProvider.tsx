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


  const [elementSpacing, setElementSpacing] =
    useState<"small" | "medium" | "large">(() => {

      const saved = localStorage.getItem("elementSpacing");

      return (
        (saved as "small" | "medium" | "large")
        || "medium"
      );

    });


  const [largeCursor, setLargeCursor] = useState<boolean>(() => {

    const saved = localStorage.getItem("largeCursor");

    return saved === "true";

  });



  // NOVO: confirmação antes de ações críticas
  const [extraConfirmation, setExtraConfirmation] =
    useState<boolean>(() => {

      const saved =
        localStorage.getItem("extraConfirmation");

      return saved === "true";

    });



  useEffect(() => {

    localStorage.setItem(
      "fontSize",
      String(fontSize)
    );

  }, [fontSize]);



  useEffect(() => {

    localStorage.setItem(
      "highContrast",
      String(highContrast)
    );

  }, [highContrast]);



  useEffect(() => {

    localStorage.setItem(
      "simplifiedMode",
      String(simplifiedMode)
    );

  }, [simplifiedMode]);



  useEffect(() => {

    localStorage.setItem(
      "elementSpacing",
      elementSpacing
    );

  }, [elementSpacing]);



  useEffect(() => {

    localStorage.setItem(
      "largeCursor",
      String(largeCursor)
    );

  }, [largeCursor]);



  // NOVO
  useEffect(() => {

    localStorage.setItem(
      "extraConfirmation",
      String(extraConfirmation)
    );

  }, [extraConfirmation]);



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


        // NOVO
        extraConfirmation,
        setExtraConfirmation,

      }}

    >

      {children}

    </AccessibilityContext.Provider>

  );

}