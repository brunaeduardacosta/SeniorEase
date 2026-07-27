import { useAccessibility } from "../../contexts/accessibility/useAccessibility";
import {
  lightTheme,
  highContrastTheme,
} from "./theme";

export function useTheme() {
  const { highContrast } = useAccessibility();

  return highContrast
    ? highContrastTheme
    : lightTheme;
}