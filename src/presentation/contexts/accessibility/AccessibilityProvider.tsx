import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  AccessibilityContext
} from "./AccessibilityContext";


type Props = {
  children: ReactNode;
};



export function AccessibilityProvider({
  children
}: Props) {


  const [fontSize, setFontSize] = useState<number>(() => {

    const saved =
      localStorage.getItem("fontSize");

    return saved
      ? Number(saved)
      : 16;

  });



  const [highContrast, setHighContrast] =
  useState<boolean>(() => {

    const saved =
      localStorage.getItem("highContrast");

    return saved === "true";

  });



  const [simplifiedMode, setSimplifiedMode] =
  useState<boolean>(() => {

    const saved =
      localStorage.getItem("simplifiedMode");

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






  return (

    <AccessibilityContext.Provider

      value={{

        fontSize,

        setFontSize,


        highContrast,

        setHighContrast,


        simplifiedMode,

        setSimplifiedMode,

      }}

    >

      {children}

    </AccessibilityContext.Provider>

  );

}