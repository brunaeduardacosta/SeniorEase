export type MedicineHistory = {
  id: string;
  medicineId: string;
  calendarEventId?: string;
  medicineName: string;
  date: string;
  time: string;
  taken: boolean;
};