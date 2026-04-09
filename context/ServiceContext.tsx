import { NewService, Service, UpdateService } from "@/types/Service";

import { useServiceService } from "@/hooks/useServiceService";
import { Bike } from "@/types/Bike";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBikeContext } from "./BikeContext";

type ServiceContextType = {
  services: Service[];
  selectedBikeServices: Service[];

  loading: boolean;
  error: Error | null;

  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;

  getServiceById: (id: number) => Promise<Service>;
  getServices: () => Promise<Service[]>;
  getBikeServices: (selectedBike: Bike) => Promise<Service[]>;
  createService: (service: NewService) => Promise<number>;
  updateService: (service: UpdateService) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const { selectedBike } = useBikeContext();
  const [loading, setLoading] = useState(true);

  const [selectedBikeServices, setSelectedBikeServices] = useState<Service[]>(
    [],
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const {
    getServiceById: getServiceByIdService,
    getServices: getServicesServices,
    createService: createServiceService,
    updateService: updateServiceService,
    deleteService: deleteServiceService,
  } = useServiceService();

  const getBikeServices = async (selectedBike: Bike) => {
    return [];
  };

  const getServiceById = async (id: number) => {
    const s = await getServiceByIdService(id);
    return s;
  };

  const getServices = async () => {
    const s = await getServicesServices();
    return s;
  };

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (service: NewService) => {
    try {
      const newService = await createServiceService(service);
      setServices((prev) => [...prev, newService]);
      return newService.id;
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateService = async (service: UpdateService) => {
    try {
      await updateServiceService(service);
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, ...service } : s)),
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteService = async (id: number) => {
    try {
      await deleteServiceService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    console.log(
      "Cambiar los servicios que se muestran, falta hacer esto en la DB primero",
    );
  }, [selectedBike]);

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        services,
        selectedService,
        setSelectedService,
        selectedBikeServices,
        loading,
        error,
        getServices,
        getServiceById,
        getBikeServices,
        createService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used insise ServiceProvider");
  }
  return context;
};
