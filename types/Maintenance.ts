export type Maintenance = {
  id: number;
  bikeId: number;
  serviceId: number;
  mileage: number;
  date: string;
  cost: number;
  note?: string;
};
