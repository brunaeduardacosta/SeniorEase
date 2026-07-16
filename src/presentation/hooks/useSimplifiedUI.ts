import { useAccessibility } from "../contexts/accessibility/useAccessibility";

export function useSimplifiedUI() {
  const { simplifiedMode } = useAccessibility();

  return {
    simplifiedMode,

    spacing: simplifiedMode ? 20 : 10,
    fontScale: simplifiedMode ? 1.2 : 1,

    showAdvancedActions: !simplifiedMode,
  };
}