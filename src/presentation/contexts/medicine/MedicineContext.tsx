import { createContext } from "react";
import type { Medicine } from "../../../domain/entities/Medicine";
import type { MedicineHistory } from "../../../domain/entities/MedicineHistory";

export type MedicineContextType = {
  medicines: Medicine[];

  addMedicine: (medicine: Medicine) => void;

  removeMedicine: (id: string) => void;

  history: MedicineHistory[];

  takeMedicine: (medicine: Medicine, eventId?: string) => void;
};

export const MedicineContext = createContext<MedicineContextType | null>(null);