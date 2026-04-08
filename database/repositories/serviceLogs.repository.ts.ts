import {
  LastServiceBike,
  NewServiceLog,
  ServiceLog,
  UpdateServiceLog,
} from "@/types/ServiceLog";

export const createServiceLogsRepository = (db: any) => ({
  getServiceLogs: async (): Promise<ServiceLog[]> => {
    return await db.getAllAsync("SELECT * FROM service_logs");
  },

  getLastServiceBike: async (serviceLog: LastServiceBike) => {
    const sql = `
      SELECT * FROM service_logs
      WHERE bikeId = ? AND serviceId = ?
      ORDER BY date DESC
      LIMIT 1
      `;

    const values = [serviceLog.bikeId, serviceLog.serviceId];

    return await db.getFirstAsync(sql, values);
  },

  getServiceBike: async (serviceLog: LastServiceBike) => {
    const sql = `
    SELECT * FROM service_logs
    WHERE bikeId = ? AND serviceId = ?
    ORDER BY serviceDate DESC`;

    const values = [serviceLog.bikeId, serviceLog.serviceId];

    return await db.getAllAsync(sql, values);
  },

  createServiceLog: async (service_log: NewServiceLog) => {
    const fields = ["bikeId", "serviceId", "mileage", "serviceDate", "cost"];
    const values = [
      service_log.bikeId,
      service_log.serviceId,
      service_log.mileage,
      service_log.serviceDate,
      service_log.cost,
    ];

    if (service_log.note !== undefined) {
      fields.push("note");
      values.push(service_log.note);
    }

    const placeholders = fields.map(() => "?").join(", ");

    const query = `
    INSERT INTO service_logs (${fields.join(", ")})
    VALUES (${placeholders})
  `;

    return await db.runAsync(query, values);
  },

  updateServiceLog: async (service_log: UpdateServiceLog) => {
    const acceptedFields = [
      "bikeId",
      "serviceId",
      "mileage",
      "serviceDate",
      "cost",
      "note",
    ] as const;

    const fields: string[] = [];
    const values: any[] = [];

    for (const field of acceptedFields) {
      const value = service_log[field];
      if (value !== undefined) {
        fields.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(service_log.id);

    const query = `
    UPDATE service_logs
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

    return await db.runAsync(query, values);
  },

  deleteServiceLog: async (id: number) => {
    const query = `
        DELETE FROM service_log
        WHERE id = ?`;

    return await db.runAsync(query, [id]);
  },
});
