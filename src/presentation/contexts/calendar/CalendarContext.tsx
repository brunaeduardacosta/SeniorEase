import { createContext } from "react";
import type { CalendarEvent } from "../../../domain/entities/CalendarEvent";

export type CalendarContextType = {
  events: CalendarEvent[];

  addEvent: (event: CalendarEvent) => void;

  updateEvent: (event: CalendarEvent) => void;

  removeEvent: (id: string) => void;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);