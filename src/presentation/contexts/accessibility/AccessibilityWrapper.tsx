import type { ReactNode } from "react";
import { useAccessibility } from "./useAccessibility";
import { LargeCursor } from "../../components/ui/LargeCursor/LargeCursor";

type AccessibilityWrapperProps = {
  children: ReactNode;
};

export function AccessibilityWrapper({ children }: AccessibilityWrapperProps) {
  const { fontSize, highContrast, simplifiedMode, largeCursor } = useAccessibility();

  return (
    <>
      <div
        style={{
          fontSize: `${fontSize}px`,
          filter: highContrast ? "contrast(1.2)" : "none",
          letterSpacing: simplifiedMode ? "0.05em" : "normal",
        }}
      >
        {children}
      </div>

      {largeCursor && <LargeCursor />}
    </>
  );
}