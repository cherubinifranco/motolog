export type Maintenance = {
  id: number;
  bikeId: number;
  serviceId: number;
  mileage: number;
  date: string;
  cost: number;
  note?: string;
};

export type ServiceLog = {
  id: number;
  bikeId: number;
  serviceId: number;
  mileage: number;
  date: string;
  cost: number;
  note?: string;
};

export type NewServiceLog = Omit<ServiceLog, "id">;

export type UpdateServiceLog = Partial<Omit<ServiceLog, "id">> & {
  id: number;
};
