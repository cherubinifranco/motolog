export type Bike = {
  id: number;
  brand: string;
  model: string;
  year: number;
  currentKm: number;
  imageUri?: string;
};

export type NewBike = Omit<Bike, "id">;

export type UpdateBike = Partial<Omit<Bike, "id">> & {
  id: number;
};
