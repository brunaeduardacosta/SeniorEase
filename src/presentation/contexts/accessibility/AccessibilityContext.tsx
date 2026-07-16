import { createContext } from "react";

import type {
  AccessibilityContextType
} from "./AccessibilityContextType";


export const AccessibilityContext =
createContext<AccessibilityContextType | undefined>(
  undefined
);