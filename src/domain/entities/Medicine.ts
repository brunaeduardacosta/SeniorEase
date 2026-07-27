export type Medicine = {

  id: string;

  name: string;

  dosage: string;

  time: string;

  frequency: string;


  // Dias escolhidos para medicamentos semanais
  daysOfWeek?: number[];


  createdAt: string;

};