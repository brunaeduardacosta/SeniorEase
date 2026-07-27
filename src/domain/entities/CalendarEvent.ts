export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  category:
    | "Saúde"
    | "Estudo"
    | "Pessoal"
    | "Outro";

  color?: string;
  createdAt: string;
 medicineId?: string;
  completed?:boolean;
};