import { Bike, NewBike, UpdateBike } from "@/types/Bike";

const acceptedFields = ["brand", "model", "year", "currentKm"] as const;

export const createBikeService = (repository: any) => ({
  getBikes: async (): Promise<Bike[]> => {
    return repository.getBikes();
  },

  createBike: async (bike: NewBike) => {
    if (!bike.brand || bike.brand.trim() === "") {
      throw new Error("La marca es requerida");
    }

    if (!bike.model || bike.model.trim() === "") {
      throw new Error("El modelo es requerido");
    }

    if (bike.year < 1) {
      throw new Error("Año inválido");
    }

    if (bike.currentKm < 0) {
      throw new Error("El kilometraje no puede ser negativo");
    }

    const result = await repository.createBike(bike);

    return {
      id: result.lastInsertRowId,
      ...bike,
    };
  },

  updateBike: async (bike: UpdateBike) => {
    if (!bike.id) {
      throw new Error("ID requerido");
    }

    const fields: string[] = [];
    const values: any[] = [];

    for (const field of acceptedFields) {
      const value = bike[field];
      if (value !== undefined) {
        fields.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error("No hay campos para actualizar");
    }

    return repository.updateBike(bike.id, fields, values);
  },

  deleteBike: async (id: number) => {
    if (!id) {
      throw new Error("ID requerido");
    }

    return repository.deleteBike(id);
  },
});
