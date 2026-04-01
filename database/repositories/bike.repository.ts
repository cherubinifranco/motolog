import { NewBike, UpdateBike } from "@/types/Bike";
import { db } from "../db";

export const getBikes = async () => {
  return await db.getAllAsync("SELECT * FROM bikes");
};

export const createBike = async (bike: NewBike) => {
  return await db.runAsync(
    `INSERT INTO bikes (brand, model, year, currentKm)
     VALUES (?, ?, ?, ?)`,
    [bike.brand, bike.model, bike.year, bike.currentKm],
  );
};

export const updateBike = async (bike: UpdateBike) => {
  const acceptedFields = ["brand", "model", "year", "currentKm"] as const;

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
    throw new Error("No fields to update");
  }

  values.push(bike.id);

  const query = `
    UPDATE bikes
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  return await db.runAsync(query, values);
};

export const deleteBike = async (id: number) => {
  const query = `
        DELETE FROM bikes
        WHERE id = ?`;

  return await db.runAsync(query, [id]);
};
