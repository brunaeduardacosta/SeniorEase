import { useEffect, useState, type ReactNode } from "react";
import { MedicineContext } from "./MedicineContext";
import type { Medicine } from "../../../domain/entities/Medicine";
import type { MedicineHistory } from "../../../domain/entities/MedicineHistory";
import { useCalendar } from "../calendar/useCalendar";

interface MedicineProviderProps {
  children: ReactNode;
}

export function MedicineProvider({ children }: MedicineProviderProps) {
  const { addEvent, updateEvent, events } = useCalendar();

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem("medicines");
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState<MedicineHistory[]>(() => {
    const saved = localStorage.getItem("medicineHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem("medicineHistory", JSON.stringify(history));
  }, [history]);

  function addMedicine(medicine: Medicine) {
    setMedicines((previous) => [...previous, medicine]);

    const today = new Date();

    const createCalendarEvent = (date: Date) => {
      addEvent({
        id: crypto.randomUUID(),
        title: `💊 Tomar ${medicine.name}`,
        description: `${medicine.dosage} - ${medicine.frequency}`,
        date: date.toLocaleDateString("pt-BR"),
        time: medicine.time,
        category: "Saúde",
        medicineId: medicine.id,
        createdAt: today.toISOString(),
      });
    };

    /*
      TODOS OS DIAS
    */
    if (medicine.frequency === "Todos os dias") {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        createCalendarEvent(date);
      }
    }

    /*
      DIAS ÚTEIS
    */
    else if (medicine.frequency === "Apenas dias úteis") {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const day = date.getDay();

        // Segunda até sexta (0 = Domingo, 6 = Sábado)
        if (day !== 0 && day !== 6) {
          createCalendarEvent(date);
        }
      }
    }

    /*
      UMA VEZ POR SEMANA
    */
    else if (medicine.frequency === "Uma vez por semana") {
      if (medicine.daysOfWeek && medicine.daysOfWeek.length > 0) {
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          if (medicine.daysOfWeek.includes(date.getDay())) {
            createCalendarEvent(date);
          }
        }
      }
    }

    /*
      DIAS ESPECÍFICOS
    */
    else if (medicine.frequency === "Dias específicos") {
      if (medicine.daysOfWeek) {
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          if (medicine.daysOfWeek.includes(date.getDay())) {
            createCalendarEvent(date);
          }
        }
      }
    }

    /*
      CASO NECESSÁRIO / UMA VEZ
    */
    else {
      createCalendarEvent(today);
    }
  }

  function removeMedicine(id: string) {
    setMedicines((previous) => previous.filter((item) => item.id !== id));
  }

  function takeMedicine(medicine: Medicine, eventId?: string) {
    const now = new Date();

    const record: MedicineHistory = {
      id: crypto.randomUUID(),
      medicineId: medicine.id,
      calendarEventId: eventId,
      medicineName: medicine.name,
      date: now.toLocaleDateString("pt-BR"),
      time: medicine.time,
      taken: true,
    };

    setHistory((previous) => [...previous, record]);

    if (eventId) {
      const existingEvent = events.find((event) => event.id === eventId);
      if (existingEvent) {
        updateEvent({
          ...existingEvent,
          completed: true,
        });
      }
    }
  }

  return (
    <MedicineContext.Provider
      value={{
        medicines,
        addMedicine,
        removeMedicine,
        history,
        takeMedicine,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
}