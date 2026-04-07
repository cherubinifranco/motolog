import { NewService, Service, UpdateService } from "@/types/Service";

export const createServiceService = (repository: any) => ({
  getServiceById: async (id: number): Promise<Service> => {
    if (!id) {
      throw new Error("El ID es requerido");
    }
    return repository.getServiceById(id);
  },

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

    return repository.updateService(service);
  },

  deleteService: async (id: number) => {
    if (!id) {
      throw new Error("ID requerido");
    }
    return repository.deleteService(id);
  },
});
