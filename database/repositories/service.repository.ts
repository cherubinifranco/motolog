import { NewService, UpdateService } from "@/types/Service";

export const createServiceRepository = (db: any) => ({
  getServiceById: async (id: number) => {
    return await db.getFirstAsync("SELECT * FROM services WHERE id = ?", [id]);
  },

  getServices: async () => {
    return await db.getAllAsync("SELECT * FROM services");
  },

  createService: async (service: NewService) => {
    return await db.runAsync(
      `INSERT INTO services (changeEvery, title, icon)
     VALUES (?, ?, ?)`,
      [service.changeEvery, service.title, service.icon],
    );
  },

  updateService: async (service: UpdateService) => {
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
  },

  deleteService: async (id: number) => {
    const query = `
        DELETE FROM services
        WHERE id = ?`;

    return await db.runAsync(query, [id]);
  },
});
