import {
  NewServiceLog,
  ServiceBike,
  ServiceLog,
  UpdateServiceLog,
} from "@/types/ServiceLog";

export const createServiceLogsRepository = (db: any) => ({
  fetchLogs: async (offset = 0, limit = 100) => {
    const logs = await db.allAsync(
      `SELECT * FROM service_logs ORDER BY serviceDate DESC LIMIT ? OFFSET ?`,
      [limit, offset],
    );
    return logs;
  },

  getServiceLogsByYear: async (year: number): Promise<ServiceLog[]> => {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const logs = await db.getAllAsync(
      `
      SELECT *
      FROM service_logs
      WHERE serviceDate BETWEEN ? AND ?
      ORDER BY serviceDate DESC
    `,
      [startDate, endDate],
    );

    return logs;
  },

  getServiceLogs: async (): Promise<ServiceLog[]> => {
    return await db.getAllAsync(
      "SELECT * FROM service_logs ORDER BY serviceDate DESC",
    );
  },

  getLastServiceBike: async (serviceLog: ServiceBike) => {
    const sql = `
      SELECT * FROM service_logs
      WHERE bikeId = ? AND serviceId = ?
      ORDER BY serviceDate DESC
      LIMIT 1
      `;

    const values = [serviceLog.bikeId, serviceLog.serviceId];

    return await db.getFirstAsync(sql, values);
  },

  getServiceBike: async (serviceLog: ServiceBike) => {
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
        DELETE FROM service_logs
        WHERE id = ?`;

    return await db.runAsync(query, [id]);
  },

  getFilteredServiceLogs: async ({
    bikeId,
    serviceId,
    startDate,
    endDate,
    offset = 0,
    limit = 100,
  }: {
    bikeId?: number;
    serviceId?: number;
    startDate?: string;
    endDate?: string;
    offset?: number;
    limit?: number;
  }): Promise<ServiceLog[]> => {
    const conditions: string[] = [];
    const values: any[] = [];

    if (bikeId !== undefined) {
      conditions.push("bikeId = ?");
      values.push(bikeId);
    }

    if (serviceId !== undefined) {
      conditions.push("serviceId = ?");
      values.push(serviceId);
    }

    if (startDate !== undefined && endDate !== undefined) {
      conditions.push("serviceDate BETWEEN ? AND ?");
      values.push(startDate, endDate);
    } else if (startDate !== undefined) {
      conditions.push("serviceDate >= ?");
      values.push(startDate);
    } else if (endDate !== undefined) {
      conditions.push("serviceDate <= ?");
      values.push(endDate);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
    SELECT *
    FROM service_logs
    ${whereClause}
    ORDER BY serviceDate DESC
    LIMIT ? OFFSET ?
  `;

    values.push(limit, offset);

    return await db.getAllAsync(query, values);
  },
});
