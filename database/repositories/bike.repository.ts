import { Bike, NewBike } from "@/types/Bike";

export const createBikeRepository = (db: any) => ({
  getBikes: async (): Promise<Bike[]> => {
    return await db.getAllAsync("SELECT * FROM bikes");
  },

  createBike: async (bike: NewBike) => {
    return await db.runAsync(
      `INSERT INTO bikes (brand, model, year, currentKm, imageUri)
       VALUES (?, ?, ?, ?, ?)`,
      [bike.brand, bike.model, bike.year, bike.currentKm, bike.imageUri],
    );
  },

  updateBike: async (id: number, fields: string[], values: any[]) => {
    const query = `
      UPDATE bikes
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    return await db.runAsync(query, [...values, id]);
  },

  deleteBike: async (id: number) => {
    return await db.runAsync(`DELETE FROM bikes WHERE id = ?`, [id]);
  },
});
