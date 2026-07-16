import type { ReactNode } from "react";
import { useAccessibility } from "./useAccessibility";

type Props = {
  children: ReactNode;
};

export function AccessibilityWrapper({ children }: Props) {
  const { fontSize, highContrast, simplifiedMode } = useAccessibility();

  return (
    <div
      style={{
        fontSize: `${fontSize}px`,
        background: highContrast ? "#FFFFFF" : undefined,
        color: highContrast ? "#000000" : undefined,
      }}
      className={simplifiedMode ? "simplified-mode" : ""}
    >
      {children}
    </div>
  );
}