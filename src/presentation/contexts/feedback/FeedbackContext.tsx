import { createContext } from "react";

type FeedbackContextType = {
  message: string;
  showMessage: (msg: string) => void;
};

export const FeedbackContext = createContext<FeedbackContextType | null>(null);