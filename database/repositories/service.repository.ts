import { NewService, UpdateService } from "@/types/Service";
import { db } from "../db";

export const getBServices = async () => {
  return await db.getAllAsync("SELECT * FROM services");
};

export const createBike = async (service: NewService) => {
  return await db.runAsync(
    `INSERT INTO services (changeEvery, title, icon)
     VALUES (?, ?, ?)`,
    [service.changeEvery, service.title, service.icon],
  );
};

export const updateBike = async (service: UpdateService) => {
  const acceptedFields = ["changeEvery", "title", "icon"] as const;

  const fields: string[] = [];
  const values: any[] = [];

  for (const field of acceptedFields) {
    const value = service[field];
    if (value !== undefined) {
      fields.push(`${field} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(service.id);

  const query = `
    UPDATE services
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  return await db.runAsync(query, values);
};

export const deleteService = async (id: number) => {
  const query = `
        DELETE FROM services
        WHERE id = ?`;

  return await db.runAsync(query, [id]);
};
