import { useContext } from "react";
import { FeedbackContext } from "./FeedbackContext";

export function useFeedback() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedback deve ser usado dentro do FeedbackProvider");
  }

  return context;
}