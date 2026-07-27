import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";

export function useCalendar() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      "useCalendar deve ser usado dentro de um CalendarProvider"
    );
  }

  return context;
}