import { useServiceLogService } from "@/hooks/useServiceLogsService";
import {
  NewServiceLog,
  ServiceBike,
  ServiceLog,
  UpdateServiceLog,
} from "@/types/ServiceLog";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ServiceLogContextType = {
  serviceLogs: ServiceLog[];

  loading: boolean;
  error: Error | null;

  selectedServiceLog: ServiceLog | null;
  setSelectedServiceLog: (serviceLog: ServiceLog | null) => void;

  getServiceLogs: () => Promise<ServiceLog[]>;
  getLastServiceBike: (serviceBike: ServiceBike) => Promise<ServiceLog>;
  getServiceBike: (serviceBike: ServiceBike) => Promise<ServiceLog[]>;
  createServiceLog: (serviceLog: NewServiceLog) => Promise<number>;
  updateServiceLog: (serviceLog: UpdateServiceLog) => Promise<void>;
  deleteServiceLog: (id: number) => Promise<void>;
  refreshLogs: () => void;
};

const ServiceLogContext = createContext<ServiceLogContextType | undefined>(
  undefined,
);

export const ServiceLogProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [serviceLogs, setServiceLogs] = useState<ServiceLog[]>([]);
  const [selectedServiceLog, setSelectedServiceLog] =
    useState<ServiceLog | null>(null);

  const {
    createServiceLog: createServiceLogService,
    deleteServiceLog: deleteServiceLogService,
    getLastServiceBike: getLastServiceBikeService,
    getServiceBike: getServiceBikeService,
    getServiceLogs: getServiceLogsService,
    updateServiceLog: updateServiceLogService,
  } = useServiceLogService();

  const loadServiceLogs = async () => {
    try {
      setLoading(true);
      const data = await getServiceLogsService();
      setServiceLogs(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const refreshLogs = () => {
    loadServiceLogs();
  };

  const createServiceLog = async (serviceLog: NewServiceLog) => {
    try {
      const newServiceLog = await createServiceLogService(serviceLog);
      setServiceLogs((prev) => [...prev, newServiceLog]);
      return newServiceLog.id;
    } catch (err) {
      setError(err as Error);
    }
  };

  const getServiceLogs = async () => {
    const s = await getServiceLogsService();
    return s;
  };

  const getServiceBike = async (serviceBike: ServiceBike) => {
    try {
      const s = await getServiceBikeService(serviceBike);
      return s;
    } catch (err) {
      setError(err as Error);
    }
  };

  const getLastServiceBike = async (serviceBike: ServiceBike) => {
    try {
      const s = await getLastServiceBikeService(serviceBike);
      return s;
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateServiceLog = async (serviceLog: UpdateServiceLog) => {
    try {
      await updateServiceLogService(serviceLog);
      setServiceLogs((prev) =>
        prev.map((s) => (s.id === serviceLog.id ? { ...s, ...serviceLog } : s)),
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteServiceLog = async (id: number) => {
    try {
      await deleteServiceLogService(id);
      setServiceLogs((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    loadServiceLogs();
  }, []);

  return (
    <ServiceLogContext.Provider
      value={{
        serviceLogs,
        selectedServiceLog,
        setSelectedServiceLog,
        loading,
        error,
        getServiceLogs,
        getLastServiceBike,
        getServiceBike,
        createServiceLog,
        updateServiceLog,
        deleteServiceLog,
        refreshLogs,
      }}
    >
      {children}
    </ServiceLogContext.Provider>
  );
};

export const useServiceLogContext = () => {
  const context = useContext(ServiceLogContext);
  if (!context) {
    throw new Error("useServiceLogContext must be used insise ServiceProvider");
  }
  return context;
};
