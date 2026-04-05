import { NewService, Service, UpdateService } from "@/types/Service";

const acceptedFields = ["changeEvery", "title", "icon"] as const;

export const createServiceService = (repository: any) => ({
  getServices: async (): Promise<Service[]> => {
    return repository.getServices();
  },

  createService: async (service: NewService) => {
    if (!service.title) {
      throw new Error("El titulo es requerido");
    }

    if (!service.icon) {
      throw new Error("El icono es requerido");
    }

    if (service.changeEvery < 0) {
      throw new Error("El cambio no puede ser negativo");
    }

    const result = await repository.createService(service);
    return {
      id: result.lastInsertRowId,
      ...service,
    };
  },

  updateService: async (service: UpdateService) => {
    if (!service.id) {
      throw new Error("ID requerido");
    }

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
      throw new Error("No hay campos para actualiazr");
    }

    return repository.updateService(service.id, fields, values);
  },

  deleteService: async (id: number) => {
    if (!id) {
      throw new Error("ID requerido");
    }
    return repository.deleteService(id);
  },
});
