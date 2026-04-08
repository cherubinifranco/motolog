import {
    LastServiceBike,
    NewServiceLog,
    ServiceLog,
    UpdateServiceLog,
} from "@/types/ServiceLog";

const acceptedFields = [
  "bikeId",
  "mileage",
  "serviceDate",
  "serviceId",
  "cost",
  "note",
] as const;

export const createserviceLogService = (repository: any) => ({
  getServiceLogs: async (): Promise<ServiceLog[]> => {
    return repository.getServiceLogs();
  },

  getLastServiceBike: async (serviceLog: LastServiceBike) => {
    if (!serviceLog.serviceId) {
      throw new Error("ID del servicio requerido para la busqueda");
    }
    if (!serviceLog.bikeId) {
      throw new Error("ID de la moto es requerida para la busqueda");
    }
    return repository.getLastServiceBike(serviceLog);
  },

  getServiceBike: async (serviceLog: LastServiceBike) => {
    if (!serviceLog.serviceId) {
      throw new Error("ID del servicio requerido para la busqueda");
    }
    if (!serviceLog.bikeId) {
      throw new Error("ID de la moto es requerida para la busqueda");
    }
    return repository.getServiceBike(serviceLog);
  },

  createServiceLog: async (serviceLog: NewServiceLog) => {
    if (!serviceLog.bikeId || !serviceLog.serviceId) {
      throw new Error(
        "ID es requerido tanto para el servicio, como para la moto seleccionada",
      );
    }

    if (!serviceLog.mileage) {
      throw new Error("El kilometraje es requerido para el registro");
    }

    if (!serviceLog.serviceDate) {
      throw new Error("La fecha es requerida para el registro");
    }

    const result = await repository.createServiceLog(serviceLog);

    return {
      id: result.lastInsertRowId,
      ...serviceLog,
    };
  },

  updateServiceLog: async (serviceLog: UpdateServiceLog) => {
    if (!serviceLog.id) {
      throw new Error("ID requerido");
    }

    const fields: string[] = [];
    const values: any[] = [];

    for (const field of acceptedFields) {
      const value = serviceLog[field];
      if (value !== undefined) {
        fields.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error("No hay campos para actualizar");
    }

    return repository.updateServiceLog(serviceLog.id, fields, values);
  },

  deleteServiceLog: async (id: number) => {
    if (!id) {
      throw new Error("ID requerido");
    }

    return repository.deleteServiceLog(id);
  },
});
