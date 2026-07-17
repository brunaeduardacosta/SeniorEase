import type { ReactNode } from "react";
import { useAccessibility } from "./useAccessibility";

type Props = {
  children: ReactNode;
};

export function AccessibilityWrapper({ children }: Props) {
  const { fontSize, highContrast, simplifiedMode, elementSpacing } = useAccessibility();

  const spacingClass = `spacing-${elementSpacing}`;
  const simplifiedClass = simplifiedMode ? "simplified-mode" : "";

  return (
    <div
      style={{
        fontSize: `${fontSize}px`,
        background: highContrast ? "#FFFFFF" : undefined,
        color: highContrast ? "#000000" : undefined,
        "--app-spacing": elementSpacing === "small" ? "8px" : elementSpacing === "large" ? "32px" : "16px",
      } as React.CSSProperties}
      className={`${simplifiedClass} ${spacingClass}`.trim()}
    >
      {children}
    </div>
  );
}