import { useContext } from "react";
import { AccessibilityContext } from "./AccessibilityContext";

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      "useAccessibility deve ser usado dentro do AccessibilityProvider"
    );
  }

  return context;
}