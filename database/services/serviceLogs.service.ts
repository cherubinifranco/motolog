import {
  NewServiceLog,
  ServiceBike,
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

  getServiceLogsByYear: async (year: Number) => {
    if (!year) {
      throw new Error("El año es requerido para buscar registror por año");
    }
    return repository.getServiceLogsByYear(year);
  },

  getLastServiceBike: async (serviceLog: ServiceBike) => {
    if (!serviceLog.serviceId) {
      throw new Error("ID del servicio requerido para la busqueda");
    }
    if (!serviceLog.bikeId) {
      throw new Error("ID de la moto es requerida para la busqueda");
    }
    return repository.getLastServiceBike(serviceLog);
  },

  getServiceBike: async (serviceLog: ServiceBike) => {
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
    return repository.updateServiceLog(serviceLog);
  },

  deleteServiceLog: async (id: number) => {
    if (!id) {
      throw new Error("ID requerido");
    }

    return repository.deleteServiceLog(id);
  },
  getFilteredServiceLogs: async ({
    bikeId,
    serviceId,
    startDate,
    endDate,
    offset,
    limit,
  }: {
    bikeId?: number;
    serviceId?: number;
    startDate?: string;
    endDate?: string;
    offset?: number;
    limit?: number;
  }): Promise<ServiceLog[]> => {
    if (
      bikeId === undefined &&
      serviceId === undefined &&
      startDate === undefined &&
      endDate === undefined
    ) {
      throw new Error("Debe proporcionar al menos un filtro");
    }

    if (startDate && isNaN(Date.parse(startDate))) {
      throw new Error("Fecha inicial inválida");
    }

    if (endDate && isNaN(Date.parse(endDate))) {
      throw new Error("Fecha final inválida");
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      throw new Error("La fecha inicial no puede ser mayor que la fecha final");
    }

    return repository.getFilteredServiceLogs({
      bikeId,
      serviceId,
      startDate,
      endDate,
      offset,
      limit,
    });
  },
});
